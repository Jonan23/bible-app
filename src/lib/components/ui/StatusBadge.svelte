<script lang="ts">
  let {
    variant = 'default',
    size = 'sm',
    class: className = '',
    children,
  }: {
    variant?: 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'default';
    size?: 'sm' | 'md';
    class?: string;
    children?: import('svelte').Snippet;
  } = $props();

  const variants: Record<string, string> = {
    success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',
    warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    danger: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
    info: 'bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    default: 'bg-navy-100 dark:bg-navy-700 text-navy-600 dark:text-cream-200 border-navy-200 dark:border-navy-600',
  };

  const sizes: Record<string, string> = {
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-2.5 py-1 text-xs',
  };
</script>

<span class="inline-flex items-center gap-1 rounded-full font-medium border leading-none {sizes[size]} {variants[variant]} {className}">
  {@render children?.()}
</span>
