import type { BackendPaginatedResponse } from '$lib/types/backend';

import { PUBLIC_API_URL } from '$env/static/public';

const baseUrl = PUBLIC_API_URL ?? '';
const REQUEST_TIMEOUT = 30_000;

function getToken(): string | null {
  try {
    const match = document.cookie.match(/(?:^|;\s*)access_token=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : null;
  } catch {
    return null;
  }
}

async function fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(new DOMException('Request timed out', 'TimeoutError')), REQUEST_TIMEOUT);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

async function refreshAccessToken(): Promise<boolean> {
  try {
    const res = await fetch('/api/refresh', {
      method: 'POST',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  let res = await fetchWithTimeout(`${baseUrl}${path}`, { ...options, headers, credentials: 'include' });

  if (res.status === 401) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      const newToken = getToken();
      if (newToken) headers['Authorization'] = `Bearer ${newToken}`;
      res = await fetchWithTimeout(`${baseUrl}${path}`, { ...options, headers, credentials: 'include' });
    }
  }

  const json = await res.json();
  if (!res.ok || json.success === false) {
    const msg = json.errors
      ? json.errors.map((e: { message: string }) => e.message).join('; ')
      : json.message || `Request failed: ${res.status}`;
    throw new Error(msg);
  }

  return json.data;
}

export async function requestPaginated<T>(path: string, options: RequestInit = {}): Promise<BackendPaginatedResponse<T>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  let res = await fetchWithTimeout(`${baseUrl}${path}`, { ...options, headers, credentials: 'include' });

  if (res.status === 401) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      const newToken = getToken();
      if (newToken) headers['Authorization'] = `Bearer ${newToken}`;
      res = await fetchWithTimeout(`${baseUrl}${path}`, { ...options, headers, credentials: 'include' });
    }
  }

  const json = await res.json();
  if (!res.ok || json.success === false) {
    const msg = json.errors
      ? json.errors.map((e: { message: string }) => e.message).join('; ')
      : json.message || `Request failed: ${res.status}`;
    throw new Error(msg);
  }

  return { data: json.data as T[], meta: json.meta as BackendPaginatedResponse<T>['meta'] };
}

export function getBaseUrl(): string {
  return baseUrl;
}
