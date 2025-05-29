import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { calculateBMI, getBMICategory } from '@/utils/bmi';

interface BMIStatusProps {
  height: number;
  weight: number;
}

const BMIStatus: React.FC<BMIStatusProps> = ({ height, weight }) => {
  const { user } = useAuth();
  const [bmi, setBMI] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBMI = async () => {
      if (!user) return;

      try {
        setLoading(true);
        setError(null);

        // Calculate BMI from current height and weight
        const currentBMI = calculateBMI(height, weight);
        setBMI(currentBMI);
        setCategory(getBMICategory(currentBMI));

        // Update BMI in database
        const { error: updateError } = await supabase
          .from('user_health_metrics')
          .upsert({
            user_id: user.id,
            bmi: currentBMI,
            height,
            weight,
            updated_at: new Date().toISOString()
          });

        if (updateError) throw updateError;

      } catch (err) {
        console.error('Error updating BMI:', err);
        setError('Failed to update BMI data');
      } finally {
        setLoading(false);
      }
    };

    fetchBMI();
  }, [user, height, weight]);

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'underweight':
        return '#FFA726'; // Orange
      case 'normal weight':
        return '#66BB6A'; // Green
      case 'overweight':
        return '#FFA726'; // Orange
      case 'obese':
        return '#EF5350'; // Red
      default:
        return '#90A4AE'; // Grey
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={100}>
            <CircularProgress />
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent>
          <Typography color="error">{error}</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          BMI Status
        </Typography>
        {bmi !== null && (
          <>
            <Typography variant="h4" component="div" gutterBottom>
              {bmi.toFixed(1)}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: getCategoryColor(category),
                fontWeight: 'bold'
              }}
            >
              {category}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default BMIStatus; 