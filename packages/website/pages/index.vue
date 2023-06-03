<script lang="ts" setup>
import { type CommentTable } from '@internetcheckpoint/functions/planetscale/db';
import { useElementVisibility } from '@vueuse/core';


const config = useRuntimeConfig();
const comments = ref<CommentTable[]>([]);
const totalComments = ref(0);
const loadingComments = ref(false);
const batchIndex = ref(0);

const el = ref(null);
const audio = ref<HTMLAudioElement | null>(null);
const audioIsPaused = ref(true);
const isVisible = useElementVisibility(el);

async function loadComments() {

  try {

    loadingComments.value = true;

    const { data } = await useFetch<{ 
      total: number,
      comments: CommentTable[]
     }>(`${config.public.apiUrl}/comments?batch=${batchIndex.value}`);
     
    totalComments.value = data.value?.total ?? 0;
    comments.value.push(...data.value?.comments!);
    batchIndex.value++;

  } finally {
    loadingComments.value = false;
  }

}

watch(isVisible, async () => {
  if (!isVisible.value) return;
  await loadComments();
});

onMounted(() => {
  audioIsPaused.value = audio.value?.paused ?? true;
  audio.value?.addEventListener('playing', () => {
    audioIsPaused.value = false;
  });
  audio.value?.addEventListener('pause', () => {
    audioIsPaused.value = true;
  });
});

</script>

<template>

  <div class="relative aspect-video bg-black w-full video group" >

    <div
      class="absolute w-full bottom-0 bg-gradient-to-b from-transparent to-black h-40 group-hover:opacity-70 opacity-0 transition-opacity pointer-events-none"
      :class="{ 'opacity-70': audioIsPaused }"></div>

    <media-controller class="absolute w-full h-full bg-transparent bottom-0 group-focus:!opacity-100">

      <audio
        slot="media"
        class="hidden"
        ref="audio"
        autoplay loop
        controls
        type="audio/mp3"
        src="/audio/spiky_barrel_maze.mp3"></audio>

      <media-control-bar class="group-hover:!opacity-100 relative !transition-opacity">

        <media-play-button class="bg-transparent"></media-play-button>
        <media-mute-button class="bg-transparent"></media-mute-button>
        <media-volume-range class="bg-transparent"></media-volume-range>
        <media-time-display showduration class="text-sm text-[13px] bg-transparent"></media-time-display>
        <media-time-range class="absolute h-6 bottom-10 w-full bg-transparent"></media-time-range>
      </media-control-bar>
    </media-controller>

  </div>

  <div class="mt-4">

    <div class="border-b border-stone-200">

      <h1 class="text-lg">とげとげタルめいろ"スーパードンキーコング2"</h1>

      <div class="flex items-end justify-between mt-3">

        <p class="text-stone-700 text-sm mb-3">6,054,073 views <span class="font-bold mx-1">·</span> Apr 26, 2012</p>

        <div class="flex items-center border-b-2 border-stone-700 space-x-6 pb-3 px-2">

          <div class="inline-flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24" class="h-5 w-5 fill-stone-400">
              <path d="M 14.167969 1 L 7.5839844 7.5957031 C 7.2118359 7.9688467 7.0020678 8.4738186 7 9 L 1 9 L 1 21 L 7 21 C 7.3660536 21 7.7049394 20.894189 8 20.722656 C 8.2950606 20.894189 8.6339464 21 9 21 L 17.992188 21 C 18.791187 21 19.514078 20.524062 19.830078 19.789062 L 22.837891 12.787109 C 22.944891 12.538109 23 12.269047 23 11.998047 L 23 10 C 23 8.895 22.105 8 21 8 L 14.648438 8 L 15.585938 3.703125 C 15.731938 3.032125 15.523203 2.3345156 15.033203 1.8535156 L 14.167969 1 z M 13.326172 4.6738281 L 12.695312 7.5742188 L 12.167969 10 L 14.650391 10 L 21 10 L 21 11.998047 L 17.992188 19 L 9 19 L 9 11 L 9 9.0078125 L 13.326172 4.6738281 z M 3 11 L 7 11 L 7 19 L 3 19 L 3 11 z"></path>
            </svg>
            <span class="font-semibold text-stone-700 text-sm">211K</span>
          </div>

          <div class="inline-flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24" class="h-5 w-5 fill-stone-400 rotate-180">
              <path d="M 14.167969 1 L 7.5839844 7.5957031 C 7.2118359 7.9688467 7.0020678 8.4738186 7 9 L 1 9 L 1 21 L 7 21 C 7.3660536 21 7.7049394 20.894189 8 20.722656 C 8.2950606 20.894189 8.6339464 21 9 21 L 17.992188 21 C 18.791187 21 19.514078 20.524062 19.830078 19.789062 L 22.837891 12.787109 C 22.944891 12.538109 23 12.269047 23 11.998047 L 23 10 C 23 8.895 22.105 8 21 8 L 14.648438 8 L 15.585938 3.703125 C 15.731938 3.032125 15.523203 2.3345156 15.033203 1.8535156 L 14.167969 1 z M 13.326172 4.6738281 L 12.695312 7.5742188 L 12.167969 10 L 14.650391 10 L 21 10 L 21 11.998047 L 17.992188 19 L 9 19 L 9 11 L 9 9.0078125 L 13.326172 4.6738281 z M 3 11 L 7 11 L 7 19 L 3 19 L 3 11 z"></path>
            </svg>
            <span class="font-semibold text-stone-700 text-sm">1.4K</span>
          </div>
        </div>

      </div>
    </div>

    <div class="flex items-center space-x-3 mt-3 border-b border-stone-200 pb-4">
      <div
        class="w-10 h-10 rounded-full bg-center bg-contain"
        style="background-image: url('https://yt3.ggpht.com/CBRr0hQOzp1NC5OSbYD_noMkx8sFIht0TqpOjjguy8DDPN0ux0vgVu1PygQXNJvDJqi8GD77=s176-c-k-c0x00ffffff-no-rj-mo');">
      </div>
      <div class="flex flex-col justify-center">
        <p class="font-semibold text-base/6 text-stone-900 mt-0.5">taia777</p>
        <span class="text-xs text-stone-700">71.8K subscribers</span>
      </div>
    </div>
  </div>

  <Comments 
    class="mt-4"
    :total-comments="totalComments"
    :comments="comments"
    :loading="loadingComments" />

  <div ref="el"></div>

</template>

<style scoped>

.video {
  @apply sm:bg-auto bg-contain bg-[url('/images/thorn.gif')];
}

media-time-range {
  --media-range-track-border-radius: 0;
  --media-range-bar-color: red;
}

</style>
