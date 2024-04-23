<template>
  <view class="flex flex-col relative -top-16">
    <block v-for="item in list" :key="item.date">
      <view class="flex px-4 flex-col mb-4">
        <view class="flex flex-row justify-between w-full">
          <text class="text-fontMain font-bold text-lg">
            {{ item.date }}日
            <text class="text-xs text-fontPatch">周四</text>
          </text>
          <view>
            <text class="text-xs mr-2"
              >支: <text class="text-main">{{ item.totalExpense }}</text>
            </text>
            <text class="text-xs mr-2"
              >收: <text class="text-main">{{ item.totalIncome }}</text></text
            >
            <text class="text-xs"
              >余:
              <text class="text-primary">{{ item.totalIncome - item.totalExpense }}</text></text
            >
          </view>
        </view>
        <view class="flex flex-col last-of-type:border-none">
          <block v-for="one in item.bills" :key="one.id">
            <view class="flex flex-row justify-between py-2 borderB" style="">
              <view>
                <view class="flex flex-row items-center">
                  <!-- <i class="font icon-unlock text-lg mr-2"></i> -->
                  <uni-icons type="fire-filled" size="20" color="#666666"></uni-icons>
                  <view>
                    <text class="text-fontMain text-base">{{ one.category?.categoryName }}</text>
                    <view>
                      <text class="text-xs text-fontPatch"
                        >{{ dayjs(one.upTime).format('hh:mm') }} &nbsp; {{ one.remark }}</text
                      >
                    </view>
                  </view>
                </view>
              </view>
              <text class="text-fontMain text-base font-bold">
                {{ one.payType === 1 ? '-' : '+' }}{{ one.amount }}
              </text>
            </view>
          </block>
        </view>
      </view>
    </block>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import type { Bill, BillData } from '@/types/bill'
const list = ref<BillData>([
  {
    date: '21',
    bills: [
      {
        id: 11,
        amount: 7,
        categoryId: 7,
        shareAccountId: 12,
        payType: 1,
        remark: 'peng2吃早饭4',
        userId: 15,
        ctime: '2024-04-21T08:14:13.961Z',
        upTime: '2024-04-21T08:14:13.961Z',
        category: {
          id: 7,
          categoryName: '美容',
          payType: 1,
          userId: 0,
          upTime: '2024-04-17T11:56:20.000Z',
        },
      },
    ],
    totalExpense: 7,
    totalIncome: 0,
  },
  {
    date: '17',
    bills: [
      {
        id: 8,
        amount: 666,
        categoryId: 6,
        shareAccountId: 12,
        payType: 1,
        remark: '价格改了++2',
        userId: 15,
        ctime: '2024-04-16T15:07:06.303Z',
        upTime: '2024-04-17T12:32:31.000Z',
        category: {
          id: 6,
          categoryName: '零食',
          payType: 1,
          userId: 0,
          upTime: '2024-04-17T11:56:06.000Z',
        },
      },
    ],
    totalExpense: 666,
    totalIncome: 0,
  },
  {
    date: '04-16',
    bills: [
      {
        id: 10,
        amount: 7,
        categoryId: 7,
        shareAccountId: 12,
        payType: 1,
        remark: 'peng2吃早饭3',
        userId: 15,
        ctime: '2024-04-16T15:19:55.749Z',
        upTime: '2024-04-16T15:19:55.749Z',
        category: {
          id: 7,
          categoryName: '美容',
          payType: 1,
          userId: 0,
          upTime: '2024-04-17T11:56:20.000Z',
        },
      },
      {
        id: 9,
        amount: 6,
        categoryId: 7,
        shareAccountId: 12,
        payType: 1,
        remark: 'peng2吃早饭2',
        userId: 15,
        ctime: '2024-04-16T15:17:52.019Z',
        upTime: '2024-04-16T15:17:52.019Z',
        category: {
          id: 7,
          categoryName: '美容',
          payType: 1,
          userId: 0,
          upTime: '2024-04-17T11:56:20.000Z',
        },
      },
      {
        id: 91,
        amount: 6,
        categoryId: 7,
        shareAccountId: 12,
        payType: 1,
        remark: 'peng2吃早饭2',
        userId: 15,
        ctime: '2024-04-16T15:17:52.019Z',
        upTime: '2024-04-16T15:17:52.019Z',
        category: {
          id: 7,
          categoryName: '美容',
          payType: 1,
          userId: 0,
          upTime: '2024-04-17T11:56:20.000Z',
        },
      },
      {
        id: 99,
        amount: 6,
        categoryId: 7,
        shareAccountId: 12,
        payType: 1,
        remark: 'peng2吃早饭2',
        userId: 15,
        ctime: '2024-04-16T15:17:52.019Z',
        upTime: '2024-04-16T15:17:52.019Z',
        category: {
          id: 7,
          categoryName: '美容',
          payType: 1,
          userId: 0,
          upTime: '2024-04-17T11:56:20.000Z',
        },
      },
    ],
    totalExpense: 13,
    totalIncome: 0,
  },
])
</script>
