// src/api/fitness.ts
const BASE_URL = 'https://wedev-api.sky.pro/api/fitness';

// === ТИПЫ ===
export interface Course {
  _id: string;
  nameRU: string;
  nameEN: string;
  image?: string;
  durationInDays: number;
  dailyDurationInMinutes: { from: number; to: number };
  description: string;
  directions: string[];
  fitting: string[];
  order?: number;
  difficulty: string;
  workouts: string[];
  __v: number;
}

type User = {email: string; selectedCourses:string[]}

export interface UserCourse {
  courseId: string;
}

export interface ProgressData {
  progressData: number[];
}

// === УНИВЕРСАЛЬНЫЙ API ЗАПРОС ===
export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('token');

  // Добавляем Content-Type только если есть body
  const hasBody = options.body !== undefined;
  const contentType = hasBody ? '' : undefined;

  const config: RequestInit = {
    headers: {
      ...(contentType && { 'Content-Type': contentType }),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };


  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    let errorMessage = 'Сервер недоступен';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || response.statusText;
    } catch {
      // ignore
    }
    throw new Error(errorMessage);
  }

  return response.json() as Promise<T>;
}

// === КУРСЫ ===
export async function getAllCourses(): Promise<Course[]> {
  return apiRequest<Course[]>('/courses');
}
export async function getUser(): Promise<{user:User}> {
  return apiRequest<{user:User}>(`/user/me`);
}


export async function getCourseById(courseId: string): Promise<Course> {
  return apiRequest<Course>(`/courses/${courseId}`);
}

export async function addCourse(courseId: string): Promise<UserCourse> {
  return apiRequest<UserCourse>('/users/me/courses', {
    method: 'POST',
    body: JSON.stringify({ courseId }),
  });
}

export async function deleteCourse(courseId: string): Promise<void> {
  return apiRequest<void>(`/users/me/courses/${courseId}`, { method: 'DELETE' });
}

export async function getUserProgress(courseId: string): Promise<any> {
  return apiRequest<any>(`/users/me/progress?courseId=${courseId}`);
}

export async function saveProgress(
  courseId: string,
  workoutId: string,
  progressData: number[]
): Promise<ProgressData> {
  return apiRequest<ProgressData>(`/courses/${courseId}/workouts/${workoutId}`, {
    method: 'PATCH',
    body: JSON.stringify({ progressData }),
  });
}

export async function getWorkoutById(courseId: string, workoutId: string): Promise<any> {
  return apiRequest<any>(`/courses/${courseId}/workouts/${workoutId}`);
}