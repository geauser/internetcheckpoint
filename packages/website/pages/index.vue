<script setup lang="ts">
import Page from './[id].vue';


console.log('INDEX FIRST');

const defaultVideoId = 'Q9XTqQbuavI';
if (process.client) history.replaceState(null, '', `/${defaultVideoId}`);
</script>
<template>
  <Page />
</template>
