<script lang="ts" setup>
import dayjs from 'dayjs';
import metadata from '../../../backups/_metadata.json'
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)

const route = useRoute();

const links = computed(() => {

  return Object.keys(metadata).map((videoId) => {
    const { title, viewCount, publishedAt } = metadata[videoId as keyof typeof metadata];
    return { videoId, title, viewCount, publishedAt };
  })
  .sort((a, b) => a.viewCount < b.viewCount ? 1 : -1)
  .filter(link => link.videoId !== route.params.id);

});

</script>

<template>

  <ol class="space-y-4">

    <li
      v-for="link in links"
      :key="link.videoId">

      <NuxtLink
        class="flex flex-col sm:flex-row w-full sm:max-w-[320px] sm:space-x-3"
        :to="`/${link.videoId}`">

        <div class="relative aspect-video flex-shrink-0 w-full sm:w-40 h-auto">
          <img :src="`/images/thumbnails/${link.videoId}.jpg`" />
          <!-- <span class="text-xs absolute bottom-1 right-1.5 text-white font-semibold bg-black/60 px-1 rounded-sm">1:01:42</span> -->
        </div>


        <div class="flex flex-row">

          <div
            class="sm:hidden w-8 h-8 rounded-full flex-shrink-0 bg-center bg-contain mt-2 ml-2 mr-2"
            style="background-image: url('https://yt3.ggpht.com/CBRr0hQOzp1NC5OSbYD_noMkx8sFIht0TqpOjjguy8DDPN0ux0vgVu1PygQXNJvDJqi8GD77=s176-c-k-c0x00ffffff-no-rj-mo');" />


          <div class="flex-shrink pt-2 sm:pt-0">

            <h1 class="font-medium text-sm line-clamp-2 text-stone-950">{{ link.title }}</h1>
            <p class="mt-1 sm:mt-2 text-xs text-stone-700">taia777</p>
            <p class="text-xs mt-0.5 text-stone-700">{{ useYoutubeFormat(link.viewCount) }} views • {{ dayjs().to(link.publishedAt) }}</p>

          </div>
        </div>

      </NuxtLink>

    </li>

  </ol>

</template>

<style>
</style>
