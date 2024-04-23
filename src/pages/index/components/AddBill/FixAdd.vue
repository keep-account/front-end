<template>
  <view class="fixed bottom-10 right-5 z-40">
    <view
      class="w-16 h-16 bg-main rounded-[32px] flex items-center justify-center shadow-lg"
      @click="$emit('changeBill')"
    >
      <i class="font icon-bianji text-3xl text-white"></i>
    </view>
  </view>
</template>
