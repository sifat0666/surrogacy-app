<?php

namespace App\Http\Controllers;

use Validator;
use Hash;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\PasswordReset;

class PasswordResetController extends Controller
{
    public function forgot(Request $request)
	{
	    PasswordReset::where('expiry_at', '<=', date('Y-m-d H:i:s'))->delete();
	    
	    $validator = Validator::make($request->all(), [
			'email' => 'required|string|email',
		]);

		if ($validator->fails())
		{
			return [
				'status' => 'validation_error',
				'messages' => $validator->errors()->all(),
			];
		}
		
		$user = User::where('email', $request->email)->first();
		if ($user)
		{
		    $tokenCharacters = 'ABCDEFGHKMNPQRSTWXYZ23456789';
		    $token = strtoupper(substr(str_shuffle($tokenCharacters.$tokenCharacters.$tokenCharacters), 0, 6));
    		
    		PasswordReset::create([
    			'email' => $user->email,
    	        'token' => $token,
    	        'expiry_at' => date('Y-m-d H:i:s', strtotime('+15 minutes')),
    	    ]);
    
    	    if (strlen($user->email) >= 15)
            {
                try {
                    \Mail::to($user)->send(new \App\Mail\ForgotPassword($user, $token));
                } catch(\Exception $e) {}
            }
		}
		
		return [
			'status' => 'success',
			'message' => 'If this email exists, we will send a code to reset your password.',
		];
    }
    
    public function reset(Request $request)
	{
	    PasswordReset::where('expiry_at', '<=', date('Y-m-d H:i:s'))->delete();
	    
	    $validator = Validator::make($request->all(), [
			'email' => 'required|string|email',
			'token' => 'required|string',
			'password' => 'required|string|confirmed',
		]);

		if ($validator->fails())
		{
			return [
				'status' => 'validation_error',
				'messages' => $validator->errors()->all(),
			];
		}
		
		$user = User::where('email', $request->email)->first();
		if ($user)
		{
    	    $validToken = PasswordReset::where('email', $user->email)->where('token', $request->token)->exists();
    		
    		if ($validToken)
    		{
        	    if ($user->update(['password' => Hash::make($request->password)]))
                {
                    PasswordReset::where('email', $user->email)->delete();
                    
                    return [
                        'status' => 'success',
                        'message' => 'Success! Password reset successfully.',
                    ];
                }
    		}
		}
		
		return [
            'status' => 'error',
            'message' => 'Email does not match with entered token.',
        ];
    }
}
