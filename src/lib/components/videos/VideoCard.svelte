<script lang="ts">
  import { Play, Clock, Eye } from 'lucide-svelte';
  import { formatDate } from '$lib/utils/helpers';
  import type { Video } from '$lib/types';

  let { video, href, featured = false }: { video: Video; href: string; featured?: boolean } = $props();

  let showProgress = $derived(video.watchProgress !== undefined && video.watchProgress > 0);
</script>

<a {href} class="block rounded-xl overflow-hidden bg-white dark:bg-navy-800 shadow-sm hover:shadow-md transition-shadow">
  {#if featured}
    <div class="relative">
      {#if video.thumbnailUrl}
        <img src={video.thumbnailUrl} alt={video.title} class="w-full h-40 sm:h-48 lg:h-56 object-cover" />
      {:else}
        <div class="w-full h-40 sm:h-48 lg:h-56 bg-cream-200 dark:bg-navy-700"></div>
      {/if}
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-12 h-12 sm:w-14 sm:h-14 bg-white/90 rounded-full flex items-center justify-center">
          <Play size={22} class="text-navy-500 ml-0.5" fill="currentColor" />
        </div>
      </div>
      <div class="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-black/60">
        <span class="flex items-center gap-1 text-white text-xs font-medium"><Clock size={12} />{video.duration}</span>
      </div>
      {#if showProgress}
        <div class="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
          <div class="h-full bg-navy-500" style="width: {video.watchProgress}%"></div>
        </div>
      {/if}
    </div>
    <div class="p-3 sm:p-4">
      <div class="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
        <span class="text-xs font-medium px-2.5 py-0.5 rounded-full bg-navy-500/10 dark:bg-navy-400/20 text-navy-500 dark:text-cream-300">{video.category}</span>
        <span class="flex items-center gap-1 text-xs text-navy-400 dark:text-cream-200"><Eye size={12} />{video.views}</span>
      </div>
      <h3 class="text-base sm:text-lg font-semibold text-navy-900 dark:text-cream-50 mb-1 line-clamp-2">{video.title}</h3>
      <p class="text-sm text-navy-500 dark:text-cream-200 truncate">{video.speaker}</p>
    </div>
  {:else}
    <div class="relative">
      {#if video.thumbnailUrl}
        <img src={video.thumbnailUrl} alt={video.title} class="w-full h-32 sm:h-36 lg:h-40 object-cover" />
      {:else}
        <div class="w-full h-32 sm:h-36 lg:h-40 bg-cream-200 dark:bg-navy-700"></div>
      {/if}
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-9 h-9 sm:w-10 sm:h-10 bg-white/90 rounded-full flex items-center justify-center">
          <Play size={16} class="text-navy-500 ml-0.5" fill="currentColor" />
        </div>
      </div>
      <div class="absolute bottom-1.5 sm:bottom-2 right-1.5 sm:right-2 px-1.5 sm:px-2 py-0.5 rounded bg-black/60">
        <span class="text-white text-[11px] sm:text-xs font-medium">{video.duration}</span>
      </div>
      {#if showProgress}
        <div class="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
          <div class="h-full bg-navy-500" style="width: {video.watchProgress}%"></div>
        </div>
      {/if}
    </div>
    <div class="p-2.5 sm:p-3">
      <h3 class="text-sm font-semibold text-navy-900 dark:text-cream-50 line-clamp-2 mb-1">{video.title}</h3>
      <p class="text-xs text-navy-400 dark:text-cream-200 truncate">{video.speaker} · {formatDate(video.date)}</p>
    </div>
  {/if}
</a>
