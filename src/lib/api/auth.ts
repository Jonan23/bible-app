const TIMEOUT = 30_000;

export const authApi = {
  login: async (email: string, password: string) => {
    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      signal: AbortSignal.timeout(TIMEOUT),
    });
    return res.json();
  },

  register: async (name: string, email: string, password: string) => {
    const res = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
      signal: AbortSignal.timeout(TIMEOUT),
    });
    return res.json();
  },

  logout: async () => {
    await fetch('/logout', {
      method: 'POST',
      signal: AbortSignal.timeout(TIMEOUT),
    });
  },
};
