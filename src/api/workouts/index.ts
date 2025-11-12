// src/api/workouts/index.ts
import { apiRequest } from '../client';
import type { Workout } from '../types';

// GET /api/fitness/courses/[courseId]/workouts
export async function getCourseWorkouts(courseId: string): Promise<Workout[]> {
  return apiRequest<Workout[]>(`/courses/${courseId}/workouts`);
}

// GET /api/fitness/workouts/[workoutId]
export async function getWorkoutById(workoutId: string): Promise<Workout> {
  return apiRequest<Workout>(`/workouts/${workoutId}`);
}

// PATCH /api/fitness/courses/[courseId]/workouts/[workoutId]
export async function saveWorkoutProgress(
  courseId: string,
  workoutId: string,
  progressData: number[]
): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`/courses/${courseId}/workouts/${workoutId}`, {
    method: 'PATCH',
    body: JSON.stringify({ progressData }),
  });
}

// PATCH /api/fitness/courses/[courseId]/workouts/[workoutId]/reset
export async function resetWorkoutProgress(
  courseId: string,
  workoutId: string
): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(
    `/courses/${courseId}/workouts/${workoutId}/reset`,
    {
      method: 'PATCH',
    }
  );
}