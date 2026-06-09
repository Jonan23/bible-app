import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const API_URL = process.env.PUBLIC_API_URL ?? 'http://localhost:3000/api/v1';

export const POST: RequestHandler = async ({ cookies, fetch }) => {
  const refresh_token = cookies.get('refresh_token');
  if (!refresh_token) {
    return new Response(JSON.stringify({ error: 'No refresh token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token }),
    signal: AbortSignal.timeout(30_000),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { access_token, refresh_token: new_refresh_token } = data.data;

  cookies.set('access_token', access_token, {
    path: '/',
    httpOnly: false,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
  });

  cookies.set('refresh_token', new_refresh_token, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30,
  });

  return json({ success: true });
};
