<script lang="ts">
  import { ChevronRight } from 'lucide-svelte';

  let {
    title,
    actionTitle,
    href,
  }: {
    title: string;
    actionTitle?: string;
    href?: string;
  } = $props();
</script>

<div class="flex items-center justify-between gap-2 mb-3 sm:mb-4">
  <h2 class="text-base sm:text-lg font-semibold text-navy-900 dark:text-cream-50 truncate">{title}</h2>
  {#if actionTitle && href}
    <a {href} class="flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm font-medium text-navy-500 dark:text-cream-300 hover:text-navy-700 dark:hover:text-cream-200 transition-colors shrink-0">
      {actionTitle}
      <ChevronRight size={14} />
    </a>
  {/if}
</div>
