<?php

namespace App\Http\Controllers;

use App\Models\Favori;
use App\Models\User;
use Illuminate\Http\Request;

class FavoriController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index(){ 
        $user = auth()->user();
        $annoncesFavoris = $user->favoris()->with('user')->get();

        if ($annoncesFavoris->isEmpty()) {
            return response()->json([
                'message' => 'Votre liste de souhaits est vide',
                'success' => false
            ], 200);
        }

        return response()->json([
            'data' => $annoncesFavoris,
            'count'=> $annoncesFavoris->count(),
            'success' => true
        ]);
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Favori $favori)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Favori $favori)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Favori $favori)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Favori $favori)
    {
        //
    }

    public function toggle(Request $request){
        $data= $request->validate([
            'user_id' =>'required|exists:users,id',
            'annonce_id' =>'required|exists:annonces,id',

        ]);

        $exists = Favori::where('user_id', $data['user_id'])
                        ->where('annonce_id', $data['annonce_id'])
                        ->first();
        if ($exists) {
            $exists->delete();
        }
        else{
            Favori::create($data);
        }
        
    }
    public function check(Request $request){
        $data= $request->validate([
            'user_id' =>'required|exists:users,id',
            'annonce_id' =>'required|exists:annonces,id',

        ]);

        $exists = Favori::where('user_id', $data['user_id'])
                        ->where('annonce_id', $data['annonce_id'])
                        ->first();
        if ($exists) {
            return response()->json(true);
        }
        else{
            return response()->json(false);
        }
    }
}
