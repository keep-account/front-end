<template>
  <view class="flex flex-col px-4 items-center justify-center w-full h-full">
    <!-- <view class="w-full h-7 flex justify-center flex-col items-center text-center my-10">
      <view>用户名: {{ username }}</view>
      <view>openid: {{ openid }}</view>
    </view> -->
    <view class="w-full h-7 flex justify-center items-center text-center my-10">
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
  uni.navigateBack()
}
</script>
