import { apiRequest } from '../fitness';

export async function login(email: string, password: string) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}