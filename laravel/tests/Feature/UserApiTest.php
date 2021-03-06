<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserApiTest extends TestCase
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
    public function should_ログイン中のユーザーを返却する()
    {
        $response = $this->actingAs($this->user)->json("GET", route("user"));

        $response->assertStatus(200)->assertJson(["name" => $this->user->name]);
    }

    /**
     * @test
     */
    public function should_ログインされていない場合は空文字を返却する()
    {
        $response = $this->json("GET", route("user"));

        $response->assertStatus(200);
        $this->assertEquals("", $response->content());
    }
}
