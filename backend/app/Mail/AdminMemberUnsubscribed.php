<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AdminMemberUnsubscribed extends Mailable
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
        return $this->view('mails.admin_member_unsubscribed')
        ->subject('Membership has been CANCELLED');
    }
}