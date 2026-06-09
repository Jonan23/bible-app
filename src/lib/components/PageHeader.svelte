<script lang="ts">
  let {
    title,
    description,
    children,
  }: {
    title: string;
    description?: string;
    children?: import('svelte').Snippet;
  } = $props();
</script>

<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5 sm:mb-6 lg:mb-8">
  <div class="min-w-0">
    <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-navy-900 dark:text-cream-50 truncate">{title}</h1>
    {#if description}
      <p class="text-sm text-navy-400 dark:text-cream-300 mt-1">{description}</p>
    {/if}
  </div>
  {#if children}
    <div class="shrink-0 flex items-center gap-2">
      {@render children()}
    </div>
  {/if}
</div>
