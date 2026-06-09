<script lang="ts">
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';
  import Input from '$lib/components/ui/Input.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { PRAYER } from '$lib/constants';
  import { BookOpen, Heart } from 'lucide-svelte';

  let submitted = $derived($page.form?.success === true);
</script>

<svelte:head>
  <title>Prayer Request - Bible Teaching</title>
</svelte:head>

<div class="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
  {#if submitted}
    <div class="max-w-md w-full text-center">
      <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-navy-100 dark:bg-navy-700 flex items-center justify-center mx-auto mb-4 sm:mb-6">
        <Heart size={24} class="text-navy-500 dark:text-cream-300" />
      </div>
      <h1 class="text-xl sm:text-2xl font-bold text-navy-900 dark:text-cream-50 mb-2 sm:mb-3">{PRAYER.successTitle}</h1>
      <p class="text-sm text-navy-500 dark:text-cream-200 mb-6 sm:mb-8 leading-relaxed">{PRAYER.successMessage}</p>
      <Button href="/" size="lg">{PRAYER.doneButton}</Button>
    </div>
  {:else}
    <div class="w-full max-w-md">
      <div class="text-center mb-6 sm:mb-8">
        <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-navy-500 dark:bg-navy-400 flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <BookOpen class="text-white" size={28} />
        </div>
        <h1 class="text-xl sm:text-2xl font-bold text-navy-900 dark:text-cream-50">{PRAYER.heading}</h1>
        <p class="text-sm text-navy-500 dark:text-cream-200 mt-1.5 sm:mt-2">{PRAYER.description}</p>
      </div>

      <div class="bg-cream-100 dark:bg-navy-700/50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-cream-200 dark:border-navy-600">
        <p class="text-xs sm:text-sm text-navy-500 dark:text-cream-200 italic text-center font-serif leading-relaxed">{PRAYER.verse}</p>
      </div>

      {#if $page.form?.error}
        <div class="p-3 mb-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <p class="text-sm text-red-700 dark:text-red-400">{$page.form.error}</p>
        </div>
      {/if}

      <form method="POST" use:enhance class="space-y-3 sm:space-y-4">
        <Input name="name" label="Name" placeholder={PRAYER.namePlaceholder} required />

        <Input name="email" type="email" label="Email (optional)" placeholder={PRAYER.emailPlaceholder} />

        <Input name="request" label="Prayer Request" rows={5} placeholder={PRAYER.requestPlaceholder} required />

        <Button type="submit" size="lg" class="w-full">{PRAYER.submitButton}</Button>
      </form>
    </div>
  {/if}
</div>
