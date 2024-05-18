<?php

namespace App\Http\Controllers\Admin;

use Validator;
use Hash;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\Admin\IntendedParentResource;
use App\Http\Resources\Admin\SurrogateResource;
use App\Http\Resources\Admin\AgencyResource;
use Illuminate\Support\Carbon;
use Laravel\Cashier\Subscription;

class GeneralController extends Controller
{
    public function dashboard(Request $request)
    {
        if ($request->user()->user_type != 'Admin')
        {
            return [
                'status' => 'error',
                'message' => 'Unauthorized.',
            ];
        }

        $totalUsers = User::where('user_type', '!=', 'admin')->count();
        $paidUsers = Subscription::query()->active()->count();
        $totalSurrogates = User::where('user_type', 'Surrogate')->count();
        $totalIntendedParents = User::where('user_type', 'Intended Parent')->count();
        $totalAgencies = User::where('user_type', 'Agency')->count();
        $day30Surrogates = User::where('user_type', 'Surrogate')->where('created_at', '>=', date('Y-m-d H:i:s', strtotime('-30 days')))->count();
        $day30IntendedParents = User::where('user_type', 'Intended Parent')->where('created_at', '>=', date('Y-m-d H:i:s', strtotime('-30 days')))->count();
        $day30Agencies = User::where('user_type', 'Agency')->where('created_at', '>=', date('Y-m-d H:i:s', strtotime('-30 days')))->count();
        $usersIntendedParent = User::where('user_type', 'Intended Parent')->latest()->limit(8)->get();
        $usersIntendedParent = IntendedParentResource::collection($usersIntendedParent);

        $usersSurrogate = User::where('user_type', 'Surrogate')->latest()->limit(8)->get();
        $usersSurrogate = SurrogateResource::collection($usersSurrogate);

        $usersAgency = User::where('user_type', 'Agency')->latest()->limit(8)->get();
        $usersAgency = AgencyResource::collection($usersAgency);
        
        return [
            'status' => 'success',
            'totalUsers' => $totalUsers,
            'paidUsers' => $paidUsers,
            'totalSurrogates' => $totalSurrogates,
            'totalIntendedParents' => $totalIntendedParents,
            'totalAgencies' => $totalAgencies,
            'day30Surrogates' => $day30Surrogates,
            'day30IntendedParents' => $day30IntendedParents,
            'day30Agencies' => $day30Agencies,
            'latestIntendedParents' => $usersIntendedParent,
            'latestSurrogates' => $usersSurrogate,
            'latestAgencies' => $usersAgency,
        ];
    }
}