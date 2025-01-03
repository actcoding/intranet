<?php

namespace App\Policies;

use App\Models\Menu\MenuPlan;
use App\Models\User;

class MenuPlanPolicy
{

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, MenuPlan $plan): bool
    {
        return $user->can('menu.plan.viewall');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->can('menu.plan.create');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, MenuPlan $plan): bool
    {
        return $user->can('menu.plan.update', $plan);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, MenuPlan $plan): bool
    {
        return $user->can('menu.plan.delete', $plan);
    }
}
