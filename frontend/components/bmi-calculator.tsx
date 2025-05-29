"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import api from "@/src/services/api";
import { format } from "date-fns";

interface BmiData {
  bmi: number;
  category: string;
  height: number;
  weight: number;
  last_calculated: string;
}

interface BmiHistory {
  id: number;
  description: string;
  created_at: string;
}

export function BmiCalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmiData, setBmiData] = useState<BmiData | null>(null);
  const [history, setHistory] = useState<BmiHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>("");

  useEffect(() => {
    fetchBmiHistory();
  }, []);

  const fetchBmiHistory = async () => {
    try {
      const response = await api.get("/bmi/history");
      const currentBmi = response.data.current;
      setBmiData({
        ...currentBmi,
        bmi: parseFloat(currentBmi.bmi)
      });
      setHistory(response.data.history);
      console.log('Fetched BMI History:', response.data);
    } catch (err) {
      console.error("Error fetching BMI history:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/bmi/calculate", {
        height: parseFloat(height),
        weight: parseFloat(weight),
      });
      console.log("BMI Calculation Response:", response.data);
      setBmiData(response.data);
      fetchBmiHistory();
    } catch (err: any) {
      setError(err.response?.data?.message || "Error calculating BMI");
      console.error("BMI Calculation Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getBmiColor = (category: string) => {
    switch (category) {
      case "Underweight":
        return "text-blue-500";
      case "Normal weight":
        return "text-green-500";
      case "Overweight":
        return "text-yellow-500";
      case "Obese":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const handleDeleteHistory = async (id: number) => {
    try {
      // Implement API call to delete history item
      await api.delete(`/bmi/history/${id}`);
      // After successful deletion, update the history state
      setHistory(history.filter(item => item.id !== id));
      // Also refresh the current BMI data in case the latest entry was deleted
      fetchBmiHistory();
    } catch (error) {
      console.error('Failed to delete BMI history:', error);
      // Optionally show a user-friendly error message
      setError('Failed to delete history item.');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>BMI Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="height">Height (meters)</Label>
                <Input
                  id="height"
                  type="number"
                  step="0.01"
                  min="0.1"
                  max="3"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g., 1.75"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  min="1"
                  max="500"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g., 70"
                  required
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? "Calculating..." : "Calculate BMI"}
              </Button>
            </div>
          </form>

          {error && (
            <div className="mt-4 text-sm text-red-500">{typeof error === 'string' ? error : 'An unknown error occurred.'}</div>
          )}

          {bmiData && (
            <div className="mt-6 space-y-4">
              <Separator />
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Your BMI:</span>
                  <span className={`text-lg font-bold ${getBmiColor(bmiData.category)}`}>
                    {typeof bmiData.bmi === 'number' ? bmiData.bmi.toFixed(1) : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Category:</span>
                  <span className={`text-sm font-medium ${getBmiColor(bmiData.category)}`}>
                    {typeof bmiData.category === 'string' ? bmiData.category : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Last calculated:</span>
                  <span className="text-sm text-muted-foreground">
                    {typeof bmiData.last_calculated === 'string' ? format(new Date(bmiData.last_calculated), "MMM d, yyyy HH:mm") : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {history.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>BMI History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {history.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <span className="text-sm">{item.description}</span>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(item.created_at), "MMM d, yyyy")}
                  </span>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteHistory(item.id)}>Delete</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 