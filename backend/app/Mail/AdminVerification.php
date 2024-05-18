<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AdminVerification extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    
    /**
     * Create a new message instance.
     *
     * @param mixed $user
     */
    public function __construct($user = null)
    {
        $this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        if ($this->user !== null) {
            return $this->view('mails.admin_verification')
            ->subject('Surrogate Verification Request Received')
            ->with(['user' => $this->user]);
        } else {
            return $this->view('mails.admin_verification')
            ->subject('Surrogate Verification Request Received');
        }
    }
}