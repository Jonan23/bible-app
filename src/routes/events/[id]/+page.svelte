<script lang="ts">
  import { page } from '$app/stores';
  import { createQuery, useQueryClient } from '@tanstack/svelte-query';
  import { api } from '$lib/api';
  import { toEventCard } from '$lib/utils/adapters';
  import { formatDate, getTimeRemaining } from '$lib/utils/helpers';
  import { TRIP_DETAIL, EVENT_TYPE_LABELS } from '$lib/constants';
  import BackButtonBar from '$lib/components/BackButtonBar.svelte';
  import DataStateHandler from '$lib/components/DataStateHandler.svelte';
  import { Calendar, MapPin, Users, Clock } from 'lucide-svelte';

  const queryClient = useQueryClient();

  const detailQuery = createQuery({
    queryKey: () => ['event-detail', $page.params.id],
    queryFn: () => api.events.getById($page.params.id),
    enabled: () => !!$page.params.id,
  });

  let event = $derived($detailQuery.data ? toEventCard($detailQuery.data) : null);

  let countdown = $derived(event ? getTimeRemaining(event.startDate) : { days: 0, hours: 0, minutes: 0 });
  let hasCountdown = $derived(event && new Date(event.startDate) > new Date());
</script>

<svelte:head>
  <title>{event?.title ?? 'Loading...'} - Bible Teaching</title>
</svelte:head>

<BackButtonBar title={event?.title} />

<DataStateHandler loading={$detailQuery.isLoading} error={$detailQuery.isError} onretry={() => queryClient.invalidateQueries({ queryKey: ['event-detail'] })}>
  {#if event}
    {#if event.imageUrl}
      <div class="relative h-44 sm:h-56 md:h-64">
        <img src={event.imageUrl} alt={event.title} class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div class="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
          <span class="inline-block text-white text-xs font-medium px-2.5 sm:px-3 py-1 rounded-full mb-1.5 sm:mb-2 bg-navy-500/90">
            {EVENT_TYPE_LABELS[event.type]}
          </span>
          <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">{event.title}</h1>
        </div>
      </div>
    {:else}
      <div class="px-4 sm:px-6 pt-3 sm:pt-4 pb-2">
        <span class="inline-block text-white text-xs font-medium px-2.5 sm:px-3 py-1 rounded-full mb-2 bg-navy-500">
          {EVENT_TYPE_LABELS[event.type]}
        </span>
        <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-navy-900 dark:text-cream-50 leading-tight">{event.title}</h1>
      </div>
    {/if}

    {#if hasCountdown}
      <div class="px-4 sm:px-6 mb-4 sm:mb-6 mt-3 sm:mt-4">
        <div class="bg-white dark:bg-navy-800 rounded-xl p-4 sm:p-5 shadow-sm border border-cream-200 dark:border-navy-700">
          <h3 class="text-xs sm:text-sm font-semibold text-navy-500 dark:text-cream-300 mb-2.5 sm:mb-3 uppercase tracking-wider">{TRIP_DETAIL.timeRemaining}</h3>
          <div class="flex gap-3 sm:gap-4">
            <div class="text-center min-w-12 sm:min-w-16">
              <span class="block text-xl sm:text-2xl font-bold text-navy-900 dark:text-cream-50">{countdown.days}</span>
              <span class="text-xs text-navy-400 dark:text-cream-200">Days</span>
            </div>
            <div class="text-center min-w-12 sm:min-w-16">
              <span class="block text-xl sm:text-2xl font-bold text-navy-900 dark:text-cream-50">{countdown.hours}</span>
              <span class="text-xs text-navy-400 dark:text-cream-200">Hours</span>
            </div>
            <div class="text-center min-w-12 sm:min-w-16">
              <span class="block text-xl sm:text-2xl font-bold text-navy-900 dark:text-cream-50">{countdown.minutes}</span>
              <span class="text-xs text-navy-400 dark:text-cream-200">Mins</span>
            </div>
          </div>
        </div>
      </div>
    {/if}

    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div class="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl bg-white dark:bg-navy-800 shadow-sm">
          <Calendar size={18} class="text-navy-500 dark:text-cream-300 shrink-0" />
          <div class="min-w-0">
            <p class="text-xs text-navy-400 dark:text-cream-200">{TRIP_DETAIL.labels.date}</p>
            <p class="text-sm font-medium text-navy-900 dark:text-cream-50">{formatDate(event.startDate)} - {formatDate(event.endDate)}</p>
          </div>
        </div>
        <div class="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl bg-white dark:bg-navy-800 shadow-sm">
          <MapPin size={18} class="text-navy-500 dark:text-cream-300 shrink-0" />
          <div class="min-w-0">
            <p class="text-xs text-navy-400 dark:text-cream-200">{TRIP_DETAIL.labels.location}</p>
            <p class="text-sm font-medium text-navy-900 dark:text-cream-50 truncate">{event.location}</p>
          </div>
        </div>
        {#if event.price}
          <div class="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl bg-white dark:bg-navy-800 shadow-sm">
            <Clock size={18} class="text-navy-500 dark:text-cream-300 shrink-0" />
            <div>
              <p class="text-xs text-navy-400 dark:text-cream-200">{TRIP_DETAIL.labels.price}</p>
              <p class="text-sm font-medium text-navy-900 dark:text-cream-50">{event.price}</p>
            </div>
          </div>
        {/if}
        {#if event.capacity}
          <div class="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl bg-white dark:bg-navy-800 shadow-sm">
            <Users size={18} class="text-navy-500 dark:text-cream-300 shrink-0" />
            <div>
              <p class="text-xs text-navy-400 dark:text-cream-200">{TRIP_DETAIL.labels.capacity}</p>
              <p class="text-sm font-medium text-navy-900 dark:text-cream-50">{event.registered}/{event.capacity} {TRIP_DETAIL.labels.registered}</p>
            </div>
          </div>
        {/if}
      </div>

      <div class="mb-6 sm:mb-8">
        <h2 class="text-lg sm:text-xl font-bold text-navy-900 dark:text-cream-50 mb-3 sm:mb-4">{TRIP_DETAIL.aboutTitle}</h2>
        <p class="text-sm sm:text-base text-navy-500 dark:text-cream-200 leading-relaxed whitespace-pre-line">{event.longDescription || event.description}</p>
      </div>

      {#if event.schedule.length > 0}
        <div class="mb-6 sm:mb-8">
          <h2 class="text-lg sm:text-xl font-bold text-navy-900 dark:text-cream-50 mb-3 sm:mb-4">{TRIP_DETAIL.scheduleTitle}</h2>
          <div class="space-y-2 sm:space-y-3">
            {#each event.schedule as item}
              <div class="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white dark:bg-navy-800 shadow-sm">
                <span class="text-xs sm:text-sm font-semibold text-navy-500 dark:text-cream-300 shrink-0 w-14 sm:w-16">{item.time}</span>
                <div class="min-w-0">
                  <p class="text-sm font-medium text-navy-900 dark:text-cream-50">{item.title}</p>
                  {#if item.description}
                    <p class="text-xs sm:text-sm text-navy-400 dark:text-cream-200 mt-0.5 sm:mt-1">{item.description}</p>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      {#if event.gallery.length > 0}
        <div class="mb-6 sm:mb-8">
          <h2 class="text-lg sm:text-xl font-bold text-navy-900 dark:text-cream-50 mb-3 sm:mb-4">{TRIP_DETAIL.galleryTitle}</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {#each event.gallery as img}
              <img src={img} alt="" class="w-full h-28 sm:h-32 object-cover rounded-xl" />
            {/each}
          </div>
        </div>
      {/if}

      <div class="bg-navy-500 dark:bg-navy-400 rounded-xl p-5 sm:p-6 text-center">
        <h2 class="text-lg sm:text-xl font-bold text-white mb-1.5 sm:mb-2">{TRIP_DETAIL.ctaTitle}</h2>
        <p class="text-sm text-white/80 mb-3 sm:mb-4">{TRIP_DETAIL.ctaText}</p>
        {#if event.registrationUrl}
          <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer"
            class="inline-block px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-white text-navy-500 font-semibold text-sm sm:text-base hover:bg-cream-50 transition-colors">
            {event.price ? `${TRIP_DETAIL.registerPrefix}${event.price}` : TRIP_DETAIL.registerFallback}
          </a>
        {:else}
          <p class="text-sm text-white/80">{TRIP_DETAIL.alertMessage}</p>
        {/if}
      </div>
    </div>
  {/if}
</DataStateHandler>
