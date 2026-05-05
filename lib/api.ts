import type {
  AuthTokens,
  LoginPayload,
  RegisterPayload,
  Box,
  BoxCreatePayload,
  BoxUpdatePayload,
  Alert,
  DeviceHistoryEntry,
  ApiError,
} from "./types";

// ─── Base URL ────────────────────────────────────────────────────────────────

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ─── Token Helpers ───────────────────────────────────────────────────────────

function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refresh_token");
}

function setTokens(tokens: AuthTokens) {
  localStorage.setItem("access_token", tokens.access);
  localStorage.setItem("refresh_token", tokens.refresh);
}

function clearTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

// ─── Generic Fetch Wrapper ───────────────────────────────────────────────────

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAccessToken();

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Only set Content-Type to JSON if body is not FormData
  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorData: ApiError = {};
    try {
      errorData = await response.json();
    } catch {
      // response wasn't JSON
    }

    const message =
      errorData.detail ||
      errorData.error ||
      (typeof errorData === "object"
        ? Object.values(errorData)
            .flat()
            .join(", ")
        : `HTTP ${response.status}`);

    throw new Error(message as string);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

// ─── Auth API ────────────────────────────────────────────────────────────────

export async function apiLogin(payload: LoginPayload): Promise<AuthTokens> {
  const tokens = await apiFetch<AuthTokens>("/api/auth/login/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  setTokens(tokens);
  return tokens;
}

export async function apiRegister(
  payload: RegisterPayload
): Promise<Record<string, unknown>> {
  return apiFetch<Record<string, unknown>>("/api/auth/register/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function apiLogout(): Promise<void> {
  const refresh = getRefreshToken();
  try {
    await apiFetch<void>("/api/auth/logout/", {
      method: "POST",
      body: JSON.stringify({ refresh }),
    });
  } finally {
    clearTokens();
  }
}

// ─── Boxes API ───────────────────────────────────────────────────────────────

export async function apiGetBoxes(): Promise<Box[]> {
  return apiFetch<Box[]>("/api/boxes/");
}

export async function apiGetBox(id: number): Promise<Box> {
  return apiFetch<Box>(`/api/boxes/${id}/`);
}

export async function apiCreateBox(payload: BoxCreatePayload): Promise<Box> {
  return apiFetch<Box>("/api/boxes/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function apiUpdateBox(
  id: number,
  payload: BoxUpdatePayload
): Promise<Box> {
  return apiFetch<Box>(`/api/boxes/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function apiDeleteBox(id: number): Promise<void> {
  return apiFetch<void>(`/api/boxes/${id}/`, {
    method: "DELETE",
  });
}

export async function apiUploadBoxImage(
  id: number,
  file: File
): Promise<{ image_url: string; image_public_id: string }> {
  const formData = new FormData();
  formData.append("image", file);

  return apiFetch<{ image_url: string; image_public_id: string }>(
    `/api/boxes/${id}/upload-image/`,
    {
      method: "POST",
      body: formData,
    }
  );
}

// ─── Device History API ──────────────────────────────────────────────────────

export async function apiGetDeviceHistory(
  deviceId: string,
  limit = 100
): Promise<DeviceHistoryEntry[]> {
  return apiFetch<DeviceHistoryEntry[]>(
    `/api/devices/${deviceId}/history/?limit=${limit}`
  );
}

// ─── Alerts API ──────────────────────────────────────────────────────────────

export async function apiGetAlerts(params?: {
  resolved?: boolean;
  device_id?: string;
}): Promise<Alert[]> {
  const searchParams = new URLSearchParams();
  if (params?.resolved !== undefined) {
    searchParams.set("resolved", String(params.resolved));
  }
  if (params?.device_id) {
    searchParams.set("device_id", params.device_id);
  }
  const qs = searchParams.toString();
  return apiFetch<Alert[]>(`/api/alerts/${qs ? `?${qs}` : ""}`);
}

export async function apiResolveAlert(id: number): Promise<Alert> {
  return apiFetch<Alert>(`/api/alerts/${id}/resolve/`, {
    method: "PATCH",
  });
}

// ─── WebSocket ───────────────────────────────────────────────────────────────

export function createDeviceWebSocket(deviceId: string): WebSocket | null {
  const token = getAccessToken();
  if (!token) return null;

  const wsBase = BASE_URL.replace(/^http/, "ws");
  return new WebSocket(
    `${wsBase}/ws/device/${deviceId}/?token=${token}`
  );
}

// ─── Re-exports ──────────────────────────────────────────────────────────────

export { getAccessToken, clearTokens };
