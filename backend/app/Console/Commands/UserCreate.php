<?php

namespace App\Console\Commands;

use App\Enum\UserStatus;
use App\Models\User;
use Illuminate\Console\Command;
use Spatie\Permission\Models\Role;

use function Laravel\Prompts\form;
use function Laravel\Prompts\info;
use function Laravel\Prompts\intro;

class UserCreate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:user-create';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new User';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $roles = Role::all();

        intro(__('commands.user-create.hint-ctrl-u'));

        $responses = form()
            ->text(
                name: 'name',
                label: __('commands.user-create.form-name'),
                required: true,
            )
            ->text(
                name: 'email',
                label: __('commands.user-create.form-email'),
                validate: ['email' => 'required|email|unique:App\Models\User,email'],
            )
            ->password(
                name: 'password',
                label: __('commands.user-create.form-password'),
                validate: ['password' => 'required|min:8'],
            )
            ->confirm(
                name: 'must-reset-password',
                label: __('commands.user-create.form-must-reset-password'),
                default: true,
            )
            ->select(
                name: 'role',
                label: __('commands.user-create.form-role'),
                options: $roles->pluck('name', 'id')->prepend(__('commands.user-create.role-none'), -1)
            )
            ->submit();

        $user = new User($responses);
        $user->email_verified_at = now();
        $user->status = $responses['must-reset-password'] ? UserStatus::MUST_RESET_PASSWORD : UserStatus::ACTIVE;
        $user->save();

        $role = $responses['role'];
        if ($role !== -1) {
            $user->assignRole(Role::whereId($role)->firstOrFail());
        }

        info(__('commands.user-create.success', ['name' => $user->name]));
    }
}
