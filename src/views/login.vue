<template>
  <div class="container">
    <div class="login" v-if="userInfo === null">
      <div class="login-box">
        <div class="login-btn">
          <div class="title-info" @click="login()">
            登录网易云账号
          </div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-iconfonticonfonti2copycopy" />
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
      <button @click="getUserInfo()">23131</button>
    </div>
  </div>
</template>

<script setup>
import { getQrKey, createQR, checkStatus, getLoginStatus, getUserCount, getUserDetail } from "@/request/api/user";
import { ref } from "vue";

const qrUrl = ref("")
const userInfo = ref("")

userInfo.value = localStorage.getItem('cookie')
// console.log(userInfo)

const getUserInfo = async () => {
  const res = await getUserCount()
  console.log(res);
  console.log(res.data.account.id);
  const uid = res.data.account.id;

  const userInfo = await getUserDetail(uid)
}

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
    if (statusRes.code === 800) {
      alert("二维码过期")
      qrUrl.value = ""
      clearInterval(timer)
    }
    if (statusRes.code === 803) {
      // 登录成功后 将 cookie 保存到 localSttorage
      clearInterval(timer)
      alert("登录成功")
      await getLoginStatus(statusRes.cookie)
      localStorage.setItem('cookie', statusRes.cookie)
    }
  }, 3000)
}

</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

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
</style>