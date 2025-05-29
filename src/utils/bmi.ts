export const calculateBMI = (height: number, weight: number): number => {
  // Height should be in meters, weight in kg
  const heightInMeters = height / 100; // Convert cm to meters
  return weight / (heightInMeters * heightInMeters);
};

export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal Weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}; 