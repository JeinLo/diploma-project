// src/api/auth/login.ts
const API_URL = 'https://wedev-api.sky.pro/api/user';

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Ошибка входа');
  }

  return res.json();
}