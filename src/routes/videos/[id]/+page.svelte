<script lang="ts">
  import { page } from '$app/stores';
  import { createQuery, useQueryClient } from '@tanstack/svelte-query';
  import { api } from '$lib/api';
  import { toVideoCard } from '$lib/utils/adapters';
  import { formatDate } from '$lib/utils/helpers';
  import { getCategoryStyle } from '$lib/constants';
  import { VIDEOS } from '$lib/constants';
  import BackButtonBar from '$lib/components/BackButtonBar.svelte';
  import DataStateHandler from '$lib/components/DataStateHandler.svelte';
  import VideoCard from '$lib/components/videos/VideoCard.svelte';
  import { Play, Eye, Clock } from 'lucide-svelte';

  const queryClient = useQueryClient();

  const detailQuery = createQuery({
    queryKey: ['video-detail', $page.params.id ?? ''],
    queryFn: () => api.videos.getById($page.params.id ?? ''),
    enabled: !!$page.params.id,
  });

  const suggestedQuery = createQuery({
    queryKey: ['videos-suggested'],
    queryFn: () => api.videos.list({ limit: 6 }),
  });

  let video = $derived($detailQuery.data ? toVideoCard($detailQuery.data) : null);
  let suggestedVideos = $derived(
    ($suggestedQuery.data?.data ?? [])
      .map(toVideoCard)
      .filter(v => v.id !== video?.id)
      .slice(0, 3)
  );
</script>

<svelte:head>
  <title>{video?.title ?? 'Loading...'} - Bible Teaching</title>
</svelte:head>

<BackButtonBar title={video?.title} />

<DataStateHandler loading={$detailQuery.isLoading} error={$detailQuery.isError} onretry={() => queryClient.invalidateQueries({ queryKey: ['video-detail'] })}>
  {#if video}
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
      <div class="relative rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6 bg-black aspect-video">
        {#if video.youtubeId}
          <iframe
            src="https://www.youtube.com/embed/{video.youtubeId}"
            title={video.title}
            class="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        {:else if video.thumbnailUrl}
          <img src={video.thumbnailUrl} alt={video.title} class="w-full h-full object-cover" />
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-14 h-14 sm:w-16 sm:h-16 bg-white/90 rounded-full flex items-center justify-center">
              <Play size={24} class="text-navy-500 ml-1" fill="currentColor" />
            </div>
          </div>
        {/if}
      </div>

      <div class="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-navy-400 dark:text-cream-200 mb-2 sm:mb-3">
        <span class="text-xs font-medium px-2.5 py-0.5 rounded-full bg-navy-500/10 dark:bg-navy-400/20 text-navy-500 dark:text-cream-300">{video.category}</span>
        <span class="flex items-center gap-1"><Eye size={14} />{video.views}</span>
        <span>·</span>
        <span class="flex items-center gap-1"><Clock size={14} />{video.duration}</span>
      </div>

      <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-navy-900 dark:text-cream-50 mb-1.5 sm:mb-2 leading-tight">{video.title}</h1>
      <p class="text-sm sm:text-base text-navy-500 dark:text-cream-200 mb-1">{video.speaker}</p>
      <p class="text-xs sm:text-sm text-navy-400 dark:text-cream-200 mb-4 sm:mb-6">{formatDate(video.date)}</p>

      <div class="border-t border-cream-200 dark:border-navy-700 pt-4 sm:pt-6">
        <h2 class="text-base sm:text-lg font-semibold text-navy-900 dark:text-cream-50 mb-2 sm:mb-3">{VIDEOS.descriptionTitle}</h2>
        <p class="text-sm sm:text-base text-navy-500 dark:text-cream-200 leading-relaxed sm:leading-6 whitespace-pre-line">{video.description}</p>
      </div>
    </div>

    {#if suggestedVideos.length > 0}
      <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        <h2 class="text-lg sm:text-xl font-bold text-navy-900 dark:text-cream-50 mb-3 sm:mb-4">{VIDEOS.suggestedTitle}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {#each suggestedVideos as suggested}
            <VideoCard video={suggested} href={`/videos/${suggested.id}`} />
          {/each}
        </div>
      </section>
    {/if}
  {/if}
</DataStateHandler>
