<?php

namespace App\Http\Controllers;

use App\Models\Annonce;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class AnnonceController extends Controller
{
    public function index(Request $request)
    {
        $query = Annonce::with('user');
        if($request['search']){
        $query->where(function ($q) use ($request) {
            $q->where('titre', 'LIKE', "%{$request['search']}%")
            ->orWhere('description', 'LIKE', "%{$request['search']}%");
        } );}

        if($request['categorie']){
            $query->where('categorie',$request['categorie']);
        }
        if($request['cities']){
            $query->orderByRaw("FIELD(ville,'".implode("','",$request['cities'])."')");
        }
        if($request->enligne == "oui"){
            $query->where("enligne",true);
        }
        if($request->enligne == "non"){
            $query->where("enligne",false);
        }
        if($request['type']){
            $query->where("type",$request['type']);
        }
        if($request['max']){
            $query->where("prix","<",$request['max']);
        }
        if($request['min']){
            $query->where("prix",">",$request['min']);
        }
        $query->latest();
        if($request['limit']){
            $query->limit($request['limit']);
        }
        
        if($request['paginate']){
            $annonces = $query->paginate($request['paginate']);
        }else{
            $annonces = $query->get();
        }
        
        return response()->json($annonces);
    }
    public function store(Request $request)
    {
        $data=$request->validate([
            'titre'=>'required|string|min:5|max:50',
            'enligne'=>'nullable|boolean',
            'type'=>['nullable',Rule::in(['offre','demande'])],
            'status'=>['nullable',Rule::in(['active','draft','cancelled','completed'])],
            'description'=>'required|string|min:10|max:255',
            'ville'=>'nullable|string',
            'photo'=>'required|image|max:2048',
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
        return response()->json(["message"=>'Votre annonce a été publiée avec succée']);
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
    function data(){
        $annoncesCount = Annonce::count() ;
        $usersCount = User::count() ;
        return response()->json(["annoncesCount"=>$annoncesCount,"usersCount"=>$usersCount,]);

    }
}
