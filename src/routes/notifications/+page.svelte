<script lang="ts">
  import { createQuery, createMutation, useQueryClient } from '@tanstack/svelte-query';
  import { api } from '$lib/api';
  import { formatRelativeDate } from '$lib/utils/helpers';
  import { NOTIFICATIONS } from '$lib/constants';
  import DataStateHandler from '$lib/components/DataStateHandler.svelte';
  import { Bell, Play, Calendar, Newspaper, Heart } from 'lucide-svelte';

  const queryClient = useQueryClient();

  const notificationsQuery = createQuery({
    queryKey: ['notifications'],
    queryFn: () => api.notifications.list(1, 50),
  });

  const markAllReadMutation = createMutation({
    mutationFn: () => api.notifications.markAllRead(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  });

  const markReadMutation = createMutation({
    mutationFn: (id: string) => api.notifications.markRead(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  });

  let notifications = $derived(notificationsQuery.data?.data ?? []);

  let mappedNotifications = $derived(
    notifications.map((n) => {
      const recipient = n.recipients?.[0];
      return {
        id: n.id,
        title: n.title,
        message: n.body ?? '',
        read: recipient?.readAt !== null && recipient?.readAt !== undefined,
        date: n.createdAt,
        type: n.type as 'sermon' | 'event' | 'news' | 'prayer' | 'general',
      };
    })
  );

  let unreadCount = $derived(mappedNotifications.filter((n) => !n.read).length);
  const typeIcons: Record<string, typeof Bell> = {
    sermon: Play, event: Calendar, news: Newspaper, prayer: Heart, general: Bell,
  };
</script>

<svelte:head>
  <title>Notifications - Bible Teaching</title>
</svelte:head>

<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
  <div class="flex items-center justify-between mb-4 sm:mb-6">
    <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-navy-900 dark:text-cream-50">Notifications</h1>
    {#if unreadCount > 0}
      <button
        onclick={() => markAllReadMutation.mutate()}
        disabled={markAllReadMutation.isPending}
        class="text-sm font-medium text-navy-500 dark:text-cream-300 hover:text-navy-700 dark:hover:text-cream-200 transition-colors disabled:opacity-50 shrink-0"
      >
        {NOTIFICATIONS.markAllRead}
      </button>
    {/if}
  </div>

  <DataStateHandler
    loading={notificationsQuery.isLoading}
    error={notificationsQuery.isError}
    onretry={() => notificationsQuery.refetch()}
    empty={mappedNotifications.length === 0}
    emptyTitle={NOTIFICATIONS.emptyTitle}
    emptyMessage={NOTIFICATIONS.emptyMessage}
  >
    <div class="space-y-2 sm:space-y-3">
      {#each mappedNotifications as notification}
        {@const Icon = typeIcons[notification.type] || Bell}
        <button
          onclick={() => { if (!notification.read) markReadMutation.mutate(notification.id); }}
          class="w-full text-left flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl transition-colors
            {notification.read
              ? 'bg-white dark:bg-navy-800'
              : 'bg-navy-50 dark:bg-navy-700/50 border border-navy-100 dark:border-navy-600'}"
        >
          <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cream-100 dark:bg-navy-700 flex items-center justify-center shrink-0
            {notification.read ? 'text-navy-400' : 'text-navy-500'}">
            <Icon size={16} />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2">
              <p class="text-sm font-semibold text-navy-900 dark:text-cream-50 truncate">{notification.title}</p>
              <span class="text-xs text-navy-400 dark:text-cream-200 shrink-0 whitespace-nowrap">{formatRelativeDate(notification.date)}</span>
            </div>
            {#if notification.message}
              <p class="text-xs sm:text-sm text-navy-500 dark:text-cream-200 mt-0.5 sm:mt-1 line-clamp-2">{notification.message}</p>
            {/if}
          </div>
          {#if !notification.read}
            <span class="w-2 h-2 rounded-full bg-navy-500 dark:bg-navy-400 mt-2 shrink-0"></span>
          {/if}
        </button>
      {/each}
    </div>
  </DataStateHandler>
</div>
