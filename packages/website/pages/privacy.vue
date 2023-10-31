<script lang="ts" setup>
</script>

<template>

  <section class="max-w-lg mx-auto w-full py-10">

    <div class="flex justify-center max-w-lg mx-auto mt-14 sm:mt-0 mb-8 pt-10">
      <button
        class="
          inline-flex items-center justify-center
          hover:bg-gray-300
          transition-colors
          rounded-full
          bg-gray-200
          font-medium
          !text-gray-700 text-xs
          py-1 pr-3 pl-2 gap-1.5"
        @click="navigateTo('/')">

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>

        Go back to comments
      </button>
    </div>


    <ContentDoc
      class="prose animate-fade-in opacity-0 prose-sm dark:prose-invert mt-6"
      style="animation-delay: 200ms;"
      path="/privacy" />

  </section>

</template>
