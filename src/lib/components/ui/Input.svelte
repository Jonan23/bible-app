<script lang="ts">
  let {
    type = 'text',
    value,
    placeholder,
    label,
    error,
    icon,
    name,
    required = false,
    rows,
    class: className = '',
    oninput,
    onblur,
    disabled = false,
  }: {
    type?: string;
    value?: string;
    placeholder?: string;
    label?: string;
    error?: string;
    icon?: import('svelte').Snippet;
    name?: string;
    required?: boolean;
    rows?: number;
    class?: string;
    oninput?: (e: Event) => void;
    onblur?: (e: Event) => void;
    disabled?: boolean;
  } = $props();
</script>

{#if label}
  <label for={name} class="block text-sm font-medium text-navy-700 dark:text-cream-100 mb-1.5">{label}</label>
{/if}

{#if rows}
  <div class="relative">
    {#if icon}
      <div class="absolute left-3 top-3 text-navy-300 dark:text-cream-300 shrink-0">
        {@render icon()}
      </div>
    {/if}
    <textarea
      {name}
      {required}
      {placeholder}
      {rows}
      bind:value
      {disabled}
      oninput={oninput}
      onblur={onblur}
      class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-cream-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-navy-900 dark:text-cream-50 placeholder:text-navy-300 dark:placeholder:text-cream-400 outline-none focus:ring-2 focus:ring-navy-500/40 transition-all resize-none text-sm sm:text-base {icon ? 'pl-10 sm:pl-11' : ''} {error ? 'border-red-300 dark:border-red-700 focus:ring-red-500/40' : ''} {className}"
    ></textarea>
  </div>
{:else}
  <div class="relative">
    {#if icon}
      <div class="absolute left-3 top-1/2 -translate-y-1/2 text-navy-300 dark:text-cream-300 shrink-0">
        {@render icon()}
      </div>
    {/if}
    <input
      {type}
      {name}
      {required}
      {placeholder}
      bind:value
      {disabled}
      oninput={oninput}
      onblur={onblur}
      class="w-full h-11 sm:h-12 px-3 sm:px-4 rounded-xl border border-cream-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-navy-900 dark:text-cream-50 placeholder:text-navy-300 dark:placeholder:text-cream-400 outline-none focus:ring-2 focus:ring-navy-500/40 transition-all text-sm sm:text-base {icon ? 'pl-10 sm:pl-11' : ''} {error ? 'border-red-300 dark:border-red-700 focus:ring-red-500/40' : ''} {className}"
    />
  </div>
{/if}

{#if error}
  <p class="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
{/if}
