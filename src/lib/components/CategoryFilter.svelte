<script lang="ts">
  let {
    categories,
    selected,
    onchange,
    allLabel = 'All',
    labels,
  }: {
    categories: readonly string[];
    selected: string | null;
    onchange: (category: string | null) => void;
    allLabel?: string;
    labels?: Record<string, string>;
  } = $props();
</script>

<div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
  <button
    onclick={() => onchange(null)}
    class="px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors
      {selected === null
        ? 'bg-navy-500 dark:bg-navy-400 text-white'
        : 'bg-navy-500/10 dark:bg-navy-400/20 text-navy-500 dark:text-cream-200 hover:bg-navy-500/20 dark:hover:bg-navy-400/30'}"
  >
    {allLabel}
  </button>
  {#each categories as cat}
    <button
      onclick={() => onchange(cat)}
      class="px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors
        {selected === cat
          ? 'bg-navy-500 dark:bg-navy-400 text-white'
          : 'bg-navy-500/10 dark:bg-navy-400/20 text-navy-500 dark:text-cream-200 hover:bg-navy-500/20 dark:hover:bg-navy-400/30'}"
    >
      {labels?.[cat] || cat}
    </button>
  {/each}
</div>
