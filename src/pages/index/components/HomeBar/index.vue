<template>
  <view
    class="flex flex-row m-5 bg-white shadow-lg justify-center rounded-lg relative -top-16 right-0 left-0"
  >
    <block v-for="(item, index) in list" :key="index">
      <view class="py-4 px-2 text-center">
        <i class="font icon-unlock text-lg"></i>
        <text>{{ item.title }}</text>
      </view>
    </block>
  </view>
</template>
<script setup lang="ts">
import type { HomeIconsType } from '@/static/constant'
defineProps<{
  list: HomeIconsType
}>()
</script>
