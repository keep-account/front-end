<template>
  <view class="flex flex-col px-4 py-4">
    <navigator
      url="/pages/myprofile/index"
      class="flex flex-row justify-start border border-red-400 border-solid"
      hover-class="none"
    >
      <view class="mr-4">
        <image class="w-12 h-12 m-auto rounded-3xl" :src="user.profile.avatar" />
      </view>
      <view class="flex justify-center mb-2 flex-col">
        <text class="text-fontMain font-extrabold mb-2">{{ user.profile.username }}</text>
        <text class="text-fontPatch">{{ user.profile.signature }}</text>
      </view>
    </navigator>
    <view class="flex flex-col my-5">
      <navigator url="/pages/mine/index" class="w-full mb-5" hover-class="none">
        <view class="flex w-full justify-between">
          <text class="text-base">关于我们</text>
          <i class="font icon-arrow-right text-sm"></i>
        </view>
      </navigator>
      <navigator url="/pages/old/index" class="w-full mb-5" hover-class="none">
        <view class="flex w-full justify-between">
          <text class="text-base">我们站点</text>
          <i class="font icon-arrow-right text-sm"></i>
        </view>
      </navigator>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/store'
const title = ref('Hello Guys')
const user = useUserStore()
</script>

<style>
.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 100rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}
</style>
