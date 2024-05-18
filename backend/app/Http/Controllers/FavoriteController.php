<?php

namespace App\Http\Controllers;

use Validator;
use Storage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Favorite;
use App\Models\Notification;
use App\Http\Resources\FavoriteResource;
use App\Http\Resources\MyFavoriteResource;

class FavoriteController extends Controller
{
	public function index(Request $request)
	{
		$favorites = Favorite::where('user_id', $request->user()->id)->latest();

		$favorites = FavoriteResource::collection($favorites->paginate(30))->response()->getData(true);

		return [
			'status' => 'success',
			'favorites' => $favorites,
		];
	}

    public function favorites(Request $request, $id)
	{
		$favorites = Favorite::where('user_id', $id)->latest();

		$favorites = FavoriteResource::collection($favorites->paginate(30))->response()->getData(true);

		return [
			'status' => 'success',
			'favorites' => $favorites,
		];
	}

    public function myFavorites(Request $request)
    {


        $favorites = Favorite::where('favorited_user_id', $request->user()->id)->latest();
		// remove user_id that are deleted
		$favorites = $favorites->whereHas('user', function($query) {
			$query->where('deleted_at', null);
		});
		// remove favorited_user_id that are deleted
		$favorites = $favorites->whereHas('favorited_user', function($query) {
			$query->where('deleted_at', null);
		});



        $favorites = MyFavoriteResource::collection($favorites->paginate(30))->response()->getData(true);

        return [
            'status' => 'success',
            'favorites' => $favorites,
        ];
    }

    public function deleteFavorites(Request $request, $user)
    {
        $user = User::find($user);
        $isFavorite = Favorite::where('user_id', $request->user()->id)->where('favorited_user_id', $user->id)->first();

		if ($isFavorite)
		{
			if ($isFavorite->delete())
			{
				return [
					'status' => 'success',
					'message' => 'Success! Removed from favorite.',
					'is_favorite' => false,
				];
			}
		}
    }

	public function toggle(Request $request, $user)
	{
		$user = User::find($user);
		if (!$user)
		{
			return [
				'status' => 'error',
				'message' => 'User not valid.',
			];
		}

		if ($request->user()->id == $user->id)
		{
			return [
				'status' => 'error',
				'message' => 'You can not add yourself as favorite.',
			];
		}

		$isFavorite = Favorite::where('user_id', $request->user()->id)->where('favorited_user_id', $user->id)->first();

		if ($isFavorite)
		{
			if ($isFavorite->delete())
			{
				return [
					'status' => 'success',
					'message' => 'Success! Removed from favorite.',
					'is_favorite' => false,
				];
			}
		}
		else
		{
			if (Favorite::create([
				'user_id' => $request->user()->id,
				'favorited_user_id' => $user->id,
			]))
			{
				Notification::create([
					'user_id' => $user->id,
			        'target_user_id' => $request->user()->id,
			        'title' => $request->user()->name.' added you to favorites',
			    ]);

			    if (strlen($user->email) >= 15)
                {
                    try {
                        \Mail::to($user)->send(new \App\Mail\UserFavorited($user, $request->user()));
                    } catch(\Exception $e) {}
                }

				return [
					'status' => 'success',
					'message' => 'Success! Added to favorite.',
					'is_favorite' => true,
				];
			}
		}

		return [
			'status' => 'error',
			'message' => 'There was some error while updating favorite, please try again.',
		];
	}
}
