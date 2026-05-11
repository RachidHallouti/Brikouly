<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $userId = auth('sanctum')->id();
    $receiverId = $request->user_id;
    $annonceId = $request->annonce_id; 

    if($request->reponse_a){
        $offre=Message::find($request->reponse_a);
        $conversation = $offre->conversation;
    }else{
        $conversation = Conversation::firstOrCreate([
        'user1_id'   => min($userId, $receiverId),
        'user2_id'   => max($userId, $receiverId),
        'annonce_id' => $annonceId,
    ]);
    }
    

    $content = $request->content;

    if ($request->type === 'photo' && $request->hasFile('content')) {
        $file = $request->file('content');
        $imageName = Str::random(20) . '.' . $file->getClientOriginalExtension();
        
        Storage::disk("public")->putFileAs('messages/photos', $file, $imageName);
        
        $content = 'messages/photos/' . $imageName;
    }

    $message = Message::create([
        'conversation_id' => $conversation->id,
        'user_id'         => $userId,
        'content'         => $request->status ?? $content,
        'type'            => $request->type,
        'reponse_a'       => $request->reponse_a,
        'prix'            => $request->prix,
        'prix_par'        => $request->prix_par,
    ]);
    if($request->status){
        if ($offre && $offre->type === 'offre' && $offre->user_id !== $userId) {
            $offre->update(['status' => $request->status]);
        }
    }
    broadcast(new MessageSent($message))->toOthers();
    return response()->json($message);


}
    public function show(Message $message)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        //
    }
}
