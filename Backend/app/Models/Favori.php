<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Annonce;

class Favori extends Model
{
    protected $fillable = ['user_id', 'annonce_id'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function annonce() {
        return $this->belongsTo(Annonce::class);
    }
}
