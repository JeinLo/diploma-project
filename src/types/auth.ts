export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface AuthErrors {
  email?: string;
  password?: string;
  confirm?: string;
  general?: string;
}