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
          <div>收藏：{{ subscribedCount }}
          </div>
          <div>转发数：{{ listDetail.shareCount }}</div>
          <div>评论：{{ listDetail.commentCount }}</div>
        </div>
      </div>
    </div>
    <!--  歌单歌曲  -->
    <song-item
        :list="listDetail.tracks"
    />
  </div>

</template>

<script setup>
import service from "@/request";
import {ref, getCurrentInstance, onBeforeMount, computed} from "vue";

const instance = getCurrentInstance()
// 歌单详情 数据
const listDetail = ref('')
// 歌单创建人 数据
const creator = ref('')

onBeforeMount(async () => {
  const res = await service({
    url: `/playlist/detail?id=${instance.root.exposeProxy.songId}`
  })
  // console.log('歌单详情', res.data.playlist)
  listDetail.value = res.data.playlist
  creator.value = res.data.playlist.creator
})

const subscribedCount = computed(() => {
  listDetail.value.subscribedCount > 100000
      ? parseInt(listDetail.subscribedCount / 10000) + '万'
      : listDetail.subscribedCount
})
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
}
</style>