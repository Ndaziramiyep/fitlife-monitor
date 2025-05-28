<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use App\Models\Activity;

class BmiController extends Controller
{
    private function calculateBmiCategory(float $bmi): string
    {
        if ($bmi < 18.5) return 'Underweight';
        if ($bmi < 25) return 'Normal weight';
        if ($bmi < 30) return 'Overweight';
        return 'Obese';
    }

    public function calculate(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'height' => 'required|numeric|min:0.1|max:3', // in meters
            'weight' => 'required|numeric|min:1|max:500', // in kg
        ]);

        $height = $validated['height'];
        $weight = $validated['weight'];
        
        // Calculate BMI: weight (kg) / (height (m) * height (m))
        $bmi = $weight / ($height * $height);
        $bmiCategory = $this->calculateBmiCategory($bmi);

        // Update user's BMI data
        $user = $request->user();
        $user->update([
            'height' => $height,
            'weight' => $weight,
            'bmi' => round($bmi, 2),
            'bmi_category' => $bmiCategory,
            'last_bmi_calculation' => now(),
        ]);

        // Log the activity
        Activity::create([
            'user_id' => $user->id,
            'type' => 'bmi_calculated',
            'description' => "Calculated BMI: {$bmi} ({$bmiCategory})",
        ]);

        return response()->json([
            'bmi' => round($bmi, 2),
            'category' => $bmiCategory,
            'height' => $height,
            'weight' => $weight,
            'last_calculated' => now(),
        ]);
    }

    public function getHistory(Request $request): JsonResponse
    {
        $user = $request->user();
        $activities = Activity::where('user_id', $user->id)
            ->where('type', 'bmi_calculated')
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();

        return response()->json([
            'current' => [
                'bmi' => $user->bmi,
                'category' => $user->bmi_category,
                'height' => $user->height,
                'weight' => $user->weight,
                'last_calculated' => $user->last_bmi_calculation,
            ],
            'history' => $activities,
        ]);
    }
} 