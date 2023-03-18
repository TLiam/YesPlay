<template>
  <div class="home">
    <div class="recommend">
      <div class="title">推荐歌单</div>
      <song-list
          :list="songList"
          @change="clickIndex"
      />
    </div>
    <div class="recommend">
      <div class="title">推荐新音乐</div>
      <song-list
          :list="newSongList"
          @change="clickIndex"
      />
    </div>

  </div>
</template>

<script setup>
import {getSongList, getNewSongList} from "@/request/api/home";
import {onMounted, ref, watch} from "vue";
import SongList from "@/components/SongList.vue";

// 推荐歌单 数据
const songList = ref("")
// 推荐新音乐 数据
const newSongList = ref("")


onMounted(async () => {
  const getSong = await getSongList()
  // console.log("getsong 推荐歌单 数据", getSong.data.result)
  songList.value = getSong.data.result

  const getNewSong = await getNewSongList()
  // console.log("getnewsong 推荐新音乐 数据", getNewSong)
  newSongList.value = getNewSong.data.result
})


const clickIndex = (e) => {
  // 接收 点击的歌单名字
  console.log(e)
}

</script>

<style lang="less" scoped>
.home {
  .recommend {
    display: flex;
    flex-direction: column;

    .title {
      color: white;
      font-size: 25px;
      font-weight: 600;
      margin-top: 50px;
    }
  }
}
</style>