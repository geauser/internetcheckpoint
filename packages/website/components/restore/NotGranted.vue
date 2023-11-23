<script lang="ts" setup>
import { ArrowPathIcon } from '@heroicons/vue/24/outline';

const emit = defineEmits(['tryAgain']);
</script>

<template>

  <div class="flex flex-col items-center animate-fade-in opacity-0 px-4">

    <h1 class="text-2xl font-semibold text-center mt-2">
      Missing permissions
    </h1>

    <p class="text-sm mt-4 text-center text-gray-700">
      You need to grant access to your Youtube account information to continue.
      Make sure to check the box <b>"View your YouTube account"</b> when prompted.
    </p>

    <img
        class="border border-gray-200 rounded-md shadow-sm w-full max-w-[380px] mt-6"
        src="/images/oauth-example.png" />


    <button class="button sm white mt-10" @click="emit('tryAgain')">
      <ArrowPathIcon class="h-4 w-4 mr-2" />
      Try again
    </button>

  </div>

</template>

<style>
</style>
