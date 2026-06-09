<script lang="ts">
  let { class: className = '' }: { class?: string } = $props();
</script>

<div class="animate-pulse rounded-lg bg-cream-100 dark:bg-navy-700 {className}"></div>

<script lang="ts" module>
  export function HeroSkeleton() {
    return '<div class="mb-6"><div class="animate-pulse bg-cream-100 dark:bg-navy-700 rounded-2xl h-48 w-full"></div></div>';
  }

  export function CardSkeleton() {
    return `
      <div class="shrink-0 w-64">
        <div class="animate-pulse bg-cream-100 dark:bg-navy-700 rounded-xl h-36 mb-3"></div>
        <div class="animate-pulse bg-cream-100 dark:bg-navy-700 rounded h-4 w-5/6 mb-2"></div>
        <div class="animate-pulse bg-cream-100 dark:bg-navy-700 rounded h-3.5 w-3/5"></div>
      </div>`;
  }

  export function BlogCardSkeleton() {
    return `
      <div class="mb-4">
        <div class="animate-pulse bg-cream-100 dark:bg-navy-700 rounded-xl h-44 mb-3"></div>
        <div class="animate-pulse bg-cream-100 dark:bg-navy-700 rounded h-3 w-1/3 mb-2"></div>
        <div class="animate-pulse bg-cream-100 dark:bg-navy-700 rounded h-4.5 w-full mb-2"></div>
        <div class="animate-pulse bg-cream-100 dark:bg-navy-700 rounded h-3.5 w-4/5 mb-3"></div>
        <div class="animate-pulse bg-cream-100 dark:bg-navy-700 rounded h-3 w-2/5"></div>
      </div>`;
  }

  export function DetailSkeleton() {
    return `
      <div class="p-4">
        <div class="animate-pulse bg-cream-100 dark:bg-navy-700 rounded-2xl h-52 mb-6"></div>
        <div class="animate-pulse bg-cream-100 dark:bg-navy-700 rounded h-3 w-2/5 mb-3"></div>
        <div class="animate-pulse bg-cream-100 dark:bg-navy-700 rounded h-6 w-9/10 mb-2"></div>
        <div class="animate-pulse bg-cream-100 dark:bg-navy-700 rounded h-6 w-7/10 mb-4"></div>
        <div class="animate-pulse bg-cream-100 dark:bg-navy-700 rounded h-3.5 w-full mb-2"></div>
        <div class="animate-pulse bg-cream-100 dark:bg-navy-700 rounded h-3.5 w-full mb-2"></div>
        <div class="animate-pulse bg-cream-100 dark:bg-navy-700 rounded h-3.5 w-full mb-2"></div>
        <div class="animate-pulse bg-cream-100 dark:bg-navy-700 rounded h-3.5 w-3/5"></div>
      </div>`;
  }
</script>
