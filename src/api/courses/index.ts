import { apiRequest } from '../client';
import type { Course, Workout } from '../types';

// GET /api/fitness/courses
export async function getAllCourses(): Promise<Course[]> {
  return apiRequest<Course[]>('/courses');
}

// GET /api/fitness/courses/[courseId]
export async function getCourseById(courseId: string): Promise<Course> {
  return apiRequest<Course>(`/courses/${courseId}`);
}

// GET /api/fitness/courses/[courseId]/workouts
export async function getCourseWorkouts(courseId: string): Promise<Workout[]> {
  return apiRequest<Workout[]>(`/courses/${courseId}/workouts`);
}

// PATCH /api/fitness/courses/[courseId]/reset
export async function resetCourseProgress(courseId: string): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`/courses/${courseId}/reset`, {
    method: 'PATCH',
  });
}