<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserNewMessage extends Mailable
{
   use Queueable, SerializesModels;

    public $recipient, $sender, $text;
    
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($recipient, $sender, $text)
    {
        $this->recipient = $recipient;
        $this->sender = $sender;
        $this->text = $text;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mails.user_new_message')
                    ->subject('You have received a new message');
    }
}