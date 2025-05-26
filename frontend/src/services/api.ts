import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Set token from localStorage on app load
const token = typeof window !== "undefined" ? localStorage.getItem('token') : null;
if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export interface Workout {
    id: number;
    type: string;
    start_time: string;
    end_time: string;
    duration_minutes: number;
    calories_burned?: number;
    notes?: string;
    created_at: string;
    updated_at: string;
}

export const workoutApi = {
    getAll: () => api.get<Workout[]>('/workouts').then(res => res.data),
    getOne: (id: number) => api.get<Workout>(`/workouts/${id}`).then(res => res.data),
    create: (data: Omit<Workout, 'id' | 'created_at' | 'updated_at'>) => 
        api.post<Workout>('/workouts', data).then(res => res.data),
    update: (id: number, data: Partial<Workout>) => 
        api.put<Workout>(`/workouts/${id}`, data).then(res => res.data),
    delete: (id: number) => api.delete(`/workouts/${id}`),
};

export const setAuthToken = (token: string | null) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export default api; 