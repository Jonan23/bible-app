import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

const API_URL = process.env.PUBLIC_API_URL ?? 'http://localhost:3000/api/v1';

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const request_text = data.get('request') as string;

    if (!name || !request_text) {
      return fail(400, { error: 'Name and prayer request are required', success: false });
    }

    try {
      const res = await fetch(`${API_URL}/prayer-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email: email || undefined, request: request_text }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        return fail(res.status, { error: json.message || 'Failed to submit prayer request', success: false });
      }

      return { success: true };
    } catch {
      return fail(500, { error: 'Unable to connect to server. Please try again.', success: false });
    }
  },
};
