// src/api/fitness.ts
const BASE_URL = '/api/fitness';  // Твои эндпоинты из документации

// Вспомогательная функция для запросов с токеном
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  if (!response.ok) {
    throw new Error(await response.json().then((data) => data.message || response.statusText));
  }
  return response.json();
}

// === АВТОРИЗАЦИЯ ===
export async function login(email: string, password: string) {
  const data = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem('token', data.token);
  return data;
}

export async function register(email: string, password: string) {
  const data = await apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  return data;
}

export async function logout() {
  localStorage.removeItem('token');
}

// === КУРСЫ ===
export async function getAllCourses() {
  return apiRequest('/courses');
}

export async function getCourseById(courseId: string) {
  return apiRequest(`/courses/${courseId}`);
}

export async function addCourse(courseId: string) {
  return apiRequest('/users/me/courses', {
    method: 'POST',
    body: JSON.stringify({ courseId }),
  });
}

export async function deleteCourse(courseId: string) {
  return apiRequest(`/users/me/courses/${courseId}`, { method: 'DELETE' });
}

export async function resetCourse(courseId: string) {
  return apiRequest(`/courses/${courseId}/reset`, { method: 'PATCH' });
}

export async function getCourseWorkouts(courseId: string) {
  return apiRequest(`/courses/${courseId}/workouts`);
}

// === ПРОГРЕСС ===
export async function getProgress(courseId: string, workoutId?: string) {
  const params = workoutId ? `?courseId=${courseId}&workoutId=${workoutId}` : `?courseId=${courseId}`;
  return apiRequest(`/users/me/progress${params}`);
}

export async function updateProgress(courseId: string, workoutId: string, progressData: number[]) {
  return apiRequest(`/courses/${courseId}/workouts/${workoutId}`, {
    method: 'PATCH',
    body: JSON.stringify({ progressData }),
  });
}

export async function resetWorkout(courseId: string, workoutId: string) {
  return apiRequest(`/courses/${courseId}/workouts/${workoutId}/reset`, { method: 'PATCH' });
}

// === ПРОФИЛЬ ===
export async function getProfile() {
  return apiRequest('/users/me');
}