<script lang="ts" setup>
import { ArrowLeftOnRectangleIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { Menu, MenuButton, MenuItems } from '@headlessui/vue';


const store = useStore();
</script>

<template>
  <header id="js-header"
    class="fixed sm:relative h-14 top-0 z-50 w-full flex justify-between items-center bg-white">

    <a href="https://twitter.com/geauser" target="_blank" class="no-after fixed bottom-0 right-0 sm:-top-px sm:bottom-auto sm:right-auto sm:left-0 decoration-white animate-fade-in opacity-0" style="animation-delay: 1000ms;">
      <div class="bg-stone-900 hover:bg-stone-700 text-white rounded-tl-md sm:rounded-br-md sm:rounded-tl-none text-xs px-3 py-1.5 sm:py-1 sm:px-2 inline-block">
        <span class="text-stone-300">Made by</span> <span class="font-medium ml-0.5">@geauser</span>
      </div>
    </a>


    <nav class="inline-flex items-center space-x-4">

      <a href="https://discord.gg/Qwt7m8CFVn" target="_blank" class="no-after animate-fade-in-up opacity-0" style="animation-delay: 100ms;">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24" class="h-8 w-8 fill-[#7289da]">
          <path
            d="M21,23l-4.378-3.406L17,21H5c-1.105,0-2-0.895-2-2V5c0-1.105,0.895-2,2-2h14c1.105,0,2,0.895,2,2V23z M16.29,8.57	c0,0-1.23-0.95-2.68-1.06l-0.3,0.61C12.86,8.04,12.4,7.98,12,7.98c-0.41,0-0.88,0.06-1.31,0.14l-0.3-0.61	C8.87,7.66,7.71,8.57,7.71,8.57s-1.37,1.98-1.6,5.84C7.49,15.99,9.59,16,9.59,16l0.43-0.58c-0.44-0.15-0.82-0.35-1.21-0.65	l0.09-0.24c0.72,0.33,1.65,0.53,3.1,0.53s2.38-0.2,3.1-0.53l0.09,0.24c-0.39,0.3-0.77,0.5-1.21,0.65L14.41,16	c0,0,2.1-0.01,3.48-1.59C17.66,10.55,16.29,8.57,16.29,8.57z M10,13.38c-0.52,0-0.94-0.53-0.94-1.18c0-0.65,0.42-1.18,0.94-1.18	s0.94,0.53,0.94,1.18C10.94,12.85,10.52,13.38,10,13.38z M14,13.38c-0.52,0-0.94-0.53-0.94-1.18c0-0.65,0.42-1.18,0.94-1.18	s0.94,0.53,0.94,1.18C14.94,12.85,14.52,13.38,14,13.38z">
          </path>
        </svg>
      </a>

      <iframe class="hidden sm:inline-block animate-fade-in-up opacity-0" style="animation-delay: 200ms;"
        src="https://ghbtns.com/github-btn.html?user=geauser&repo=internetcheckpoint&type=star&count=true" frameborder="0"
        scrolling="0" width="120" height="20" title="GitHub"></iframe>

    </nav>

    <Transition name="fade" mode="out-in">

      <div v-if="store.waitingForFirebase" class="h-9 w-9 rounded-full bg-gray-200 animate-pulse">
      </div>

      <div v-else-if="store.isLoggedIn" class="inline-flex items-center space-x-6">

        <NuxtLink to="/restore" class="link animate-fade-in">Your Checkpoints</NuxtLink>

        <Menu as="div" class="relative inline-block text-left h-9 w-9">

          <MenuButton class="inline-flex justify-center items-center h-9 w-9 rounded-full bg-gray-200 overflow-hidden">

            <img :src="store.currentUser?.photoURL" class="w-full h-full" />

          </MenuButton>

          <Transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">

            <MenuItems
              class="absolute right-0 z-50 min-w-[160px] max-w-[220px] origin-top-right divide-y divide-gray-200 dark:divide-gray-700 rounded-[4px] bg-white shadow-lg border border-gray-300 focus:outline-none">

              <div class="px-3 pt-1.5 pb-2">
                <p class="font-medium text-gray-900">{{ useStore().currentUser?.displayName }}</p>
                <p class="truncate text-xs text-gray-700">{{ useStore().currentUser?.email }}</p>
              </div>

              <div class="py-1 w-full">
                <button class="flex items-center w-full text-left text-sm hover:bg-gray-100 text-black px-3 py-1"
                  @click="useStore().logout">
                  <ArrowLeftOnRectangleIcon class="h-4 w-4 mr-1.5" />
                  Logout
                </button>
              </div>

            </MenuItems>

          </Transition>

        </Menu>

      </div>

      <button v-else
        class="
          relative
          inline-flex items-center
          rounded-full font-medium text-xs
          border border-gray-300
          py-1 px-4
          opacity-0
          animate-fade-in-up
          transition-colors
          hover:bg-gray-50
          shadow-sm bg-white"
        @click="navigateTo('restore')">
        <MagnifyingGlassIcon class="h-4 mr-2"/>
        Find Checkpoints
        <span class="
          animate-fade-in
          opacity-0
          absolute -top-1.5 -right-2 text-[9px] leading-[8px] py-0.5 px-0.5 rounded-sm bg-red-600 text-white font-medium"
          style="animation-delay: 300ms;">
          NEW
        </span>
      </button>

    </Transition>

  </header>
</template>

<style></style>
