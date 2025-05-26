import React, { useState } from 'react';
import { WorkoutList } from '../components/WorkoutList';
import { WorkoutForm } from '../components/WorkoutForm';

const WorkoutsPage = () => {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Workouts</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {showForm ? 'Hide Form' : 'Add Workout'}
                </button>
            </div>

            {showForm && (
                <div className="mb-8">
                    <WorkoutForm onSuccess={() => setShowForm(false)} />
                </div>
            )}

            <WorkoutList />
        </div>
    );
};

export default WorkoutsPage; 