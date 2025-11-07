const BASE_URL = 'https://wedev-api.sky.pro/api/fitness';

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
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
    const error = await response.json().catch(() => ({ message: 'Сервер недоступен' }));
    throw new Error(error.message || response.statusText);
  }

  return response.json();
}

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

export async function getUserProgress(courseId: string) {
  return apiRequest(`/users/me/progress?courseId=${courseId}`);
}

export async function saveProgress(courseId: string, workoutId: string, progressData: number[]) {
  return apiRequest(`/courses/${courseId}/workouts/${workoutId}`, {
    method: 'PATCH',
    body: JSON.stringify({ progressData }),
  });
}

export async function getWorkoutById(courseId: string, workoutId: string) {
  return apiRequest(`/courses/${courseId}/workouts/${workoutId}`);
}