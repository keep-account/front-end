<template>
  <view class="flex flex-col px-4">
    <image class="logo" src="/static/logo.png" />
    <view class="flex justify-center mb-2">
      <text class="text-red-400 font-extrabold">{{ title }}</text>
    </view>
    <view class="flex flex-col">
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
import { ref } from "vue";
const title = ref("Hello Guys");
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
