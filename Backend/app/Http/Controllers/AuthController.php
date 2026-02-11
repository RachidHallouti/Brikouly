<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UpdateRequest;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    function login(LoginRequest $request){
        $loginData = $request->validated();
        if(!Auth::attempt($loginData)){
           return response([
            'message' => "L'email ou le mot de passe est incorrecte",
            "success" => false
           ]);
        }
        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response()->json([
            "message"=>"Bienvenue {$user->prenom} {$user->nom} !",
            "userData"=>compact('user','token'),
            "success"=>true
        ]);

    }
    function register(RegisterRequest $request){
        $data = $request->validated();
        /** @var User $user */
        $imageName = Str::random().'.'.$request->photo->getClientOriginalExtension();
        Storage::disk("public")->putFileAS('users/photo',$request->photo,$imageName);
        $imagePath = 'users/photo/'.$imageName;
         
        $user = User::create([
            "nom"=>$data["nom"],
            "prenom"=>$data["prenom"],
            "ville"=>$data["ville"] ?? null,
            "photo"=>$imagePath,
            "bio"=>$data["bio"] ?? null,
            "email"=>$data["email"],
            "password"=>Hash::make($data["password"]),
        ]);
        if(!$user){
            return response()->json([
            "message"=>"Nous n'avons pas pu créer votre compte. Veuillez réessayer.",
            "success"=>false
            ],500);
        };
        $token = $user->createToken("main")->plainTextToken;

        return response()->json([
            "message"=>"Bienvenue sur Brikouly,{$user['prenom']} {$user['nom']} !",
            "userData"=>compact("user","token"),
            "success"=>true
        ]);
    }
    function update(UpdateRequest $request,User $user){
        $data = $request->validated();
        if($request->photo){
            Storage::disk("public")->delete($user->photo);
            $imageName = Str::random().'.'.$request->photo->getClientOriginalExtension();
            Storage::disk("public")->putFileAS("users/photo",$request->photo,$imageName);
            $imagePath = 'users/photo/'.$imageName;
            $user->photo = $imagePath;
        }
        $user->fill([
        'nom'    => $data['nom'] ?? $user->nom,
        'prenom' => $data['prenom'] ?? $user->prenom,
        'ville'  => $data['ville'] ?? $user->ville,
        'bio'    => $data['bio'] ?? $user->bio,
        ]);
        $user->save();
        return response()->json([
            "message"=>"Votre profil à été bien mis à jour.",
            "user"=>$user,
            "success"=>true
        ]);



    }
    function logout(Request $request){
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response ('',204);
    }
}
