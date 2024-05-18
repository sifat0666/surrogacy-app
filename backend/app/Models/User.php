<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Cashier\Billable;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;
    use Billable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'agency_id',
        'user_type',
        'country',
        'state',
        'surrogacy_type',
        'is_first_surrogacy_journey',
        'is_working_with_agency',
        'date_of_birth',
        'have_frozen_embryos',
        'have_children',
        'height',
        'weight',
        'when_to_start_journey',
        'relationship_status',
        'willing_to_help_types',
        'is_smoke_or_tobacco',
        'is_willing_to_travel',
        'assisted_groups',
        'about',
        'images',
        'cover',
        'picture',
        'phone_number',
        'website',
        'socal_media',
        'contact_email',
        'surrogate_location',
        'type_of_journey',
        'intended_parent_location',
        'provider',
        'provider_id',
        'stripe_customer_id',
        'active_membership',
        'expiry_membership',
        'last_login',
        'is_surrogate_verified',
        'is_deactivated',
        'surrogate_verification_image',
        'surrogate_verification_number',
        'surrogate_verification_address',
        'services_provider',
        'journey_length',
        'membership_affilations',
        'surrogate_matching_time',
        'gallery',
        'services_provided',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function agency()
    {
        return $this->belongsTo(User::class, 'agency_id');
    }

    public function users()
    {
        return $this->hasMany(User::class, 'agency_id');
    }

    public function getAgeAttribute($dateOfBirth)
    {
        $dateOfBirth = $this->attributes['date_of_birth'];
        $dateOfBirth = new \DateTime($dateOfBirth);
        $currentDate = new \DateTime();
        $age = $dateOfBirth->diff($currentDate)->y;
        return $age.' years';
    }

    public function getCurrentMembershipAttribute($activeMembership)
    {
        $currentMembership = null;

        $activeMembership = $this->attributes['active_membership'] ?? null;
        $expiryMembership = $this->attributes['expiry_membership'] ?? null;

        if ($activeMembership && $expiryMembership >= date('Y-m-d H:i:s'))
        {
            $temp = substr($activeMembership, -6);
            if ($temp == 'onthly') $currentMembership = 'Monthly';
            else if ($temp == 'rterly') $currentMembership = 'Quarterly';
            else if ($temp == 'yearly') $currentMembership = 'Yearly';
        }
        return $currentMembership;
    }

    public function getProfileCompletenessAttribute($id)
    {
        $filledFields = 0;
        $totalFields = 1;

        if ($this->attributes['user_type'] == 'Intended Parent')
        {
            $totalFields = 15;

            if (isset($this->attributes['name']) && $this->attributes['name']) $filledFields++;
            if (isset($this->attributes['country']) && $this->attributes['country']) $filledFields++;
            if (isset($this->attributes['state']) && $this->attributes['state']) $filledFields++;
            if (isset($this->attributes['images']) && $this->attributes['images']) $filledFields++;
            if (isset($this->attributes['relationship_status']) && $this->attributes['relationship_status']) $filledFields++;
            if (isset($this->attributes['have_children']) && $this->attributes['have_children'] !== null) $filledFields++;
            if (isset($this->attributes['is_willing_to_travel']) && $this->attributes['is_willing_to_travel'] !== null) $filledFields++;
            if (isset($this->attributes['about']) && $this->attributes['about']) $filledFields++;
            if (isset($this->attributes['surrogacy_type']) && $this->attributes['surrogacy_type']) $filledFields++;
            if (isset($this->attributes['is_first_surrogacy_journey']) && $this->attributes['is_first_surrogacy_journey'] !== null) $filledFields++;
            if (isset($this->attributes['is_working_with_agency']) && $this->attributes['is_working_with_agency'] !== null) $filledFields++;
            if (isset($this->attributes['have_frozen_embryos']) && $this->attributes['have_frozen_embryos'] !== null) $filledFields++;
            if (isset($this->attributes['surrogate_location']) && $this->attributes['surrogate_location']) $filledFields++;
            if (isset($this->attributes['type_of_journey']) && $this->attributes['type_of_journey']) $filledFields++;
            if (isset($this->attributes['when_to_start_journey']) && $this->attributes['when_to_start_journey']) $filledFields++;
        }

        if ($this->attributes['user_type'] == 'Surrogate')
        {
            $totalFields = 18;

            if (isset($this->attributes['name']) && $this->attributes['name']) $filledFields++;
            if (isset($this->attributes['country']) && $this->attributes['country']) $filledFields++;
            if (isset($this->attributes['state']) && $this->attributes['state']) $filledFields++;
            if (isset($this->attributes['images']) && $this->attributes['images']) $filledFields++;
            if (isset($this->attributes['relationship_status']) && $this->attributes['relationship_status']) $filledFields++;
            if (isset($this->attributes['date_of_birth']) && $this->attributes['date_of_birth']) $filledFields++;
            if (isset($this->attributes['have_children']) && $this->attributes['have_children'] !== null) $filledFields++;
            if (isset($this->attributes['height']) && $this->attributes['height']) $filledFields++;
            if (isset($this->attributes['weight']) && $this->attributes['weight']) $filledFields++;
            if (isset($this->attributes['is_smoke_or_tobacco']) && $this->attributes['is_smoke_or_tobacco'] !== null) $filledFields++;
            if (isset($this->attributes['is_willing_to_travel']) && $this->attributes['is_willing_to_travel'] !== null) $filledFields++;
            if (isset($this->attributes['about']) && $this->attributes['about']) $filledFields++;
            if (isset($this->attributes['surrogacy_type']) && $this->attributes['surrogacy_type']) $filledFields++;
            if (isset($this->attributes['is_first_surrogacy_journey']) && $this->attributes['is_first_surrogacy_journey'] !== null) $filledFields++;
            if (isset($this->attributes['is_working_with_agency']) && $this->attributes['is_working_with_agency'] !== null) $filledFields++;
            if (isset($this->attributes['willing_to_help_types']) && $this->attributes['willing_to_help_types']) $filledFields++;
            if (isset($this->attributes['intended_parent_location']) && $this->attributes['intended_parent_location']) $filledFields++;
            if (isset($this->attributes['when_to_start_journey']) && $this->attributes['when_to_start_journey']) $filledFields++;
        }

        if ($this->attributes['user_type'] == 'Agency')
        {
            $totalFields = 6;

            if (isset($this->attributes['name']) && $this->attributes['name']) $filledFields++;
            if (isset($this->attributes['country']) && $this->attributes['country']) $filledFields++;
            if (isset($this->attributes['state']) && $this->attributes['state']) $filledFields++;
            if (isset($this->attributes['images']) && $this->attributes['images']) $filledFields++;
            if (isset($this->attributes['assisted_groups']) && $this->attributes['assisted_groups']) $filledFields++;
            if (isset($this->attributes['about']) && $this->attributes['about']) $filledFields++;
            // new add fields
            if (isset($this->attributes['services_provider']) && $this->attributes['services_provider']) $filledFields++;
            if (isset($this->attributes['surrogate_matching_time']) && $this->attributes['surrogate_matching_time']) $filledFields++;
            if (isset($this->attributes['journey_length']) && $this->attributes['journey_length']) $filledFields++;
            if (isset($this->attributes['membership_affilations']) && $this->attributes['membership_affilations']) $filledFields++;
        }

        return round(($filledFields / $totalFields) * 100);
    }
}
