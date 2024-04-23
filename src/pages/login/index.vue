<template>
  <view>
    <view>
      <img src="" alt="" />
      <text>昵称：</text>
      <input type="text" :value="nameValue" />
    </view>
    <view>
      <button>立即登录</button>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const nameValue = ref('')
</script>
