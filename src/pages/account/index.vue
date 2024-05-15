<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="text-red-400 font-extrabold">{{ title }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getAccountList } from '@/services/account'
import type { Account } from '@/types/account'
import { onLoad } from '@dcloudio/uni-app'
const title = ref('账本页')
const list = ref<Account[]>()

onLoad(() => {
  getAccountList().then((res) => {
    console.log(res, 'res')
  })
})
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
