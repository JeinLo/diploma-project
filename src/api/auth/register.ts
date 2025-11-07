// src/api/auth/register.ts
const API_URL = 'https://wedev-api.sky.pro/api/user';

export async function register(email: string, password: string) {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Ошибка регистрации');
  }

  return res.json();
}