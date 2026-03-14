<?php

namespace App\Http\Controllers;

use App\Models\Annonce;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AnnonceController extends Controller
{
    public function index(Request $request)
    {
        if($request['categorie']){
            $annonces=Annonce::whereLike('categorie',$request['categorie'])->latest()->with('user')->get();
            return response()->json($annonces);
        }
        $annonces=Annonce::select()->latest()->with('user')->get();
        
        return response()->json($annonces);
    }
    public function store(Request $request)
    {
        $data=$request->validate([
            'titre'=>'required|string|min:5|max:50',
            'description'=>'required|string|min:10|max:255',
            'ville'=>'nullable|string',
            'photo'=>'required|image',
            'categorie'=>'required|string',
            'prix'=>'required|numeric|min:1|max:200000',
            'prix_par'=>'required|string',
            'user_id'=>'required|exists:users,id',
        ]);
        $imageName = Str::random().'.'.$request->photo->getClientOriginalExtension();
        Storage::disk("public")->putFileAS('annonces/photo',$request->photo,$imageName);
        $imagePath = 'annonces/photo/'.$imageName;
        $data["photo"]= $imagePath;
        Annonce::create($data);
        return response()->json(["message"=>'Votre annonce a été publiée avec succé']);
    }
    public function show(Annonce $annonce)
    {
        return response()->json($annonce);
    }

    public function update(Request $request, Annonce $annonce)
    {
        $data=$request->validate([
            'titre'=>'required|string|min:5|max:50',
            'description'=>'required|string|min:10|max:255',
            'ville'=>'nullable|string',
            'photo'=>'nullable|image',
            'categorie'=>'required|string',
            'prix'=>'required|numeric|min:1|max:200000',
            'prix_par'=>'required|string',
            'user_id'=>'required|exists:users,id',
        ]);
        if($request->photo){
            Storage::disk("public")->delete($annonce->photo);
            $imageName = Str::random().'.'.$request->photo->getClientOriginalExtension();
            Storage::disk("public")->putFileAS("annonces/photo",$request->photo,$imageName);
            $imagePath = 'annonces/photo/'.$imageName;
            $data["photo"]= $imagePath;
        }
        $annonce->update($data);
        return response()->json(["message"=>'Votre annonce a été modifiée']); 
    }

    public function destroy(Annonce $annonce)
    {
        $annonce->delete();
        Storage::disk("public")->delete($annonce->photo);
        return response()->json(["message"=>'Votre annonce a été supprimée']); 
    }
    public function userAnnonces(User $user){
        $userannonces=$user->annonces()->get();
        return response()->json($userannonces);
    }
    public function categorieAnnonces($categorie){
        $categorieannonces=Annonce::where('categorie',$categorie)->get();
        if ($categorieannonces->isEmpty()) {
        return response()->json(['message' => 'Aucune annonce trouvée pour cette catégorie'], 404);
    }
        return response()->json($categorieannonces);
    }

    public function rechercher($search){
        

        $annonces = Annonce::where('titre', 'LIKE', "%{$search}%")
            ->orWhere('description', 'LIKE', "%{$search}%")
            ->get();

        // if ($annonces->isEmpty()) {
        //     return response()->json([
        //         'message' => 'Aucune annonce ne correspond à votre recherche',
        //         'success' => false
        //     ], 404);
        // }

        return response()->json([
            'data' => $annonces,
            'success' => true
        ]);
    }
}
