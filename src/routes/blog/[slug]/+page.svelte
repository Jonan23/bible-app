<script lang="ts">
  import { page } from '$app/stores';
  import { createQuery, useQueryClient } from '@tanstack/svelte-query';
  import { api } from '$lib/api';
  import { toBlogPostCard } from '$lib/utils/adapters';
  import { formatDate } from '$lib/utils/helpers';
  import { getCategoryStyle, BLOG } from '$lib/constants';
  import BackButtonBar from '$lib/components/BackButtonBar.svelte';
  import DataStateHandler from '$lib/components/DataStateHandler.svelte';
  import BlogCard from '$lib/components/blog/BlogCard.svelte';

  const queryClient = useQueryClient();

  const detailQuery = createQuery({
    queryKey: () => ['blog-detail', $page.params.slug],
    queryFn: () => api.blog.getBySlug($page.params.slug),
    enabled: () => !!$page.params.slug,
  });

  const relatedQuery = createQuery({
    queryKey: () => ['blog-related'],
    queryFn: () => api.blog.list({ limit: 3 }),
  });

  let post = $derived($detailQuery.data ? toBlogPostCard($detailQuery.data) : null);
  let relatedPosts = $derived(
    ($relatedQuery.data?.data ?? [])
      .map(toBlogPostCard)
      .filter(p => p.id !== post?.id)
      .slice(0, 3)
  );

  let catStyle = $derived(post ? getCategoryStyle(post.category) : null);
</script>

<svelte:head>
  <title>{post?.title ?? 'Loading...'} - Bible Teaching</title>
</svelte:head>

<BackButtonBar title={post?.title} />

<DataStateHandler loading={$detailQuery.isLoading} error={$detailQuery.isError} onretry={() => queryClient.invalidateQueries({ queryKey: ['blog-detail'] })}>
  {#if post}
    <article class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
      {#if post.imageUrl}
        <img src={post.imageUrl} alt={post.title} class="w-full h-48 sm:h-64 md:h-80 object-cover rounded-xl mb-4 sm:mb-6" />
      {/if}

      <div class="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-navy-400 dark:text-cream-200 mb-2 sm:mb-3">
        {#if catStyle}
          <span class="text-xs font-medium px-2.5 py-0.5 rounded-full {catStyle.badge}">{post.category}</span>
        {/if}
        <span>{formatDate(post.date)}</span>
        <span>·</span>
        <span>{post.readingTime}</span>
      </div>

      <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-navy-900 dark:text-cream-50 mb-3 sm:mb-4 leading-tight">{post.title}</h1>

      <div class="flex items-center gap-3 mb-6 sm:mb-8">
        {#if post.author.avatar}
          <img src={post.author.avatar} alt={post.author.name} class="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover" />
        {:else}
          <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cream-200 dark:bg-navy-700 flex items-center justify-center">
            <span class="text-xs sm:text-sm font-bold text-navy-500 dark:text-cream-300">{post.author.name.charAt(0)}</span>
          </div>
        {/if}
        <div>
          <p class="text-sm font-medium text-navy-700 dark:text-cream-200">{post.author.name}</p>
          <p class="text-xs text-navy-400 dark:text-cream-200">{post.author.role}</p>
        </div>
      </div>

      <div class="prose prose-sm sm:prose-base prose-navy dark:prose-invert max-w-none">
        {post.content}
      </div>

      {#if post.tags.length > 0}
        <div class="flex flex-wrap gap-1.5 sm:gap-2 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-cream-200 dark:border-navy-700">
          {#each post.tags as tag}
            <span class="px-2.5 sm:px-3 py-1 rounded-full bg-cream-100 dark:bg-navy-700 text-xs sm:text-sm text-navy-500 dark:text-cream-200">{tag}</span>
          {/each}
        </div>
      {/if}
    </article>

    {#if relatedPosts.length > 0}
      <section class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        <h2 class="text-lg sm:text-xl font-bold text-navy-900 dark:text-cream-50 mb-3 sm:mb-4">{BLOG.relatedArticles}</h2>
        <div class="space-y-3 sm:space-y-4">
          {#each relatedPosts as related}
            <BlogCard post={related} href={`/blog/${related.id}`} />
          {/each}
        </div>
      </section>
    {/if}
  {/if}
</DataStateHandler>
