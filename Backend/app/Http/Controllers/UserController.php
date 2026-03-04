<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::select('id', 'nom', 'prenom', 'photo', 'ville', 'bio')->get();
        return response()->json($users);
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
    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'Utilisateur non trouvé',
                'success' => false
            ], 404);
        }

        return response()->json([
            'id'     => $user->id,
            'nom'    => $user->nom,
            'prenom' => $user->prenom,
            'photo'  => $user->photo,
            'ville'  => $user->ville,
            'bio'    => $user->bio,
            'success' => true
        ]);
    }
    

    /**
     * Show the form for editing the specified resource.
     */
    function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    function destroy($id)
    {
        //
    }
}
