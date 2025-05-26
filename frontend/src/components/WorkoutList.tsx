import React, { useEffect, useState } from 'react';
import { workoutApi, Workout } from '../services/api';

export const WorkoutList: React.FC = () => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadWorkouts();
    }, []);

    const loadWorkouts = async () => {
        try {
            setLoading(true);
            const data = await workoutApi.getAll();
            setWorkouts(data);
            setError(null);
        } catch (err) {
            setError('Failed to load workouts');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await workoutApi.delete(id);
            setWorkouts(workouts.filter(workout => workout.id !== id));
        } catch (err) {
            setError('Failed to delete workout');
            console.error(err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Your Workouts</h2>
            <div className="grid gap-4">
                {workouts.map((workout) => (
                    <div key={workout.id} className="p-4 border rounded-lg shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-semibold">{workout.type}</h3>
                                <p className="text-gray-600">
                                    {new Date(workout.start_time).toLocaleString()} - 
                                    {new Date(workout.end_time).toLocaleString()}
                                </p>
                                <p>Duration: {workout.duration_minutes} minutes</p>
                                {workout.calories_burned && (
                                    <p>Calories burned: {workout.calories_burned}</p>
                                )}
                                {workout.notes && (
                                    <p className="mt-2 text-gray-700">{workout.notes}</p>
                                )}
                            </div>
                            <button
                                onClick={() => handleDelete(workout.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}; 