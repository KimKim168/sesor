<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('career_submits', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('career_id');
            $table->string('email')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('file')->nullable();
            $table->softDeletes();
            $table->timestamps();

            // Add foreign key
            $table->foreign('career_id')
                ->references('id')->on('careers')
                ->onDelete('cascade');

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('career_submits');
    }
};
