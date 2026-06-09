<script lang="ts">
  import { page } from '$app/stores';
  import { Home, BookOpen, Play, Map, Info, BookOpen as LogoIcon } from 'lucide-svelte';
  import { APP_NAME } from '$lib/constants';

  const tabs = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/blog', label: 'Blog', icon: BookOpen },
    { href: '/videos', label: 'Videos', icon: Play },
    { href: '/events', label: 'Events', icon: Map },
    { href: '/about', label: 'About', icon: Info },
  ] as const;

  let pathname = $derived($page.url.pathname);

  let activeIndex = $derived.by(() => {
    if (pathname === '/') return 0;
    const prefixes: [string, number][] = [['/blog', 1], ['/videos', 2], ['/events', 3], ['/about', 4]];
    for (const [prefix, idx] of prefixes) {
      if (pathname.startsWith(prefix)) return idx;
    }
    return 0;
  });
</script>

<nav class="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-cream-50 dark:bg-navy-900 border-t border-cream-200 dark:border-navy-700">
  <div class="flex items-center justify-around h-16 px-2">
    {#each tabs as tab, i}
      <a
        href={tab.href}
        class="flex flex-col items-center justify-center gap-0.5 py-1 px-2 rounded-lg transition-colors min-w-0
          {i === activeIndex ? 'text-navy-500 dark:text-cream-300' : 'text-navy-300 dark:text-cream-400 hover:text-navy-400 dark:hover:text-cream-400'}"
      >
        <tab.icon size={22} />
        <span class="text-[10px] font-medium leading-tight">{tab.label}</span>
      </a>
    {/each}
  </div>
</nav>

<aside class="hidden md:flex fixed left-0 top-0 bottom-0 z-50 w-64 bg-cream-50 dark:bg-navy-900 border-r border-cream-200 dark:border-navy-700 flex-col">
  <div class="flex items-center gap-2.5 px-5 h-16 border-b border-cream-200 dark:border-navy-700 shrink-0">
    <LogoIcon class="text-navy-500 dark:text-cream-300 shrink-0" size={24} />
    <span class="text-base font-bold text-navy-900 dark:text-cream-50">{APP_NAME}</span>
  </div>
  <nav class="flex-1 flex flex-col gap-1 p-3">
    {#each tabs as tab, i}
      <a
        href={tab.href}
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium
          {i === activeIndex ? 'bg-navy-500/10 dark:bg-navy-400/10 text-navy-500 dark:text-cream-300' : 'text-navy-400 dark:text-cream-400 hover:bg-cream-100 dark:hover:bg-navy-800 hover:text-navy-600 dark:hover:text-cream-300'}"
      >
        <tab.icon size={20} />
        <span>{tab.label}</span>
      </a>
    {/each}
  </nav>
</aside>
