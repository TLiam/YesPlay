<template>
  <div>
    搜索页
  </div>
  <div>
    {{ $route.query.keywords}}
  </div>
</template>

<script setup>
import {useRoute} from "vue-router";

const route = useRoute();

console.log(route.query)
</script>

<style scoped>

</style>