<template>
  <view>
    <view class="flex flex-row flex-wrap">
      <block v-for="(item, index) in list" :key="index">
        <view class="flex flex-col p-2 m-2" @click="$emit('clickCate', item.categoryName)">
          <uni-icons type="heart-filled" size="25" color="#f9a01f"></uni-icons>
          <text> {{ item.categoryName }}</text>
        </view>
      </block>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { CategoryItem } from '@/types/category'

// 定义 props 接收数据
defineProps<{
  list: CategoryItem[]
}>()
</script>
