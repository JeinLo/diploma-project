// src/api/fitness.ts
const API_URL = 'https://wedev-api.sky.pro/api/fitness';

export async function getAllCourses() {
  const res = await fetch(`${API_URL}/courses`);
  if (!res.ok) throw new Error('Не удалось загрузить курсы');
  return res.json();
}

export async function getCourseById(courseId: string) {
  const res = await fetch(`${API_URL}/courses/${courseId}`);
  if (!res.ok) throw new Error('Курс не найден');
  return res.json();
}

export async function addCourse(courseId: string) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Требуется авторизация');

  const res = await fetch(`${API_URL}/users/courses`, {
    method: 'POST',
    headers: {
      'Content-Type': '',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ courseId }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Не удалось добавить курс');
  }
  return res.json();
}

export async function deleteCourse(courseId: string) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Требуется авторизация');

  const res = await fetch(`${API_URL}/users/courses/${courseId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': '',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Не удалось удалить курс');
  }
  return res.json();
}

export async function getWorkoutById(courseId: string, workoutId: string) {
  const res = await fetch(`${API_URL}/courses/${courseId}/workouts/${workoutId}`);
  if (!res.ok) throw new Error('Тренировка не найдена');
  return res.json();
}

export async function getUserProgress(courseId: string) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Требуется авторизация');

  const res = await fetch(`${API_URL}/users/progress/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Не удалось загрузить прогресс');
  return res.json();
}

export async function saveProgress(courseId: string, workoutId: string, progressData: number[]) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Требуется авторизация');

  const res = await fetch(`${API_URL}/users/progress`, {
    method: 'POST',
    headers: {
      'Content-Type': '',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ courseId, workoutId, progressData }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Не удалось сохранить прогресс');
  }
  return res.json();
}