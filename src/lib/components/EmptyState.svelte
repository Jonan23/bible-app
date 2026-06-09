<script lang="ts">
  import { Inbox } from 'lucide-svelte';

  let {
    title,
    message,
    icon,
    action,
  }: {
    title: string;
    message?: string;
    icon?: import('svelte').Snippet;
    action?: import('svelte').Snippet;
  } = $props();
</script>

<div class="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
  <div class="w-16 h-16 rounded-2xl bg-cream-100 dark:bg-navy-700 flex items-center justify-center mb-4 text-navy-300 dark:text-cream-400">
    {#if icon}
      {@render icon()}
    {:else}
      <Inbox size={28} />
    {/if}
  </div>
  <h3 class="text-base sm:text-lg font-semibold text-navy-700 dark:text-cream-200 text-center mb-1.5 sm:mb-2">{title}</h3>
  {#if message}
    <p class="text-xs sm:text-sm text-navy-400 dark:text-cream-200 text-center max-w-md leading-relaxed">{message}</p>
  {/if}
  {#if action}
    <div class="mt-4 sm:mt-5">
      {@render action()}
    </div>
  {/if}
</div>
