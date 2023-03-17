<template>
  <div class="login">
    <div class="login-info" v-if="userInfo ===''">
      <div class="login-box">
        <div class="login-btn">
          <div class="title-info" @click="login()">
            登录网易云账号
          </div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-iconfonticonfonti2copycopy"/>
          </svg>
        </div>
      </div>
      <div class="login-qr" v-if="qrUrl">
        <div class="qr-info">
          扫描下方二维码登录网易云账号
        </div>
        <img :src="qrUrl">
      </div>
    </div>

    <div class="user" v-else>
      <div class="user-info">
        <img :src="userInfo.profile.avatarUrl">
        <div>{{ userInfo.profile.nickname }}</div>
        <div>等级：{{ userInfo.level }}级</div>
        <div>已听歌曲：{{ userInfo.listenSongs }}</div>
        <div>动态：{{ userInfo.profile.eventCount }}</div>
        <div>关注：{{ userInfo.profile.follows }}</div>
        <div>粉丝：{{ userInfo.profile.followeds }}</div>
      </div>
      <el-collapse v-model="activeName">
        <el-collapse-item title="创建的歌单" name="1">
          <div v-for="item in userPlayList.playlist">
            {{ item.ordered === false ? item.name : null }}
          </div>
        </el-collapse-item>
        <el-collapse-item title="收藏的歌单" name="2">
          <div v-for="item in userPlayList.playlist">
            {{ item.ordered === true ? item.name : null }}
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup>
import {getQrKey, createQR, checkStatus, getLoginStatus, getUserDetail, getUserPlayList} from "@/request/api/user";
import {onBeforeMount, ref} from "vue";

const activeName = ref('1')

const qrUrl = ref("")
const userInfo = ref('')
const userPlayList = ref('')

onBeforeMount(async () => {
  const res = await getUserDetail(1288804490)
  userInfo.value = res.data

  const playList = await getUserPlayList(1288804490)
  // console.log('用户歌单信息', playList.data)
  userPlayList.value = playList.data
})

// 点击可获取二维码进行扫码登录
const login = async () => {
  const cookie = localStorage.getItem('cookie')
  await getLoginStatus(cookie)

  // 调用 getQrKey、createQR 生成二维码
  const res = await getQrKey()
  const key = res.data.data.unikey
  const res2 = await createQR(key)
  qrUrl.value = res2.data.data.qrimg

  // 判断登录状态
  let timer = setInterval(async () => {
    const statusRes = await checkStatus(key)
    console.log('statusRes', statusRes)
    if (statusRes.code === 800) {
      alert("二维码过期")
      qrUrl.value = ""
      clearInterval(timer)
    }
    if (statusRes.code === 803) {
      // 登录成功后 将 cookie 保存到 localStorage
      clearInterval(timer)
      alert("登录成功")
      let res = await getLoginStatus(statusRes.cookie)
      console.log('getLogin', res.data.data.account.id)
      localStorage.setItem('cookie', statusRes.cookie)
    }
  }, 3000)
}

</script>

<style lang="less" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;

  .login-info {
    .login-box {
      width: 100%;
      margin: 4em auto;
      display: flex;
      justify-content: center;
      align-items: center;

      .login-btn {
        cursor: pointer;
        width: 16em;
        height: 7em;
        border: 1px solid;
        border-radius: 15px;
        background-color: #eaeffd;
        display: flex;
        justify-content: center;
        align-items: center;

        .title-info {
          margin-left: 2em;
          font-size: 24px;
          font-weight: 800;
          color: #335eea;
          transition: all .3s;
        }

        .icon {
          opacity: 0;
          width: 1rem;
          height: 1rem;
          color: #335eea;
          border-radius: 0.5em;
          padding: .8em .8em;
          vertical-align: -0.15em;
          fill: currentColor;
          overflow: hidden;
          transition: all .3s;
        }

        &:hover {
          transition: all .3s;

          .title-info {
            transform: translateX(-8px);
          }

          .icon {
            opacity: 1;
            visibility: visible;
            transition: all .3s;
            transform: translateX(4px);
          }
        }
      }
    }

    .login-qr {
      display: flex;
      flex-direction: column;

      .qr-info {
        font-size: 20px;
        font-weight: 800;
        color: white;
        margin: 20px 0;
      }
    }
  }

  .user {
    width: 80%;
    display: flex;

    .user-info {
      display: flex;
      flex-direction: column;
      width: 30%;
      height: 20em;
      align-items: center;
      justify-content: space-evenly;

      img {
        width: 2em;
        border-radius: 50%;
      }
    }

    .el-collapse {
      width: 60%;
      border: none;
      background-color: transparent;
      --el-collapse-header-bg-color: transparent;
      --el-collapse-content-bg-color: transparent;
      --el-collapse-header-font-size: 20px;
      --el-collapse-header-text-color: white;
      --el-collapse-content-text-color: white;
    }
  }
}
</style>