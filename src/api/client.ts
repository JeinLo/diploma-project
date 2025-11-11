const BASE_URL = 'https://wedev-api.sky.pro/api/fitness';

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('token');
  const hasBody = options.body !== undefined;

  const config: RequestInit = {
    headers: {
      ...(hasBody && { 'Content-Type': '' }),
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