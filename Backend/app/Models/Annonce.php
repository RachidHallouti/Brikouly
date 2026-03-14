<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;


class Annonce extends Model
{
    protected $fillable=['titre','description','ville','photo','categorie','prix','prix_par','user_id'];
    function user(){
        return $this->belongsTo(User::class);
    }
}
