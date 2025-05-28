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
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBmiHistory();
  }, []);

  const fetchBmiHistory = async () => {
    try {
      const response = await api.get("/bmi/history");
      setBmiData(response.data.current);
      setHistory(response.data.history);
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
      setBmiData(response.data);
      fetchBmiHistory();
    } catch (err: any) {
      setError(err.response?.data?.message || "Error calculating BMI");
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
            <div className="mt-4 text-sm text-red-500">{error}</div>
          )}

          {bmiData && (
            <div className="mt-6 space-y-4">
              <Separator />
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Your BMI:</span>
                  <span className={`text-lg font-bold ${getBmiColor(bmiData.category)}`}>
                    {bmiData.bmi}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Category:</span>
                  <span className={`text-sm font-medium ${getBmiColor(bmiData.category)}`}>
                    {bmiData.category}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Last calculated:</span>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(bmiData.last_calculated), "MMM d, yyyy HH:mm")}
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
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 