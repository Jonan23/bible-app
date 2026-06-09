<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';
  import { api } from '$lib/api';
  import { toPastor, toTeamMember } from '$lib/utils/adapters';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import { ABOUT } from '$lib/constants';
  import { theme } from '$lib/stores/theme.svelte';
  import { Globe, ArrowRight } from 'lucide-svelte';

  const pastorsQuery = createQuery({
    queryKey: ['pastors'],
    queryFn: () => api.teamMembers.list({ type: 'PASTOR' }),
  });

  const teamQuery = createQuery({
    queryKey: ['team'],
    queryFn: () => api.teamMembers.list({ type: 'TEAM_MEMBER' }),
  });

  let pastors = $derived((pastorsQuery.data?.data ?? []).map(toPastor));
  let team = $derived((teamQuery.data?.data ?? []).map(toTeamMember));
</script>

<svelte:head>
  <title>About - Bible Teaching</title>
</svelte:head>

<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
  <PageHeader title="About" description={ABOUT.description} />

  {#if pastors.length > 0}
    <section class="mb-8 sm:mb-10">
      <h2 class="text-lg sm:text-xl font-bold text-navy-900 dark:text-cream-50 mb-4">{ABOUT.sections.pastoralTeam}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {#each pastors as pastor}
          <Card class="flex items-start gap-3 sm:gap-4">
            {#if pastor.avatar}
              <img src={pastor.avatar} alt={pastor.name} class="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover shrink-0" />
            {:else}
              <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-cream-200 dark:bg-navy-700 flex items-center justify-center shrink-0">
                <span class="text-base sm:text-lg font-bold text-navy-500 dark:text-cream-300">{pastor.name.charAt(0)}</span>
              </div>
            {/if}
            <div class="min-w-0">
              <h3 class="text-base sm:text-lg font-semibold text-navy-900 dark:text-cream-50">{pastor.name}</h3>
              <p class="text-sm text-navy-500 dark:text-cream-300 mb-2">{pastor.role}</p>
              {#if pastor.bio}
                <p class="text-sm text-navy-400 dark:text-cream-200 leading-relaxed">{pastor.bio}</p>
              {/if}
            </div>
            </Card>
          {/each}
        </div>
      </section>
    {/if}

    {#if team.length > 0}
      <section class="mb-8 sm:mb-10">
        <h2 class="text-lg sm:text-xl font-bold text-navy-900 dark:text-cream-50 mb-4">{ABOUT.sections.ministryTeam}</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {#each team as member}
            <Card class="text-center">
            {#if member.avatar}
              <img src={member.avatar} alt={member.name} class="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover mx-auto mb-2 sm:mb-3" />
            {:else}
              <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-cream-200 dark:bg-navy-700 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <span class="text-sm font-bold text-navy-500 dark:text-cream-300">{member.name.charAt(0)}</span>
              </div>
            {/if}
            <h3 class="text-sm font-semibold text-navy-900 dark:text-cream-50">{member.name}</h3>
            <p class="text-xs text-navy-400 dark:text-cream-200">{member.role}</p>
          </Card>
        {/each}
      </div>
    </section>
  {/if}

  <section class="mb-8 sm:mb-10">
    <h2 class="text-lg sm:text-xl font-bold text-navy-900 dark:text-cream-50 mb-4">{ABOUT.sections.followUs}</h2>
    <div class="flex flex-wrap gap-3">
      <button class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-navy-800 shadow-sm flex items-center justify-center text-navy-500 dark:text-cream-200 hover:text-navy-700 dark:hover:text-cream-100 hover:shadow-md transition-all" aria-label="Website"><Globe size={18} /></button>
      <button class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-navy-800 shadow-sm flex items-center justify-center text-navy-500 dark:text-cream-200 hover:text-navy-700 dark:hover:text-cream-100 hover:shadow-md transition-all" aria-label="Facebook"><span class="text-xs sm:text-sm font-bold">FB</span></button>
      <button class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-navy-800 shadow-sm flex items-center justify-center text-navy-500 dark:text-cream-200 hover:text-navy-700 dark:hover:text-cream-100 hover:shadow-md transition-all" aria-label="Instagram"><span class="text-xs sm:text-sm font-bold">IG</span></button>
      <button class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-navy-800 shadow-sm flex items-center justify-center text-navy-500 dark:text-cream-200 hover:text-navy-700 dark:hover:text-cream-100 hover:shadow-md transition-all" aria-label="YouTube"><span class="text-xs sm:text-sm font-bold">YT</span></button>
    </div>
  </section>

  <section class="mb-10">
    <h2 class="text-lg sm:text-xl font-bold text-navy-900 dark:text-cream-50 mb-4">{ABOUT.sections.appearance}</h2>
    <Card>
      <h3 class="text-sm sm:text-base font-semibold text-navy-900 dark:text-cream-50 mb-3">{ABOUT.darkMode}</h3>
      <div class="flex flex-wrap gap-2">
        {#each ['light', 'dark', 'system'] as mode}
          <button
            onclick={() => theme.setMode(mode as 'light' | 'dark' | 'system')}
            class="px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-colors capitalize
              {mode === theme.mode
                ? 'bg-navy-500 dark:bg-navy-400 text-white'
                : 'bg-cream-100 dark:bg-navy-700 text-navy-500 dark:text-cream-200 hover:bg-cream-200 dark:hover:bg-navy-600'}"
          >{mode}</button>
        {/each}
      </div>
    </Card>
  </section>

  <section class="text-center pb-6 sm:pb-8">
    <Button href="/prayer" size="lg">
      Submit a Prayer Request
      <ArrowRight size={18} />
    </Button>
  </section>
</div>
