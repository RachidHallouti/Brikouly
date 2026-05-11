<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conversation_id')->constrained();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('reponse_a')->nullable()->constrained('messages');
            $table->decimal('prix', 10, 2)->nullable();
            $table->string('prix_par')->nullable();
            $table->text('content')->nullable();
            $table->enum('type',['text','offre','photo','reponse_offre'])->default('text');
            $table->enum('status',['accepté','refusé'])->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
