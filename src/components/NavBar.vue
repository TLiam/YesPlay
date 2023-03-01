<template>
  <nav>
    <div class="nav-btn">
      <button @click.native="go('back')">
        <svg class="icon icon-left" aria-hidden="true">
          <use xlink:href="#icon-zuojiantou"/>
        </svg>
      </button>
      <button @click.native="go()">
        <svg class="icon icon-right" aria-hidden="true">
          <use xlink:href="#icon-zuojiantou"/>
        </svg>
      </button>
    </div>
    <div class="nav-link">
      <router-link to="/home" :class="{ active: $route.name === '/home'}">首页</router-link>
      <router-link to="/explore" :class="{ active: $route.name === 'explore'}">发现</router-link>
      <router-link to="/library" :class="{ active: $route.name === 'library'}">音乐库</router-link>
    </div>
    <div class="nav-search">
      <div class="search-input">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"/>
        </svg>
        <input
            v-model="keywords"
            type="search"
            :placeholder="iptFocus ? '' : '搜索'"
            @keydown.enter="doSearch"
            @focus="iptFocus = true"
            @blur="iptFocus = false"
        />
      </div>
      <router-link to="/login">
        <div class="user">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon_tingyinle"/>
          </svg>
        </div>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const iptFocus = ref(false)
const keywords = ref('')

const go = (where) => {
  if (where === 'back') router.go(-1);
  else router.go(1)
}
const doSearch = (e) => {
  if (!keywords.value) return;

  console.log(keywords.value, e)
  router.push({
    name: 'search',
    query: {keywords: keywords.value},
  });
}


</script>

<style lang="less" scoped>
nav {
  z-index: 100;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  padding-left: 10%;
  padding-right: 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  backdrop-filter: saturate(180%) blur(20px);

  .nav-btn {
    display: flex;

    .icon {
      width: 1rem;
      height: 1rem;
      color: white;
      border-radius: 0.5em;
      padding: .8em .8em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
      transition: all .2s;

      &:hover {
        background: #333333;
      }
    }

    .icon-right {
      transform: rotateZ(180deg);
    }
  }

  .nav-link {
    display: flex;
    justify-content: space-evenly;
    width: 16em;

    a {
      color: white;
      font-size: 1em;
      font-weight: 900;
      border-radius: 0.4em;
      padding: 0.4em 0.4em;
      transition: all .2s;

      &:hover {
        background: #333333;
      }

      &:active {
        transform: scale(0.92);
        transition: 0.5s;
      }
    }

    .router-link-active {
      color: #335eea;
      transition: all .2s;
    }
  }

  .nav-search {
    display: flex;

    .search-input {
      height: 32px;
      border-radius: 8px;
      background: #3c3c3c;
      display: flex;
      align-items: center;
      padding-left: 5px;

      .icon {
        width: 0.9em;
        height: 0.9em;
        color: #fff;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
        transition: all .2s;
        margin-right: 5px;
      }

      input {
        width: 12em;
        border: none;
        background: transparent;
        font-weight: 600;
        color: #fff;

        &:focus {
          outline: none;
        }
      }
    }

    .user {
      width: 32px;
      height: 32px;
      background: white;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 10px;
      cursor: pointer;

      .icon {
        width: 1.5em;
        height: 1.5em;
        color: #fff;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
        transition: all .2s;
      }
    }
  }
}
</style>