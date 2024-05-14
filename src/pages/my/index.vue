<template>
  <view class="flex flex-col px-4 py-4">
    <navigator url="/pages/myprofile/index" class="flex flex-row justify-start" hover-class="none">
      <view
        class="flex flex-row justify-between w-full shadow-lg shadow-indigo-500/10 px-3 rounded-lg items-center"
      >
        <view class="flex flex-row">
          <view class="mr-4">
            <image class="w-12 h-12 m-auto rounded-3xl" :src="user.profile.avatar" />
          </view>
          <view class="flex justify-center mb-2 flex-col">
            <text class="text-fontMain font-extrabold mb-2">{{ user.profile.username }}</text>
            <text class="text-fontPatch">{{ user.profile.signature }}</text>
          </view>
        </view>
        <view>
          <text>修改信息</text>
        </view>
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
      <navigator url="/pages/category/index" class="w-full mb-5" hover-class="none">
        <view class="flex w-full justify-between">
          <text class="text-base">分类管理</text>
          <i class="font icon-arrow-right text-sm"></i>
        </view>
      </navigator>
      <button class="feedback w-full mb-5 !border-0 bg-white h-11 p-0 m-0" open-type="feedback">
        <view class="flex w-full justify-between">
          <text class="text-base">意见反馈</text>
          <i class="font icon-arrow-right text-sm"></i>
        </view>
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/store'
const user = useUserStore()
</script>
