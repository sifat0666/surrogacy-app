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
use Illuminate\Support\Carbon;
use MrShan0\PHPFirestore\FirestoreClient;
use Stripe\Stripe;
use Stripe\Customer;

class AuthController extends Controller
{
    public function self(Request $request)
    {
        return [
            'status' => 'success',
            'user' => new UserResource($request->user()),
        ];
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:191',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return [
                'status' => 'validation_error',
                'messages' => $validator->errors()->all(),
            ];
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return [
                'status' => 'error',
                'message' => 'Invalid login credentials',
            ];
        }

        $user->update(['last_login' => date('Y-m-d H:i:s')]);

        $token = $user->createToken('Token Name');

        // services_provided decode to an array. current format is "[\"Counseling & Support\",\"Case Management\",\"Billing Management\"]",
        $services_provided = json_decode($user->services_provided, true);

        return [
            'status' => 'success',
            'message' => 'Success! Logged in successfully.',
            'user' => $user,
            'access_token' => $token->plainTextToken,
            'isAuthenticated' => true,
        ];
    }

    public function login_admin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:191',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return [
                'status' => 'validation_error',
                'messages' => $validator->errors()->all(),
            ];
        }

        $user = User::where('user_type', 'Admin')->where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return [
                'status' => 'error',
                'message' => 'Invalid login credentials',
            ];
        }

        $token = $user->createToken('Token Name');

        return [
            'status' => 'success',
            'message' => 'Success! Logged in successfully.',
            'user' => new UserResource($user),
            'access_token' => $token->plainTextToken,
            'isAuthenticated' => true,
        ];
    }

    public function social_login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_type' => 'required|string|in:Intended Parent,Surrogate,Agency',
            'provider' => 'required|string|in:facebook,google',
            'provider_id' => 'required|string',
            'name' => 'required|string|max:191',
            'email' => 'nullable|string|max:191',
        ]);

        if ($validator->fails()) {
            return [
                'status' => 'validation_error',
                'messages' => $validator->errors()->all(),
            ];
        }

        $user = User::where('provider', $request->provider)->where('provider_id', $request->provider_id)->first();

        $newRegister = false;

        if (!$user) {
            $newRegister = true;

            $input = $request->only([
                'user_type',
                'provider',
                'provider_id',
                'name',
            ]);

            $input['email'] = $request->email ?? md5(mt_rand(10, 999) . time()) . '@' . $request->provider . '.com';
            $input['email_verified_at'] = date('Y-m-d H:i:s');
            $input['last_login'] = date('Y-m-d H:i:s');

            if ($user = User::create($input)) {
                $user->createAsStripeCustomer();

                if ($request->email && strlen($user->email) >= 15) {
                    try {
                        \Mail::to($user)->send(new \App\Mail\UserRegistered($user));
                    } catch (\Exception $e) {
                    }
                }

                try {
                    \Mail::to(User::find(1))->send(new \App\Mail\AdminMemberRegistered($user));
                } catch (\Exception $e) {
                }
            } else {
                return [
                    'status' => 'error',
                    'message' => 'There was some error while registering you, please try again.',
                ];
            }
        }

        $token = $user->createToken('Token Name');

        return [
            'status' => 'success',
            'message' => 'Success! Logged in successfully.',
            'user' => new UserResourceLogin($user),
            'access_token' => $token->plainTextToken,
            'new_register' => $newRegister,
        ];
    }

    // register Intended Parents
    public function registerIntendedParent(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_type' => 'required|string|in:Intended Parent',
            'name' => 'required|string|max:191',
            'email' => 'required|email|max:191|unique:users',
            'password' => 'required|string|confirmed',
            'country' => 'required|string|max:191',
            'state' => 'required|string|max:191',
            'surrogacy_type' => 'required|string|in:Gestational Surrogacy,Traditional Surrogacy,Gestational and Traditional Surrogacy',
            'surrogate_location' => 'nullable|string|in:The US,Canada',
            'is_first_surrogacy_journey' => 'required|boolean',
            'is_working_with_agency' => 'required|boolean',
            'have_frozen_embryos' => 'nullable|boolean',
            'type_of_journey' => 'nullable|string|in:First Child,Sibling',
            'relationship_status' => 'nullable|string|in:Single,Married,In a relationship',
            'have_children' => 'nullable|boolean',
            'is_willing_to_travel' => 'nullable|boolean',
            'images' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'validation_error',
                'messages' => $validator->errors()->all(),
            ], 422);
        }

        $input = $request->only([
            'name',
            'email',
            'country',
            'state',
            'surrogacy_type',
            'surrogate_location',
            'is_first_surrogacy_journey',
            'is_working_with_agency',
            'have_frozen_embryos',
            'type_of_journey',
            'relationship_status',
            'have_children',
            'is_willing_to_travel',
            'images',
            'user_type'
        ]);

        $input['password'] = Hash::make($request->password);
        $input['last_login'] = now();

        $user = User::create($input);

        if ($user) {
            $user->createAsStripeCustomer();

            if (strlen($user->email) >= 15) {
                try {
                    \Mail::to($user)->send(new \App\Mail\UserRegistered($user));
                } catch (\Exception $e) {
                }
            }

            try {
                \Mail::to(User::find(1))->send(new \App\Mail\AdminMemberRegistered($user));
            } catch (\Exception $e) {
            }

            $token = $user->createToken('Token Name')->plainTextToken;

            return response()->json([
                'status' => 'success',
                'message' => 'Success! Logged in successfully.',
                'user' => new UserResourceLogin($user),
                'access_token' => $token,
            ], 201);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'There was some error while registering, please try again.',
        ], 500);
    }

    // register Surrogate
    public function registerSurrogate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_type' => 'required|string|in:Surrogate',
            'name' => 'required|string|max:191',
            'email' => 'required|email|max:191|unique:users',
            'password' => 'required|string|confirmed',
            'country' => 'required|string|max:191',
            'state' => 'required|string|max:191',
            'surrogacy_type' => 'required|string|in:Gestational Surrogacy,Traditional Surrogacy,Gestational and Traditional Surrogacy',
            'is_first_surrogacy_journey' => 'required|boolean',
            'is_working_with_agency' => 'required|boolean',
            'willing_to_help_types' => 'nullable|string|in:Open to All Intended Parents,Heterosexual Couple,Gay Couple,Lesbian Couple,Single Man,Single Woman',
            'type_of_journey' => 'nullable|string',
            'intended_parent_location' => 'nullable|string|in:The US,Canada,Worldwide',
            'when_to_start_journey' => 'nullable|string|in:Ready to start,This year,Next year,Unknown',
            'relationship_status' => 'nullable|string|in:Single,Married,In a relationship',
            'date_of_birth' => 'nullable|date||before_or_equal:-18 years',
            'have_children' => 'nullable|boolean',
            'height' => 'nullable|string',
            'weight' => 'nullable|string',
            'is_smoke_or_tobacco' => 'nullable|boolean',
            'is_willing_to_travel' => 'nullable|boolean',
            'images' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'validation_error',
                'messages' => $validator->errors()->all(),
            ], 422);
        }

        $input = $request->only([
            'name',
            'email',
            'country',
            'state',
            'surrogacy_type',
            'is_first_surrogacy_journey',
            'is_working_with_agency',
            'willing_to_help_types',
            'type_of_journey',
            'intended_parent_location',
            'when_to_start_journey',
            'relationship_status',
            'date_of_birth',
            'have_children',
            'height',
            'weight',
            'is_smoke_or_tobacco',
            'is_willing_to_travel',
            'images',
            'user_type'
        ]);

        $input['password'] = Hash::make($request->password);
        $input['last_login'] = now();

        $user = User::create($input);

        if ($user) {
            $user->createAsStripeCustomer();

            if (strlen($user->email) >= 15) {
                try {
                    \Mail::to($user)->send(new \App\Mail\UserRegistered($user));
                } catch (\Exception $e) {
                }
            }

            try {
                \Mail::to(User::find(1))->send(new \App\Mail\AdminMemberRegistered($user));
            } catch (\Exception $e) {
            }

            $token = $user->createToken('Token Name')->plainTextToken;

            return response()->json([
                'status' => 'success',
                'message' => 'Success! Logged in successfully.',
                'user' => new UserResourceLogin($user),
                'access_token' => $token,
            ], 201);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'There was some error while registering, please try again.',
        ], 500);
    }

    // register Agency
    public function registerAgency(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_type' => 'required|string|in:Agency',
            'name' => 'required|string|max:191',
            'email' => 'required|email|max:191|unique:users',
            'password' => 'required|string|confirmed',
            'country' => 'required|string|max:191',
            'state' => 'required|string|max:191',
            'assisted_groups' => 'nullable|string',
            'surrogate_matching_time' => 'nullable|string',
            'membership_affilations' => 'nullable|string',
            'journey_length' => 'nullable|string',
            'images' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'validation_error',
                'messages' => $validator->errors()->all(),
            ], 422);
        }

        $input = $request->only([
            'name',
            'email',
            'country',
            'state',
            'assisted_groups',
            'surrogate_matching_time',
            'membership_affilations',
            'services_provided',
            'journey_length',
            'images',
            'user_type'
        ]);

        $input['password'] = Hash::make($request->password);
        $input['last_login'] = now();

        $user = User::create($input);

        if ($user) {
            $user->createAsStripeCustomer();

            if (strlen($user->email) >= 15) {
                try {
                    \Mail::to($user)->send(new \App\Mail\UserRegistered($user));
                } catch (\Exception $e) {
                }
            }

            try {
                \Mail::to(User::find(1))->send(new \App\Mail\AdminMemberRegistered($user));
            } catch (\Exception $e) {
            }

            $token = $user->createToken('Token Name')->plainTextToken;
            

            return response()->json([
                'status' => 'success',
                'message' => 'Success! Agency Register in successfully.',
                'user' => $user,
                'access_token' => $token,
            ], 201);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'There was some error while registering, please try again.',
        ], 500);
    }


    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_type' => 'required|string|in:Intended Parent,Surrogate,Agency',
            'name' => 'required|string|max:191',
            'email' => 'required|email|max:191|unique:users',
            'password' => 'required|string|confirmed',
            'country' => 'required|string|max:191',
            'state' => 'required|string|max:191',
            'terms_and_conditions' => 'accepted',
        ]);

        if ($validator->fails()) {
            return [
                'status' => 'validation_error',
                'messages' => $validator->errors()->all(),
            ];
        }

        $input = $request->only([
            'user_type',
            'name',
            'email',
            'country',
            'state',
        ]);

        $input['password'] = Hash::make($request->password);
        $input['last_login'] = date('Y-m-d H:i:s');

        if ($user = User::create($input)) {
            $user->createAsStripeCustomer();

            if (strlen($user->email) >= 15) {
                try {
                    \Mail::to($user)->send(new \App\Mail\UserRegistered($user));
                } catch (\Exception $e) {
                }
            }

            try {
                \Mail::to(User::find(1))->send(new \App\Mail\AdminMemberRegistered($user));
            } catch (\Exception $e) {
            }

            $token = $user->createToken('Token Name');

            return [
                'status' => 'success',
                'message' => 'Success! Logged in successfully.',
                'user' => new UserResourceLogin($user),
                'access_token' => $token->plainTextToken,
            ];
        }

        return [
            'status' => 'error',
            'message' => 'There was some error while registering, please try again.',
        ];
    }

    public function logout(Request $request)
    {
        if ($request->user()->currentAccessToken()->delete()) {
            return [
                'status' => 'success',
                'message' => 'Success! Logged out successfully.',
            ];
        }

        return [
            'status' => 'error',
            'message' => 'There was some error while logging you out, please try again.',
        ];
    }

    public function change_password(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'current_password' => 'required|string|current_password',
            'password' => 'required|string|confirmed',
        ], [
            'current_password.current_password' => 'Current password is incorrect.'
        ]);

        if ($validator->fails()) {
            return [
                'status' => 'validation_error',
                'messages' => $validator->errors()->all(),
            ];
        }

        if ($request->user()->update(['password' => Hash::make($request->password)])) {
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
}
