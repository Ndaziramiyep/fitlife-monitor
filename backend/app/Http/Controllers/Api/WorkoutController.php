<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Workout;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class WorkoutController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $workouts = $request->user()->workouts()
            ->orderBy('start_time', 'desc')
            ->get();

        return response()->json($workouts);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'type' => 'required|string',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'duration_minutes' => 'required|integer|min:1',
            'calories_burned' => 'nullable|integer|min:0',
            'notes' => 'nullable|string',
        ]);

        $workout = $request->user()->workouts()->create($validated);

        return response()->json($workout, 201);
    }

    public function show(Workout $workout): JsonResponse
    {
        $this->authorize('view', $workout);
        return response()->json($workout);
    }

    public function update(Request $request, Workout $workout): JsonResponse
    {
        $this->authorize('update', $workout);

        $validated = $request->validate([
            'type' => 'sometimes|required|string',
            'start_time' => 'sometimes|required|date',
            'end_time' => 'sometimes|required|date|after:start_time',
            'duration_minutes' => 'sometimes|required|integer|min:1',
            'calories_burned' => 'nullable|integer|min:0',
            'notes' => 'nullable|string',
        ]);

        $workout->update($validated);

        return response()->json($workout);
    }

    public function destroy(Workout $workout): JsonResponse
    {
        $this->authorize('delete', $workout);
        $workout->delete();

        return response()->json(null, 204);
    }
} 