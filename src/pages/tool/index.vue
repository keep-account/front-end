<template>
  <view class="px-4 py-2">
    <view class="flex justify-center">
      <image class="logo" src="/static/logo.png" />
    </view>
    <view class="text-xl my-2 underline underline-offset-4 text-primaryThree">About Me</view>
    <view class="flex flex-col">
      <text> nickName: chendapeng </text>
      <text> tel: 18724009609 </text>
      <text> weixin: cpp291003932 </text>
      <text> email: 291003932@qq.com </text>
    </view>
    <!-- <view class="mt-6 content">
      <image class="logo" src="/static/pay.jpg" />
    </view>
    <view class="text-center w-full">
      <text class="text-primarySix text-xs">开发不易，打赏一顿早饭唄</text>
    </view> -->
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
  margin-top: 5%;
  height: 300rpx;
  width: 300rpx;
  border-radius: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}
</style>
