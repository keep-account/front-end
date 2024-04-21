<template>
  <view class="flex flex-col">
    <block v-for="item in list" :key="item.date">
      <view class="flex">
        <!-- <i class="font icon-unlock text-lg"></i> -->
        <view class=""> </view>
      </view>
    </block>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"
import dayjs from "dayjs"
import type { Bill, BillData } from "@/types/bill"
const list = ref<BillData>([
  {
    date: "2024-04-21",
    bills: [
      {
        id: 11,
        amount: 7,
        categoryId: 7,
        shareAccountId: 12,
        payType: 1,
        remark: "peng2吃早饭4",
        userId: 15,
        ctime: "2024-04-21T08:14:13.961Z",
        upTime: "2024-04-21T08:14:13.961Z",
        category: {
          id: 7,
          categoryName: "美容",
          payType: 1,
          userId: 0,
          ctime: "2024-04-11T11:56:03.868Z",
          upTime: "2024-04-17T11:56:20.000Z",
        },
      },
    ],
    totalExpense: 7,
    totalIncome: 0,
  },
  {
    date: "2024-04-17",
    bills: [
      {
        id: 8,
        amount: 666,
        categoryId: 6,
        shareAccountId: 12,
        payType: 1,
        remark: "价格改了++2",
        userId: 15,
        ctime: "2024-04-16T15:07:06.303Z",
        upTime: "2024-04-17T12:32:31.000Z",
        category: {
          id: 6,
          categoryName: "零食",
          payType: 1,
          userId: 0,
          ctime: "2024-04-11T10:23:05.070Z",
          upTime: "2024-04-17T11:56:06.000Z",
        },
      },
    ],
    totalExpense: 666,
    totalIncome: 0,
  },
  {
    date: "2024-04-16",
    bills: [
      {
        id: 10,
        amount: 7,
        categoryId: 7,
        shareAccountId: 12,
        payType: 1,
        remark: "peng2吃早饭3",
        userId: 15,
        ctime: "2024-04-16T15:19:55.749Z",
        upTime: "2024-04-16T15:19:55.749Z",
        category: {
          id: 7,
          categoryName: "美容",
          payType: 1,
          userId: 0,
          ctime: "2024-04-11T11:56:03.868Z",
          upTime: "2024-04-17T11:56:20.000Z",
        },
      },
      {
        id: 9,
        amount: 6,
        categoryId: 7,
        shareAccountId: 12,
        payType: 1,
        remark: "peng2吃早饭2",
        userId: 15,
        ctime: "2024-04-16T15:17:52.019Z",
        upTime: "2024-04-16T15:17:52.019Z",
        category: {
          id: 7,
          categoryName: "美容",
          payType: 1,
          userId: 0,
          ctime: "2024-04-11T11:56:03.868Z",
          upTime: "2024-04-17T11:56:20.000Z",
        },
      },
    ],
    totalExpense: 13,
    totalIncome: 0,
  },
])
</script>
