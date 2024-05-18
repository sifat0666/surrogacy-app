<?php

namespace App\Http\Controllers;

use Validator;
use Hash;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Chat;
use App\Http\Resources\ChatResource;
use App\Models\UserChat;
use Illuminate\Support\Carbon;
use MrShan0\PHPFirestore\FirestoreClient;

class ChatController extends Controller
{
    public function index(Request $request)
    {
        $chats = Chat::where('target_small_id', $request->user()->id)->orWhere('target_large_id', $request->user()->id)->get();

        return [
            'status' => 'success',
            'chats' => ChatResource::collection($chats),
        ];
    }

    public function show(Request $request, $id)
    {
        $chat = Chat::where('document_id', $id)->where(function ($query) use ($request) {
            return $query->where('target_small_id', $request->user()->id)->orWhere('target_large_id', $request->user()->id);
        })->first();

        $chats = Chat::where('target_small_id', $request->user()->id)->orWhere('target_large_id', $request->user()->id)->get();

        if (!$chat)
        {
            return [
                'status' => 'error',
                'message' => 'Chat not found.',
                'chats' => ChatResource::collection($chats),
            ];
        }

        $chat->is_reply_restricted = false;
        if ($request->user()->user_type == 'Surrogate' && !$request->user()->is_surrogate_verified)
        {
            $chat->is_reply_restricted = true;
        }

        if ($request->user()->user_type == 'Agency')
        {
            if (!$request->user()->subscribed('default'))
            {
                $chat->is_reply_restricted = true;
            }
        }

        if ($request->user()->user_type == 'Intended Parent')
        {
            if (!$request->user()->subscribed('default'))
            {
                if ($request->user()->id == $chat->target_small_id)
                {
                    if ($chat->large_user->user_type == 'Surrogate')
                    {
                        $chat->is_reply_restricted = true;
                    }
                }
                else if ($request->user()->id == $chat->target_large_id)
                {
                    if ($chat->small_user->user_type == 'Surrogate')
                    {
                        $chat->is_reply_restricted = true;
                    }
                }

            }
        }

        return [
            'status' => 'success',
            'chat' => new ChatResource($chat),
            'chats' => ChatResource::collection($chats),
        ];
    }

    public function store(Request $request, $user)
    {
        $chats = Chat::where('target_small_id', $request->user()->id)->orWhere('target_large_id', $request->user()->id)->get();

        $user = User::find($user);
        if (!$user)
        {
            return [
                'status' => 'error',
                'message' => 'User not valid.',
                'chats' => ChatResource::collection($chats),
            ];
        }

        if ($request->user()->id == $user->id)
        {
            return [
                'status' => 'error',
                'message' => 'You can not send message to yourself.',
                'chats' => ChatResource::collection($chats),
            ];
        }

        if ($request->user()->agency_id)
        {
            return [
                'status' => 'error',
                'message' => 'You can not send message, only your agency can send messages.',
                'chats' => ChatResource::collection($chats),
            ];
        }

        if ($request->user()->user_type == 'Admin')
        {
            return [
                'status' => 'error',
                'message' => 'You can not send message.',
                'chats' => ChatResource::collection($chats),
            ];
        }

        if ($request->user()->user_type == $user->user_type)
        {
            return [
                'status' => 'error',
                'message' => 'You can not send message to '.\Str::plural(strtolower($user->user_type)).'.',
                'chats' => ChatResource::collection($chats),
            ];
        }

        if ($request->user()->user_type == 'Agency' && $request->user()->id == $user->agency_id)
        {
            return [
                'status' => 'error',
                'message' => 'You can not send message to profiles you manage.',
                'chats' => ChatResource::collection($chats),
            ];
        }

        if ($request->user()->user_type != 'Agency' && $request->user()->agency_id == $user->id)
        {
            return [
                'status' => 'error',
                'message' => 'You can not send message to agency that manages you.',
                'chats' => ChatResource::collection($chats),
            ];
        }

        if ($request->user()->user_type != 'Agency' && $request->user()->agency_id && $request->user()->agency_id == $user->agency_id)
        {
            return [
                'status' => 'error',
                'message' => 'You can not send message to profiles that your agency manages.',
                'chats' => ChatResource::collection($chats),
            ];
        }

        $small_id = $request->user()->id < $user->id ? $request->user()->id : $user->id;
        $large_id = $request->user()->id > $user->id ? $request->user()->id : $user->id;

        $target_small_id = null;
        $target_large_id = null;
        if ($request->user()->id < $user->id)
        {
            $target_small_id = $request->user()->id;
            $target_large_id = $user->agency_id ? $user->agency_id : $user->id;
        }
        else
        {
            $target_large_id = $request->user()->id;
            $target_small_id = $user->agency_id ? $user->agency_id : $user->id;
        }

        $chat = Chat::where('small_id', $small_id)->where('large_id', $large_id)->first();

        /*
        yes- direct contact direct
        yes- direct contact agency
        no- agency contact direct
        no- agency contact agency
        */

        // $isCurrentUserAgency = $request->user()->user_type == 'Agency';
        // $isOtherUserAgencySupported = $user->agency_id ? true : false;
        // if (!$isCurrentUserAgency && !$isOtherUserAgencySupported)
        // {
        //     //direct contact direct
        //     if ($request->user()->id < $user->id)
        //         $chat = Chat::where('small_id', $request->user()->id)->where('large_id', $user->id)->first();
        //     else
        //         $chat = Chat::where('large_id', $request->user()->id)->where('small_id', $user->id)->first();
        // }
        // else if (!$isCurrentUserAgency && $isOtherUserAgencySupported)
        // {
        //     //direct contact agency
        //     if ($request->user()->id < $user->id)
        //         $chat = Chat::where('small_id', $request->user()->id)->where('large_agency_id', $user->id)->first();
        //     else
        //         $chat = Chat::where('large_id', $request->user()->id)->where('small_agency_id', $user->id)->first();
        // }
        // else if ($isCurrentUserAgency && !$isOtherUserAgencySupported)
        // {
        //     //agency contact direct
        //     if ($request->user()->id < $user->id)
        //         $chat = Chat::where('small_agency_id', $request->user()->id)->where('large_id', $user->id)->first();
        //     else
        //         $chat = Chat::where('large_agency_id', $request->user()->id)->where('small_id', $user->id)->first();
        // }
        // else
        // {
        //     //agency contact agency
        //     if ($request->user()->id < $user->id)
        //         $chat = Chat::where('small_agency_id', $request->user()->id)->where('large_agency_id', $user->id)->first();
        //     else
        //         $chat = Chat::where('large_agency_id', $request->user()->id)->where('small_agency_id', $user->id)->first();
        // }

        if (!$chat)
        {
            if ($request->user()->user_type == 'Surrogate' && !$request->user()->is_surrogate_verified)
            {
                return [
                    'status' => 'error',
                    'message' => 'You are not allowed to start a chat, get verified to start a chat.',
                     'surrogate_verified_button' => true,
                    'chats' => ChatResource::collection($chats),
                ];
            }

            if ($request->user()->user_type == 'Agency')
            {
                if (!$request->user()->subscribed('default'))
                {
                    return [
                        'status' => 'error',
                        'message' => 'To be able to contact this member, you need to upgrade your account to a premium membership.',
                        'membership_button' => true,
                        'chats' => ChatResource::collection($chats),
                    ];
                }
            }

            if ($request->user()->user_type == 'Intended Parent')
            {
                if (!$request->user()->subscribed('default'))
                {
                    if ($user->user_type == 'Surrogate')
                    {
                        return [
                            'status' => 'error',
                            'message' => 'To be able to contact this member, you need to upgrade your account to a premium membership.',
                            'membership_button' => true,
                            'chats' => ChatResource::collection($chats),
                        ];
                    }
                }
            }

            $documentId = md5(time().mt_rand(0, 1000));

            if (!$chat = Chat::create([
                'document_id' => $documentId,
                'small_id' => $small_id,
                'large_id' => $large_id,
                'target_small_id' => $target_small_id,
                'target_large_id' => $target_large_id,
                'small_seen_id' => str_pad($target_small_id, 10, '0', STR_PAD_LEFT),
                'large_seen_id' => str_pad($target_large_id, 10, '0', STR_PAD_LEFT),
            ]))
            {
                return [
                    'status' => 'error',
                    'message' => 'Error creating chat, please try again.',
                    'chats' => ChatResource::collection($chats),
                ];
            }

            $chat->is_new = true;
        }

        return [
            'status' => 'success',
            'is_new' => $chat->id ? false : true,
            'chat' => new ChatResource($chat),
            'chats' => ChatResource::collection($chats),
        ];
    }

    public function send_message(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'target_user' => 'required|integer',
            'message' => 'required|string',
        ]);

        if ($validator->fails())
        {
            return [
                'status' => 'validation_error',
                'messages' => $validator->errors()->all(),
            ];
        }

        $user = User::find($request->target_user);
        if ($user)
        {
            if (strlen($user->email) >= 10)
            {
                try {
                    \Mail::to($user)->send(new \App\Mail\UserNewMessage($user, $request->user(), $request->message));
                } catch(\Exception $e) { }
            }
        }
    }


    public function createFriend(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user)
        {
            return [
                'status' => 'error',
                'message' => 'User not found.',
            ];
        }

        if ($request->user()->id == $user->id)
        {
            return [
                'status' => 'error',
                'message' => 'You can not add yourself as friend.',
            ];
        }

        $friend = UserChat::where('user_id', $request->user()->id)->where('friend_id', $user->id)->first();
        if ($friend)
        {
            return [
                'status' => 'error',
                'message' => 'User already in your friend list.',
            ];
        }

        $friend = new UserChat();
        $friend->user_id = $request->user()->id;
        $friend->friend_id = $user->id;
        $friend->save();


        return [
            'status' => 'success',
            'message' => 'User added to your friend list.',
        ];

    }

    public function getFriends(Request $request)
    {
        $friends = UserChat::where('user_id', $request->user()->id)->get();

        return [
            'status' => 'success',
            'friends' => $friends,
        ];
    }
}
