import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

const API_URL = process.env.PUBLIC_API_URL ?? 'http://localhost:3000/api/v1';

export const actions: Actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    if (!email || !password) {
      return fail(400, { error: 'Email and password are required', email });
    }

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        signal: AbortSignal.timeout(30_000),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        return fail(res.status, { error: json.message || 'Login failed', email });
      }

      const { access_token, refresh_token } = json.data;

      cookies.set('access_token', access_token, {
        path: '/',
        httpOnly: false,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
      });

      cookies.set('refresh_token', refresh_token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30,
      });
    } catch (e) {
      const msg = e instanceof DOMException && e.name === 'TimeoutError'
        ? 'Server is taking too long to respond. Please try again.'
        : 'Unable to connect to server. Please try again.';
      return fail(500, { error: msg, email });
    }

    throw redirect(303, '/');
  },
};
