<script lang="ts">
  import { Search, X } from 'lucide-svelte';

  let {
    value,
    onchange,
    placeholder = 'Search...',
    onclear,
  }: {
    value: string;
    onchange: (val: string) => void;
    placeholder?: string;
    onclear?: () => void;
  } = $props();
</script>

<div class="flex items-center bg-cream-100 dark:bg-navy-700 rounded-xl px-4 py-3 w-full">
  <Search size={18} class="text-navy-300 dark:text-cream-300 shrink-0" />
  <input
    type="search"
    bind:value
    oninput={(e) => onchange((e.target as HTMLInputElement).value)}
    {placeholder}
    class="flex-1 ml-3 bg-transparent text-navy-900 dark:text-cream-50 placeholder:text-navy-300 dark:placeholder:text-cream-400 outline-none text-base"
  />
  {#if value.length > 0 && onclear}
    <button onclick={onclear} class="ml-2 text-navy-300 dark:text-cream-300 hover:text-navy-500 dark:hover:text-cream-200 transition-colors" aria-label="Clear search">
      <X size={18} />
    </button>
  {/if}
</div>
