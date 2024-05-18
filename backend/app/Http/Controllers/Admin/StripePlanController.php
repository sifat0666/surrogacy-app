<?php

namespace App\Http\Controllers\Admin;

use Carbon\Carbon;
use Validator;
use Hash;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\StripePlan;

class StripePlanController extends Controller
{
    public function show(Request $request)
    {
        if ($request->user()->user_type != 'Admin')
        {
            return [
                'status' => 'error',
                'message' => 'Unauthorized.',
            ];
        }

        $stripePlan = StripePlan::first();

        return [
            'status' => 'success',
            'data' => $stripePlan,
        ];
    }

    public function update(Request $request)
    {
        if ($request->user()->user_type != 'Admin')
        {
            return [
                'status' => 'error',
                'message' => 'Unauthorized.',
            ];
        }

        $validator = Validator::make($request->all(), [
            'ip_monthly_id' => 'required|string',
            'ip_monthly_price' => 'required|string',
            'ip_quarterly_id' => 'required|string',
            'ip_quarterly_price' => 'required|string',
            'ip_yearly_id' => 'required|string',
            'ip_yearly_price' => 'required|string',
            'ag_monthly_id' => 'required|string',
            'ag_monthly_price' => 'required|string',
            'ag_quarterly_id' => 'required|string',
            'ag_quarterly_price' => 'required|string',
            'ag_yearly_id' => 'required|string',
            'ag_yearly_price' => 'required|string',
        ]);

        if ($validator->fails())
        {
            return [
                'status' => 'validation_error',
                'messages' => $validator->errors()->all(),
            ];
        }

        $input = $request->all();

        if (StripePlan::first()->update($input))
        {
            return [
                'status' => 'success',
                'message' => 'Success! Plans updated successfully.',
            ];
        }

        return [
            'status' => 'error',
            'message' => 'There was some error while updating plans, please try again.',
        ];
    }
}
