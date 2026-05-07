<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Annonce extends Model
{
    use HasFactory;
    protected $fillable=['titre','description','ville','photo','photo_2','photo_3','photo_4','photo_5','categorie','prix','prix_par','user_id','enligne','status','type'];
    function user(){
        return $this->belongsTo(User::class);
    }
    public function favoris(){
        return $this->belongsToMany(User::class, 'favoris')
                    ->withTimestamps();
    }
    function isSavedUser(){
        return $this->hasOne(Favori::class)->where('user_id',auth('sanctum')->id());
    }
    protected $appends = ['isSaved'];
    function getIsSavedAttribute(){
        if(!auth()){
            return false;
        }
       return $this->isSavedUser()->exists();
    }
}
