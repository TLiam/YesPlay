<template>
  <div class="search">
    <div class="search-word">
      搜索”{{ $route.query.keywords }}“的结果
    </div>

    <song-item
        :list="searchList"
    />
  </div>

</template>

<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import service from "@/request";
import SongItem from "@/components/SongItem.vue";

const route = useRoute();
const searchList = ref('')

onMounted(async () => {
  const res = await service({url: `/cloudsearch?keywords=${route.query.keywords}`})
  console.log(res.data.result.songs)
  searchList.value = res.data.result.songs
})
</script>

<style lang="less" scoped>
.search {
  .search-word {
    color: white;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 30px;
  }
}
</style>