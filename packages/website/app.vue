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

      <header id="js-header" class="fixed sm:relative h-14 top-0 z-50 w-full flex justify-between items-center bg-white px-4 sm:px-0">

        <nav class="inline-flex items-center space-x-4">

          <a href="https://twitter.com/geauser?ref_src=twsrc%5Etfw"
            class="twitter-follow-button tweet-button"
            data-show-screen-name="false"
            data-show-count="false">Follow @geauser</a>

          <a href="https://discord.gg/XNsKgQgc" target="_blank" class="no-after">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24" class="link fill-[#7289da]">
              <path d="M21,23l-4.378-3.406L17,21H5c-1.105,0-2-0.895-2-2V5c0-1.105,0.895-2,2-2h14c1.105,0,2,0.895,2,2V23z M16.29,8.57	c0,0-1.23-0.95-2.68-1.06l-0.3,0.61C12.86,8.04,12.4,7.98,12,7.98c-0.41,0-0.88,0.06-1.31,0.14l-0.3-0.61	C8.87,7.66,7.71,8.57,7.71,8.57s-1.37,1.98-1.6,5.84C7.49,15.99,9.59,16,9.59,16l0.43-0.58c-0.44-0.15-0.82-0.35-1.21-0.65	l0.09-0.24c0.72,0.33,1.65,0.53,3.1,0.53s2.38-0.2,3.1-0.53l0.09,0.24c-0.39,0.3-0.77,0.5-1.21,0.65L14.41,16	c0,0,2.1-0.01,3.48-1.59C17.66,10.55,16.29,8.57,16.29,8.57z M10,13.38c-0.52,0-0.94-0.53-0.94-1.18c0-0.65,0.42-1.18,0.94-1.18	s0.94,0.53,0.94,1.18C10.94,12.85,10.52,13.38,10,13.38z M14,13.38c-0.52,0-0.94-0.53-0.94-1.18c0-0.65,0.42-1.18,0.94-1.18	s0.94,0.53,0.94,1.18C14.94,12.85,14.52,13.38,14,13.38z"></path>
            </svg>
          </a>

          <iframe
            class="hidden sm:inline-block"
            src="https://ghbtns.com/github-btn.html?user=geauser&repo=internetcheckpoint&type=star&count=true"
            frameborder="0"
            scrolling="0"
            width="120"
            height="20"
            title="GitHub"></iframe>

        </nav>

        <button class="button-dark relative !px-3 font-medium !text-[13px] sm:!text-sm no-antialiased" @click="toggleModal">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" class="h-4 fill-stone-200 mr-2 hidden sm:inline-block" viewBox="0 0 24 24">
            <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"></path>
          </svg>
          Restore checkpoints
        </button>

      </header>

      <NuxtPage />
    </div>
    <SideNav class="mt-6 sm:mt-14"/>
  </div>

  <div v-if="showModal" class="fixed top-0 left-0 w-full h-full bg-black/20" @click="showModal = false"/>

  <div v-if="showModal" class="fixed left-1/2 min-w-[350px] sm:min-w-0 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50">

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

.tweet-button {
  @apply inline-flex items-center;
  position: relative;
  height: 20px;
  box-sizing: border-box;
  padding: 1px 12px 1px 12px;
  background-color: #1d9bf0;
  font-family: 'Helvetica Neue', sans-serif;
  color: #fff;
  border-radius: 9999px;
  font-weight: 500;
  font-size: 0;
  cursor: pointer;
}

.tweet-button::before {
  position: relative;
  margin-right: 3px;
  display: inline-block;
  width: 14px;
  height: 14px;
  background: transparent 0 0 no-repeat;
  content: url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2072%2072%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h72v72H0z%22%2F%3E%3Cpath%20class%3D%22icon%22%20fill%3D%22%23fff%22%20d%3D%22M68.812%2015.14c-2.348%201.04-4.87%201.744-7.52%202.06%202.704-1.62%204.78-4.186%205.757-7.243-2.53%201.5-5.33%202.592-8.314%203.176C56.35%2010.59%2052.948%209%2049.182%209c-7.23%200-13.092%205.86-13.092%2013.093%200%201.026.118%202.02.338%202.98C25.543%2024.527%2015.9%2019.318%209.44%2011.396c-1.125%201.936-1.77%204.184-1.77%206.58%200%204.543%202.312%208.552%205.824%2010.9-2.146-.07-4.165-.658-5.93-1.64-.002.056-.002.11-.002.163%200%206.345%204.513%2011.638%2010.504%2012.84-1.1.298-2.256.457-3.45.457-.845%200-1.666-.078-2.464-.23%201.667%205.2%206.5%208.985%2012.23%209.09-4.482%203.51-10.13%205.605-16.26%205.605-1.055%200-2.096-.06-3.122-.184%205.794%203.717%2012.676%205.882%2020.067%205.882%2024.083%200%2037.25-19.95%2037.25-37.25%200-.565-.013-1.133-.038-1.693%202.558-1.847%204.778-4.15%206.532-6.774z%22%2F%3E%3C%2Fsvg%3E);
}

.tweet-button::after {
  font-size: 12px;
  font-weight: 600;
  content: "Follow";
}

.tweet-button:active, .tweet-button:focus, .tweet-button:hover {
  background-color: #0c7abf;
}

.link {
  @apply h-7 w-7 p-0.5;
  /* opacity: 1; */
}
.link:hover {
  @apply grayscale-0;
}
</style>
