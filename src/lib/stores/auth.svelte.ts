import type { User } from '$lib/types';

function createAuthStore() {
  let user = $state<User | null>(null);
  let isAuthenticated = $derived(user !== null);

  return {
    get user() { return user; },
    get isAuthenticated() { return isAuthenticated; },
    setUser(u: User | null) {
      user = u;
    },
    clear() {
      user = null;
    },
  };
}

export const auth = createAuthStore();
