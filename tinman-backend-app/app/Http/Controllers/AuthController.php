<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate(['nickname' => 'required|string']);
    
        $user = User::where('nickname', $request->nickname)->first();
        if (!$user) {
            $user = User::create(['nickname' => $request->nickname]);
        }
        
        $token = $user->createToken('Personal Access Token')->plainTextToken;
        
        return response()->json(['user' => $user, 'token' => $token]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }
}



?>