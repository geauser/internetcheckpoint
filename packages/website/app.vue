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

const submittedEmail = ref(false);
const showModal = ref(false);


async function submitEmail(event: Event) {

  const data = new FormData(event?.target as HTMLFormElement);

  await fetch('https://formspree.io/f/xvonepda', {
    method: 'POST',
    body: data,
    headers: {
      'Accept': 'application/json',
    },
  });

  submittedEmail.value = true;
}

function toggleModal() {
  showModal.value = !showModal.value;
  submittedEmail.value = false;
}

</script>

<template>


  <div
    class="flex flex-col sm:flex-row justify-center pb-10 bg-white transition-all"
    :class="{ 'blur-sm': showModal }">
    <div class="flex-1 max-w-4xl sm:px-10">

      <header id="js-header" class="fixed sm:relative top-0 z-50 w-full flex justify-between items-center bg-white max-w-4xl px-4 sm:px-0 pb-2 sm:pb-6 pt-2 sm:pt-4">

        <nav class="inline-flex items-center space-x-2">

          <a href="https://twitter.com/geauser" target="_blank" class="no-after">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24" class="link fill-[#55acee]">
              <path d="M21.634,4.031c-0.815,0.385-2.202,1.107-2.899,1.245c-0.027,0.007-0.049,0.016-0.075,0.023 c-0.813-0.802-1.927-1.299-3.16-1.299c-2.485,0-4.5,2.015-4.5,4.5c0,0.131-0.011,0.372,0,0.5c-3.218,0-5.568-1.679-7.327-3.837 C3.438,4.873,3.188,5.024,3.136,5.23C3.019,5.696,2.979,6.475,2.979,7.031c0,1.401,1.095,2.777,2.8,3.63 c-0.314,0.081-0.66,0.139-1.02,0.139c-0.424,0-0.912-0.111-1.339-0.335c-0.158-0.083-0.499-0.06-0.398,0.344 c0.405,1.619,2.253,2.756,3.904,3.087c-0.375,0.221-1.175,0.176-1.543,0.176c-0.136,0-0.609-0.032-0.915-0.07 c-0.279-0.034-0.708,0.038-0.349,0.582c0.771,1.167,2.515,1.9,4.016,1.928c-1.382,1.084-3.642,1.48-5.807,1.48 c-0.438-0.01-0.416,0.489-0.063,0.674C3.862,19.504,6.478,20,8.347,20C15.777,20,20,14.337,20,8.999 c0-0.086-0.002-0.266-0.005-0.447C19.995,8.534,20,8.517,20,8.499c0-0.027-0.008-0.053-0.008-0.08 c-0.003-0.136-0.006-0.263-0.009-0.329c0.589-0.425,1.491-1.163,1.947-1.728c0.155-0.192,0.03-0.425-0.181-0.352 c-0.543,0.189-1.482,0.555-2.07,0.625c1.177-0.779,1.759-1.457,2.259-2.21C22.109,4.168,21.895,3.907,21.634,4.031z"></path>
            </svg>
          </a>

          <a href="https://discord.gg/XNsKgQgc" target="_blank" class="no-after">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24" class="link fill-[#7289da]">
              <path d="M21,23l-4.378-3.406L17,21H5c-1.105,0-2-0.895-2-2V5c0-1.105,0.895-2,2-2h14c1.105,0,2,0.895,2,2V23z M16.29,8.57	c0,0-1.23-0.95-2.68-1.06l-0.3,0.61C12.86,8.04,12.4,7.98,12,7.98c-0.41,0-0.88,0.06-1.31,0.14l-0.3-0.61	C8.87,7.66,7.71,8.57,7.71,8.57s-1.37,1.98-1.6,5.84C7.49,15.99,9.59,16,9.59,16l0.43-0.58c-0.44-0.15-0.82-0.35-1.21-0.65	l0.09-0.24c0.72,0.33,1.65,0.53,3.1,0.53s2.38-0.2,3.1-0.53l0.09,0.24c-0.39,0.3-0.77,0.5-1.21,0.65L14.41,16	c0,0,2.1-0.01,3.48-1.59C17.66,10.55,16.29,8.57,16.29,8.57z M10,13.38c-0.52,0-0.94-0.53-0.94-1.18c0-0.65,0.42-1.18,0.94-1.18	s0.94,0.53,0.94,1.18C10.94,12.85,10.52,13.38,10,13.38z M14,13.38c-0.52,0-0.94-0.53-0.94-1.18c0-0.65,0.42-1.18,0.94-1.18	s0.94,0.53,0.94,1.18C14.94,12.85,14.52,13.38,14,13.38z"></path>
            </svg>
          </a>

          <a href="https://github.com/geauser/internetcheckpoint" target="_blank" class="no-after group">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24" class="link opacity-50 group-hover:opacity-100">
              <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"></path>
            </svg>
          </a>

        </nav>

        <button class="button-dark relative !px-3 font-medium text-sm no-antialiased" @click="toggleModal">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" class="h-4 fill-stone-200 mr-2" viewBox="0 0 24 24">
            <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"></path>
          </svg>
          Restore your Checkpoints
        </button>

      </header>

      <NuxtPage />
    </div>
    <SideNav class="mt-6 sm:mt-[68px]"/>
  </div>

  <div v-if="showModal" class="fixed top-0 left-0 w-full h-full bg-black/20" @click="showModal = false"/>

  <div v-if="showModal" class="fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50">

    <div class="relative bg-white w-full max-w-[350px] rounded-md overflow-hidden">

      <button
        class="absolute z-50 top-2 right-2 p-1 rounded-full hover:bg-stone-300"
        @click="showModal = false">
        <svg xmlns="http://www.w3.org/2000/svg"
          x="0px" y="0px"
          viewBox="0 0 24 24"
          class="h-4">
          <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"></path>
        </svg>
      </button>

      <div class="absolute px-8 flex flex-col justify-center items-center top-0 left-0 w-full h-full" v-if="submittedEmail">

        <h1 class="font-bold text-stone-950 text-center text-4xl mb-2">You're set! 🎉</h1>
        <p class="text-stone-700 text-sm text-center">You'll receive an email when the feature is available.</p>

      </div>

      <div
        class="px-6 pb-6 pt-6"
        :class="[ submittedEmail ? 'opacity-0 pointer-events-none' : '']">

          <h1 class="font-bold text-black text-center text-3xl mb-2">Coming Soon</h1>

          <p class="text-sm text-center mt-4 text-stone-700">
            <!-- Thanks to <a href="#" target="_blank" class="font-medium text-stone-700 underline decoration-dashed">Rebane</a> all the videos of taia777
            along with most of their comments were saved. -->
            Get notified when the ability to restore your checkpoints is out 👍
          </p>


          <!-- <p class="text-sm font-light no-antialiased mt-6 text-stone-950">
            As many of you know, Nintento and other companies brought down the
            channel of taia777 for copyright violation.
          </p>


          <p class="text-sm font-light no-antialiased mt-6 text-stone-950">
            Due to the quality of <a href="#" target="_blank" class="font-medium text-stone-700 underline decoration-dashed">Rebane</a> archive, the comments
            in the backup contains the channel id of it's author, meaning we can find who posted what comment.
          </p> -->


          <form class="flex flex-col mt-4" @submit.prevent="submitEmail">
            <input
              class="w-full py-1.5 pl-4 placeholder:text-stone-500 bg-white shadow-sm border border-stone-300 rounded-[4px] text-stone-950 text-sm"
              type="email"
              name="email"
              placeholder="Email"/>
            <div class="flex justify-end space-x-3 mt-3">
              <button class="button-ghost" @click="showModal = false">Cancel</button>
              <button type="submit" class="button-dark">Subscribe</button>
            </div>
          </form>


      </div>

    </div>

  </div>

</template>
<style>
.link {
  @apply h-7 w-7 p-0.5 transition-opacity grayscale;
  /* opacity: 1; */
}
.link:hover {
  @apply grayscale-0;
}
</style>
