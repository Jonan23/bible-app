import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, locals }) => {
  const theme = cookies.get('theme') ?? null;
  return {
    user: locals.user ?? null,
    theme
  };
};
