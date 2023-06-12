<script setup lang="ts">

const defaultVideoId = 'Q9XTqQbuavI';

// TODO There must be a better way to do this...
if (process.client) {
  history.replaceState(null, '', `/${defaultVideoId}`);
}
</script>
<template>
  <Page :video-id="$route.params.id ?? defaultVideoId" />
</template>
