<script lang="ts" setup>
import { type CommentTable } from '@internetcheckpoint/functions/planetscale/db';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import metadata from '../../../backups/_metadata.json';


const props = defineProps<{
  videoId: keyof typeof metadata
}>();

const config = useRuntimeConfig();
const comments = ref<CommentTable[]>([]);
const loadingComments = ref(false);
const batchIndex = ref(0);
const showResponsiveComments = ref(false);

const { likeCount, dislikeCount, viewCount, title, commentsCount } = metadata[props.videoId];

const formatToYoutubeCount = (value: number) => {
  if (value < 1000) return value;
  return (value / 1000) + 'K';
}

const root = ref(null);
const video = ref<HTMLVideoElement | null>(null);
const videoIsPaused = ref(true);
let isOnMobile: Ref<boolean>;


async function loadComments() {

  try {

    loadingComments.value = true;

    const res = await fetch(`${config.public.apiUrl}/comments?batch=${batchIndex.value}&videoId=${props.videoId}`);
    const data = (await res.json()) as { comments: CommentTable[] };


    comments.value.push(...(data?.comments! ?? []));
    batchIndex.value++;

  } catch (e) {
    console.error(e);
  } finally {
    loadingComments.value = false;
  }

}

onMounted(() => {

  loadComments();

  const breakpoints = useBreakpoints(breakpointsTailwind);
  isOnMobile = breakpoints.smaller('sm');

  videoIsPaused.value = video.value?.paused ?? true;
  video.value?.addEventListener('playing', () => {
    videoIsPaused.value = false;
  });
  video.value?.addEventListener('pause', () => {
    videoIsPaused.value = true;
  });
});

function toggleResponsiveComments() {


  const panel  = document.querySelector('#js-responsive-comments') as HTMLElement;
  const video  = document.querySelector('#js-video') as HTMLElement;
  const header = document.querySelector('#js-header') as HTMLElement;

  showResponsiveComments.value = !showResponsiveComments.value;

  if (showResponsiveComments.value) {
    panel.style.maxHeight = `calc(100vh - ${video.clientHeight + header.clientHeight}px)`;
  } else {
    batchIndex.value = 0;
    panel.style.maxHeight = 'none';
  }

}


</script>

<template>

  <div class="aspect-video w-full group fixed sm:relative z-50 mt-14 sm:mt-0" id="js-video">

    <media-controller class="absolute w-full h-full bg-transparent bottom-0">

      <video
        slot="media"
        ref="video"
        autoplay
        playsinline
        type="video/mp4"
        :poster="`/images/thumbnails/${videoId}.webp`"
        :src="`https://cdn.internetcheckpoint.page/videos/${videoId}.mp4`"></video>

      <media-loading-indicator slot="centered-chrome"></media-loading-indicator>

      <media-control-bar class="relative !transition-opacity">

        <media-play-button class="z-50 bg-transparent"></media-play-button>
        <media-mute-button class="z-50 bg-transparent"></media-mute-button>
        <media-volume-range class="z-50 bg-transparent"></media-volume-range>
        <media-time-display showduration class="z-50 text-sm text-[13px] bg-transparent"></media-time-display>
        <media-time-range class="z-50 absolute h-6 bottom-10 w-full bg-transparent"></media-time-range>

        <div
          class="absolute w-full bottom-0 bg-gradient-to-b from-transparent to-black h-40 group-hover:opacity-70 opacity-0 transition-opacity pointer-events-none"
          :class="{ 'opacity-70': videoIsPaused }">
        </div>

      </media-control-bar>
    </media-controller>

  </div>

  <div class="sm:hidden w-full aspect-video mt-14"></div>

  <div class="mt-4">

    <div class="border-b border-stone-200 px-4 sm:px-0">

      <h1 class="text-lg">{{ title }}</h1>

      <div class="flex items-end justify-between mt-3">

        <p class="text-stone-700 text-sm mb-3">{{ viewCount.toLocaleString('en') }} views <span class="font-bold mx-1">·</span> Apr 26, 2012</p>

        <div class="flex items-center border-b-2 border-stone-700 space-x-6 pb-3 px-2">

          <div class="inline-flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24" class="h-5 w-5 fill-stone-400">
              <path d="M 14.167969 1 L 7.5839844 7.5957031 C 7.2118359 7.9688467 7.0020678 8.4738186 7 9 L 1 9 L 1 21 L 7 21 C 7.3660536 21 7.7049394 20.894189 8 20.722656 C 8.2950606 20.894189 8.6339464 21 9 21 L 17.992188 21 C 18.791187 21 19.514078 20.524062 19.830078 19.789062 L 22.837891 12.787109 C 22.944891 12.538109 23 12.269047 23 11.998047 L 23 10 C 23 8.895 22.105 8 21 8 L 14.648438 8 L 15.585938 3.703125 C 15.731938 3.032125 15.523203 2.3345156 15.033203 1.8535156 L 14.167969 1 z M 13.326172 4.6738281 L 12.695312 7.5742188 L 12.167969 10 L 14.650391 10 L 21 10 L 21 11.998047 L 17.992188 19 L 9 19 L 9 11 L 9 9.0078125 L 13.326172 4.6738281 z M 3 11 L 7 11 L 7 19 L 3 19 L 3 11 z"></path>
            </svg>
            <span class="font-semibold text-stone-700 text-sm">{{ formatToYoutubeCount(likeCount ?? 0) }}</span>
          </div>

          <div class="inline-flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24" class="h-5 w-5 fill-stone-400 rotate-180">
              <path d="M 14.167969 1 L 7.5839844 7.5957031 C 7.2118359 7.9688467 7.0020678 8.4738186 7 9 L 1 9 L 1 21 L 7 21 C 7.3660536 21 7.7049394 20.894189 8 20.722656 C 8.2950606 20.894189 8.6339464 21 9 21 L 17.992188 21 C 18.791187 21 19.514078 20.524062 19.830078 19.789062 L 22.837891 12.787109 C 22.944891 12.538109 23 12.269047 23 11.998047 L 23 10 C 23 8.895 22.105 8 21 8 L 14.648438 8 L 15.585938 3.703125 C 15.731938 3.032125 15.523203 2.3345156 15.033203 1.8535156 L 14.167969 1 z M 13.326172 4.6738281 L 12.695312 7.5742188 L 12.167969 10 L 14.650391 10 L 21 10 L 21 11.998047 L 17.992188 19 L 9 19 L 9 11 L 9 9.0078125 L 13.326172 4.6738281 z M 3 11 L 7 11 L 7 19 L 3 19 L 3 11 z"></path>
            </svg>
            <span class="font-semibold text-stone-700 text-sm">{{ formatToYoutubeCount(dislikeCount ?? 0) }}</span>
          </div>
        </div>

      </div>
    </div>

    <div class="flex flex-col sm:flex-row sm:items-center justify-between mt-3 border-b border-stone-200 pb-4 px-4 sm:px-0">

      <div class="inline-flex space-x-3">

        <NuxtImg
          format="webp"
          class="w-10 h-10 rounded-full bg-center bg-contain"
          height="40"
          width="40"
          src="https://yt3.ggpht.com/CBRr0hQOzp1NC5OSbYD_noMkx8sFIht0TqpOjjguy8DDPN0ux0vgVu1PygQXNJvDJqi8GD77=s176-c-k-c0x00ffffff-no-rj-mo"
        />
        <div class="flex flex-col justify-center">
          <p class="font-semibold text-base/6 text-stone-900 mt-0.5">taia777</p>
          <span class="text-xs text-stone-700">71.8K subscribers</span>
        </div>

      </div>

      <div class="inline-flex mt-4 sm:mt-0 items-center text-stone-700 bg-stone-100 rounded-full border border-stone-200 px-2 py-0.5 text-xs self-center sm:self-end">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24" class="h-4 mr-1 fill-yellow-500">
          <path d="M 12 1 L 10.082031 6.1152344 L 4 4 L 6.1152344 10.082031 L 1 12 L 6.1152344 13.917969 L 4 20 L 10.082031 17.884766 L 12 23 L 13.917969 17.884766 L 20 20 L 17.884766 13.917969 L 23 12 L 17.884766 10.082031 L 20 4 L 13.917969 6.1152344 L 12 1 z M 12 6.6953125 L 13.126953 9.7011719 L 13.445312 10.552734 L 14.296875 10.871094 L 17.304688 12 L 14.298828 13.126953 L 13.447266 13.445312 L 13.128906 14.296875 L 12 17.304688 L 10.873047 14.298828 L 10.554688 13.447266 L 9.703125 13.128906 L 6.6953125 12 L 9.7011719 10.873047 L 10.552734 10.554688 L 10.871094 9.703125 L 12 6.6953125 z"></path>
        </svg>
        <span>Made possible by <a
          href="https://www.reddit.com/r/taia777/comments/o1rls6/taia777_videos_and_comments_archive/"
          target="_blank"
          class="font-medium text-blue-700 hover:underline">rebane</a>
        </span>
      </div>

    </div>
  </div>

  <button
    v-if="commentsCount > 0 && isOnMobile"
    class="flex items-center justify-between text-sm w-full text-stone-800 border-b border-stone-200 px-4 text-left py-2.5"
    @click="toggleResponsiveComments">
    <p>Comments <span class="mx-1">•</span> {{ useYoutubeFormat(commentsCount) }}</p>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px" y="0px"
      viewBox="0 0 24 24"
      class="h-5 fill-stone-600">
      <path d="M 7.4296875 9.5 L 5.9296875 11 L 12 17.070312 L 18.070312 11 L 16.570312 9.5 L 12 14.070312 L 7.4296875 9.5 z"></path>
    </svg>
  </button>

  <div
    v-show="showResponsiveComments"
    id="js-responsive-comments"
    class="bg-white w-full fixed h-full bottom-0 left-0 right-0 z-40 border-t border-stone-200 rounded-t-md">

      <header class="flex justify-between items-center px-4 pt-2 pb-2 border-b border-stone-200 shadow-sm">
        <h1 class="font-medium text-lg text-stone-950">Comments <span class="font-normal text-sm ml-4 text-stone-700">{{ commentsCount }}</span></h1>
        <button @click="toggleResponsiveComments">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px" y="0px"
          viewBox="0 0 24 24"
          class="h-5">
          <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"></path>
        </svg>
        </button>
      </header>

      <div class="overflow-y-auto overflow-x-hidden max-h-full px-4 pb-[45px]" ref="root">

        <Comments
          :hide-meta="true"
          :comments-count="commentsCount"
          :comments="comments"
          :loading="loadingComments"
          @load-more="loadComments" />

      </div>


  </div>

  <Comments
    v-if="!isOnMobile"
    class="mt-4"
    :comments-count="commentsCount"
    :comments="comments"
    :loading="loadingComments"
    @load-more="loadComments" />


</template>

<style scoped>

media-time-range {
  --media-range-track-border-radius: 0;
  --media-range-bar-color: red;
}

</style>
