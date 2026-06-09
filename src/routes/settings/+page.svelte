<script lang="ts">
  import { page } from '$app/stores';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { theme } from '$lib/stores/theme.svelte';
  import { FONT_SIZES, BIBLE_VERSIONS, SETTINGS, APP_NAME, APP_VERSION } from '$lib/constants';
  import { api } from '$lib/api';
  import { Moon, Sun, Type, Book, User, Bell, HelpCircle, Info, LogOut, ChevronRight, Save, Loader2, Check } from 'lucide-svelte';
  import type { FontSize, BibleVersion } from '$lib/constants';

  let fontSizes: FontSize[] = ['small', 'medium', 'large'];
  let bibleVersions: BibleVersion[] = ['ESV', 'NIV', 'KJV'];

  let selectedFontSize = $state<FontSize>('medium');
  let selectedBibleVersion = $state<BibleVersion>('ESV');
  let notifSermonAlerts = $state(true);
  let notifEventReminders = $state(true);
  let notifNewsUpdates = $state(true);
  let notifPrayerReminders = $state(true);

  let editName = $state('');
  let editPhone = $state('');

  let prefsLoaded = $state(false);
  let loadingPrefs = $state(true);
  let savingPrefs = $state(false);
  let savingProfile = $state(false);

  let successMsg = $state('');
  let errorMsg = $state('');

  let user = $derived($page.data.user);
  let isAuthenticated = $derived(user !== null);

  const modeOptions = ['light', 'dark', 'system'] as const;

  function loadPrefs() {
    if (!isAuthenticated) {
      loadingPrefs = false;
      return;
    }
    loadingPrefs = true;
    api.preferences.getAll().then((prefs) => {
      const reading = prefs.reading as Record<string, unknown> | undefined;
      if (reading) {
        if (fontSizes.includes(reading.fontSize as FontSize)) {
          selectedFontSize = reading.fontSize as FontSize;
        }
        if (bibleVersions.includes(reading.bibleVersion as BibleVersion)) {
          selectedBibleVersion = reading.bibleVersion as BibleVersion;
        }
      }
      const notifications = prefs.notifications as Record<string, unknown> | undefined;
      if (notifications) {
        if (typeof notifications.sermonAlerts === 'boolean') notifSermonAlerts = notifications.sermonAlerts;
        if (typeof notifications.eventReminders === 'boolean') notifEventReminders = notifications.eventReminders;
        if (typeof notifications.newsUpdates === 'boolean') notifNewsUpdates = notifications.newsUpdates;
        if (typeof notifications.prayerReminders === 'boolean') notifPrayerReminders = notifications.prayerReminders;
      }
      prefsLoaded = true;
      loadingPrefs = false;
    }).catch(() => {
      loadingPrefs = false;
    });
  }

  $effect(() => {
    if (isAuthenticated && user) {
      editName = user.name || '';
      editPhone = user.phone || '';
      loadPrefs();
    }
  });

  async function saveReadingPrefs() {
    savingPrefs = true;
    errorMsg = '';
    successMsg = '';
    try {
      await api.preferences.update({
        reading: { fontSize: selectedFontSize, bibleVersion: selectedBibleVersion },
      });
      successMsg = 'Reading preferences saved';
    } catch (e) {
      errorMsg = e instanceof Error ? e.message : 'Failed to save preferences';
    }
    savingPrefs = false;
    setTimeout(() => { successMsg = ''; errorMsg = ''; }, 3000);
  }

  async function saveNotifPrefs() {
    savingPrefs = true;
    errorMsg = '';
    successMsg = '';
    try {
      await api.preferences.update({
        notifications: {
          sermonAlerts: notifSermonAlerts,
          eventReminders: notifEventReminders,
          newsUpdates: notifNewsUpdates,
          prayerReminders: notifPrayerReminders,
        },
      });
      successMsg = 'Notification preferences saved';
    } catch (e) {
      errorMsg = e instanceof Error ? e.message : 'Failed to save preferences';
    }
    savingPrefs = false;
    setTimeout(() => { successMsg = ''; errorMsg = ''; }, 3000);
  }

  async function saveProfile() {
    savingProfile = true;
    errorMsg = '';
    successMsg = '';
    try {
      await api.profile.update({ name: editName, phone: editPhone || undefined });
      successMsg = 'Profile updated';
    } catch (e) {
      errorMsg = e instanceof Error ? e.message : 'Failed to update profile';
    }
    savingProfile = false;
    setTimeout(() => { successMsg = ''; errorMsg = ''; }, 3000);
  }
</script>

<svelte:head>
  <title>Settings - Bible Teaching</title>
</svelte:head>

<div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
  <PageHeader title="Settings" description="Manage your preferences and account" />

  {#if successMsg}
    <div class="mb-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm">
      <Check size={16} /><span>{successMsg}</span>
    </div>
  {/if}
  {#if errorMsg}
    <div class="mb-4 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">{errorMsg}</div>
  {/if}

  <div class="space-y-5 sm:space-y-6">
    {#if isAuthenticated && user}
      <section>
        <h2 class="text-xs sm:text-sm font-semibold text-navy-500 dark:text-cream-300 uppercase tracking-wider mb-2 sm:mb-3 px-1">{SETTINGS.labels.profile}</h2>
        <div class="space-y-2">
          <div class="p-3 sm:p-4 rounded-xl bg-white dark:bg-navy-800">
            <div class="flex items-center gap-3">
              <User size={18} class="text-navy-500 dark:text-cream-300 shrink-0 self-start mt-0.5" />
              <div class="flex-1 min-w-0 space-y-2.5">
                <div>
                  <span class="block text-xs text-navy-400 dark:text-cream-200 mb-0.5">Name</span>
                  <Input name="edit-name" bind:value={editName} />
                </div>
                <div>
                  <span class="block text-xs text-navy-400 dark:text-cream-200 mb-0.5">Phone</span>
                  <Input name="edit-phone" type="tel" bind:value={editPhone} />
                </div>
                <div>
                  <p class="text-xs text-navy-400 dark:text-cream-200 mb-0.5">Email</p>
                  <p class="text-sm text-navy-700 dark:text-cream-200">{user.email}</p>
                </div>
                <Button onclick={saveProfile} disabled={savingProfile} loading={savingProfile} size="sm">
                  <Save size={14} />
                  Save
                </Button>
              </div>
            </div>
          </div>

          <form method="POST" action="/logout">
            <button type="submit"
              class="w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-white dark:bg-navy-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left group">
              <LogOut size={18} class="text-red-500 shrink-0" />
              <span class="text-sm font-medium text-red-600 dark:text-red-400">{SETTINGS.labels.signOut}</span>
            </button>
          </form>
        </div>
      </section>
    {/if}

    <section>
      <h2 class="text-xs sm:text-sm font-semibold text-navy-500 dark:text-cream-300 uppercase tracking-wider mb-2 sm:mb-3 px-1">{SETTINGS.sections.appearance}</h2>
      <div class="space-y-2">
        <div class="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-white dark:bg-navy-800">
          {#if theme.resolved === 'dark'}
            <Moon size={18} class="text-navy-500 dark:text-cream-300 shrink-0" />
          {:else}
            <Sun size={18} class="text-navy-500 dark:text-cream-300 shrink-0" />
          {/if}
          <span class="flex-1 text-sm font-medium text-navy-900 dark:text-cream-50">{SETTINGS.labels.darkMode}</span>
          <div class="flex gap-1 flex-wrap">
            {#each modeOptions as mode}
              <button
                onclick={() => theme.setMode(mode)}
                class="px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-colors capitalize whitespace-nowrap
                  {mode === theme.mode
                    ? 'bg-navy-500 dark:bg-navy-400 text-white'
                    : 'bg-cream-100 dark:bg-navy-700 text-navy-500 dark:text-cream-200 hover:bg-cream-200 dark:hover:bg-navy-600'}"
              >{mode}</button>
            {/each}
          </div>
        </div>
      </div>
    </section>

    {#if isAuthenticated}
      <section>
        <h2 class="text-xs sm:text-sm font-semibold text-navy-500 dark:text-cream-300 uppercase tracking-wider mb-2 sm:mb-3 px-1">{SETTINGS.sections.readingPreferences}</h2>
        <div class="space-y-2">
          <div class="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-white dark:bg-navy-800">
            <Type size={18} class="text-navy-500 dark:text-cream-300 shrink-0" />
            <span class="flex-1 text-sm font-medium text-navy-900 dark:text-cream-50">{SETTINGS.labels.fontSize}</span>
            <div class="flex gap-1.5 sm:gap-2">
              {#each fontSizes as fs}
                <button
                  onclick={() => { selectedFontSize = fs; saveReadingPrefs(); }}
                  class="px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-colors
                    {fs === selectedFontSize
                      ? 'bg-navy-500 dark:bg-navy-400 text-white'
                      : 'bg-cream-100 dark:bg-navy-700 text-navy-500 dark:text-cream-200 hover:bg-cream-200 dark:hover:bg-navy-600'}"
                >{fs === 'small' ? 'S' : fs === 'medium' ? 'M' : 'L'}</button>
              {/each}
            </div>
          </div>

          <div class="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-white dark:bg-navy-800">
            <Book size={18} class="text-navy-500 dark:text-cream-300 shrink-0" />
            <span class="flex-1 text-sm font-medium text-navy-900 dark:text-cream-50">{SETTINGS.labels.bibleVersion}</span>
            <div class="flex gap-1.5 sm:gap-2">
              {#each bibleVersions as bv}
                <button
                  onclick={() => { selectedBibleVersion = bv; saveReadingPrefs(); }}
                  class="px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-colors
                    {bv === selectedBibleVersion
                      ? 'bg-navy-500 dark:bg-navy-400 text-white'
                      : 'bg-cream-100 dark:bg-navy-700 text-navy-500 dark:text-cream-200 hover:bg-cream-200 dark:hover:bg-navy-600'}"
                >{bv}</button>
              {/each}
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-xs sm:text-sm font-semibold text-navy-500 dark:text-cream-300 uppercase tracking-wider mb-2 sm:mb-3 px-1">{SETTINGS.sections.notifications}</h2>
        <div class="space-y-2">
          {#each [{ key: 'sermonAlerts', label: SETTINGS.labels.sermonAlerts, val: notifSermonAlerts }, { key: 'eventReminders', label: SETTINGS.labels.eventReminders, val: notifEventReminders }, { key: 'newsUpdates', label: SETTINGS.labels.newsUpdates, val: notifNewsUpdates }, { key: 'prayerReminders', label: SETTINGS.labels.prayerReminders, val: notifPrayerReminders }] as notif}
            <div class="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-white dark:bg-navy-800">
              <Bell size={18} class="text-navy-500 dark:text-cream-300 shrink-0" />
              <span class="flex-1 text-sm font-medium text-navy-900 dark:text-cream-50">{notif.label}</span>
              <button
                onclick={() => {
                  if (notif.key === 'sermonAlerts') notifSermonAlerts = !notifSermonAlerts;
                  if (notif.key === 'eventReminders') notifEventReminders = !notifEventReminders;
                  if (notif.key === 'newsUpdates') notifNewsUpdates = !notifNewsUpdates;
                  if (notif.key === 'prayerReminders') notifPrayerReminders = !notifPrayerReminders;
                  saveNotifPrefs();
                }}
                class="relative w-10 h-6 rounded-full transition-colors {notif.val ? 'bg-navy-500 dark:bg-navy-400' : 'bg-cream-200 dark:bg-navy-600'}"
                aria-label="Toggle {notif.label}"
              >
                <span class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform {notif.val ? 'translate-x-4' : 'translate-x-0'}"></span>
              </button>
            </div>
          {/each}
        </div>
      </section>
    {/if}

    <section>
      <h2 class="text-xs sm:text-sm font-semibold text-navy-500 dark:text-cream-300 uppercase tracking-wider mb-2 sm:mb-3 px-1">{SETTINGS.sections.support}</h2>
      <div class="space-y-2">
        <a href="/prayer" class="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-white dark:bg-navy-800 hover:bg-cream-50 dark:hover:bg-navy-700 transition-colors">
          <Bell size={18} class="text-navy-500 dark:text-cream-300 shrink-0" />
          <span class="flex-1 text-sm font-medium text-navy-900 dark:text-cream-50">{SETTINGS.labels.prayerRequest}</span>
          <ChevronRight size={16} class="text-navy-300 dark:text-cream-400 shrink-0" />
        </a>
        <a href="mailto:support@bibleteaching.org" class="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-white dark:bg-navy-800 hover:bg-cream-50 dark:hover:bg-navy-700 transition-colors">
          <HelpCircle size={18} class="text-navy-500 dark:text-cream-300 shrink-0" />
          <span class="flex-1 text-sm font-medium text-navy-900 dark:text-cream-50">{SETTINGS.labels.sendFeedback}</span>
          <ChevronRight size={16} class="text-navy-300 dark:text-cream-400 shrink-0" />
        </a>
      </div>
    </section>

    <section>
      <h2 class="text-xs sm:text-sm font-semibold text-navy-500 dark:text-cream-300 uppercase tracking-wider mb-2 sm:mb-3 px-1">{SETTINGS.sections.about}</h2>
      <div class="space-y-2">
        <div class="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-white dark:bg-navy-800">
          <Info size={18} class="text-navy-500 dark:text-cream-300 shrink-0" />
          <div class="flex-1">
            <p class="text-sm font-medium text-navy-900 dark:text-cream-50">{APP_NAME}</p>
            <p class="text-xs text-navy-400 dark:text-cream-200">Version {APP_VERSION}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
