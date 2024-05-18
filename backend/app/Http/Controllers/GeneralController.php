<?php

namespace App\Http\Controllers;

use Validator;
use Hash;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Country;
use App\Models\User;
use App\Http\Resources\CountryResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserResourceLogin;
use App\Http\Resources\IntendedParentResource;
use App\Http\Resources\SurrogateResource;
use App\Http\Resources\AgencyResource;
use App\Models\BlockedUser;
use App\Models\Favorite;
use Illuminate\Support\Carbon;
use Stripe\Subscription as StripeSubscription;

class GeneralController extends Controller
{
    public function home(Request $request)
    {

        $current_user = $request->user();
        if ($current_user)
        {
            $blockedUsers = BlockedUser::where('user_id', $current_user->id)->pluck('blocked_user_id')->toArray();
        }else{
            $blockedUsers = [];
        }


        $usersIntendedParent = User::where('user_type', 'Intended Parent')
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
        ->whereNotIn('users.id', $blockedUsers)
        ->orderByRaw('subscriptions.created_at desc, created_at DESC')
        ->groupBy('users.id')
        ->select('users.*')
        ->get();
        $usersIntendedParent = IntendedParentResource::collection($usersIntendedParent);

        $usersSurrogate = User::where('user_type', 'Surrogate')
                ->whereNotIn('users.id', $blockedUsers)
                ->orderByRaw('is_surrogate_verified desc, created_at DESC')->get();
        $usersSurrogate = SurrogateResource::collection($usersSurrogate);

        $usersAgency = User::where('user_type', 'Agency')
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
        ->whereNotIn('users.id', $blockedUsers)
        ->orderByRaw('subscriptions.created_at desc, created_at DESC')
        ->groupBy('users.id')
        ->select('users.*')
        ->get();

        return [
            'status' => 'success',
            'intended_parents' => $usersIntendedParent,
            'surrogates' => $usersSurrogate,
            'agencies' => $usersAgency,
            'current' => $current_user,
            'request' => $request->all(),
        ];
    }

    public function country_states(Request $request)
    {
        return [
            'status' => 'success',
            'countries' => CountryResource::collection(Country::orderBy('name')->get()),
        ];
    }

    public function country_states_limit(Request $request)
    {
        return [
            'status' => 'success',
            'countries' => CountryResource::collection(Country::whereIn('code', ['CA', 'US'])->orderBy('name')->get()),
        ];
    }

    public function upload_file(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'images' => 'required|array',
            'images.*' => 'required|image|max:5120',
        ], [
            'images.*.image' => "The uploaded file must be an image.",
            'images.*.max' => "The image must not be greater than 5 MB."
        ]);

        if ($validator->fails())
        {
            return [
                'status' => 'validation_error',
                'messages' => $validator->errors()->all(),
            ];
        }

        $images = [];

        foreach($request->images as $image)
        {
            $originalName = $image->getClientOriginalName();
            $image = $image->store('/images/temp', 'public');

            $images[] = [
                'name' => $image,
                'full_path' => asset($image),
                'original_name' => $originalName,
            ];
        }

        return [
            'status' => 'success',
            'images' => $images
        ];
    }

    public function sendContactEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:191',
            'name' => 'required|string',
            'subject' => 'required|string',
            'message' => 'required|string',
        ]);

        if ($validator->fails())
        {
            return [
                'status' => 'validation_error',
                'messages' => $validator->errors()->all(),
            ];
        }

        try {
            \Mail::to(User::find(1))->send(new \App\Mail\AdminContact($request));
        } catch(\Exception $e) {}

        return [
            'status' => 'success',
            'message' => 'Email sent successfully!',
        ];
    }

    /*
    public function dashboard(Request $request)
    {
        $membersTotal = User::where('type', 'user')->count();
        $members11 = User::has('referees', 11)->count();
        $members12 = User::has('referees', 12)->count();
        $membersMore = User::has('referees', '>', 12)->count();

        $members = User::where('type', 'user')->orderBy('created_at', 'desc')->limit(10)->get();

        return [
            'status' => 'success',
            'membersTotal' => $membersTotal,
            'members11' => $members11,
            'members12' => $members12,
            'membersMore' => $membersMore,
        ];
    }
    */
}
