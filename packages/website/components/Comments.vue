<script lang="ts" setup>
import { type CommentTable } from '@internetcheckpoint/functions/db/schema';
import { useElementVisibility } from '@vueuse/core';

defineProps<{
  hideMeta?: boolean,
  commentsCount: number,
  comments: CommentTable[],
  loading: boolean,
}>();


const scrollObserver = ref(null);
const isVisible = useElementVisibility(scrollObserver);

const emits = defineEmits(['loadMore']);

watch(isVisible, async () => {
  if (!isVisible.value) return;
  emits('loadMore');
});

</script>

<template>
  <ol class="space-y-4">

    <div class="flex justify-between" :class="{ 'opacity-0': comments.length === 0 }">

      <div v-if="!hideMeta" class="inline-flex items-center space-x-8">

        <p class="text-stone-700 font-medium">{{ commentsCount }} comments</p>

        <button class="inline-flex items-center space-x-2 text-sm text-stone-950">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24" class="h-6 w-6 mr-1 fill-stone-400">
            <g>
              <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"></path>
              <path d="M0 0h24v24H0z" fill="none"></path>
            </g>
          </svg>
          Sort by
        </button>
      </div>

    </div>

    <li v-for="comment in comments" :key="comment.id">

      <Comment :comment="comment" />

    </li>

    <div ref="scrollObserver"></div>

    <div class="flex justify-center w-full mt-6 pb-4">
      <CircleLoading v-if="loading" class="border-stone-400 h-5 w-5 mx-auto" />
    </div>

  </ol>
</template>
