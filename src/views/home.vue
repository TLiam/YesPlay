<template>
  <div class="home">
    <div class="recommend">
      <div class="title">推荐歌单</div>
      <div class="song-list">
        <router-link
            to="/playlist"
            class="list-box"
            v-for="item in songList"
            @click="transId($event)"
        >
          <img :src="item.picUrl" class="song-pic" :id="item.id">
          <div class="song-detail" :id="item.id">{{ item.name }}</div>
        </router-link>
      </div>
    </div>
    <div class="recommend">
      <div class="title">推荐新音乐</div>
      <div class="song-list">
        <router-link to="/playlist" :id="item.id" v-for="item in newSongList" class="list-box">
          <img :src="item.picUrl" class="song-pic">
          <div class="song-detail">{{ item.name }}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import {getSongList, getNewSongList} from "@/request/api/home";
import {onMounted, ref, getCurrentInstance} from "vue";

const instance = getCurrentInstance()
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

// 用来传递点击歌单返回的 ID
const transId = (e) => {
  // console.log(e)
  // console.log(e.target.id)
  instance.root.exposeProxy.songId = e.target.id
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

    .song-list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;

      .list-box {
        position: relative;
        width: 12em;
        height: 16em;
        margin: 30px 0 0 0;

        .song-pic {
          width: 12em;
          border-radius: 10px;
          transition: all .2s;

          &:hover {
            position: absolute;
            left: -1em;
            width: 14em;
          }
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
}
</style>