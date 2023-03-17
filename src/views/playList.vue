<template>
  <div class="play-list">
    <!--  歌单详情  -->
    <div class="list-detail">
      <!--   歌单封面   -->
      <img :src="listDetail.coverImgUrl">
      <div class="list-name">
        <!--   歌单名字     -->
        {{ listDetail.name }}
        <div>YesPlay</div>
        <!--    歌单描述    -->
        <div class="description">
          {{ listDetail.description }}
        </div>
        <div class="creator">
          <img :src="creator.avatarUrl">
          <div>{{ creator.nickname }}</div>
          <div>收藏：{{
              listDetail.subscribedCount > 100000 ? parseInt(listDetail.subscribedCount / 10000) + '万' : listDetail.subscribedCount
            }}
          </div>
          <div>转发数：{{ listDetail.shareCount }}</div>
          <div>评论：{{ listDetail.commentCount }}</div>
        </div>
      </div>
    </div>
    <!--  歌单歌曲  -->
    <div v-for="item in listDetail.tracks" class="song-item">
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
import service from "@/request";
import {ref, getCurrentInstance, onBeforeMount} from "vue";

const instance = getCurrentInstance()
// 歌单详情 数据
const listDetail = ref('')
// 歌单创建人 数据
const creator = ref('')


onBeforeMount(async () => {
  const res = await service({
    url: `/playlist/detail?id=${instance.root.exposeProxy.songId}`
  })
  // console.log('歌单详情',res.data.playlist)
  listDetail.value = res.data.playlist
  creator.value = res.data.playlist.creator
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

// 将时间改为 秒
const getTime = (time) => {
  let dt = time / 1000
  let minute = parseInt(dt / 60)
  let second = parseInt(dt % 60)
  return `${minute}:${second < 10 ? '0' + second : second}`
}

</script>

<style lang="less" scoped>
.play-list {
  .list-detail {
    display: flex;
    padding: 10px 0px;

    img {
      width: 15em;
      border-radius: 20px;
    }

    .list-name {
      color: white;
      margin-left: 40px;
      margin-top: 20px;
      font-size: 25px;
      font-weight: 600;

      div {
        color: #335eea;
        margin: 10px 0;
      }

      .description {
        position: relative;
        margin-top: 30px;
        font-size: 14px;
        height: 55px;
        color: grey;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box; /*将对象作为弹性伸缩盒子模型显示*/
        -webkit-line-clamp: 2; /*用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的WebKit属性*/
        -webkit-box-orient: vertical; /*子元素垂直排列*/
      }

      .creator {
        display: flex;
        align-items: center;

        img {
          width: 1.5em;
          border-radius: 50%;
        }

        div {
          margin-left: 15px;
          color: white;
          font-size: 18px;
          font-weight: 600;
        }
      }
    }
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