<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Hashing\BcryptHasher;

class AddUser extends Command
{
    protected $signature = 'add:user';
    protected $description = 'Add new user';

    private $hasher;

    public function __construct()
    {
        parent::__construct();

        $this->hasher = new BcryptHasher();
    }

    public function handle()
    {
        $name = $this->ask('Username');
        $password = $this->secret('Password (hidden)');

        User::query()->create([
            'name' => $name,
            'password' => $this->hasher->make($password),
        ]);

        $this->info("User with name {$name} created.\n");

        return 0;
    }
}
