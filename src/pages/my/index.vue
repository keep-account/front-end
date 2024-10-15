<template>
  <view class="mine">
    <view class="topBackground">
      <!-- 这里是状态栏 -->
    </view>
    <view class="flex flex-col px-4 pt-24">
      <navigator
        url="/pages/myprofile/index"
        class="flex flex-row justify-start mt-2 mb-5 z-10 bg-white rounded-lg"
        hover-class="none"
      >
        <view class="flex flex-row justify-between w-full px-3 py-3 items-center">
          <view class="flex flex-row">
            <view class="mr-4">
              <image class="w-14 h-14 m-auto rounded-full" :src="user.profile.avatar" />
            </view>
            <view class="flex justify-center mb-2 flex-col">
              <text class="text-fontMain font-bold mb-1 text-lg">{{ user.profile.username }}</text>
              <text class="text-fontPatch text-sm">{{ user.profile.signature }}</text>
            </view>
          </view>
          <view>
            <text class="text-main text-xs rounded px-2 py-1">修改信息</text>
          </view>
        </view>
      </navigator>
      <view class="bg-white relative z-10 px-4 rounded-lg">
        <view class="flex flex-col my-3">
          <navigator url="/pages/mine/index" class="w-full mb-4 py-2 borderB" hover-class="none">
            <view class="flex w-full justify-between">
              <text class="text-base">关于我们</text>
              <i class="font icon-arrow-right text-sm"></i>
            </view>
          </navigator>
          <navigator url="/pages/old/index" class="w-full mb-4 py-2 borderB" hover-class="none">
            <view class="flex w-full justify-between">
              <text class="text-base">我们站点</text>
              <i class="font icon-arrow-right text-sm"></i>
            </view>
          </navigator>
          <navigator
            url="/pages/category/index"
            class="w-full mb-4 py-2 borderB"
            hover-class="none"
          >
            <view class="flex w-full justify-between">
              <text class="text-base">分类管理</text>
              <i class="font icon-arrow-right text-sm"></i>
            </view>
          </navigator>
          <button class="feedback w-full mb-4 !border-0 bg-white h-6 p-0 m-0" open-type="feedback">
            <view class="flex w-full justify-between">
              <text class="text-base">意见反馈</text>
              <i class="font icon-arrow-right text-sm"></i>
            </view>
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import { useUserStore } from '@/store'
const user = useUserStore()
</script>
<style>
.mine {
  position: relative;
  padding-bottom: 104px;
  background-color: rgb(246, 247, 255);
  height: 91vh;
}
.topBackground {
  background: linear-gradient(360deg, rgba(255, 255, 255, 0) 0%, #fbe4d1 100%);
  height: 480px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
