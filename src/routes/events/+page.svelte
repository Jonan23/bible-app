<script lang="ts">
  import { createQuery, useQueryClient } from '@tanstack/svelte-query';
  import { api } from '$lib/api';
  import { toEventCard } from '$lib/utils/adapters';
  import EventCard from '$lib/components/events/EventCard.svelte';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import CategoryFilter from '$lib/components/CategoryFilter.svelte';
  import DataStateHandler from '$lib/components/DataStateHandler.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import { TRIPS_LIST } from '$lib/constants';
  import { CATEGORIES, EVENT_TYPE_LABELS } from '$lib/constants';

  const queryClient = useQueryClient();

  const eventsQuery = createQuery({
    queryKey: ['events-list'],
    queryFn: () => api.events.list({ limit: 50, upcoming: true }),
  });

  let search = $state('');
  let selectedCategory = $state<string | null>(null);

  let events = $derived(($eventsQuery.data?.data ?? []).map(toEventCard));

  let filteredEvents = $derived(
    events.filter(e => {
      if (selectedCategory && e.type !== selectedCategory) return false;
      if (search && !e.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
  );

  let featuredEvent = $derived(filteredEvents.find(e => e.featured) ?? filteredEvents[0]);
  let regularEvents = $derived(filteredEvents.filter(e => e.id !== featuredEvent?.id));
</script>

<svelte:head>
  <title>Events & Trips - Bible Teaching</title>
</svelte:head>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
  <PageHeader title={TRIPS_LIST.title} description={TRIPS_LIST.description} />

  <div class="mb-3 sm:mb-4">
    <SearchBar value={search} onchange={(v) => search = v} placeholder={TRIPS_LIST.searchPlaceholder} onclear={() => search = ''} />
  </div>

  <div class="mb-4 sm:mb-6">
    <CategoryFilter categories={CATEGORIES.events} selected={selectedCategory} onchange={(c) => selectedCategory = c} labels={EVENT_TYPE_LABELS} />
  </div>

  <DataStateHandler
    loading={$eventsQuery.isLoading}
    error={$eventsQuery.isError}
    onretry={() => queryClient.invalidateQueries({ queryKey: ['events-list'] })}
    empty={filteredEvents.length === 0}
    emptyTitle={TRIPS_LIST.emptyTitle}
    emptyMessage={TRIPS_LIST.emptyMessage}
  >
    {#if featuredEvent}
      <div class="mb-6 sm:mb-8">
        <EventCard event={featuredEvent} href={`/events/${featuredEvent.id}`} featured />
      </div>
    {/if}

    <div class="space-y-3 sm:space-y-4">
      {#each regularEvents as event}
        <EventCard {event} href={`/events/${event.id}`} />
      {/each}
    </div>
  </DataStateHandler>
</div>
