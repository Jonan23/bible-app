<script lang="ts">
  let {
    src,
    name,
    size = 48,
  }: {
    src?: string;
    name?: string;
    size?: number;
  } = $props();

  let initials = $derived(
    name
      ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      : ''
  );
</script>

<div class="rounded-full overflow-hidden bg-cream-200 dark:bg-navy-700 shrink-0" style="width: {size}px; height: {size}px;">
  {#if src}
    <img {src} alt={name ?? ''} class="w-full h-full object-cover" style="width: {size}px; height: {size}px;" />
  {:else}
    <div class="w-full h-full flex items-center justify-center">
      <span class="font-semibold text-navy-500 dark:text-cream-300" style="font-size: {size * 0.4}px;">
        {initials}
      </span>
    </div>
  {/if}
</div>
