<script lang="ts" setup>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { type CommentTable } from '@internetcheckpoint/functions/planetscale/db';
dayjs.extend(relativeTime)

const props = defineProps<{
  // Whether the comment is a reply to another comment
  isReply?: boolean,
  comment: CommentTable,
}>();

const replies        = ref<CommentTable[]>([]);
const showReplies    = ref(false);
const loadingReplies = ref(false);
const batchIndex     = ref(0);
const canFetchMore   = ref(false);
const needClipping   = ref(false);
const showClipped    = ref(false);

const textEl = ref<HTMLParagraphElement>();

const formatToYoutubeCount = (value: number) => {
  if (value < 1000) return value;
  return (value / 1000) + 'K';
}


onMounted(() => {
  needClipping.value = textEl.value?.scrollHeight! > textEl.value?.clientHeight!;
});

const config = useRuntimeConfig();

async function loadReplies() {

  try {

    loadingReplies.value = true;

    const { data } = await useFetch<{ comments: CommentTable[] }>(`${config.public.apiUrl}/comments?repliesOf=${props.comment.id}&batch=${batchIndex.value}&videoId=`);
    replies.value.push(...data.value?.comments!);
    canFetchMore.value = data.value?.comments.length === 10;
    batchIndex.value++;

  } finally {
    loadingReplies.value = false;
  }

}

function toggleReplies() {
  showReplies.value = !showReplies.value;
  if (showReplies.value) {
    if (batchIndex.value === 0) replies.value = [];
    loadReplies();
  }
}

</script>

<template>

  <div class="flex flex-row space-x-4 items-start">

    <NuxtImg
      class="bg-center bg-contain rounded-full flex-shrink-0"
      :class="[isReply ? 'w-6 h-6' : 'w-10 h-10']"
      :src="comment.importedAuthorPhoto!" />

    <div class="w-full">

      <!-- content (author + text) -->
      <div>
        <div class="flex items-center">
        <a :href="comment.authorChannelId ? `https://youtube.com/channel/${comment.authorChannelId}`: ''" target="_blank" class="no-after">
          <h1 class="font-medium text-sm text-stone-900 mb-0.5">
            {{ comment.importedAuthorName }}
          </h1>
        </a>
        <span class="text-xs font-normal ml-2">{{ dayjs(comment.createdAt).fromNow() }}</span>
        </div>
        <p ref="textEl" class="text-sm" :class="{ 'line-clamp-5 sm:line-clamp-4': !showClipped }">{{ comment.text }}</p>
        <button
          v-if="needClipping"
          class="font-medium text-sm text-stone-600 mt-1 hover:underline"
          @click="showClipped = !showClipped">
          {{ showClipped ? 'Less' : 'Read more' }}
        </button>
      </div>

      <!-- buttons -->
      <div class="flex items-center space-x-2" :class="[ isReply ? 'mt-0.5' : 'mt-1' ]">

        <!-- like button -->
        <div class="like-dislike-button-wrapper">
          <button class="like-dislike-button" disabled>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24">
              <path d="M 14.167969 1 L 7.5839844 7.5957031 C 7.2118359 7.9688467 7.0020678 8.4738186 7 9 L 1 9 L 1 21 L 7 21 C 7.3660536 21 7.7049394 20.894189 8 20.722656 C 8.2950606 20.894189 8.6339464 21 9 21 L 17.992188 21 C 18.791187 21 19.514078 20.524062 19.830078 19.789062 L 22.837891 12.787109 C 22.944891 12.538109 23 12.269047 23 11.998047 L 23 10 C 23 8.895 22.105 8 21 8 L 14.648438 8 L 15.585938 3.703125 C 15.731938 3.032125 15.523203 2.3345156 15.033203 1.8535156 L 14.167969 1 z M 13.326172 4.6738281 L 12.695312 7.5742188 L 12.167969 10 L 14.650391 10 L 21 10 L 21 11.998047 L 17.992188 19 L 9 19 L 9 11 L 9 9.0078125 L 13.326172 4.6738281 z M 3 11 L 7 11 L 7 19 L 3 19 L 3 11 z"></path>
            </svg>
          </button>
          <span v-if="comment.votes" class="text-xs font-medium">{{ formatToYoutubeCount(comment.votes) }}</span>
        </div>

        <!-- dislike button -->
        <div class="like-dislike-button-wrapper">
          <button class="like-dislike-button" disabled>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24" class="rotate-180">
              <path d="M 14.167969 1 L 7.5839844 7.5957031 C 7.2118359 7.9688467 7.0020678 8.4738186 7 9 L 1 9 L 1 21 L 7 21 C 7.3660536 21 7.7049394 20.894189 8 20.722656 C 8.2950606 20.894189 8.6339464 21 9 21 L 17.992188 21 C 18.791187 21 19.514078 20.524062 19.830078 19.789062 L 22.837891 12.787109 C 22.944891 12.538109 23 12.269047 23 11.998047 L 23 10 C 23 8.895 22.105 8 21 8 L 14.648438 8 L 15.585938 3.703125 C 15.731938 3.032125 15.523203 2.3345156 15.033203 1.8535156 L 14.167969 1 z M 13.326172 4.6738281 L 12.695312 7.5742188 L 12.167969 10 L 14.650391 10 L 21 10 L 21 11.998047 L 17.992188 19 L 9 19 L 9 11 L 9 9.0078125 L 13.326172 4.6738281 z M 3 11 L 7 11 L 7 19 L 3 19 L 3 11 z"></path>
            </svg>
          </button>
        </div>

      </div>


      <!-- Show replies button -->
      <button
        v-if="comment.repliesCount > 0"
        class="text-sm text-blue-600 font-medium inline-flex items-center mt-1 pl-2 pr-3 py-1 hover:bg-blue-100 rounded-full flex-shrink-0"
        @click="toggleReplies">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px" y="0px"
          viewBox="0 0 24 24"
          class="h-5 w-5 mr-1.5 fill-blue-600 transition-transform"
          :class="{ 'rotate-180': showReplies }">
          <path d="M 7.4296875 9.5 L 5.9296875 11 L 12 17.070312 L 18.070312 11 L 16.570312 9.5 L 12 14.070312 L 7.4296875 9.5 z"></path>
        </svg>
        {{ comment.repliesCount }} replies
      </button>

      <Replies
        v-if="showReplies"
        :canFetchMore="canFetchMore"
        :onLoadMoreReplies="loadReplies"
        :loading="loadingReplies"
        :replies="replies" />

    </div>

  </div>

</template>

<style scoped>
.like-dislike-button-wrapper {
  @apply inline-flex items-center;
}

.like-dislike-button {
  @apply inline-flex items-center hover:bg-stone-100 p-1.5 rounded-full;
}

.like-dislike-button svg {
  @apply h-4 w-4 fill-stone-400;
}
</style>
