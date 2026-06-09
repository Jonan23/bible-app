<script lang="ts">
  import { createQuery, useQueryClient } from '@tanstack/svelte-query';
  import { api } from '$lib/api';
  import { toBlogPostCard } from '$lib/utils/adapters';
  import BlogCard from '$lib/components/blog/BlogCard.svelte';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import CategoryFilter from '$lib/components/CategoryFilter.svelte';
  import DataStateHandler from '$lib/components/DataStateHandler.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import { BLOG } from '$lib/constants';
  import { CATEGORIES } from '$lib/constants';

  const queryClient = useQueryClient();

  const blogQuery = createQuery({
    queryKey: ['blog-list'],
    queryFn: () => api.blog.list({ limit: 50 }),
  });

  let search = $state('');
  let selectedCategory = $state<string | null>(null);

  let posts = $derived(($blogQuery.data?.data ?? []).map(toBlogPostCard));

  let filteredPosts = $derived(
    posts.filter(p => {
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.excerpt.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
  );

  let featuredPost = $derived(filteredPosts.find(p => p.featured) ?? filteredPosts[0]);
  let regularPosts = $derived(filteredPosts.filter(p => p.id !== featuredPost?.id));
</script>

<svelte:head>
  <title>Blog - Bible Teaching</title>
</svelte:head>

<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
  <PageHeader title="Blog" description={BLOG.description} />

  <div class="mb-3 sm:mb-4">
    <SearchBar value={search} onchange={(v) => search = v} placeholder={BLOG.searchPlaceholder} onclear={() => search = ''} />
  </div>

  <div class="mb-4 sm:mb-6">
    <CategoryFilter categories={CATEGORIES.blog} selected={selectedCategory} onchange={(c) => selectedCategory = c} />
  </div>

  <DataStateHandler
    loading={$blogQuery.isLoading}
    error={$blogQuery.isError}
    onretry={() => queryClient.invalidateQueries({ queryKey: ['blog-list'] })}
    empty={filteredPosts.length === 0}
    emptyTitle={BLOG.emptyTitle}
    emptyMessage={BLOG.emptyMessage}
  >
    {#if featuredPost}
      <div class="mb-6 sm:mb-8">
        <BlogCard post={featuredPost} href={`/blog/${featuredPost.id}`} featured />
      </div>
    {/if}

    <div class="space-y-3 sm:space-y-4">
      {#each regularPosts as post}
        <BlogCard {post} href={`/blog/${post.id}`} />
      {/each}
    </div>
  </DataStateHandler>
</div>
