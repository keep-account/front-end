<template>
  <view class="flex flex-row flex-wrap h-28 overflow-y-auto">
    <block v-for="(item, index) in list" :key="index">
      <view class="flex flex-col px-1 m-1" @click="$emit('clickCate', item)">
        <uni-icons type="heart-filled" size="18" color="#f9a01f"></uni-icons>
        <text
          :class="
            clsx('text-xs ', {
              'text-main': selectCate.id == item.id,
              'text-fontPatch': selectCate.id !== item.id,
            })
          "
        >
          {{ item.categoryName }}</text
        >
      </view>
    </block>
  </view>
</template>
<script setup lang="ts">
import type { CategoryItem } from '@/types/category'
import clsx from 'clsx'
defineProps<{
  list: CategoryItem[]
  selectCate: CategoryItem
}>()
defineEmits(['clickCate'])
</script>
