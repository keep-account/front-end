<template>
  <view class="flex flex-col px-4">
    <!-- <view>
      <img src="" alt="" />
      <text>昵称：</text>
      <input type="text" :value="nameValue" />
    </view> -->
    <view class="w-full h-7 flex justify-center items-center text-center my-10 outline">
      <text class="w-20 h-5" @click="login">立即登录</text>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Login } from '@/services/user'
const login = async () => {
  const { code } = await uni.login()
  console.log(code)
  const user = await Login({ code })
}
</script>
