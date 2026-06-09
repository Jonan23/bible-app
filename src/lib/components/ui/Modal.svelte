<script lang="ts">
  import { X } from 'lucide-svelte';

  let {
    open,
    title,
    size = 'md',
    onclose,
    children,
    footer,
  }: {
    open: boolean;
    title?: string;
    size?: 'sm' | 'md' | 'lg';
    onclose: () => void;
    children?: import('svelte').Snippet;
    footer?: import('svelte').Snippet;
  } = $props();

  const widths: Record<string, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  function handleBackdrop(e: MouseEvent) {
    if (e.target === e.currentTarget) onclose();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') onclose();
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    onclick={handleBackdrop}
    role="dialog"
    aria-modal="true"
    tabindex="-1"
    transition:opacity={{ duration: 150 }}
  >
    <div
      class="w-full {widths[size]} bg-white dark:bg-navy-800 rounded-2xl shadow-2xl max-h-[85vh] overflow-hidden"
      transition:scale={{ start: 0.95, duration: 150 }}
    >
      {#if title}
        <div class="flex items-center justify-between px-6 py-4 border-b border-cream-200 dark:border-navy-700">
          <h2 class="text-base font-semibold text-navy-900 dark:text-cream-50">{title}</h2>
          <button
            onclick={onclose}
            class="w-8 h-8 flex items-center justify-center rounded-full text-navy-400 dark:text-cream-300 hover:bg-cream-100 dark:hover:bg-navy-700 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
      {/if}

      <div class="overflow-y-auto px-6 py-4">
        {@render children?.()}
      </div>

      {#if footer}
        <div class="flex items-center justify-end gap-2 px-6 py-4 border-t border-cream-200 dark:border-navy-700">
          {@render footer()}
        </div>
      {/if}
    </div>
  </div>
{/if}
