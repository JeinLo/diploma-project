import { apiRequest } from '../client';
import type { Workout, ProgressData } from '../types';

// GET /api/fitness/workouts/[workoutId]
// ⚠️ В документации эндпоинт указан как `/workouts/[id]`, но по логике он вложен в курс.
// Однако в моем текущем коде используется: `/courses/${courseId}/workouts/${workoutId}`
// Поэтому придерживаемся этого формата.

// GET /api/fitness/courses/[courseId]/workouts/[workoutId]
export async function getWorkoutById(courseId: string, workoutId: string): Promise<Workout> {
  return apiRequest<Workout>(`/courses/${courseId}/workouts/${workoutId}`);
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
export async function resetWorkoutProgress(courseId: string, workoutId: string): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`/courses/${courseId}/workouts/${workoutId}/reset`, {
    method: 'PATCH',
  });
}