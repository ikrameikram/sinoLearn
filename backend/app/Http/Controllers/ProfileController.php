<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        return response()->json($request->user()->load('profile'));
    }

    public function update(Request $request)
    {
        // SOLUTION 1 : On utilise $request->user() au lieu de Auth::user()
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'target_hsk_level' => 'nullable|integer|min:1|max:9',
            'photo' => 'nullable|image|max:5120',
        ]);

        $user->update(['name' => $validated['name']]);

        $photoPath = $user->profile ? $user->profile->photo : null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('profiles', 'public');
        }

        Profile::updateOrCreate(
            ['user_id' => $user->id],
            [
                'bio' => $validated['bio'] ?? null,
                'target_hsk_level' => $validated['target_hsk_level'] ?? 1,
                'photo' => $photoPath,
            ]
        );

        return response()->json([
            'message' => 'Profil mis à jour avec succès',
            // Ici, plus d'erreur car $request->user() est bien reconnu comme un User
            'user' => $user->load('profile'), 
        ]);
    }
}