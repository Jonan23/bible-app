<script lang="ts">
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';
  import Input from '$lib/components/ui/Input.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { BookOpen, Mail, Lock, Eye, EyeOff } from 'lucide-svelte';

  let email = $state('');
  let password = $state('');
  let showPassword = $state(false);

  let formError = $derived($page.form?.error);
</script>

<svelte:head>
  <title>Sign In - Bible Teaching</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center px-4 py-8 sm:py-12">
  <div class="w-full max-w-sm">
    <div class="text-center mb-6 sm:mb-8">
      <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-navy-500 dark:bg-navy-400 flex items-center justify-center mx-auto mb-3 sm:mb-4">
        <BookOpen class="text-white" size={28} />
      </div>
      <h1 class="text-xl sm:text-2xl font-bold text-navy-900 dark:text-cream-50">Bible Teaching</h1>
      <p class="text-sm text-navy-500 dark:text-cream-200 mt-1">Sign in to your account</p>
    </div>

    {#if formError}
      <div class="p-3 mb-3 sm:mb-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
        <p class="text-sm text-red-700 dark:text-red-400">{formError}</p>
      </div>
    {/if}

    <form method="POST" use:enhance class="space-y-3 sm:space-y-4">
      <Input name="email" type="email" label="Email" placeholder="you@example.com" bind:value={email} required>
        {#snippet icon()}<Mail size={18} />{/snippet}
      </Input>

      <div>
        <label for="password" class="block text-sm font-medium text-navy-700 dark:text-cream-100 mb-1.5">Password</label>
        <div class="flex items-center h-11 sm:h-12 px-3 sm:px-4 rounded-xl bg-white dark:bg-navy-700 border border-cream-200 dark:border-navy-600 focus-within:ring-2 focus-within:ring-navy-500/40 transition-all">
          <Lock size={18} class="text-navy-300 dark:text-cream-300 shrink-0 mr-2.5 sm:mr-3" />
          <input id="password" name="password" type={showPassword ? 'text' : 'password'} bind:value={password} required placeholder="Enter your password"
            class="flex-1 bg-transparent text-navy-900 dark:text-cream-50 placeholder:text-navy-300 dark:placeholder:text-cream-400 outline-none text-sm sm:text-base" />
          <button type="button" onclick={() => showPassword = !showPassword} class="shrink-0 text-navy-300 dark:text-cream-300 hover:text-navy-500 dark:hover:text-cream-200 transition-colors">
            {#if showPassword}<EyeOff size={18} />{:else}<Eye size={18} />{/if}
          </button>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <input id="remember" name="remember" type="checkbox" class="w-4 h-4 rounded border-navy-300 dark:border-navy-400 text-navy-500 dark:text-cream-300 focus:ring-navy-500" />
        <label for="remember" class="text-sm text-navy-500 dark:text-cream-200">Remember me</label>
      </div>

      <Button type="submit" size="lg" class="w-full">Sign In</Button>
    </form>

    <p class="text-center text-sm text-navy-500 dark:text-cream-200 mt-5 sm:mt-6">
      Don't have an account?
      <a href="/register" class="font-semibold text-navy-500 dark:text-cream-300 hover:underline">Sign Up</a>
    </p>

    <div class="mt-3 sm:mt-4 text-center">
      <a href="/" class="text-sm text-navy-500 dark:text-cream-200 hover:text-navy-700 dark:hover:text-cream-200 transition-colors">Continue as guest</a>
    </div>
  </div>
</div>
