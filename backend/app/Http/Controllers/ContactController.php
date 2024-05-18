<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function contact(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstName' => 'required|string',
            'lastName' => 'required|string',
            'message' => 'required|string|max:191',
            'acceptTerms' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'validation_error',
                'messages' => $validator->errors()->all(),
            ], 422);
        }

        $input = $validator->validated();

        $contact = Contact::create($input);

        if ($contact) {
            return response()->json([
                'status' => 'success',
                'message' => 'Success! Contact added successfully.',
                'contact' => $contact, // Optionally, you can return the created contact.
            ], 201);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'There was some error while adding contact, please try again.',
        ], 500);
    }
}
