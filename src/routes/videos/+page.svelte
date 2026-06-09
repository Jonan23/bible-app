<script lang="ts">
  import { createQuery, useQueryClient } from '@tanstack/svelte-query';
  import { api } from '$lib/api';
  import { toVideoCard } from '$lib/utils/adapters';
  import VideoCard from '$lib/components/videos/VideoCard.svelte';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import CategoryFilter from '$lib/components/CategoryFilter.svelte';
  import DataStateHandler from '$lib/components/DataStateHandler.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import { VIDEOS } from '$lib/constants';
  import { CATEGORIES } from '$lib/constants';

  const queryClient = useQueryClient();

  const videosQuery = createQuery({
    queryKey: ['videos-list'],
    queryFn: () => api.videos.list({ limit: 50 }),
  });

  let search = $state('');
  let selectedCategory = $state<string | null>(null);

  let videos = $derived(($videosQuery.data?.data ?? []).map(toVideoCard));

  let filteredVideos = $derived(
    videos.filter(v => {
      if (selectedCategory && v.category !== selectedCategory) return false;
      if (search && !v.title.toLowerCase().includes(search.toLowerCase()) && !v.speaker.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
  );

  let featuredVideo = $derived(filteredVideos.find(v => v.featured) ?? filteredVideos[0]);
  let regularVideos = $derived(filteredVideos.filter(v => v.id !== featuredVideo?.id));
</script>

<svelte:head>
  <title>Videos - Bible Teaching</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
  <PageHeader title="Videos" description={VIDEOS.description} />

  <div class="mb-3 sm:mb-4">
    <SearchBar value={search} onchange={(v) => search = v} placeholder={VIDEOS.searchPlaceholder} onclear={() => search = ''} />
  </div>

  <div class="mb-4 sm:mb-6">
    <CategoryFilter categories={CATEGORIES.videos} selected={selectedCategory} onchange={(c) => selectedCategory = c} />
  </div>

  <DataStateHandler
    loading={$videosQuery.isLoading}
    error={$videosQuery.isError}
    onretry={() => queryClient.invalidateQueries({ queryKey: ['videos-list'] })}
    empty={filteredVideos.length === 0}
    emptyTitle={VIDEOS.emptyTitle}
    emptyMessage={VIDEOS.emptyMessage}
  >
    {#if featuredVideo}
      <div class="mb-6 sm:mb-8 max-w-2xl mx-auto">
        <VideoCard video={featuredVideo} href={`/videos/${featuredVideo.id}`} featured />
      </div>
    {/if}

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {#each regularVideos as video}
        <VideoCard {video} href={`/videos/${video.id}`} />
      {/each}
    </div>
  </DataStateHandler>
</div>
