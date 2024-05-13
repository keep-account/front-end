<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view>
      <text>Welcome! 欢迎来到我的个人小程序</text>
    </view>
    <view class="h-7 flex justify-center items-center text-center my-10">
      <button type="default" size="mini" @click="login">立即登录</button>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Login } from '@/services/user'
import { useUserStore } from '@/store/index'
const userStore = useUserStore()
const username = computed(() => userStore.profile.username)
const openid = computed(() => userStore.profile.openid)
const login = async () => {
  const { code } = await uni.login()
  const dataRes = await Login({ code })
  userStore.setProfile(dataRes.data)
  userStore.updateToken(dataRes.data.access_token)
  uni.switchTab({
    url: '/pages/index/index',
  })
  uni.$emit('indexUpdate', { msg: '页面更新' })
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
