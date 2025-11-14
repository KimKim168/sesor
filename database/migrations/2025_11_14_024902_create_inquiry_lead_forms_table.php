<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('inquiry_lead_forms', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('contact_number')->nullable();
            $table->string('business_or_store_name')->nullable();
            $table->string('email')->nullable();
            $table->text('message')->nullable();
            $table->string('contact_method')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inquiry_lead_forms');
    }
};
