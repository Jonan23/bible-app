<script lang="ts">
  import { Clock } from 'lucide-svelte';
  import { formatDate } from '$lib/utils/helpers';
  import { getCategoryStyle } from '$lib/constants';
  import type { BlogPost } from '$lib/types';

  let { post, href, featured = false }: { post: BlogPost; href: string; featured?: boolean } = $props();

  let style = $derived(getCategoryStyle(post.category));
</script>

<a {href} class="block rounded-xl overflow-hidden bg-white dark:bg-navy-800 shadow-sm hover:shadow-md transition-shadow">
  {#if featured}
    <div class="relative">
      {#if post.imageUrl}
        <img src={post.imageUrl} alt={post.title} class="w-full h-44 sm:h-52 md:h-60 object-cover" />
      {:else}
        <div class="w-full h-44 sm:h-52 md:h-60 bg-cream-200 dark:bg-navy-700"></div>
      {/if}
    </div>
    <div class="p-4 sm:p-5">
      <div class="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
        <span class="text-xs font-medium px-3 py-1 rounded-full {style.badge}">{post.category}</span>
        <span class="flex items-center gap-1 text-xs text-navy-400 dark:text-cream-200"><Clock size={12} />{post.readingTime}</span>
      </div>
      <h3 class="text-base sm:text-lg md:text-xl font-semibold text-navy-900 dark:text-cream-50 mb-2 line-clamp-2">{post.title}</h3>
      <p class="text-sm text-navy-500 dark:text-cream-200 line-clamp-2 mb-4">{post.excerpt}</p>
      <div class="flex items-center gap-3">
        {#if post.author.avatar}
          <img src={post.author.avatar} alt={post.author.name} class="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover" />
        {:else}
          <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cream-200 dark:bg-navy-700 flex items-center justify-center">
            <span class="text-xs font-bold text-navy-500 dark:text-cream-300">{post.author.name.charAt(0)}</span>
          </div>
        {/if}
        <div class="min-w-0">
          <p class="text-sm font-medium text-navy-700 dark:text-cream-200 truncate">{post.author.name}</p>
          <p class="text-xs text-navy-400 dark:text-cream-200">{formatDate(post.date)}</p>
        </div>
      </div>
    </div>
  {:else}
    <div class="flex">
      {#if post.imageUrl}
        <img src={post.imageUrl} alt={post.title} class="w-20 h-20 sm:w-24 sm:h-24 object-cover shrink-0" />
      {:else}
        <div class="w-20 h-20 sm:w-24 sm:h-24 bg-cream-200 dark:bg-navy-700 shrink-0"></div>
      {/if}
      <div class="flex-1 p-3 flex flex-col justify-center min-w-0">
        <div class="flex items-center gap-2 mb-1 flex-wrap">
          <span class="text-[11px] sm:text-xs font-medium {style.text}">{post.category}</span>
          <span class="text-xs text-navy-400 dark:text-cream-200">· {post.readingTime}</span>
        </div>
        <h3 class="text-sm font-semibold text-navy-900 dark:text-cream-50 line-clamp-2 mb-1">{post.title}</h3>
        <p class="text-xs text-navy-400 dark:text-cream-200">{formatDate(post.date)}</p>
      </div>
    </div>
  {/if}
</a>
