<template>
  <view
    class="flex flex-row m-5 bg-white shadow-lg justify-center rounded-lg relative -top-16 right-0 left-0 z-30"
  >
    <block v-for="(item, index) in list" :key="index">
      <view class="py-4 px-2 text-center" @click="() => goLink(item)">
        <i :class="clsx(`font ${item.icon} text-lg`, {})"></i>
        <text>{{ item.title }}</text>
      </view>
    </block>
  </view>
</template>
<script setup lang="ts">
import clsx from 'clsx'
import type { HomeIconsType } from '@/static/constant'
const goLink = (item: HomeIconsType[0]) => {
  console.log(item, 'cpp')
  if (item.link) {
    uni.switchTab({ url: item.link })
  }
}
defineProps<{
  list: HomeIconsType
}>()
</script>
