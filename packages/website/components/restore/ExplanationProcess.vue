<script lang="ts" setup>

defineProps<{
  logingIn: boolean,
}>();

const emit = defineEmits(['login']);

const steps = [
  {
    title: 'Connect to your Youtube account',
    description: 'Make sure this is the same account you used to post your checkpoints.',
  },
  {
    title: 'Grant Access',
    description: `
      We will use your Youtube channel ID to find your checkpoints in the archive. Granting access lets us do this.
    `,
  },
  {
    title: 'Reunite with your checkpoints 🥳',
    description: `
      You will then be able to consult them here as long as you're connected.
    `,
  },
];
</script>

<template>

  <div class="flex flex-col animate-fade-in px-0 sm:px-0">

    <h1 class="text-2xl font-semibold text-center mb-4">Find previous checkpoints</h1>
    <p class="text-sm text-center text-gray-700">
      Using the comments archives of <a href="https://www.reddit.com/r/taia777/comments/o1rls6/taia777_videos_and_comments_archive/" target="_blank">Rebane</a> and the Youtube API, you're now
      able to find your previous checkpoints automatically.
    </p>

    <!-- Steps -->
    <div class="flex flex-col mx-auto max-w-sm mt-10">

      <div
        v-for="(step, index) in steps"
        :key="index"
        class="flex h-full justify-start animate-fade-in-up opacity-0"
        :style="{
          animationDelay: `${index * 100}ms`
        }">

        <div class="relative pb-10">

          <div v-if="index !== steps.length - 1" class="absolute top-6 left-1/2 w-0.5 h-full bg-gray-200"></div>

          <div class="w-6 h-6 rounded-full flex items-center justify-center bg-gray-400 text-white text-sm font-medium z-20">
            {{ index + 1 }}
          </div>

        </div>

        <div class="flex flex-col ml-4 pb-10">

          <div class="mb-4">
            <h1 class="text-base font-medium" v-html="step.title"></h1>
            <p class="text-xs text-gray-700" v-html="step.description"></p>
          </div>

          <!-- First Step -->
          <template v-if="index === 0">
            <!-- Youtube Login Button -->
            <button
              class="white button w-fit"
              :disabled="logingIn"
              @click="emit('login')">
              <svg
                class="h-5 mr-2"
                xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
                <path fill="#FF3D00" d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"></path><path fill="#FFF" d="M20 31L20 17 32 24z"></path>
              </svg>
              {{ logingIn ? 'Logging in...' : 'Connect YouTube Account' }}
            </button>

            <p class="text-xs text-gray-700 mt-1">
              We don't use/store personal information. See <NuxtLink to="privacy" target="_blank" class="text-xs font-normal">Privacy Policy</NuxtLink>.
            </p>

          </template>

          <!-- Second Step -->
          <template v-if="index === 1">
            <img
              class="border border-gray-200 rounded-md shadow-sm max-w-[280px]"
              src="/images/oauth-example.png" />

          </template>

        </div>

      </div>
    </div>

  </div>

</template>

<style>
</style>
