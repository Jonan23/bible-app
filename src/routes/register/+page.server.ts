import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

const API_URL = process.env.PUBLIC_API_URL ?? 'http://localhost:3000/api/v1';

export const actions: Actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    if (!name || !email || !password) {
      return fail(400, { error: 'All fields are required', name, email });
    }

    if (password.length < 8) {
      return fail(400, { error: 'Password must be at least 8 characters', name, email });
    }

    if (!/[A-Z]/.test(password)) {
      return fail(400, { error: 'Password must contain at least one uppercase letter', name, email });
    }

    if (!/[a-z]/.test(password)) {
      return fail(400, { error: 'Password must contain at least one lowercase letter', name, email });
    }

    if (!/[0-9]/.test(password)) {
      return fail(400, { error: 'Password must contain at least one number', name, email });
    }

    if (name.length < 2) {
      return fail(400, { error: 'Name must be at least 2 characters', name, email });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return fail(400, { error: 'Please enter a valid email address', name, email });
    }

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        return fail(res.status, { error: json.message || 'Registration failed', name, email });
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
    } catch {
      return fail(500, { error: 'Unable to connect to server. Please try again.', name, email });
    }

    throw redirect(303, '/');
  },
};
