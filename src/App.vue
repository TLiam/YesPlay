<script setup>
import Navbar from "@/components/NavBar.vue"
import {getCurrentInstance, onMounted, ref} from "vue";

// 歌单 ID
const songId = ref('songId')
// 歌曲播放路径
const songUrl = ref('songUrl')
// 歌曲名称
const songName = ref('songName')
// 图标显示
const iconShow = ref('iconShow')

defineExpose({songId, songUrl, songName, iconShow})

const instance = getCurrentInstance()

// 控制音乐播放
const play = () => {
  const myAudio = document.getElementById('myAudio')
  myAudio.play()
  instance.root.exposeProxy.iconShow = true
}

// 控制音乐暂停
const pause = () => {
  const myAudio = document.getElementById('myAudio')
  myAudio.pause()
  instance.root.exposeProxy.iconShow = false
}

</script>

<template>
  <Navbar></Navbar>
  <div class="main">
    <router-view></router-view>
    <div class="play-magnet" v-if="$root.songUrl !== 'songUrl'">
      <!--   播放磁贴里的内容   -->
      <div class="btn">
        <!--   音频模块     -->
        <audio autoplay :src="$root.songUrl" id="myAudio"/>
        <!--   歌曲名称循环滚动     -->
        <marquee direction="left" behavior="scroll" loop="-1">{{ $root.songName }}</marquee>
        <!--   暂停图标    -->
        <svg class="icon" aria-hidden="true" @click="pause()" v-if="iconShow">
          <use xlink:href="#icon-zanting"></use>
        </svg>
        <!--   播放图标     -->
        <svg class="icon" aria-hidden="true" @click="play()" v-else>
          <use xlink:href="#icon-bofang2"></use>
        </svg>
      </div>
    </div>
  </div>

</template>

<style lang="less">
html {
  margin: 0 auto;
  background-color: #222;
}

.icon {
  width: 3em;
  height: 3em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.main {
  width: 88%;
  margin: 100px auto;

  .play-magnet {
    position: fixed;
    right: 50px;
    bottom: 50px;
    width: 10em;
    height: 10em;
    border-radius: 20px;
    backdrop-filter: saturate(180%) blur(20px);

    .btn {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;

      .song-name {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        box-sizing: border-box;

      }
    }
  }

}


</style>