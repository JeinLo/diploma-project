import { apiRequest } from '../client';
import type { RegisterResponse } from './types';

export interface RegisterPayload {
  email: string;
  password: string;
}

export async function register(payload: RegisterPayload): Promise<RegisterResponse> {
  return apiRequest<RegisterResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}