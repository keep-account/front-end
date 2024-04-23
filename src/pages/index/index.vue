<template>
  <view class="flex flex-col relative">
    <view class="bg-mainImg flex flex-col bg-main px-4">
      <view class="relative flex justify-center">
        <text class="text-lg text-white text-center">{{ title }}</text>
        <view class="w-24 text-white h-5 z-10 border border-red-500 absolute top-0 right-0"
          ><picker
            mode="date"
            :value="date"
            start="2014-01"
            @change="bindDateChange"
            fields="month"
            class="flex flex-row"
          >
            <text class="picker">
              {{ date }}
            </text>
            <i class="font icon-arrow-right text-sm text-white inline ml-2 rotate-90"></i>
          </picker>
        </view>
      </view>
      <text class="text-white mb-2">本月支出(元)</text>
      <text class="text-3xl text-white mb-6 font-bold">￥987654</text>
      <view class="text-white pb-16 flex justify-start">
        <view class="w-1/2"
          ><text>收入 <text class="font-medium">￥122222</text></text></view
        >
        <view
          ><text>结余 <text class="font-medium">￥122222</text></text>
        </view>
      </view>
    </view>
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
    <HomeList />
    <AddBill />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import HomeList from './components/Home/HomeList.vue'
import AddBill from './components/AddBill/index.vue'
import { formatDate } from '@/utils'
const title = ref('账本切换')
const date = ref(formatDate(new Date(), 'YYYY-MM'))
const list = ref([
  {
    title: '我的账本',
    icon: 'icon-lishijilu',
  },
  {
    title: '日历记账',
    icon: 'icon-lishijilu',
  },
  {
    title: '年度账本',
    icon: 'icon-new',
  },
  {
    title: '常用功能',
    icon: 'icon-new',
  },
])
const bindDateChange = (e) => {
  console.log('picker发送选择改变，携带值为', e.detail.value)
  date.value = e.detail.value
}
</script>

<style></style>
