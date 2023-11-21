<script setup lang="ts">
</script>
<template>
  <div class="flex flex-col sm:flex-row pb-10 max-w-6xl w-screen h-full transition-all px-0 sm:px-10">
    <Page
      :video-id="$route.params.id ?? 'Q9XTqQbuavI'"
      class="flex-1 sm:mr-10"/>
    <SideNav class="mt-6 sm:mt-0"/>
  </div>
</template>
