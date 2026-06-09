<script lang="ts">
  import { ArrowLeft, Share2 } from 'lucide-svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  let {
    title,
    onshare,
  }: {
    title?: string;
    onshare?: () => void;
  } = $props();

  function goBack() {
    goto($page.url.pathname.split('/').slice(0, -1).join('/') || '/');
  }

  let canShare = $state(false);

  $effect(() => {
    canShare = typeof navigator !== 'undefined' && !!navigator.share;
  });

  async function handleShare() {
    if (onshare) { onshare(); return; }
    if (typeof navigator !== 'undefined' && navigator.share) {
      await navigator.share({ title, url: window.location.href });
    }
  }
</script>

<div class="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3">
  <button
    onclick={goBack}
    class="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-cream-100 dark:bg-navy-700 text-navy-500 dark:text-cream-100 hover:bg-cream-200 dark:hover:bg-navy-600 transition-colors"
    aria-label="Go back"
  >
    <ArrowLeft size={18} />
  </button>
  {#if title}
    <h1 class="text-sm sm:text-lg font-bold text-navy-900 dark:text-cream-50 truncate mx-1.5 sm:mx-2">{title}</h1>
  {:else}
    <div class="flex-1"></div>
  {/if}
  <button
    onclick={handleShare}
    class="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-cream-100 dark:bg-navy-700 text-navy-500 dark:text-cream-100 hover:bg-cream-200 dark:hover:bg-navy-600 transition-colors"
    aria-label="Share"
  >
    <Share2 size={16} />
  </button>
</div>
