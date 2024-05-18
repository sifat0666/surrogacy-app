<?php

namespace App\Http\Controllers;

use Validator;
use Hash;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserResourceLogin;
use App\Http\Resources\IntendedParentResource;
use App\Http\Resources\SurrogateResource;
use App\Http\Resources\AgencyResource;
use App\Http\Resources\AgencyResourceWithProfiles;
use App\Models\BlockedUser;
use Illuminate\Support\Carbon;
use MrShan0\PHPFirestore\FirestoreClient;
use Stripe\Subscription as StripeSubscription;

class UserController extends Controller
{

    public function block(Request $request, $id)
    {
        $user = $request->user();
        $blockedUser = User::find($id);

        if (!$blockedUser)
        {
            return [
                'status' => 'error',
                'message' => 'User not found',
            ];
        }

        if ($user->id == $blockedUser->id)
        {
            return [
                'status' => 'error',
                'message' => 'You cannot block yourself',
            ];
        }

        if (BlockedUser::where('user_id', $user->id)->where('blocked_user_id', $blockedUser->id)->exists())
        {
            return [
                'status' => 'error',
                'message' => 'User already blocked',
            ];
        }

        $blockedUser = BlockedUser::create([
            'user_id' => $user->id,
            'blocked_user_id' => $blockedUser->id,
        ]);

        return [
            'status' => 'success',
            'message' => 'User blocked successfully',
        ];
    }
    public function index_intended_parent(Request $request)
    {
        $users = User::where('user_type', 'Intended Parent')
        ->leftJoin('subscriptions', function ($join) {
            $join->on('users.id', '=', 'subscriptions.user_id')
            ->where(function ($query) {
                $query->whereNull('ends_at')
                ->orWhere(function ($query) {
                    $query->whereNotNull('ends_at')->where('ends_at', '>', Carbon::now());
                });
            })
            ->where('stripe_status', '!=', StripeSubscription::STATUS_INCOMPLETE)
            ->where('stripe_status', '!=', StripeSubscription::STATUS_INCOMPLETE_EXPIRED)
            ->where('stripe_status', '!=', StripeSubscription::STATUS_UNPAID);
        })
        ->orderByRaw('subscriptions.created_at desc, created_at DESC')
        ->groupBy('users.id')
        ->select('users.*');

        $users = $this->apply_filters($request, 'Intended Parent', $users);

        //$users->latest();

        $users = IntendedParentResource::collection($users->paginate(30))->response()->getData(true);

        return [
            'status' => 'success',
            'user' => $users,
        ];
    }

    public function index_surrogate(Request $request)
    {
        $users = User::where('user_type', 'Surrogate')
        ->orderByRaw('is_surrogate_verified desc, created_at DESC');

        $users = $this->apply_filters($request, 'Surrogate', $users);

        //$users->latest();

        $users = SurrogateResource::collection($users->paginate(30))->response()->getData(true);

        return [
            'status' => 'success',
            'user' => $users,
        ];
    }

    public function get_surrogate(Request $request)
{
    $userType = $request->query('user_type', 'Surrogate');
    $orderBy = $request->query('order_by', 'created_at');
    $sortOrder = $request->query('sort_order', 'desc');

    $users = User::where('user_type', $userType)
                 ->orderBy('is_surrogate_verified', 'desc')
                 ->orderBy($orderBy, $sortOrder);

    $users = SurrogateResource::collection($users->get());

    // Return the response
    return response()->json([
        'status' => 'success',
        'users' => $users,
    ]);
}


    public function index_agency(Request $request)
    {
        $users = User::where('user_type', 'Agency')
        ->leftJoin('subscriptions', function ($join) {
            $join->on('users.id', '=', 'subscriptions.user_id')
            ->where(function ($query) {
                $query->whereNull('ends_at')
                ->orWhere(function ($query) {
                    $query->whereNotNull('ends_at')->where('ends_at', '>', Carbon::now());
                });
            })
            ->where('stripe_status', '!=', StripeSubscription::STATUS_INCOMPLETE)
            ->where('stripe_status', '!=', StripeSubscription::STATUS_INCOMPLETE_EXPIRED)
            ->where('stripe_status', '!=', StripeSubscription::STATUS_UNPAID);
        })
        ->orderByRaw('subscriptions.created_at desc, created_at DESC')
        ->groupBy('users.id')
        ->select('users.*');

        $users = $this->apply_filters($request, 'Agency', $users);

        //$users->latest();

        $users = AgencyResource::collection($users->paginate(30))->response()->getData(true);

        return [
            'status' => 'success',
            'user' => $users,
        ];
    }

    public function apply_filters(Request $request, $type, $users)
    {
        if ($request->has('name') && $request->name) $users->where('name', 'like', '%'.$request->name.'%');

        if ($request->has('country') && $request->country) $users->where('country', 'like', '%'.$request->country.'%');

        if ($request->has('state') && $request->state) $users->where('state', 'like', '%'.$request->state.'%');

        if ($request->has('intended_parent_location') && $request->intended_parent_location) $users->where('intended_parent_location', 'like', '%'.$request->intended_parent_location.'%');

        if ($request->has('surrogate_location') && $request->surrogate_location) $users->where('surrogate_location', 'like', '%'.$request->surrogate_location.'%');

        if ($type == 'Intended Parent' || $type == 'Surrogate')
        {
            if ($request->has('surrogacy_type') && $request->surrogacy_type) $users->where('surrogacy_type', $request->surrogacy_type);

            if ($request->has('when_to_start_journey') && $request->when_to_start_journey) $users->where('when_to_start_journey', $request->when_to_start_journey);

            if ($request->has('relationship_status') && $request->relationship_status) $users->where('relationship_status', $request->relationship_status);

            if ($request->has('is_first_surrogacy_journey'))
            {
                if ($request->is_first_surrogacy_journey == 'true') $users->where('is_first_surrogacy_journey', true);
                else if ($request->is_first_surrogacy_journey == 'false') $users->where('is_first_surrogacy_journey', false);
            }

            if ($request->has('is_willing_to_travel'))
            {
                if ($request->is_willing_to_travel == 'true') $users->where('is_willing_to_travel', true);
                else if ($request->is_willing_to_travel == 'false') $users->where('is_willing_to_travel', false);
            }

            if ($request->has('is_agency_supported')) {
                if ($request->is_agency_supported == 'true') {
                    $users->whereNotNull('agency_id');
                } else if ($request->is_agency_supported == 'false') {
                    $users->whereNull('agency_id');
                }
            }


            if ($request->has('is_working_with_agency'))
            {
                if ($request->is_working_with_agency == 'true') $users->where('is_working_with_agency', true);
                else if ($request->is_working_with_agency == 'false') $users->where('is_working_with_agency', false);
            }

            if ($request->has('have_children'))
            {
                if ($request->have_children == 'true') $users->where('have_children', true);
                else if ($request->have_children == 'false') $users->where('have_children', false);
            }
        }

        if ($type == 'Intended Parent')
        {
            if ($request->has('have_frozen_embryos'))
            {
                if ($request->have_frozen_embryos == 'true') $users->where('have_frozen_embryos', true);
                else if ($request->have_frozen_embryos == 'false') $users->where('have_frozen_embryos', false);
            }

            if ($request->has('is_smoke_or_tobacco'))
            {
                if ($request->is_smoke_or_tobacco == 'true') $users->where('is_smoke_or_tobacco', true);
                else if ($request->is_smoke_or_tobacco == 'false') $users->where('is_smoke_or_tobacco', false);
            }
        }

        if ($type == 'Surrogate')
        {
            if ($request->has('willing_to_help_types') && $request->willing_to_help_types) $users->where('willing_to_help_types', $request->willing_to_help_types);

            if ($request->has('min_height') && $request->min_height && $request->has('max_height') && $request->max_height)
                $users->whereBetween('height', [$request->min_height, $request->max_height]);
            else if ($request->has('min_height') && $request->min_height)
                $users->where('height', '>=', $request->min_height);
            else if ($request->has('max_height') && $request->max_height)
                $users->where('height', '<=', $request->max_height);

            if ($request->has('min_weight') && $request->min_weight && $request->has('max_weight') && $request->max_weight)
                $users->whereBetween('weight', [$request->min_weight, $request->max_weight]);
            else if ($request->has('min_weight') && $request->min_weight)
                $users->where('weight', '>=', $request->min_weight);
            else if ($request->has('max_weight') && $request->max_weight)
                $users->where('weight', '<=', $request->max_weight);
        }

        if ($type == 'Agency')
        {
            if ($request->has('assisted_groups') && $request->assisted_groups) $users->where('assisted_groups', $request->assisted_groups);
        }

        return $users;
    }

    public function show(Request $request, User $user)
    {
        $data = null;
        if ($user->user_type == 'Intended Parent')
        {
            $data = new IntendedParentResource($user);
        }
        if ($user->user_type == 'Surrogate')
        {
            $data = new SurrogateResource($user);
        }
        if ($user->user_type == 'Agency')
        {
            $data = new AgencyResourceWithProfiles($user);
        }

        return [
            'status' => 'success',
            'data' => $data,
        ];
    }

    public function update_profile_surrogacy(Request $request)
    {
        if ($request->user()->user_type == 'Intended Parent')
        {
            return $this->update_profile_surrogacy_intended_parent($request);
        }
        else if ($request->user()->user_type == 'Surrogate')
        {
            return $this->update_profile_surrogacy_surrogate($request);
        }
        // else if ($request->user()->user_type == 'Agency')
        // {
        //     return $this->update_profile_surrogacy_agency($request);
        // }
    }

    public function update_profile_about(Request $request)
    {
        if ($request->user()->user_type == 'Intended Parent')
        {
            return $this->update_profile_about_intended_parent($request);
        }
        else if ($request->user()->user_type == 'Surrogate')
        {
            return $this->update_profile_about_surrogate($request);
        }
        else if ($request->user()->user_type == 'Agency')
        {
            return $this->update_profile_about_agency($request);
        }
    }

    public function update_profile_contact(Request $request)
    {
        if ($request->user()->user_type == 'Intended Parent')
        {
            return $this->update_profile_contact_intended_parent($request);
        }
        // else if ($request->user()->user_type == 'Surrogate')
        // {
        //     return $this->update_profile_contact_surrogate($request);
        // }
        else if ($request->user()->user_type == 'Agency')
        {
            return $this->update_profile_contact_agency($request);
        }
    }

    private function update_profile_surrogacy_intended_parent(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'surrogacy_type' => 'required|string|in:Gestational Surrogacy,Traditional Surrogacy,Gestational and Traditional Surrogacy',
            'is_first_surrogacy_journey' => 'required|boolean',
            'is_working_with_agency' => 'required|boolean',
            'have_frozen_embryos' => 'nullable|boolean',
            'surrogate_location' => 'nullable|string|in:United States of America,Canada',
            'type_of_journey' => 'nullable|string|in:First Child,Sibling',
            'when_to_start_journey' => 'nullable|string|in:Ready to start,This year,Next year,Unknown',
            'gallery' => 'nullable|array',
        ]);

        if ($validator->fails())
        {
            return [
                'status' => 'validation_error',
                'messages' => $validator->errors()->all(),
            ];
        }

        $input = $request->only([
            'surrogacy_type',
            'surrogate_location',
            'type_of_journey',
            'when_to_start_journey',
        ]);

        $input['is_first_surrogacy_journey'] = $request->is_first_surrogacy_journey ? true : false;
        $input['is_working_with_agency'] = $request->is_working_with_agency ? true : false;
        $input['have_frozen_embryos'] = $request->have_frozen_embryos ? true : false;

        if ($request->user()->update($input))
        {
            return [
                'status' => 'success',
                'message' => 'Success! Surrogacy information updated successfully.',
                'user' => new UserResource($request->user()),
            ];
        }

        return [
            'status' => 'error',
            'message' => 'There was some error while updating information, please try again.',
        ];
    }

    private function update_profile_surrogacy_surrogate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'surrogacy_type' => 'required|string|in:Gestational Surrogacy,Traditional Surrogacy,Gestational and Traditional Surrogacy',
            'is_first_surrogacy_journey' => 'required|boolean',
            'is_working_with_agency' => 'required|boolean',
            'willing_to_help_types' => 'nullable|string|in:Open to All Intended Parents,Heterosexual Couple,Gay Couple,Lesbian Couple,Single Man,Single Woman',
            'intended_parent_location' => 'nullable|string|in:United States of America,Canada,Worldwide',
            'when_to_start_journey' => 'nullable|string|in:Ready to start,This year,Next year,Unknown',
            'gallery' => 'nullable|array',
        ]);

        if ($validator->fails())
        {
            return [
                'status' => 'validation_error',
                'messages' => $validator->errors()->all(),
            ];
        }

        $input = $request->only([
            'surrogacy_type',
            'willing_to_help_types',
            'intended_parent_location',
            'when_to_start_journey',
        ]);

        $input['is_first_surrogacy_journey'] = $request->is_first_surrogacy_journey ? true : false;
        $input['is_working_with_agency'] = $request->is_working_with_agency ? true : false;

        if ($request->user()->update($input))
        {
            return [
                'status' => 'success',
                'message' => 'Success! Surrogacy information updated successfully.',
                'user' => new UserResource($request->user()),
            ];
        }

        return [
            'status' => 'error',
            'message' => 'There was some error while updating information, please try again.',
        ];
    }

    private function update_profile_about_intended_parent(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:191',
            'country' => 'nullable|string|max:191',
            'state' => 'nullable|string|max:191',
            // 'images' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            // 'images' => 'required',
            'cover' => 'nullable|string',
            'relationship_status' => 'nullable|string|in:Single,Married,In a relationship',
            'have_children' => 'nullable|boolean',
            'is_willing_to_travel' => 'nullable|boolean',
            'about' => 'nullable|string',
            'gallery' => 'nullable',
        ]);

        if ($validator->fails())
        {
            return [
                'status' => 'validation_error',
                'messages' => $validator->errors()->all(),
                'request' => $request->all(),
                'onp' => $request->input,
            ];
        }

        $input = $request->only([
            'name',
            'country',
            'state',
            'relationship_status',
            'about',
            'images',
            'gallery'
        ]);

        $input['have_children'] = $request->have_children ? true : false;
        $input['is_willing_to_travel'] = $request->is_willing_to_travel ? true : false;
        $input['images'] = $request->images;
        // store gallery images from array to json
        $input['gallery'] = $request->gallery;

        if ($request->user()->update($input))
        {
            // $firestoreClient = new FirestoreClient('find-surrogate', 'AIzaSyAtkf5xTt_nvFfp-70ab2vg_jKEn-EIeVg', [
            //     'database' => '(default)',
            // ]);

            // $firestoreClient->updateDocument('users/'.str_pad($request->user()->id, 10, '0', STR_PAD_LEFT), [
            //     'id' => $request->user()->id,
            //     'agency_id' => $request->user()->agency_id,
            //     'user_type' => $request->user()->user_type,
            //     'name' => $request->user()->name,
            //     'cover' => $request->user()->cover ? asset($request->user()->cover) : null,
            // ]);

            return [
                'status' => 'success',
                'message' => 'Success! Intended Parent About information updated successfully.',
                'user' => new UserResource($request->user()),
            ];
        }

        return [
            'status' => 'error',
            'message' => 'There was some error while updating information, please try again.',
        ];
    }

    private function update_profile_about_surrogate(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:191',
            'country' => 'required|string|max:191',
            'state' => 'required|string|max:191',
            // 'images' => 'required|string',
            'cover' => 'nullable|string',
            'relationship_status' => 'nullable|string|in:Single,Married,In a relationship',
            'date_of_birth' => 'nullable|date||before_or_equal:-18 years',
            'have_children' => 'nullable|boolean',
            'height' => 'nullable|string',
            'weight' => 'nullable|string',
            'is_smoke_or_tobacco' => 'nullable|boolean',
            'is_willing_to_travel' => 'nullable|boolean',
            'about' => 'nullable|string',
            'gallery' => 'nullable',
        ], [
            'date_of_birth.before_or_equal' => 'Date of birth must be at least 18 years old',
        ]);

        if ($validator->fails())
        {
            return [
                'status' => 'validation_error',
                'messages' => $validator->errors()->all(),
            ];
        }

        $input = $request->only([
            'name',
            'country',
            'state',
            'relationship_status',
            'height',
            'weight',
            'about',
            'images',
            'gallery'
        ]);

        $input['date_of_birth'] = date('Y-m-d', strtotime($request->date_of_birth));
        $input['have_children'] = $request->have_children ? true : false;
        $input['is_smoke_or_tobacco'] = $request->is_smoke_or_tobacco ? true : false;
        $input['is_willing_to_travel'] = $request->is_willing_to_travel ? true : false;
        $input['gallery'] = $request->gallery;
        if ($request->user()->update($input))
        {
            return [
                'status' => 'success',
                'message' => 'Success! About information updated successfully.',
                'user' => $request->user(),
            ];
        }

        return [
            'status' => 'error',
            'message' => 'There was some error while updating information, please try again.',
        ];
    }

    private function update_profile_about_agency(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
            'about' => 'nullable|string',
            'assisted_group' => 'nullable|string',
            'country' => 'nullable|string',
            'gallery' => 'nullable',
            'images' => 'nullable|string',
            'journey_length' => 'nullable|string',
            'membership_affilations' => 'nullable',
            'name' => 'nullable|string',
            'services_provided' => 'nullable',
            'state' => 'nullable|string',
            'surrogate_matching_time' => 'nullable|string',

        ]);

        if ($validator->fails())
        {
            return [
                'status' => 'validation_error',
                'messages' => $validator->errors()->all(),
            ];
        }

        $input = $request->only([
            'about',
            'assisted_group',
            'country',
            'gallery',
            'images',
            'journey_length',
            'membership_affilations',
            'name',
            'services_provided',
            'state',
            'surrogate_matching_time',
        ]);

        $input['gallery'] = $request->gallery;
        
        if ($request->user()->update($input))
        {
            return [
                'status' => 'success',
                'message' => 'Success! About information updated successfully.',
                'user' => $request->user()
            ];
        }

        return [
            'status' => 'error',
            'message' => 'There was some error while updating information, please try again.',
        ];
    }

    private function update_profile_contact_intended_parent(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'contact_email' => 'nullable|email|max:191',
            'phone_number' => 'nullable|string|max:191',
            'socal_media' => 'nullable|url|max:191',
        ]);

        if ($validator->fails())
        {
            return [
                'status' => 'validation_error',
                'messages' => $validator->errors()->all(),
            ];
        }

        $input = $request->only([
            'contact_email',
            'phone_number',
            'socal_media',
        ]);

        if ($request->user()->update($input))
        {
            return [
                'status' => 'success',
                'message' => 'Success! Contact information updated successfully.',
                'user' => new UserResource($request->user()),
            ];
        }

        return [
            'status' => 'error',
            'message' => 'There was some error while updating information, please try again.',
        ];
    }

    private function update_profile_contact_agency(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'contact_email' => 'nullable|email|max:191',
            'phone_number' => 'nullable|string|max:191',
            'website' => 'nullable|max:191',
        ]);

        if ($validator->fails())
        {
            return [
                'status' => 'validation_error',
                'messages' => $validator->errors()->all(),
            ];
        }

        $input = $request->only([
            'contact_email',
            'phone_number',
            'website',
        ]);

        if ($request->user()->update($input))
        {
            return [
                'status' => 'success',
                'message' => 'Success! Contact information updated successfully.',
                'user' => new UserResource($request->user()),
            ];
        }

        return [
            'status' => 'error',
            'message' => 'There was some error while updating information, please try again.',
        ];
    }

    public function destroy(Request $request)
    {
        $user = $request->user();

        if ($user->delete())
        {
            try {
                \Mail::to(User::find(1))->send(new \App\Mail\AdminMemberDeleted($user));
            } catch(\Exception $e) {}

            if ($user->user_type == 'Agency')
            {
                User::where('agency_id', $user->id)->delete();
            }

            $user->update(['email' => 'd-'.$user->email.'-'.substr(md5(time().mt_rand(0, 1000)), 0, 8)]);

            $user->tokens()->delete();

            return [
                'status' => 'success',
                'message' => 'Success! Account deleted successfully.',
            ];
        }

        return [
            'status' => 'error',
            'message' => 'There was some error while deleting accounting, please try again.',
        ];
    }

    public function update_surrogate_verification(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'surrogate_verification_number' => 'required|string|max:191',
            'surrogate_verification_address' => 'required|string|max:191',
            'images' => 'required|string',
        ]);

        if ($validator->fails())
        {
            return [
                'status' => 'validation_error',
                'messages' => $validator->errors()->all(),
            ];
        }

        $input = [];

        $input['surrogate_verification_number'] = $request->surrogate_verification_number;
        $input['surrogate_verification_address'] = $request->surrogate_verification_address;

        $input['images'] = explode(',', $request->images);
        $images = [];
        $totalImages = 0;

        foreach ($input['images'] as $fileKey => $file)
        {
            if($file && file_exists(public_path($file)))
            {
                $extension = preg_replace('/^.*\./', '', $file);

                //not using an old image
                if (substr($file, 0, 12) != 'images/verifications')
                {
                    $fileName = str_replace('/temp/', '/verifications/', $file);
                    \File::copy(public_path($file), public_path($fileName));
                }
                else
                {
                    $fileName = $file;
                }

                $images[] = $fileName;

                $totalImages++;
            }
        }

        if ($totalImages == 0)
        {
            return [
                'status' => 'validation_error',
                'messages' => ['Images are required'],
            ];
        }

        $input['surrogate_verification_image'] = json_encode($images);

        $user = $request->user();


        if ($request->user()->update($input))

        {
            try {
                 \Mail::to(User::find(1))->send(new \App\Mail\AdminVerification($user));


            } catch(\Exception $e) {}

            return [
                'status' => 'success',
                'message' => 'Success! Details submitted for verification.',
            ];
        }

        return [
            'status' => 'error',
            'message' => 'There was some error while submitting details, please try again.',
        ];
    }
}
