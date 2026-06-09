<script lang="ts">
  import { SectionHeader } from '$lib/components';
  import { HOME } from '$lib/constants';
  import { getCategoryStyle } from '$lib/constants';
  import { formatDate } from '$lib/utils/helpers';
  import type { BlogPost, Video, MinistryEvent } from '$lib/types';

  let {
    title,
    items,
    href,
    hrefPrefix,
    error = false,
  }: {
    title: string;
    items: (Video | BlogPost | MinistryEvent)[];
    href: string;
    hrefPrefix: string;
    error?: boolean;
  } = $props();

  function getItemTitle(item: Video | BlogPost | MinistryEvent): string {
    return item.title;
  }

  function getItemCategory(item: Video | BlogPost | MinistryEvent): string {
    if ('category' in item && item.category) return item.category;
    if ('type' in item) return item.type;
    return 'General';
  }

  function getItemSubtitle(item: Video | BlogPost | MinistryEvent): string {
    if ('speaker' in item) return `${item.speaker} · ${item.duration}`;
    if ('author' in item) return `${item.author.name} · ${item.readingTime}`;
    if ('location' in item) return item.location;
    return '';
  }

  function getItemImage(item: Video | BlogPost | MinistryEvent): string {
    if ('thumbnailUrl' in item) return item.thumbnailUrl;
    if ('imageUrl' in item) return item.imageUrl;
    return '';
  }

  function getItemId(item: Video | BlogPost | MinistryEvent): string {
    return item.id;
  }

  function isHorizontal(item: Video | BlogPost | MinistryEvent): boolean {
    return 'speaker' in item || 'location' in item;
  }
</script>

<div class="mb-6">
  <div class="px-4 sm:px-6">
    <SectionHeader {title} actionTitle={HOME.viewAll} {href} />
  </div>
  {#if error && items.length === 0}
    <div class="mx-4 sm:mx-6 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
      <p class="text-sm text-red-700 dark:text-red-400 text-center">Could not load content. Pull down to retry.</p>
    </div>
  {:else if items.length > 0}
    {#if isHorizontal(items[0])}
      <div class="flex gap-3 sm:gap-4 overflow-x-auto px-4 sm:px-6 pb-2 scrollbar-none">
        {#each items.slice(0, 4) as item}
          {@const catStyle = getCategoryStyle(getItemCategory(item))}
          <a href={`${hrefPrefix}/${getItemId(item)}`} class="shrink-0 w-56 sm:w-64 rounded-xl overflow-hidden bg-white dark:bg-navy-800 shadow-sm hover:shadow-md transition-shadow">
            {#if getItemImage(item)}
              <img src={getItemImage(item)} alt={getItemTitle(item)} class="w-full h-32 sm:h-36 object-cover" />
            {:else}
              <div class="w-full h-32 sm:h-36 bg-cream-200 dark:bg-navy-700"></div>
            {/if}
            <div class="p-3 sm:p-4">
              <span class="inline-block text-[11px] sm:text-xs font-medium px-2.5 py-0.5 rounded-full {catStyle.badge}">{getItemCategory(item)}</span>
              <h3 class="text-sm sm:text-base font-semibold text-navy-900 dark:text-cream-50 line-clamp-2 mt-1.5">{getItemTitle(item)}</h3>
              <p class="text-xs sm:text-sm text-navy-500 dark:text-cream-200 mt-1">{getItemSubtitle(item)}</p>
            </div>
          </a>
        {/each}
      </div>
    {:else}
      <div class="px-4 sm:px-6 space-y-3">
        {#each items.slice(0, 3) as item}
          {@const catStyle = getCategoryStyle(getItemCategory(item))}
          <a href={`${hrefPrefix}/${getItemId(item)}`}
            class="flex bg-white dark:bg-navy-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div class="w-1 shrink-0 {catStyle.accent}"></div>
            <div class="flex-1 p-3 sm:p-4 min-w-0">
              <p class="text-xs text-navy-400 dark:text-cream-200 mb-1">
                {getItemCategory(item)} · {formatDate('date' in item ? item.date : '')}
              </p>
              <h3 class="text-sm sm:text-base font-semibold text-navy-900 dark:text-cream-50 line-clamp-2 mb-1">{getItemTitle(item)}</h3>
              <p class="text-xs sm:text-sm text-navy-500 dark:text-cream-200 line-clamp-2">{'excerpt' in item ? item.excerpt : ''}</p>
            </div>
          </a>
        {/each}
      </div>
    {/if}
  {/if}
</div>
