<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = ['conversation_id','user_id','content','type','status','reponse_a','prix','prix_par'];
    function user (){
        return $this->belongsTo(User::class);
    }
    function reponse_a(){
        return $this->belongsTo(Message::class,'reponse_a');
    }
    function conversation(){
        return $this->belongsTo(Conversation::class);
    }
    
}
