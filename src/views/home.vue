<template>
  <div class="recommend">
    <div class="title">推荐歌单</div>
    <div class="song-list">
      <div v-for="item in songList" class="list-box">
        <img :src="item.picUrl" class="song-pic">
        <div class="song-detail">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {getSongList} from "@/request/api/home";
import {onMounted, ref} from "vue";

const songList = ref("")
const focus = ref(false)
const coverHover = ref(true)
const alwaysShowShadow = ref(false)


onMounted(async () => {
  const res = await getSongList()
  console.log(res.data.result)
  songList.value = res.data.result
})
</script>

<style lang="less" scoped>
.recommend {
  display: flex;
  flex-direction: column;

  .title {
    color: white;
    font-size: 25px;
    font-weight: 600;
  }

  .song-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .list-box {
      width: 11.5em;
      margin: 30px 0 0 0;

      .song-pic {
        width: 11.5em;
        border-radius: 10px;
      }

      .song-detail {
        margin-top: 10px;
        word-wrap: break-word;
        color: white;
        font-weight: 600;
        cursor: pointer;
      }
    }
  }
}
</style>