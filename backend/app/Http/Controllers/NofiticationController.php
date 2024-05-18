<?php

namespace App\Http\Controllers;

use Validator;
use Hash;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notification;
use App\Http\Resources\NotificationResource;
use Illuminate\Support\Carbon;

class NofiticationController extends Controller
{
    public function count(Request $request)
    {
        $count = Notification::where('user_id', $request->user()->id)->where('is_seen', false)->count();

        return [
            'status' => 'success',
            'count' => $count,
        ];
    }

    public function index(Request $request)
    {
        $notifications = Notification::where('user_id', $request->user()->id)->where('is_seen', false)->latest()->get();

        $notifications = NotificationResource::collection($notifications);

        return [
            'status' => 'success',
            'notifications' => $notifications,
        ];
    }

    public function destroy(Request $request, Notification $notification)
    {
        if ($notification->user_id != $request->user()->id)
        {
            return [
                'status' => 'error',
                'message' => 'Unauthorized.',
            ];
        }

        if ($notification->delete())
        {
            return [
                'status' => 'success',
                'message' => 'Success! Notification deleted successfully.',
            ];
        }

        return [
            'status' => 'error',
            'message' => 'There was some error while deleting notification, please try again.',
        ];
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'description' => 'required|string',
            'user_id' => 'required|exists:users,id',
            'target_user_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails())
        {
            return [
                'status' => 'error',
                'message' => $validator->errors()->first(),
            ];
        }

        $notification = new Notification;
        $notification->title = $request->title;
        $notification->description = $request->description;
        $notification->user_id = $request->user_id;
        $notification->target_user_id = $request->target_user_id;
        $notification->is_seen = false;

        if ($notification->save())
        {
            return [
                'status' => 'success',
                'message' => 'Success! Notification created successfully.',
            ];
        }

        return [
            'status' => 'error',
            'message' => 'There was some error while creating notification, please try again.',
        ];
    }

    // mark_read
    public function mark_read(Request $request)
    {
        $notifications = Notification::where('user_id', $request->user()->id)->update(['is_seen' => true]);

        // fetch all notifications which are not seen
        $notifications = Notification::where('user_id', $request->user()->id)->where('is_seen', false)->get();

        return [
            'status' => 'success',
            'notifications' => $notifications,
        ];
    }
}
