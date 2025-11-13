import { apiRequest } from '../client';
import type {
  UserResponse,
  UserCourse,
  CourseProgress,
  WorkoutProgress,
} from '../types';

// GET /api/fitness/users/me
export async function getUser(): Promise<UserResponse> {
  return apiRequest<UserResponse>('/users/me');
}

// POST /api/fitness/users/me/courses
export async function addCourse(courseId: string): Promise<UserCourse> {
  return apiRequest<UserCourse>('/users/me/courses', {
    method: 'POST',
    body: JSON.stringify({ courseId }),
  });
}

// DELETE /api/fitness/users/me/courses/[courseId]
export async function deleteCourse(courseId: string): Promise<void> {
  return apiRequest<void>(`/users/me/courses/${courseId}`, {
    method: 'DELETE',
  });
}

// GET /api/fitness/users/me/progress?courseId={courseId}
export async function getCourseProgress(courseId: string): Promise<CourseProgress> {
  const params = new URLSearchParams({ courseId });
  return apiRequest<CourseProgress>(`/users/me/progress?${params.toString()}`);
}

// GET /api/fitness/users/me/progress?courseId={courseId}&workoutId={workoutId}
export async function getWorkoutProgress(
  courseId: string,
  workoutId: string
): Promise<WorkoutProgress> {
  const params = new URLSearchParams({ courseId, workoutId });
  return apiRequest<WorkoutProgress>(`/users/me/progress?${params.toString()}`);
}