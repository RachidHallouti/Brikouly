<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evaluation extends Model
{
    protected $fillable = ['user_id','reviewer_id','note','commentaire'];

    function reviewer(){
        return $this->belongsTo(User::class,'reviewer_id');
    }
}
