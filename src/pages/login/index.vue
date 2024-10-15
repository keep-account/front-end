<template>
  <view class="content">
    <image class="logo rounded-full" src="/static/logo.png" />
    <view>
      <text>欢迎来到我的个人小程序</text>
    </view>
    <view class="my-3">
      <text class="text-lg font-medium">顺路者</text>
    </view>
    <view class="px-5 mt-10 text-sm backdrop-blur-md bg-white/30">
      <text class="italic">
        “每个人的生活都是一条通向自身的道路。每个人的真正职责只有一个：找到自我。然后在心中坚守一生，全心全意，永不停息。
        所有其它的路都是不完整的，是人的逃避方式，是对社会角色的懦弱伪装，是随波逐流，是对内心的恐惧。”
      </text>
    </view>
    <view
      class="h-7 flex justify-center items-center text-center my-10 absolute bottom-10 left-0 right-0"
    >
      <view
        type="default"
        @click="login"
        class="border-main bg-main text-white px-4 py-1 rounded-full text-sm"
      >
        立即登录
      </view>
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
  margin-top: 100rpx;
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
