<script lang="ts">
  import { page } from '$app/stores';
  import { Bell, Search } from 'lucide-svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { APP_HEADER } from '$lib/constants';

  let {
    title = APP_HEADER.defaultTitle,
    showSearch = true,
    unreadCount = 0,
  }: {
    title?: string;
    showSearch?: boolean;
    unreadCount?: number;
  } = $props();

  let user = $derived($page.data.user);
  let isAuthenticated = $derived(user !== null);
</script>

<header class="sticky top-0 z-50 bg-cream-50/90 dark:bg-navy-900/90 backdrop-blur-md border-b border-cream-200 dark:border-navy-700">
  <div class="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-4 h-14 sm:h-16">
    <a href="/" class="text-base sm:text-lg font-bold text-navy-900 dark:text-cream-50 hover:text-navy-700 dark:hover:text-cream-200 transition-colors truncate">
      {title}
    </a>
    <nav class="flex items-center gap-1 sm:gap-2 shrink-0">
      {#if showSearch}
        <a href="/search" class="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-cream-100 dark:bg-navy-700 text-navy-500 dark:text-cream-100 hover:bg-cream-200 dark:hover:bg-navy-600 transition-colors" aria-label="Search">
          <Search size={18} />
        </a>
      {/if}
      <a href="/notifications" class="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-cream-100 dark:bg-navy-700 text-navy-500 dark:text-cream-100 hover:bg-cream-200 dark:hover:bg-navy-600 transition-colors relative" aria-label="Notifications">
        <Bell size={18} />
        {#if unreadCount > 0}
          <span class="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 w-2 h-2 rounded-full bg-red-500"></span>
        {/if}
      </a>
      {#if isAuthenticated && user}
        <a href="/settings" class="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-navy-500 dark:bg-navy-400 text-white text-xs sm:text-sm font-bold hover:bg-navy-600 dark:hover:bg-navy-300 transition-colors" aria-label="Settings">
          {user.name?.charAt(0).toUpperCase() || '?'}
        </a>
      {:else}
        <Button href="/login" size="sm">Sign In</Button>
      {/if}
    </nav>
  </div>
</header>
