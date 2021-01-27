<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LogoutApiTest extends TestCase
{

    use RefreshDatabase;

    public function setUp(): void
    {

        parent::setUp();

        $this->user = factory(User::class)->create();
    }
    
    
    /**
     * A basic feature test example.
     *
     * @test
     * 
     * @return void
     */
    public function should_認証済みのユーザーをログアウトさせる()
    {
        $response = $this->actingAs($this->user)
                         ->json("POST", route("logout"));

        $response->assertStatus(200);
        $this->assertGuest();
    }
}
