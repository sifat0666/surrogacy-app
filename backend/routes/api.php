<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['guest']], function() {
    Route::post('register', 'AuthController@register');
    Route::post('register/intended-parent', 'AuthController@registerIntendedParent');
    Route::post('register/surrogate', 'AuthController@registerSurrogate');
    Route::post('register/agency', 'AuthController@registerAgency');
    Route::post('login', 'AuthController@login');
    Route::post('send-contact-email', 'GeneralController@sendContactEmail');
    Route::post('login-admin', 'AuthController@login_admin');
    Route::post('/social-login', 'AuthController@social_login');
    Route::post('forgot-password', 'PasswordResetController@forgot');
    Route::post('reset-password', 'PasswordResetController@reset');
});


Route::post('upload-files', 'GeneralController@upload_file');
Route::get('country-state', 'GeneralController@country_states');
Route::get('country-state-limit', 'GeneralController@country_states_limit');

Route::post('intended-parents', 'UserController@index_intended_parent');
Route::post('surrogates', 'UserController@index_surrogate');
Route::get('get-surrogates', 'UserController@get_surrogate');
Route::post('agencies', 'UserController@index_agency');
Route::get('user-details/{user}', 'UserController@show');

Route::get('blogs', 'BlogController@index');
Route::get('blogs/{blog}', 'BlogController@show');
Route::get('home', 'GeneralController@home');
Route::post('contact', 'ContactController@contact');

Route::post('check-email-exists', function(Request $request) {
    $user = \App\Models\User::where('email', $request->email)->first();
    return [
        'status' => 'success',
        'exists' => $user ? true : false,
    ];
});

Route::middleware('auth:sanctum')->group(function() {

    Route::get('user-home', 'GeneralController@home');
    Route::post('block-user/{id}', 'UserController@block');
    Route::get('user', 'AuthController@self');
    Route::post('logout', 'AuthController@logout');
    Route::put('change-password', 'AuthController@change_password');

    Route::put('update-profile-surrogacy', 'UserController@update_profile_surrogacy');
    Route::put('update-profile-about', 'UserController@update_profile_about');
    Route::put('update-profile-contact', 'UserController@update_profile_contact');

    Route::get('dashboard', 'GeneralController@dashboard');

    Route::post('blogs', 'BlogController@store');
    Route::post('blogs/{blog}', 'BlogController@update');
    Route::delete('blogs/{blog}', 'BlogController@destroy');

    Route::get('favorites', 'FavoriteController@index');
    Route::get('favorites/{id}', 'FavoriteController@favorites');
    Route::post('toggle-favorite/{user}', 'FavoriteController@toggle');
    Route::get('my-favorites', 'FavoriteController@myFavorites');
    Route::post('delete-favorites', 'FavoriteController@deleteFavorites');

    Route::get('pricing-plans', 'StripeController@get_plans');

    Route::post('create-payment-intent', 'StripeController@create_payment_intent');
    Route::post('capture-payment-intent', 'StripeController@subscribe');
    Route::post('cancel-membership', 'StripeController@cancel');

    Route::delete('delete-account', 'UserController@destroy');

    Route::post('create-chat/{user}', 'ChatController@createFriend');
    Route::get('get-chats', 'ChatController@getFriends');
    Route::post('load-chat/{id}', 'ChatController@show');
    Route::get('load-chats', 'ChatController@index');
    Route::post('send-message', 'ChatController@send_message');

    Route::post('surrogate-verification', 'UserController@update_surrogate_verification');

    Route::prefix('agency')->group(function () {
        Route::get('users', 'AgencyController@user_index');
        Route::post('register', 'AgencyController@register');
        Route::put('update/{userId}', 'AgencyController@update');
        Route::get('user/{user}', 'AgencyController@self');
        Route::delete('users/{user}', 'AgencyController@delete_user');
        Route::put('change-password/{user}', 'AgencyController@change_password');
        Route::put('update-profile-surrogacy/{user}', 'AgencyController@update_profile_surrogacy');
        Route::put('update-profile-about/{user}', 'AgencyController@update_profile_about');
        Route::put('update-profile-contact/{user}', 'AgencyController@update_profile_contact');
    });

    Route::get('notifications', 'NofiticationController@index');
    Route::get('notifications-count', 'NofiticationController@count');
    Route::delete('notifications/{notification}', 'NofiticationController@destroy');
    Route::post('create-notification', 'NofiticationController@create');
    Route::post('mark-read', 'NofiticationController@mark_read');

    // Route::get('charities', 'CharityController@index');
    // Route::post('charities', 'CharityController@store');
    // Route::get('charities/{charity}', 'CharityController@show');
    // Route::put('charities/{charity}', 'CharityController@update');
    // Route::delete('charities/{charity}', 'CharityController@destroy');

    Route::group(['namespace' => 'Admin'], function(){
        Route::prefix('admin')->group(function () {
            Route::get('dashboard', 'GeneralController@dashboard');

            Route::post('intended-parents', 'UserController@index_intended_parent');
            Route::post('surrogates', 'UserController@index_surrogate');
            Route::post('agencies', 'UserController@index_agency');

            Route::post('subscribed-intended-parents', 'UserController@index_subscribed_intended_parent');
            Route::post('subscribed-surrogates', 'UserController@index_subscribed_surrogate');
            Route::post('subscribed-agencies', 'UserController@index_subscribed_agency');

            Route::post('agency-intended-parents', 'UserController@index_agency_intended_parent');
            Route::post('agency-surrogates', 'UserController@index_agency_surrogate');

            Route::post('intended-parents', 'UserController@index_intended_parent');
            Route::post('surrogates', 'UserController@index_surrogate');
            Route::post('agencies', 'UserController@index_agency');

            Route::get('user-details/{user}', 'UserController@show');
            Route::delete('users/{user}', 'UserController@delete_user');

            Route::get('stripe-plans', 'StripePlanController@show');
            Route::put('stripe-plans', 'StripePlanController@update');

            Route::post('toggle-verified/{user}', 'UserController@toggle_verified');

            Route::put('change-password/{user}', 'UserController@change_password');
            Route::put('update-profile-surrogacy/{user}', 'UserController@update_profile_surrogacy');
            Route::put('update-profile-about/{user}', 'UserController@update_profile_about');
            Route::put('update-profile-contact/{user}', 'UserController@update_profile_contact');
        });
    });
});

Route::post('/stripe-webhook', 'StripeController@webhook');
