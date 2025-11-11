import { apiRequest } from '../client';
import type { Workout, ProgressData } from '../types';

// GET /api/fitness/workouts/[workoutId]
export async function getWorkoutById(workoutId: string): Promise<Workout> {
  return apiRequest<Workout>(`/workouts/${workoutId}`);
}

// PATCH /api/fitness/courses/[courseId]/workouts/[workoutId]
export async function saveWorkoutProgress(
  courseId: string,
  workoutId: string,
  progressData: number[]
): Promise<ProgressData> {
  return apiRequest<ProgressData>(`/courses/${courseId}/workouts/${workoutId}`, {
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