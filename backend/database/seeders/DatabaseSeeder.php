<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // User::factory(10)->create();
        $stripePlans = [
            // [
            //     'name' => 'Agency Yearly',
            //     'slug' => 'agency-yearly',
            //     'stripe_plan' => 'price_1OZCk9EK1uKkOktfok2xVuym',
            //     'price' => 1200,
            //     'description' => 'Monthly plan',
            // ],
            [
                'name' => 'Agency Elite Plan',
                'slug' => 'agency-elite-plan',
                'stripe_plan' => 'price_1PAvjwEK1uKkOktfBiF14vsj',
                'price' => 2200,
                'description' => 'Elite plan',
            ],
            // [
            //     'name' => 'Agency Quarterly',
            //     'slug' => 'agency-quarterly',
            //     'stripe_plan' => 'price_1OZCjqEK1uKkOktfDKxyERun',
            //     'price' => 600,
            //     'description' => 'Yearly plan',
            // ],
            // [
            //     'name' => 'Agency Monthly',
            //     'slug' => 'agency-monthly',
            //     'stripe_plan' => 'price_1OZCjREK1uKkOktfmX9yzHUt',
            //     'price' => 300,
            //     'description' => 'Yearly plan',
            // ],
            // [
            //     'name' => 'Intended Parent Yearly',
            //     'slug' => 'intended-parent-yearly',
            //     'stripe_plan' => 'price_1OZCiTEK1uKkOktfS0qMSxWN',
            //     'price' => 300,
            //     'description' => 'Yearly plan',
            // ],
            // [
            //     'name' => 'Intended Parent Quarterly',
            //     'slug' => 'intended-parent-quarterly',
            //     'stripe_plan' => 'price_1OZChpEK1uKkOktfGVNmblAi',
            //     'price' => 200,
            //     'description' => 'Yearly plan',
            // ],
            // [
            //     'name' => 'Intended Parent Monthly',
            //     'slug' => 'intended-parent-monthly',
            //     'stripe_plan' => 'price_1OZChREK1uKkOktfz1NO8iLP',
            //     'price' => 100,
            //     'description' => 'Yearly plan',
            // ],
        ];

        // foreach ($stripePlans as $stripePlan) {
        //     \App\Models\Plan::create($stripePlan);
        // }

}


}
