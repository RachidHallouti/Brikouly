<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class AnnonceFactory extends Factory
{
    public function definition(): array
    {
        $categories = [
            "Maison & Bricolage", "Transport & Véhicules", "Nettoyage & Entretien",
            "Digital & Technologie", "Déménagement & Livraison", "Éducation & Formation",
            "Services à la personne", "Événementiel", "Restauration & Cuisine",
            "Services professionnels", "Animaux", "Santé & Bien-être", "Autres"
        ];

        $moroccanCities = [
            "Tangier", "Tétouan", "Fnideq", "Mdiq", "Martil", "Chefchaouen", 
            "Al Hoceima", "Nador", "Berkane", "Oujda", "Saïdia", "Larache", 
            "Ksar El Kebir", "Kenitra", "Sidi Kacem", "Mehdya", "Salé", "Rabat", 
            "Harhoura", "Temara", "Skhirat", "Bouznika", "Mansouria", "Mohammedia", 
            "Ain Harrouda", "Casablanca", "Bouskoura", "Dar Bouazza", "Had Soualem", 
            "Berrechid", "Settat", "El Jadida", "Sidi Bennour", "Oualidia", "Safi", 
            "Essaouira", "Agadir", "Inezgane", "Aït Melloul", "Fès", "Meknès", 
            "Khemisset", "Tifelt", "Sefrou", "Benslimane", "Ifrane", "Azrou", 
            "Khenifra", "Khouribga", "Oued Zem", "Béni Mellal", "Fquih Ben Salah", 
            "Azilal", "Marrakesh", "Ben Guerir", "El Kelaa Des Sraghna", "Taza", 
            "Guercif", "Taourirt", "Midelt", "Errachidia", "Erfoud", "Merzouga", 
            "Ouarzazate", "Zagora", "Tinghir", "Tiznit", "Tafraout", "Sidi Ifni", 
            "Guelmim", "Tan-Tan", "Laâyoune", "Smara", "Boujdour", "Dakhla"
        ];

        return [
            'titre' => fake()->sentence(4),
            'description' => fake()->paragraphs(2, true),
            'photo' => 'https://picsum.photos/seed/' . fake()->uuid() . '/800/600',
            'ville' => fake()->randomElement($moroccanCities),
            'categorie' => fake()->randomElement($categories),
            'enligne' => fake()->boolean(30),
            'status' => fake()->randomElement(['active', 'completed', 'inactive', 'draft']),
            'type' => fake()->randomElement(['offre', 'demande']),
            'prix' => fake()->numberBetween(50, 20000),
            'prix_par' => fake()->randomElement(['Dh/Jour', 'Dh/Heure', 'Dh/Mois', 'Dh']),
            'user_id' => fake()->numberBetween(1,50),
            'created_at' => fake()->dateTimeBetween('-2 month', 'now'),
        ];
    }
}
