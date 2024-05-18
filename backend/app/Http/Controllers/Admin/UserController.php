<?php

namespace App\Http\Controllers\Admin;

use Carbon\Carbon;
use Validator;
use Hash;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Notification;
use App\Http\Resources\Admin\IntendedParentResource;
use App\Http\Resources\Admin\SurrogateResource;
use App\Http\Resources\Admin\AgencyResource;
use App\Http\Resources\AgencyUserResource;
use MrShan0\PHPFirestore\FirestoreClient;
use Stripe\Subscription as StripeSubscription;

class UserController extends Controller
{
    public function index_intended_parent(Request $request)
    {
        if ($request->user()->user_type != 'Admin')
        {
            return [
                'status' => 'error',
                'message' => 'Unauthorized.',
            ];
        }

        $users = User::where('user_type', 'Intended Parent');

        $users = $this->apply_filters($request, 'Intended Parent', $users);

        $users->latest();

        $users = IntendedParentResource::collection($users->paginate(30))->response()->getData(true);

        return [
            'status' => 'success',
            'user' => $users,
        ];
    }

    public function index_surrogate(Request $request)
    {
        if ($request->user()->user_type != 'Admin')
        {
            return [
                'status' => 'error',
                'message' => 'Unauthorized.',
            ];
        }

        $users = User::where('user_type', 'Surrogate');

        $users = $this->apply_filters($request, 'Surrogate', $users);
        
        $users->latest();

        $users = SurrogateResource::collection($users->paginate(30))->response()->getData(true);

        return [
            'status' => 'success',
            'user' => $users,
        ];
    }

    public function index_agency(Request $request)
    {
        if ($request->user()->user_type != 'Admin')
        {
            return [
                'status' => 'error',
                'message' => 'Unauthorized.',
            ];
        }

        $users = User::where('user_type', 'Agency');

        $users = $this->apply_filters($request, 'Agency', $users);
        
        $users->latest();

        $users = AgencyResource::collection($users->paginate(30))->response()->getData(true);

        return [
            'status' => 'success',
            'user' => $users,
        ];
    }

    public function index_subscribed_intended_parent(Request $request)
    {
        if ($request->user()->user_type != 'Admin')
        {
            return [
                'status' => 'error',
                'message' => 'Unauthorized.',
            ];
        }

        $users = User::where('user_type', 'Intended Parent')->whereHas('subscriptions', function ($query) {
            $query->where(function ($query) {
                $query->whereNull('ends_at')
                ->orWhere(function ($query) {
                    $query->whereNotNull('ends_at')->where('ends_at', '>', Carbon::now());
                });
            })
            ->where('stripe_status', '!=', StripeSubscription::STATUS_INCOMPLETE)
            ->where('stripe_status', '!=', StripeSubscription::STATUS_INCOMPLETE_EXPIRED)
            ->where('stripe_status', '!=', StripeSubscription::STATUS_UNPAID);
        });

        $users = $this->apply_filters($request, 'Intended Parent', $users);

        $users->latest();

        $users = IntendedParentResource::collection($users->paginate(30))->response()->getData(true);

        return [
            'status' => 'success',
            'user' => $users,
        ];
    }

    public function index_subscribed_surrogate(Request $request)
    {
        if ($request->user()->user_type != 'Admin')
        {
            return [
                'status' => 'error',
                'message' => 'Unauthorized.',
            ];
        }

        $users = User::where('user_type', 'Surrogate')->where('is_surrogate_verified', true);

        $users = $this->apply_filters($request, 'Surrogate', $users);
        
        $users->latest();

        $users = SurrogateResource::collection($users->paginate(30))->response()->getData(true);

        return [
            'status' => 'success',
            'user' => $users,
        ];
    }

    public function index_subscribed_agency(Request $request)
    {
        if ($request->user()->user_type != 'Admin')
        {
            return [
                'status' => 'error',
                'message' => 'Unauthorized.',
            ];
        }

        $users = User::where('user_type', 'Agency')->whereHas('subscriptions', function ($query) {
            $query->where(function ($query) {
                $query->whereNull('ends_at')
                ->orWhere(function ($query) {
                    $query->whereNotNull('ends_at')->where('ends_at', '>', Carbon::now());
                });
            })
            ->where('stripe_status', '!=', StripeSubscription::STATUS_INCOMPLETE)
            ->where('stripe_status', '!=', StripeSubscription::STATUS_INCOMPLETE_EXPIRED)
            ->where('stripe_status', '!=', StripeSubscription::STATUS_UNPAID);
        });

        $users = $this->apply_filters($request, 'Agency', $users);
        
        $users->latest();

        $users = AgencyResource::collection($users->paginate(30))->response()->getData(true);

        return [
            'status' => 'success',
            'user' => $users,
        ];
    }

    public function index_agency_intended_parent(Request $request)
    {
        if ($request->user()->user_type != 'Admin')
        {
            return [
                'status' => 'error',
                'message' => 'Unauthorized.',
            ];
        }

        $users = User::where('user_type', 'Intended Parent')->whereNotNull('agency_id');

        $users = $this->apply_filters($request, 'Intended Parent', $users);

        $users->latest();

        $users = IntendedParentResource::collection($users->paginate(30))->response()->getData(true);

        return [
            'status' => 'success',
            'user' => $users,
        ];
    }

    public function index_agency_surrogate(Request $request)
    {
        if ($request->user()->user_type != 'Admin')
        {
            return [
                'status' => 'error',
                'message' => 'Unauthorized.',
            ];
        }

        $users = User::where('user_type', 'Surrogate')->whereNotNull('agency_id');

        $users = $this->apply_filters($request, 'Surrogate', $users);
        
        $users->latest();

        $users = SurrogateResource::collection($users->paginate(30))->response()->getData(true);

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
        if ($request->user()->user_type != 'Admin')
        {
            return [
                'status' => 'error',
                'message' => 'Unauthorized.',
            ];
        }

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
            $data = new AgencyResource($user);
        
            $users = User::where('agency_id', $user->id)->latest()->get();
            $users = AgencyUserResource::collection($users);
        }

        $response = [
            'status' => 'success',
            'data' => $data,
        ];
        
        if ($user->user_type == 'Agency') $response['users'] = $users;

        return $response;
    }

    public function toggle_verified(Request $request, $user)
    {
        if ($request->user()->user_type != 'Admin')
        {
            return [
                'status' => 'error',
                'message' => 'Unauthorized.',
            ];
        }

        $user = User::find($user);
        if (!$user)
        {
            return [
                'status' => 'error',
                'message' => 'User not valid.',
            ];
        }

        if ($user->is_surrogate_verified)
        {
            if ($user->update(['is_surrogate_verified' => false]))
            {
                return [
                    'status' => 'success',
                    'message' => 'Success! Surrogate marked as unverified.',
                    'is_verified' => false,
                ];
            }
        }
        else
        {
            if ($user->update(['is_surrogate_verified' => true]))
            {
                Notification::create([
                    'user_id' => $user->id,
                    'title' => 'You are now a verified surrogate',
                ]);
                
                
				try {
		            \Mail::to($user)->send(new \App\Mail\UserVerified($user));
		        } catch(\Exception $e) {}

                return [
                    'status' => 'success',
                    'message' => 'Success! Surrogate marked as verified.',
                    'is_verified' => true,
                ];
            }
        }

        return [
            'status' => 'error',
            'message' => 'There was some error while updating status, please try again.',
        ];
    }

    public function change_password(Request $request, User $user)
    {
        if ($request->user()->user_type != 'Admin')
        {
            return [
                'status' => 'error',
                'message' => 'Unauthorized.',
            ];
        }

        $validator = Validator::make($request->all(), [
            'password' => 'required|string|confirmed',
        ]);

        if ($validator->fails())
        {
            return [
                'status' => 'validation_error',
                'messages' => $validator->errors()->all(),
            ];
        }

        if ($user->update(['password' => Hash::make($request->password)]))
        {
            return [
                'status' => 'success',
                'message' => 'Success! Password changed successfully.',
            ];
        }

        return [
            'status' => 'error',
            'message' => 'There was some error while changing password, please try again.',
        ];
    }

    public function update_profile_surrogacy(Request $request, User $user)
    {
        if ($request->user()->user_type != 'Admin')
        {
            return [
                'status' => 'error',
                'message' => 'Unauthorized.',
            ];
        }

        if ($user->user_type == 'Intended Parent')
        {
            return $this->update_profile_surrogacy_intended_parent($request, $user);
        }
        else if ($user->user_type == 'Surrogate')
        {
            return $this->update_profile_surrogacy_surrogate($request, $user);
        }
        // else if ($user->user_type == 'Agency')
        // {
        //     return $this->update_profile_surrogacy_agency($request, $user);
        // }
    }

    public function update_profile_about(Request $request, User $user)
    {
        if ($request->user()->user_type != 'Admin')
        {
            return [
                'status' => 'error',
                'message' => 'Unauthorized.',
            ];
        }

        if ($user->user_type == 'Intended Parent')
        {
            return $this->update_profile_about_intended_parent($request, $user);
        }
        else if ($user->user_type == 'Surrogate')
        {
            return $this->update_profile_about_surrogate($request, $user);
        }
        else if ($user->user_type == 'Agency')
        {
            return $this->update_profile_about_agency($request, $user);
        }
    }

    public function update_profile_contact(Request $request, User $user)
    {
        if ($request->user()->user_type != 'Admin')
        {
            return [
                'status' => 'error',
                'message' => 'Unauthorized.',
            ];
        }

        if ($user->user_type == 'Intended Parent')
        {
            return $this->update_profile_contact_intended_parent($request, $user);
        }
        // else if ($user->user_type == 'Surrogate')
        // {
        //     return $this->update_profile_contact_surrogate($request, $user);
        // }
        else if ($user->user_type == 'Agency')
        {
            return $this->update_profile_contact_agency($request, $user);
        }
    }

    private function update_profile_surrogacy_intended_parent(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'surrogacy_type' => 'required|string|in:Gestational Surrogacy,Traditional Surrogacy,Gestational and Traditional Surrogacy',
            'is_first_surrogacy_journey' => 'required|boolean',
            'is_working_with_agency' => 'required|boolean',
            'have_frozen_embryos' => 'nullable|boolean',
            'surrogate_location' => 'nullable|string|in:The US,Canada',
            'type_of_journey' => 'nullable|string|in:First Child,Sibling',
            'when_to_start_journey' => 'nullable|string|in:Ready to start,This year,Next year,Unknown',
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
        
        if ($user->update($input))
        {
            return [
                'status' => 'success',
                'message' => 'Success! Surrogacy information updated successfully.',
            ];
        }

        return [
            'status' => 'error',
            'message' => 'There was some error while updating information, please try again.',
        ];
    }

    private function update_profile_surrogacy_surrogate(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'surrogacy_type' => 'required|string|in:Gestational Surrogacy,Traditional Surrogacy,Gestational and Traditional Surrogacy',
            'is_first_surrogacy_journey' => 'required|boolean',
            'is_working_with_agency' => 'required|boolean',
            'willing_to_help_types' => 'nullable|string|in:Open to All Intended Parents,Heterosexual Couple,Gay Couple,Lesbian Couple,Single Man,Single Woman',
            'intended_parent_location' => 'nullable|string|in:The US,Canada,Worldwide',
            'when_to_start_journey' => 'nullable|string|in:Ready to start,This year,Next year,Unknown',
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

        if ($user->update($input))
        {
            return [
                'status' => 'success',
                'message' => 'Success! Surrogacy information updated successfully.',
            ];
        }

        return [
            'status' => 'error',
            'message' => 'There was some error while updating information, please try again.',
        ];
    }

    private function update_profile_about_intended_parent(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:191',
            'country' => 'required|string|max:191',
            'state' => 'required|string|max:191',
            // 'images' => 'required|string',
            'cover' => 'nullable|string',
            'relationship_status' => 'nullable|string|in:Single,Married,In a relationship',
            'have_children' => 'nullable|boolean',
            'is_willing_to_travel' => 'nullable|boolean',
            'about' => 'nullable|string',            
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
            'about',
        ]);

        $input['have_children'] = $request->have_children ? true : false;
        $input['is_willing_to_travel'] = $request->is_willing_to_travel ? true : false;

        $cover = null;
        $input['images'] = explode(',', $request->images);
        $images = [];
        $totalImages = 0;

        foreach ($input['images'] as $fileKey => $file)
        {
            if($file && file_exists(public_path($file)))
            {
                $extension = preg_replace('/^.*\./', '', $file);
                
                //not using an old image
                if (substr($file, 0, 12) != 'images/users')
                {
                    $fileName = str_replace('/temp/', '/users/', $file);
                    \File::copy(public_path($file), public_path($fileName));
                }
                else
                {
                    $fileName = $file;
                }

                if ($request->has('cover') && $request->cover == $file)
                {
                    $cover = $fileName;
                }
                else
                {
                    $images[] = $fileName;
                }

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

        if ($cover === null)
        {
            $cover = $images[0];
        }
        else
        {
            array_unshift($images, $cover);
        }

        $input['images'] = $images;
        $input['cover'] = $cover;

        if ($user->update($input))
        {
            // $firestoreClient = new FirestoreClient('find-surrogate', 'AIzaSyAtkf5xTt_nvFfp-70ab2vg_jKEn-EIeVg', [
            //     'database' => '(default)',
            // ]);

            // $firestoreClient->updateDocument('users/'.str_pad($user->id, 10, '0', STR_PAD_LEFT), [
            //     'id' => $user->id,
            //     'agency_id' => $user->agency_id,
            //     'user_type' => $user->user_type,
            //     'name' => $user->name,
            //     'cover' => $user->cover ? asset($user->cover) : null,
            // ]);

            return [
                'status' => 'success',
                'message' => 'Success! About information updated successfully.',
            ];
        }

        return [
            'status' => 'error',
            'message' => 'There was some error while updating information, please try again.',
        ];
    }

    private function update_profile_about_surrogate(Request $request, User $user)
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
        ]);

        $input['date_of_birth'] = date('Y-m-d', strtotime($request->date_of_birth));
        $input['have_children'] = $request->have_children ? true : false;
        $input['is_smoke_or_tobacco'] = $request->is_smoke_or_tobacco ? true : false;
        $input['is_willing_to_travel'] = $request->is_willing_to_travel ? true : false;
        
        $cover = null;
        $input['images'] = explode(',', $request->images);
        $images = [];
        $totalImages = 0;

        foreach ($input['images'] as $fileKey => $file)
        {
            if($file && file_exists(public_path($file)))
            {
                $extension = preg_replace('/^.*\./', '', $file);
                
                //not using an old image
                if (substr($file, 0, 12) != 'images/users')
                {
                    $fileName = str_replace('/temp/', '/users/', $file);
                    \File::copy(public_path($file), public_path($fileName));
                }
                else
                {
                    $fileName = $file;
                }

                if ($request->has('cover') && $request->cover == $file)
                {
                    $cover = $fileName;
                }
                else
                {
                    $images[] = $fileName;
                }

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

        if ($cover === null)
        {
            $cover = $images[0];
        }
        else
        {
            array_unshift($images, $cover);
        }

        $input['images'] = $images;
        $input['cover'] = $cover;

        if ($user->update($input))
        {
            return [
                'status' => 'success',
                'message' => 'Success! About information updated successfully.',
            ];
        }

        return [
            'status' => 'error',
            'message' => 'There was some error while updating information, please try again.',
        ];
    }

    private function update_profile_about_agency(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:191',
            'country' => 'required|string|max:191',
            'state' => 'required|string|max:191',
            // 'images' => 'required|string',
            'cover' => 'nullable|string',
            'assisted_groups' => 'nullable|string|in:Surrogates and Intended Parents,Surrogates,Intended Parents',
            'about' => 'nullable|string',
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
            'assisted_groups',
            'about',
        ]);

        $cover = null;
        $input['images'] = explode(',', $request->images);
        $images = [];
        $totalImages = 0;

        foreach ($input['images'] as $fileKey => $file)
        {
            if($file && file_exists(public_path($file)))
            {
                $extension = preg_replace('/^.*\./', '', $file);
                
                //not using an old image
                if (substr($file, 0, 12) != 'images/users')
                {
                    $fileName = str_replace('/temp/', '/users/', $file);
                    \File::copy(public_path($file), public_path($fileName));
                }
                else
                {
                    $fileName = $file;
                }

                if ($request->has('cover') && $request->cover == $file)
                {
                    $cover = $fileName;
                }
                else
                {
                    $images[] = $fileName;
                }

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

        if ($cover === null)
        {
            $cover = $images[0];
        }
        else
        {
            array_unshift($images, $cover);
        }

        $input['images'] = $images;
        $input['cover'] = $cover;

        if ($user->update($input))
        {
            return [
                'status' => 'success',
                'message' => 'Success! About information updated successfully.',
            ];
        }

        return [
            'status' => 'error',
            'message' => 'There was some error while updating information, please try again.',
        ];
    }

    private function update_profile_contact_intended_parent(Request $request, User $user)
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

        if ($user->update($input))
        {
            return [
                'status' => 'success',
                'message' => 'Success! Contact information updated successfully.',
            ];
        }

        return [
            'status' => 'error',
            'message' => 'There was some error while updating information, please try again.',
        ];
    }

    private function update_profile_contact_agency(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'contact_email' => 'nullable|email|max:191',
            'phone_number' => 'nullable|string|max:191',
            'website' => 'nullable|url|max:191',
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

        if ($user->update($input))
        {
            return [
                'status' => 'success',
                'message' => 'Success! Contact information updated successfully.',
            ];
        }

        return [
            'status' => 'error',
            'message' => 'There was some error while updating information, please try again.',
        ];
    }

    public function delete_user(Request $request, User $user)
    {
        if ($request->user()->user_type != 'Admin')
        {
            return [
                'status' => 'error',
                'message' => 'Unauthorized.',
            ];
        }

        if ($user->delete())
        {
            if ($user->user_type == 'Agency')
            {
                User::where('agency_id', $user->id)->delete();
            }

            $user->update(['email' => 'd-'.$user->email.'-'.substr(md5(time().mt_rand(0, 1000)), 0, 8)]);

            $user->tokens()->delete();
            
            return [
                'status' => 'success',
                'message' => 'Success! User deleted successfully.',
            ];
        }

        return [
            'status' => 'error',
            'message' => 'There was some error while deleting user, please try again.',
        ];
    }
}
