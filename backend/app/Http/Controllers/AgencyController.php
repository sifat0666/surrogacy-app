<?php

namespace App\Http\Controllers;

use Validator;
use Hash;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\UserResource;
use App\Http\Resources\AgencyUserResource;
use App\Http\Resources\IntendedParentResource;
use App\Http\Resources\SurrogateResource;
use Illuminate\Support\Carbon;
use MrShan0\PHPFirestore\FirestoreClient;
use Stripe\Stripe;
use Stripe\Customer;

class AgencyController extends Controller
{
    public function user_index(Request $request)
    {
        $users = User::where('agency_id', $request->user()->id)->latest()->get();

        return [
            'status' => 'success',
            'users' => $users,
        ];
    }

    public function self(Request $request, User $user)
    {
        if ($request->user()->user_type != 'Agency') {
            return [
                'status' => 'error',
                'message' => 'Unauthorized.',
            ];
        }

        if ($user->agency_id != $request->user()->id) {
            return [
                'status' => 'error',
                'message' => 'Unauthorized.',
            ];
        }

        return [
            'status' => 'success',
            'user' => new UserResource($user),
        ];
    }

    public function register(Request $request)
    {
        if ($request->user()->user_type != 'Agency') {
            return [
                'status' => 'error',
                'message' => 'Unauthorized.',
            ];
        }

        $input = $request->all();

        $input['agency_id'] = $request->user()->id;
        $input['email'] = md5(mt_rand(10, 999) . time()) . '@agency.com';
        //$input['password'] = Hash::make($request->password);
        $input['last_login'] = date('Y-m-d H:i:s');

        if ($user = User::create($input)) {
            $user->createAsStripeCustomer();

            try {
                \Mail::to(User::find(1))->send(new \App\Mail\AdminAgencyAdded($user));
            } catch (\Exception $e) {
            }
            return [
                'status' => 'success',
                'message' => 'Success! Profile added successfully.',
                'user' => $user,
            ];
        }

        return [
            'status' => 'error',
            'message' => 'There was some error while registering, please try again.',
        ];
    }

    public function update(Request $request, $userId)
    {
        // images: image_url,
        // name: values?.name,
        // user_type: values?.user_type,
        // country: values?.country,
        // state: values?.state,
        // relationship_status: values?.relationshipStatus,
        // date_of_birth: values?.dateBirth,
        // have_children: values?.children,
        // height: values?.height,
        // weight: values?.weight,
        // is_smoke_or_tobacco: values?.tobacco,
        // is_willing_to_travel: values?.willingTravel,
        // surrogacy_type: values?.typeSurrogacy,
        // is_first_surrogacy_journey: values?.firstSurrogacyJourney,
        // is_working_with_agency: values?.workingAgency,
        // type_of_journey: values?.typeJourney,
        // willing_to_help_types: values?.willingHelp,
        // intended_parent_location: values?.intendedParentsLocation,
        // when_to_start_journey: values?.startJourney,
        // surrogate_location: values?.surrogate_location,
        // have_frozen_embryos: values?.frozenEmbroys,
        // terms_and_conditions: values?.terms_and_conditions,
        $user = User::find($userId);

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found.',
            ], 404);
        }

        if ($request->user()->user_type !== 'Agency' || $request->user()->id !== $user->agency_id) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized to update this user.',
            ], 403);
        }

        $user->update($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Profile updated successfully.',
            'user' => $user,
        ], 200);
    }

    public function change_password(Request $request, User $user)
    {
        if ($request->user()->user_type != 'Agency') {
            return [
                'status' => 'error',
                'message' => 'Unauthorized.',
            ];
        }

        if ($user->agency_id != $request->user()->id) {
            return [
                'status' => 'error',
                'message' => 'Unauthorized.',
            ];
        }

        $validator = Validator::make($request->all(), [
            'password' => 'required|string|confirmed',
        ]);

        if ($validator->fails()) {
            return [
                'status' => 'validation_error',
                'messages' => $validator->errors()->all(),
            ];
        }

        if ($user->update(['password' => Hash::make($request->password)])) {
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
        if ($request->user()->user_type != 'Agency') {
            return [
                'status' => 'error',
                'message' => 'Unauthorized.',
            ];
        }

        if ($user->agency_id != $request->user()->id) {
            return [
                'status' => 'error',
                'message' => 'Unauthorized.',
            ];
        }

        if ($user->user_type == 'Intended Parent') {
            return $this->update_profile_surrogacy_intended_parent($request, $user);
        } else if ($user->user_type == 'Surrogate') {
            return $this->update_profile_surrogacy_surrogate($request, $user);
        }
    }

    public function update_profile_about(Request $request, User $user)
    {
        if ($request->user()->user_type != 'Agency') {
            return [
                'status' => 'error',
                'message' => 'Unauthorized.',
            ];
        }

        if ($user->agency_id != $request->user()->id) {
            return [
                'status' => 'error',
                'message' => 'Unauthorized.',
            ];
        }

        if ($user->user_type == 'Intended Parent') {
            return $this->update_profile_about_intended_parent($request, $user);
        } else if ($user->user_type == 'Surrogate') {
            return $this->update_profile_about_surrogate($request, $user);
        }
    }

    public function update_profile_contact(Request $request, User $user)
    {
        if ($request->user()->user_type != 'Agency') {
            return [
                'status' => 'error',
                'message' => 'Unauthorized.',
            ];
        }

        if ($user->agency_id != $request->user()->id) {
            return [
                'status' => 'error',
                'message' => 'Unauthorized.',
            ];
        }

        if ($user->user_type == 'Intended Parent') {
            return $this->update_profile_contact_intended_parent($request, $user);
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

        if ($validator->fails()) {
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

        if ($user->update($input)) {
            try {
                \Mail::to(User::find(1))->send(new \App\Mail\AdminAgencyEdited($user));
            } catch (\Exception $e) {
            }

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

        if ($validator->fails()) {
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

        if ($user->update($input)) {
            try {
                \Mail::to(User::find(1))->send(new \App\Mail\AdminAgencyEdited($user));
            } catch (\Exception $e) {
            }

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

        if ($validator->fails()) {
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

        foreach ($input['images'] as $fileKey => $file) {
            if ($file && file_exists(public_path($file))) {
                $extension = preg_replace('/^.*\./', '', $file);

                //not using an old image
                if (substr($file, 0, 12) != 'images/users') {
                    $fileName = str_replace('/temp/', '/users/', $file);
                    \File::copy(public_path($file), public_path($fileName));
                } else {
                    $fileName = $file;
                }

                if ($request->has('cover') && $request->cover == $file) {
                    $cover = $fileName;
                } else {
                    $images[] = $fileName;
                }

                $totalImages++;
            }
        }

        if ($totalImages == 0) {
            return [
                'status' => 'validation_error',
                'messages' => ['Images are required'],
            ];
        }

        if ($cover === null) {
            $cover = $images[0];
        } else {
            array_unshift($images, $cover);
        }

        $input['images'] = json_encode($images);
        $input['cover'] = $cover;

        if ($user->update($input)) {
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

            try {
                \Mail::to(User::find(1))->send(new \App\Mail\AdminAgencyEdited($user));
            } catch (\Exception $e) {
            }

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

        if ($validator->fails()) {
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

        foreach ($input['images'] as $fileKey => $file) {
            if ($file && file_exists(public_path($file))) {
                $extension = preg_replace('/^.*\./', '', $file);

                //not using an old image
                if (substr($file, 0, 12) != 'images/users') {
                    $fileName = str_replace('/temp/', '/users/', $file);
                    \File::copy(public_path($file), public_path($fileName));
                } else {
                    $fileName = $file;
                }

                if ($request->has('cover') && $request->cover == $file) {
                    $cover = $fileName;
                } else {
                    $images[] = $fileName;
                }

                $totalImages++;
            }
        }

        if ($totalImages == 0) {
            return [
                'status' => 'validation_error',
                'messages' => ['Images are required'],
            ];
        }

        if ($cover === null) {
            $cover = $images[0];
        } else {
            array_unshift($images, $cover);
        }

        $input['images'] = json_encode($images);
        $input['cover'] = $cover;

        if ($user->update($input)) {
            try {
                \Mail::to(User::find(1))->send(new \App\Mail\AdminAgencyEdited($user));
            } catch (\Exception $e) {
            }

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

        if ($validator->fails()) {
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

        if ($user->update($input)) {
            try {
                \Mail::to(User::find(1))->send(new \App\Mail\AdminAgencyEdited($user));
            } catch (\Exception $e) {
            }

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
        if ($request->user()->user_type != 'Agency') {
            return [
                'status' => 'error',
                'message' => 'Unauthorized.',
            ];
        }

        if ($user->agency_id != $request->user()->id) {
            return [
                'status' => 'error',
                'message' => 'User not found',
            ];
        }

        if ($user->delete()) {
            $user->update(['email' => 'd-' . $user->email . '-' . substr(md5(time() . mt_rand(0, 1000)), 0, 8)]);

            $user->tokens()->delete();

            try {
                \Mail::to(User::find(1))->send(new \App\Mail\AdminAgencyDeleted($user));
            } catch (\Exception $e) {
            }

            return [
                'status' => 'success',
                'message' => 'Success! User deleted successfully.',
                'user' => new UserResource($user),
            ];
        }

        return [
            'status' => 'error',
            'message' => 'There was some error while deleting user, please try again.',
        ];
    }
}
