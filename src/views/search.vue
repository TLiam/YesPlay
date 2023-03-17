<template>
  <div class="search">
    <div class="search-word">
      搜索”{{ $route.query.keywords }}“的结果
    </div>

    <div v-for="item in searchList" class="song-item">
      <div :id="item.id" @click.self="getPlay($event)" :data-name="item.name" class="song-detail">
        <img :src="item.al.picUrl">
        <div class="song-name">{{ item.name }}</div>
      </div>
      <div class="song-ar" v-if="item.ar.length >= 1">
        <p v-for="ar in item.ar">{{ ar.name }} &nbsp </p>
      </div>
      <div class="song-dt">{{ getTime(item.dt) }}</div>
    </div>
  </div>

</template>

<script setup>
import {useRoute} from "vue-router";
import {getCurrentInstance, onMounted, ref} from "vue";
import service from "@/request";

const instance = getCurrentInstance()
const route = useRoute();
const searchList = ref('')

onMounted(async () => {
  const res = await service({url: `/cloudsearch?keywords=${route.query.keywords}`})
  console.log(res.data.result.songs)
  searchList.value = res.data.result.songs
})

// 获取 歌曲播放url
const getPlay = async (e) => {
  const url = await service({
    url: `/song/url?id=${e.target.id}`
  })
  instance.root.exposeProxy.songUrl = url.data.data[0].url
  instance.root.exposeProxy.songName = e.target.dataset.name
  instance.root.exposeProxy.iconShow = true
}
const getTime = (time) => {
  // 将时间改为 秒
  let dt = time / 1000
  let minute = parseInt(dt / 60)
  let second = parseInt(dt % 60)
  return `${minute}:${second < 10 ? '0' + second : second}`
}
</script>

<style lang="less" scoped>
.search {
  .search-word {
    color: white;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 30px;
  }

  .song-item {
    border-radius: 10px;
    background-color: #3c3c3c;
    padding: 5px 10px;
    display: flex;
    margin: 10px 0;
    justify-content: space-between;
    align-items: center;

    img {
      width: 3em;
      border-radius: 5px;
    }

    .song-detail {
      display: flex;
      align-items: center;
      width: 45%;

      .song-name {
        margin-left: 20px;
        color: white;
        font-size: 20px;
      }

    }

    .song-ar {
      display: flex;
      color: gray;
      font-size: 15px;
      width: 30%;
    }

    .song-dt {
      color: grey;
    }
  }
}
</style>