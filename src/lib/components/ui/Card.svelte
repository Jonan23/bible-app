<script lang="ts">
  let {
    children,
    class: className = '',
    href,
    onclick,
    hover = true,
    border = false,
    padding = true,
  }: {
    children?: import('svelte').Snippet;
    class?: string;
    href?: string;
    onclick?: (e: MouseEvent) => void;
    hover?: boolean;
    border?: boolean;
    padding?: boolean;
  } = $props();

  let cls = $derived([
    'rounded-xl overflow-hidden bg-white dark:bg-navy-800 shadow-sm',
    hover ? 'hover:shadow-md transition-shadow' : '',
    border ? 'border border-cream-200 dark:border-navy-700' : '',
    padding ? 'p-4 sm:p-5' : '',
    className,
  ].filter(Boolean).join(' '));
</script>

{#if href}
  <a {href} class={cls}>
    {@render children?.()}
  </a>
{:else if onclick}
  <button {onclick} class="block w-full text-left {cls}">
    {@render children?.()}
  </button>
{:else}
  <div class={cls}>
    {@render children?.()}
  </div>
{/if}
