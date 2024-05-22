<template>
  <view class="px-4 py-2">
    <view class="text-2xl my-2 underline underline-offset-4">About Me</view>
    <view class="flex flex-col">
      <text> nickName: chendapeng </text>
      <text> qq: 291003932 </text>
      <text> weixin: cpp291003932 </text>
      <text> email: 291003932@qq.com </text>
    </view>
    <view class="mt-6 content">
      <image class="logo" src="/static/pay.jpg" />
    </view>
    <view class="text-center w-full">
      <text class="text-primarySix text-xs">开发不易，打赏一顿早饭唄</text>
    </view>
  </view>
</template>
<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 600rpx;
  width: 500rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}
</style>
