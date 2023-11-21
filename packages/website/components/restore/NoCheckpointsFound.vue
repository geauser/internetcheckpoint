<script lang="ts" setup>
import { ArrowPathIcon } from '@heroicons/vue/24/outline';

const emit = defineEmits(['tryAgain']);
</script>

<template>

  <div class="flex flex-col items-center animate-fade-in opacity-0">

    <span class="text-4xl">😔</span>

    <h1 class="text-2xl font-semibold text-center mt-2">
      No checkpoints found
    </h1>

    <p class="text-sm mt-4 text-center text-gray-700">
      Reason could be

      <ol class="list-disc space-y-2 mt-2 text-left max-w-xs">
        <li>
          You did not connect with the right account,
          <button @click="emit('tryAgain')" class="text-blue-700 font-medium hover:underline">try again</button>
          if you want.
        </li>
        <li>
          Your comments were added after the archive's creation on 2021/04/07.
          Any comment after this date isn't in <a href="https://www.reddit.com/r/taia777/comments/o1rls6/taia777_videos_and_comments_archive/" target="_blank">Rebane's archive</a> and is sadly lost.
        </li>
      </ol>

    </p>

    <button class="button sm white mt-6" @click="emit('tryAgain')">
      <ArrowPathIcon class="h-4 w-4 mr-2" />
      Try another account
    </button>

  </div>

</template>

<style>
</style>
