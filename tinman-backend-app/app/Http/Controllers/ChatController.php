<?php

namespace App\Http\Controllers;

use App\Models\Thread;
use App\Models\User;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function createThread(Request $request)
    {
        $request->validate([
            'recipient' => 'required|string',
        ]);
    
        $recipient = User::firstOrCreate(
            ['nickname' => $request->input('recipient')], 
            ['nickname' => $request->input('recipient')]  
        );
    
        $existingThread = Thread::where(function ($query) use ($recipient) {
            $query->where('user_id', auth()->id())
                  ->where('recipient_id', $recipient->id);
        })->orWhere(function ($query) use ($recipient) {
            $query->where('user_id', $recipient->id)
                  ->where('recipient_id', auth()->id());
        })->first();
    
        if ($existingThread) {
            return response()->json($existingThread, 200);
        }
    
        $thread = Thread::create([
            'user_id' => auth()->id(),
            'recipient_id' => $recipient->id,
        ]);
    
        return response()->json($thread, 201);
    }
    
    public function sendMessage(Request $request, Thread $thread)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $message = $thread->messages()->create([
            'user_id' => auth()->id(),
            'message' => $request->input('message'),
        ]);

        return response()->json($message, 201);
    }

    public function threads()
    {
        $userId = auth()->id();

        $threads = Thread::with(['user', 'recipient'])
        ->where('user_id', $userId)
        ->orWhere('recipient_id', $userId)
        ->get();

    return response()->json($threads);
    }
    
    public function messages(Thread $thread)
    {
        $messages = $thread->messages()->with('user')->get();

        return response()->json($messages);
    }
}


?>