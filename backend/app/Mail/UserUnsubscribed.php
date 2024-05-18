<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserUnsubscribed extends Mailable
{
    use Queueable, SerializesModels;

    public $user, $subscription;
    
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user, $subscription)
    {
        $this->user = $user;
        $this->subscription = $subscription;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mails.user_unsubscribed')
        ->subject('Your membership at FindSurrogate has been CANCELLED');
    }
}
