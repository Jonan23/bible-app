<script lang="ts">
  import { Loader } from 'lucide-svelte';

  let {
    children,
    href,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    class: className = '',
    onclick,
    type = 'button',
  }: {
    children?: import('svelte').Snippet;
    href?: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    disabled?: boolean;
    class?: string;
    onclick?: (e: MouseEvent) => void;
    type?: 'button' | 'submit';
  } = $props();

  const base = 'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

  const variants: Record<string, string> = {
    primary: 'bg-navy-500 dark:bg-navy-400 text-white hover:bg-navy-600 dark:hover:bg-navy-300',
    secondary: 'bg-cream-100 dark:bg-navy-700 text-navy-700 dark:text-cream-100 hover:bg-cream-200 dark:hover:bg-navy-600',
    outline: 'border-2 border-navy-500 dark:border-navy-400 text-navy-500 dark:text-cream-300 hover:bg-navy-50 dark:hover:bg-navy-800',
    ghost: 'text-navy-500 dark:text-cream-300 hover:bg-cream-100 dark:hover:bg-navy-700',
    danger: 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600',
    success: 'bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600',
  };

  const sizes: Record<string, string> = {
    sm: 'h-9 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  };

  let cls = $derived(`${base} ${variants[variant]} ${sizes[size]} ${className}`);
</script>

{#if href}
  <a {href} class={cls}>
    {#if loading}<Loader class="animate-spin" size={size === 'sm' ? 14 : 18} />{/if}
    {@render children?.()}
  </a>
{:else}
  <button {type} {disabled} {onclick} class={cls}>
    {#if loading}<Loader class="animate-spin" size={size === 'sm' ? 14 : 18} />{/if}
    {@render children?.()}
  </button>
{/if}
