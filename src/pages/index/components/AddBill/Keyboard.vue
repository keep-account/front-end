<template>
  <view class="pb-4 pt-2">
    <view class="grid grid-rows-4 grid-cols-4 gap-2" ref="elementRef">
      <block v-for="item in nums" :key="item">
        <view
          class="boardItem"
          hoverClass="highlight"
          :hover-stay-time="100"
          @click="$emit('clickBoard', item)"
        >
          {{ item }}
        </view>
      </block>
      <view
        hoverClass="highlight"
        :hover-stay-time="100"
        class="boardItem col-span-2"
        @click="$emit('clickBoard', 0)"
        >0</view
      >
      <view
        hoverClass="highlight"
        :hover-stay-time="100"
        class="boardItem col-end-5 row-start-1 flex justify-center items-center"
        @click="$emit('clickBoard', 'delete')"
      >
        <i class="font icon-shanchu text-2xl text-fontMajor"></i>
      </view>
      <view
        @click="$emit('clickBoard', 'again')"
        class="boardItem !text-base col-start-4 col-end-5 row-start-2 row-end-3 flex justify-center items-center active:bg-blue-600"
      >
        <text>再记一笔</text>
      </view>
      <view
        hoverClass="highlight"
        :hover-stay-time="100"
        class="boardItem"
        @click="$emit('clickBoard', 'point')"
        >.</view
      >
      <view
        hoverClass="highlightEnter"
        :hover-stay-time="100"
        @click="$emit('clickBoard', 'enter')"
        class="boardItem col-start-4 col-end-5 row-start-3 row-end-5 bg-mainLast flex justify-center items-center text-xl text-white"
      >
        确定
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const nums = ref([1, 2, 3, 4, 5, 6, 7, 8, 9])
</script>
