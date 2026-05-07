<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    protected $fillable = ['user1_id','user2_id','annonce_id'];
    function messages(){
        return $this->hasMany(Message::class);
    }
    function user1(){
        return $this->belongsTo(User::class,'user1_id');
    }
    
    function user2(){
        return $this->belongsTo(User::class,'user2_id');
    }
    function annonce(){
        return $this->belongsTo(Annonce::class);
    }
    function latestMessage()
    {
        return $this->hasOne(Message::class)->latestOfMany();
    }
    protected $appends = ['other_user'];

    function getOtherUserAttribute()
    {
        $authId = auth('sanctum')->id();
        if ($this->user1_id === $authId) {
            return $this->user2;
        }
        return $this->user1;
    }
}
