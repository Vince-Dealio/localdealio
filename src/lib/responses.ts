// ✅ Full code for src/lib/responses.ts
export interface ApiResponse<T> {
  ok: boolean;
  status: number;
  message?: string;
  data?: T;
}

export function success<T>(data: T, status = 200): ApiResponse<T> {
  return {
    ok: true,
    status,
    data,
  };
}

export function error(message: string, status = 400): ApiResponse<null> {
  return {
    ok: false,
    status,
    message,
    data: null,
  };
}
