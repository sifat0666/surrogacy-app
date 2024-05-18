<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserFavorited extends Mailable
{
    use Queueable, SerializesModels;

    public $user, $userWhoFavorited;
    
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user, $userWhoFavorited)
    {
        $this->user = $user;
        $this->userWhoFavorited = $userWhoFavorited;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mails.user_favorited')
        ->subject($this->userWhoFavorited->name.' Just Favorited Your Profile!');
    }
}
