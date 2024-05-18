<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserSubscribed extends Mailable
{
    use Queueable, SerializesModels;

    public $user, $subscription, $price; 
    
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user, $subscription, $price)
    {
        $this->user = $user;
        $this->subscription = $subscription;
        $this->price = $price;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mails.user_subscribed')
        ->subject('Membership Confirmation for FindSurrogate');
    }
}
