<script lang="ts">
  import { Loader } from 'lucide-svelte';
  import Button from '$lib/components/ui/Button.svelte';

  let {
    loading,
    error,
    empty = false,
    onretry,
    errorMessage = 'Something went wrong. Please try again.',
    emptyTitle,
    emptyMessage,
    children,
  }: {
    loading: boolean;
    error: boolean;
    empty?: boolean;
    onretry: () => void;
    errorMessage?: string;
    emptyTitle?: string;
    emptyMessage?: string;
    children?: import('svelte').Snippet;
  } = $props();
</script>

{#if loading}
  <div class="flex items-center justify-center py-12 sm:py-16">
    <Loader size={24} class="text-navy-400 dark:text-cream-200 animate-spin" />
  </div>
{:else if error}
  <div class="flex flex-col items-center justify-center py-12 sm:py-16 px-4 sm:px-6">
    <p class="text-sm text-navy-500 dark:text-cream-200 text-center mb-3 sm:mb-4 leading-relaxed">{errorMessage}</p>
    <Button onclick={onretry}>Retry</Button>
  </div>
{:else if empty && emptyTitle}
  <div class="flex flex-col items-center justify-center py-12 sm:py-16">
    <p class="text-base sm:text-lg font-semibold text-navy-700 dark:text-cream-200 text-center">{emptyTitle}</p>
    {#if emptyMessage}
      <p class="text-sm text-navy-500 dark:text-cream-200 text-center mt-1.5 sm:mt-2 max-w-md leading-relaxed">{emptyMessage}</p>
    {/if}
  </div>
{:else}
  {@render children?.()}
{/if}
