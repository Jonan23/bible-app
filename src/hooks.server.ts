import type { Handle } from '@sveltejs/kit';

function decodeToken(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
  } catch {
    return null;
  }
}

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get('access_token');

  if (token) {
    const payload = decodeToken(token);
    if (payload && payload.sub) {
      event.locals.user = {
        id: payload.sub as string,
        email: (payload.email as string) ?? '',
        name: (payload.name as string) ?? '',
        phone: (payload.phone as string) ?? '',
        role: (payload.role as string) ?? 'user'
      };
    }
    event.locals.token = token;
  }

  const resolveResult = await resolve(event);
  return resolveResult;
};
