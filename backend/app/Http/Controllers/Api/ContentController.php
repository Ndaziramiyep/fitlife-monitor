<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Content;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use App\Models\Activity;

class ContentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Only retrieve content for the authenticated user
        // Eager load the user relationship to get author information
        $contents = Auth::user()->contents()->with('user')->latest()->get();

        return response()->json($contents);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'status' => 'sometimes|string', // Allow setting status on creation
        ]);

        $content = Auth::user()->contents()->create($request->all());

        // Log content creation
        Activity::create([
            'user_id' => Auth::id(),
            'type' => 'content_created',
            'description' => 'Created content: ' . $content->title,
        ]);

        return response()->json($content, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Content $content)
    {
        // Authorize that the user owns the content or is an admin
        Gate::authorize('view', $content);

        return response()->json($content);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Content $content)
    {
        // Authorize that the user owns the content or is an admin
        Gate::authorize('update', $content);

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'body' => 'sometimes|required|string',
            'status' => 'sometimes|string', // Allow updating status
        ]);

        $content->update($request->all());

         // Log content update
        Activity::create([
            'user_id' => Auth::id(),
            'type' => 'content_updated',
            'description' => 'Updated content: ' . $content->title,
        ]);

        return response()->json($content);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Content $content)
    {
        // Authorize that the user owns the content or is an admin
        Gate::authorize('delete', $content);

        $contentTitle = $content->title; // Get title before deletion
        $content->delete();

        // Log content deletion
        Activity::create([
            'user_id' => Auth::id(),
            'type' => 'content_deleted',
            'description' => 'Deleted content: ' . $contentTitle,
        ]);

        return response()->json(['message' => 'Content deleted']);
    }
} 