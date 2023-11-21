<script lang="ts" setup>
import 'media-chrome';


const config = useRuntimeConfig();


const siteName    = 'Internet Checkpoint';
const title       = 'Internet Checkpoint';
const description = 'A re-creation of the internet checkpoint comment sections';
const image       = `https://${config.public.appDomain}/images/og.jpg`;


useSeoMeta({
  title,
  description,

  twitterCard: 'summary_large_image',
  twitterImage: image,
  twitterTitle: title,
  twitterDescription: description,

  ogSiteName: siteName,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogImage: image,
});

</script>

<template>

  <div class="flex justify-center">

    <div class="inline-flex flex-col justify-center items-center h-full">

      <AppHeader class="max-w-6xl w-screen mb-6 pl-2 pr-3 sm:px-10" />
      <NuxtLoadingIndicator color="#000000" />
      <NuxtPage keepalive />
    </div>

  </div>

</template>
<style>
.link {
  @apply text-sm font-medium text-gray-900 hover:text-gray-700 hover:underline px-2 py-1 rounded-md;
}

.link.router-link-active {
  @apply bg-gray-700 text-white no-underline pointer-events-none;
}
</style>
