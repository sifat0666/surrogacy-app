<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * Test if the home page returns a 200 status code.
     *
     * @return void
     */
    public function test_home_page_returns_200_status_code()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
