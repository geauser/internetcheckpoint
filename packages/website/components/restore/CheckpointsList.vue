<script lang="ts" setup>
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(LocalizedFormat);


defineProps<{
  checkpoints: any[],
}>();
</script>

<template>

  <div>

    <h1 class="text-2xl font-semibold text-center animate-fade-in opacity-0">
      Previous checkpoints
    </h1>

    <!-- Checkpoints List -->
    <ul role="list" class="space-y-6 mt-10">

      <li
        v-for="(checkpoint, index) in checkpoints"
        :key="checkpoint.id"
        class="relative flex gap-x-2 animate-fade-in-up opacity-0"
        :style="{
          animationDelay: `${index * 100}ms`
        }">


        <div
          class="absolute left-0 top-0 flex w-6 justify-center"
          :class="[index === checkpoints.length - 1 ? 'h-6' : '-bottom-6']">
          <div class="w-px bg-gray-200" />
        </div>

        <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
          <div class="h-1.5 w-1.5 rounded-full ring-1 ring-gray-300" />
        </div>

        <div class="flex-auto py-0.5">
          <time
            :datetime="checkpoint.createdAt"
            class="flex-none py-0.5 text-xs leading-5 text-gray-500">
            {{ dayjs(checkpoint.createdAt).format('LL') }}
          </time>

          <p class="text-sm">{{ checkpoint.text }}</p>
        </div>

      </li>

    </ul>

  </div>

</template>

<style>
</style>
