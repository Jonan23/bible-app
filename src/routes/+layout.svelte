<script lang="ts">
  import '../app.css';
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
  import { page } from '$app/stores';
  import { auth } from '$lib/stores/auth.svelte';
  import { theme } from '$lib/stores/theme.svelte';
  import AppHeader from '$lib/components/AppHeader.svelte';
  import BottomTabBar from '$lib/components/BottomTabBar.svelte';

  let { children } = $props();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: 5 * 60 * 1000, retry: 2 },
    },
  });

  $effect(() => {
    const user = $page.data.user;
    auth.setUser(user);
  });

  let isAuthPage = $derived(
    $page.url.pathname.startsWith('/login') || $page.url.pathname.startsWith('/register')
  );
</script>

<QueryClientProvider client={queryClient}>
  <div class="min-h-screen bg-cream-50 dark:bg-navy-900 flex">
    {#if !isAuthPage}
      <BottomTabBar />
    {/if}
    <div class="flex-1 flex flex-col min-w-0 {isAuthPage ? '' : 'md:ml-64 pb-16 md:pb-0'}">
      <AppHeader />
      <main class="flex-1 w-full">
        {#key $page.url.pathname}
          {@render children()}
        {/key}
      </main>
    </div>
  </div>
</QueryClientProvider>
