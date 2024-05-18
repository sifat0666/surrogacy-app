<?php

namespace App\Http\Controllers;

use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Payment;
use App\Models\Subscription;
use App\Models\StripePlan;
use App\Http\Resources\SubscriptionResource;
use Stripe\Stripe;
use Stripe\Customer;
use Stripe\PaymentIntent;
use App\Models\Plan;

class StripeController extends Controller
{
	public function create_payment_intent(Request $request)
    {
            Stripe::setApiKey(config('services.stripe.secret'));

            $slug = $request->input('slug');

			$plan = Plan::where('slug', $slug)->first();
			if (!$plan)
			{
				return [
					'status' => 'error',
					'message' => 'Invalid plan selected.',
				];
			}

			$user = $request->user();
			$stripeCustomer = $user->createOrGetStripeCustomer();

			$intent = $user->createSetupIntent();

			if ($user->subscribed('default'))
			{
				return [
					'status' => 'error',
					'message' => 'You are already subscribed.',
				];
			}

			

			return [
				'status' => 'success',
				'client_secret' => $intent->client_secret,
				'plan' => $plan,
			];

    }

    public function subscribe(Request $request)
    {
		return [
			'status' => 'error',
			'message' => $request->user()->paymentMethods(),
		];
		// subscription
		$plan = Plan::where('slug', $request->plan['slug'])->first();

		if (!$plan)
		{
			return [
				'status' => 'error',
				'message' => 'Invalid plan selected.',
			];
		}

		$user = $request->user();
		$stripeCustomer = $user->createOrGetStripeCustomer();

		if ($user->subscribed('default'))
		{
			return [
				'status' => 'error',
				'message' => 'You are already subscribed.',
			];
		}

		$subsscription = $user->newSubscription($plan['id'], $plan['stripe_plan'])->create($request->input('client_secret'));

		if ($subsscription)
		{
			$subscription = Subscription::where('stripe_id', $subsscription->stripe_id)->first();

			return [
				'status' => 'success',
				'subscription' => $subscription,
			];
		}

		return [
			'status' => 'error',
			'message' => 'There was some error while processing payment, please try again.',
		];
    }

    public function cancel(Request $request)
    {
    	if (!$request->user()->subscribed('default'))
        {
			return [
				'status' => 'error',
				'message' => 'You are not subscribed.',
			];
        }

    	try {
    		if ($request->user()->subscription('default')->cancelNow())
    		{
        		$subscription = $request->user()->subscriptions()->active()->latest()->first();
    			
    			return [
					'status' => 'success',
					'subscription' => $subscription ? new SubscriptionResource($subscription) : null,
				];
    		}
    		return [
				'status' => 'error',
				'message' => 'There was some error while canceling membership, please try again.',
			];
    	}
        catch (\Exception $e) {
        	return [
				'status' => 'error',
				'message' => 'There was some error while canceling membership, please try again.',
				'error' => $e->getMessage(),
			];
        }

		return [
			'status' => 'error',
			'message' => 'There was some error while canceling membership, please try again.',
		];
    }

	public function webhook(Request $request)
	{
		Stripe::setApiKey(config('services.stripe.secret'));

		$endpoint_secret = 'whsec_iW0PBOuSRgCV4UXrP65jP925b5ue2uTK';
		//$endpoint_secret = 'whsec_gDLgjHKcTOt8lpx9WGIJgP5mbFXkuXl8';

		$payload = file_get_contents('php://input');
		$sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
		$event = null;

		try {
			$event = \Stripe\Webhook::constructEvent(
				$payload, $sig_header, $endpoint_secret
			);
		} catch(\UnexpectedValueException $e) {
			http_response_code(400);
			exit();
		} catch(\Stripe\Exception\SignatureVerificationException $e) {
			http_response_code(400);
			exit();
		}

		if ($event->type == 'customer.subscription.created')
		{
			$subscriptionObject = $event->data->object;

			$subscription = Subscription::where('stripe_id', $subscriptionObject->id)->first();

			if ($subscription && $subscriptionObject->current_period_end && $subscriptionObject->current_period_start)
			{
				$subscription->update([
					'current_period_end' => $subscriptionObject->current_period_end,
					'current_period_start' => $subscriptionObject->current_period_start,
				]);
			}
			if ($subscription && $subscriptionObject->metadata->plan)
			{
				$subscription->update([
					'package_name' => $subscriptionObject->metadata->plan,
				]);
			}

			$subscription = Subscription::where('stripe_id', $subscriptionObject->id)->first();

			if ($subscription)
			{
			    $price = $subscriptionObject->plan->currency.' '.($subscriptionObject->plan->amount/100);
			    
				try {
		            \Mail::to(User::find(1))->send(new \App\Mail\AdminMemberSubscribed($subscription->user, $subscription, $price));
		        } catch(\Exception $e) {}
		        
				try {
		            \Mail::to($subscription->user)->send(new \App\Mail\UserSubscribed($subscription->user, $subscription, $price));
		        } catch(\Exception $e) {}
		    }
		}

		if ($event->type == 'customer.subscription.deleted')
		{
			$subscriptionObject = $event->data->object;

			$subscription = Subscription::where('stripe_id', $subscriptionObject->id)->first();

			if ($subscription)
			{
				try {
		            \Mail::to(User::find(1))->send(new \App\Mail\AdminMemberUnsubscribed($subscription->user, $subscription));
		        } catch(\Exception $e) {}
		        try {
		            \Mail::to($subscription->user)->send(new \App\Mail\UserUnsubscribed($subscription->user, $subscription));
		        } catch(\Exception $e) {}
		    }
		}

		http_response_code(200);
	}

	public function get_plans(Request $request)
	{
		if ($request->user()->user_type == 'Intended Parent')
		{
			// plans where the slug like intended-parent
			$plans = Plan::where('slug', 'like', 'intended-parent%')->get();

			return [
				'status' => 'success',
				'plans' => $plans,
			];
		}
		else if ($request->user()->user_type == 'Agency')
		{
			// plans where the slug like agency
			$plans = Plan::where('slug', 'like', 'agency%')->get();

			return [
				'status' => 'success',
				'plans' => $plans,
			];
		}

		return [
			'status' => 'error',
			'message' => 'You can not purchase membership.',
		];
	}
}