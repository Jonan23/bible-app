<script lang="ts">
  import { Calendar, MapPin, Users } from 'lucide-svelte';
  import { formatDate } from '$lib/utils/helpers';
  import { EVENT_TYPE_LABELS } from '$lib/constants';
  import type { MinistryEvent } from '$lib/types';

  let { event, href, featured = false }: { event: MinistryEvent; href: string; featured?: boolean } = $props();
</script>

<a {href} class="block rounded-xl overflow-hidden bg-white dark:bg-navy-800 shadow-sm hover:shadow-md transition-shadow">
  {#if featured}
    {#if event.imageUrl}
      <img src={event.imageUrl} alt={event.title} class="w-full h-36 sm:h-44 md:h-52 object-cover" />
    {:else}
      <div class="w-full h-36 sm:h-44 md:h-52 bg-cream-200 dark:bg-navy-700"></div>
    {/if}
    <div class="p-4 sm:p-5">
      <span class="inline-block text-white text-xs font-medium px-2.5 sm:px-3 py-1 rounded-full mb-2 bg-navy-500 dark:bg-navy-400">{EVENT_TYPE_LABELS[event.type]}</span>
      <h3 class="text-base sm:text-lg md:text-xl font-semibold text-navy-900 dark:text-cream-50 mb-2 line-clamp-2">{event.title}</h3>
      <p class="text-sm text-navy-500 dark:text-cream-200 line-clamp-2 mb-3 sm:mb-4">{event.description}</p>
      <div class="space-y-1.5 sm:space-y-2">
        <span class="flex items-center gap-1.5 text-xs sm:text-sm text-navy-500 dark:text-cream-200"><Calendar size={14} />{formatDate(event.startDate)} - {formatDate(event.endDate)}</span>
        <span class="flex items-center gap-1.5 text-xs sm:text-sm text-navy-500 dark:text-cream-200"><MapPin size={14} />{event.location}</span>
        {#if event.capacity}
          <span class="flex items-center gap-1.5 text-xs sm:text-sm text-navy-500 dark:text-cream-200"><Users size={14} />{event.registered}/{event.capacity} registered</span>
        {/if}
      </div>
    </div>
  {:else}
    <div class="flex">
      <div class="w-14 sm:w-16 bg-navy-500 dark:bg-navy-400 flex flex-col items-center justify-center py-2.5 sm:py-3 shrink-0">
        <span class="text-white text-lg sm:text-xl font-bold">{new Date(event.startDate).getDate()}</span>
        <span class="text-white text-[10px] sm:text-xs font-medium uppercase">{new Date(event.startDate).toLocaleString(undefined, { month: 'short' })}</span>
      </div>
      <div class="flex-1 p-2.5 sm:p-3 flex flex-col justify-center min-w-0">
        <h3 class="text-sm font-semibold text-navy-900 dark:text-cream-50 truncate mb-0.5 sm:mb-1">{event.title}</h3>
        <span class="flex items-center gap-1 text-xs text-navy-400 dark:text-cream-200"><MapPin size={10} />{event.location}</span>
      </div>
    </div>
  {/if}
</a>
