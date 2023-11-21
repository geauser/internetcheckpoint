<script lang="ts" setup>
import { type CommentTable } from '@internetcheckpoint/functions/db/schema';

defineProps<{
  loading?: boolean,
  replies: CommentTable[],
  onLoadMoreReplies: () => void,
  canFetchMore: boolean,
}>();

</script>

<template>

  <ol class="space-y-2">

    <li
      v-for="reply in replies"
      :key="reply.id">
      <Comment :comment="reply" :isReply="true" />
    </li>

    <button
      v-if="canFetchMore && !loading"
      class="text-sm text-blue-700 font-semibold inline-flex items-center mt-1 pl-2.5 pr-3 py-1.5 hover:bg-blue-100 rounded-full flex-shrink-0"
      @click="onLoadMoreReplies">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px" y="0px"
        viewBox="0 0 24 24"
        class="h-5 w-5 mr-2 fill-blue-700">
        <path d="M 3 3 L 3 12 C 3 14.749516 5.2504839 17 8 17 L 16 17 L 16 21 L 21 16 L 16 11 L 16 15 L 8 15 C 6.3315161 15 5 13.668484 5 12 L 5 3 L 3 3 z"></path>
      </svg>
      Load more comments
    </button>

  </ol>

  <div v-if="loading" class="flex py-3 items-center justify-center">
    <CircleLoading class="border-stone-400 h-4 w-4" />
  </div>

</template>

<style>
</style>
