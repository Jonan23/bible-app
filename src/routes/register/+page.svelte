<script lang="ts">
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';
  import Input from '$lib/components/ui/Input.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { BookOpen, User, Mail, Lock, Eye, EyeOff } from 'lucide-svelte';

  let name = $state('');
  let email = $state('');
  let password = $state('');
  let confirmPassword = $state('');
  let showPassword = $state(false);

  let clientError = $state('');

  let formError = $derived($page.form?.error);

  function validate(e: Event) {
    clientError = '';
    if (!name || !email || !password || !confirmPassword) {
      clientError = 'All fields are required';
      e.preventDefault();
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      clientError = 'Please enter a valid email address';
      e.preventDefault();
      return;
    }
    if (password !== confirmPassword) {
      clientError = 'Passwords do not match';
      e.preventDefault();
      return;
    }
    if (password.length < 8) {
      clientError = 'Password must be at least 8 characters';
      e.preventDefault();
      return;
    }
    if (!/[A-Z]/.test(password)) {
      clientError = 'Password must contain at least one uppercase letter';
      e.preventDefault();
      return;
    }
    if (!/[a-z]/.test(password)) {
      clientError = 'Password must contain at least one lowercase letter';
      e.preventDefault();
      return;
    }
    if (!/[0-9]/.test(password)) {
      clientError = 'Password must contain at least one number';
      e.preventDefault();
      return;
    }
    if (name.length < 2) {
      clientError = 'Name must be at least 2 characters';
      e.preventDefault();
      return;
    }
  }

  let displayError = $derived(clientError || formError);
</script>

<svelte:head>
  <title>Create Account - Bible Teaching</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center px-4 py-8 sm:py-12">
  <div class="w-full max-w-sm">
    <div class="text-center mb-6 sm:mb-8">
      <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-navy-500 dark:bg-navy-400 flex items-center justify-center mx-auto mb-3 sm:mb-4">
        <BookOpen class="text-white" size={28} />
      </div>
      <h1 class="text-xl sm:text-2xl font-bold text-navy-900 dark:text-cream-50">Create Account</h1>
      <p class="text-sm text-navy-500 dark:text-cream-200 mt-1">Join the Bible Teaching community</p>
    </div>

    {#if displayError}
      <div class="p-3 mb-3 sm:mb-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
        <p class="text-sm text-red-700 dark:text-red-400">{displayError}</p>
      </div>
    {/if}

    <form method="POST" use:enhance onsubmit={validate} class="space-y-3 sm:space-y-4">
      <Input name="name" type="text" label="Name" placeholder="Your name" bind:value={name} required>
        {#snippet icon()}<User size={18} />{/snippet}
      </Input>

      <Input name="email" type="email" label="Email" placeholder="you@example.com" bind:value={email} required>
        {#snippet icon()}<Mail size={18} />{/snippet}
      </Input>

      <div>
        <label for="password" class="block text-sm font-medium text-navy-700 dark:text-cream-100 mb-1.5">Password</label>
        <div class="flex items-center h-11 sm:h-12 px-3 sm:px-4 rounded-xl bg-white dark:bg-navy-700 border border-cream-200 dark:border-navy-600 focus-within:ring-2 focus-within:ring-navy-500/40 transition-all">
          <Lock size={18} class="text-navy-300 dark:text-cream-300 shrink-0 mr-2.5 sm:mr-3" />
          <input id="password" name="password" type={showPassword ? 'text' : 'password'} bind:value={password} required placeholder="Min. 8 chars, A-Z, a-z, 0-9"
            class="flex-1 bg-transparent text-navy-900 dark:text-cream-50 placeholder:text-navy-300 dark:placeholder:text-cream-400 outline-none text-sm sm:text-base" />
          <button type="button" onclick={() => showPassword = !showPassword} class="shrink-0 text-navy-300 dark:text-cream-300 hover:text-navy-500 transition-colors">
            {#if showPassword}<EyeOff size={18} />{:else}<Eye size={18} />{/if}
          </button>
        </div>
      </div>

      <Input name="confirmPassword" type={showPassword ? 'text' : 'password'} label="Confirm Password" placeholder="Repeat your password" bind:value={confirmPassword} required>
        {#snippet icon()}<Lock size={18} />{/snippet}
      </Input>

      <Button type="submit" size="lg" class="w-full">Create Account</Button>
    </form>

    <p class="text-center text-sm text-navy-500 dark:text-cream-200 mt-5 sm:mt-6">
      Already have an account?
      <a href="/login" class="font-semibold text-navy-500 dark:text-cream-300 hover:underline">Sign In</a>
    </p>

    <div class="mt-3 sm:mt-4 text-center">
      <a href="/" class="text-sm text-navy-500 dark:text-cream-200 hover:text-navy-700 dark:hover:text-cream-200 transition-colors">Continue as guest</a>
    </div>
  </div>
</div>
