<script lang="ts">
  import { createQuery, useQueryClient } from '@tanstack/svelte-query';
  import { api } from '$lib/api';
  import { toVideoCard, toBlogPostCard, toEventCard } from '$lib/utils/adapters';
  import { HERO_BANNER } from '$lib/constants';
  import SuggestionsSection from '$lib/components/home/SuggestionsSection.svelte';
  import DataStateHandler from '$lib/components/DataStateHandler.svelte';

  const queryClient = useQueryClient();

  const videosQuery = createQuery({
    queryKey: ['home-videos'],
    queryFn: () => api.videos.list({ limit: 10, featured: true }),
  });

  const blogQuery = createQuery({
    queryKey: ['home-blog'],
    queryFn: () => api.blog.list({ limit: 3, featured: true }),
  });

  const eventsQuery = createQuery({
    queryKey: ['home-events'],
    queryFn: () => api.events.list({ limit: 10, upcoming: true }),
  });

  let featuredVideos = $derived(($videosQuery.data?.data ?? []).map(toVideoCard));
  let featuredBlog = $derived(($blogQuery.data?.data ?? []).map(toBlogPostCard));
  let upcomingEvents = $derived(($eventsQuery.data?.data ?? []).map(toEventCard));

  let featuredVideo = $derived(featuredVideos.find(v => v.featured) ?? featuredVideos[0]);

  let pageLoading = $derived($videosQuery.isLoading || $blogQuery.isLoading || $eventsQuery.isLoading);
  let pageError = $derived($videosQuery.isError || $blogQuery.isError || $eventsQuery.isError);
</script>

<svelte:head>
  <title>Bible Teaching - Home</title>
</svelte:head>

<div class="max-w-6xl mx-auto px-4 sm:px-6">
  <DataStateHandler loading={pageLoading} error={pageError} onretry={() => { queryClient.invalidateQueries({ queryKey: ['home-videos'] }); queryClient.invalidateQueries({ queryKey: ['home-blog'] }); queryClient.invalidateQueries({ queryKey: ['home-events'] }); }}>
    {#if featuredVideo}
      <div class="pt-4 sm:pt-6 mb-6 sm:mb-8">
        <a href={`/videos/${featuredVideo.id}`} class="block relative rounded-xl sm:rounded-2xl overflow-hidden shadow-md">
          {#if featuredVideo.thumbnailUrl}
            <img src={featuredVideo.thumbnailUrl} alt={featuredVideo.title} class="w-full h-48 sm:h-56 md:h-64 object-cover" />
          {:else}
            <div class="w-full h-48 sm:h-56 md:h-64 bg-navy-500 dark:bg-navy-400"></div>
          {/if}
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <span class="absolute top-3 left-3 sm:top-4 sm:left-4 bg-navy-500/90 dark:bg-navy-400/90 text-white text-xs font-medium px-2.5 sm:px-3 py-1 rounded-full">{HERO_BANNER.badge}</span>
          <div class="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
            <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2 line-clamp-2">{featuredVideo.title}</h2>
            <p class="text-sm sm:text-base text-white/80">{featuredVideo.speaker}</p>
          </div>
        </a>
      </div>
    {/if}

    <SuggestionsSection title="Latest Sermons" items={featuredVideos} href="/videos" hrefPrefix="/videos" error={$videosQuery.isError} />

    <SuggestionsSection title="Latest Articles" items={featuredBlog} href="/blog" hrefPrefix="/blog" error={$blogQuery.isError} />

    <SuggestionsSection title="Upcoming Events" items={upcomingEvents} href="/events" hrefPrefix="/events" error={$eventsQuery.isError} />
  </DataStateHandler>
</div>
