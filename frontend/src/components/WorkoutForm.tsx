import React, { useState } from 'react';
import { workoutApi, Workout } from '../services/api';

interface WorkoutFormProps {
    onSuccess: () => void;
}

export const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        type: '',
        start_time: '',
        end_time: '',
        duration_minutes: '',
        calories_burned: '',
        notes: '',
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await workoutApi.create({
                ...formData,
                duration_minutes: parseInt(formData.duration_minutes),
                calories_burned: formData.calories_burned ? parseInt(formData.calories_burned) : undefined,
            });
            setFormData({
                type: '',
                start_time: '',
                end_time: '',
                duration_minutes: '',
                calories_burned: '',
                notes: '',
            });
            setError(null);
            onSuccess();
        } catch (err) {
            setError('Failed to create workout');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold">Add New Workout</h2>
            {error && <div className="text-red-500">{error}</div>}
            
            <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Start Time</label>
                <input
                    type="datetime-local"
                    name="start_time"
                    value={formData.start_time}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">End Time</label>
                <input
                    type="datetime-local"
                    name="end_time"
                    value={formData.end_time}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
                <input
                    type="number"
                    name="duration_minutes"
                    value={formData.duration_minutes}
                    onChange={handleChange}
                    required
                    min="1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Calories Burned</label>
                <input
                    type="number"
                    name="calories_burned"
                    value={formData.calories_burned}
                    onChange={handleChange}
                    min="0"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Add Workout
            </button>
        </form>
    );
}; 