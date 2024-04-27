<template>
  <view class="flex flex-col relative -top-16">
    <block v-for="item in list" :key="item.date">
      <view class="flex px-4 flex-col mb-4">
        <view class="flex flex-row justify-between w-full">
          <text class="text-fontMain font-bold text-lg">
            {{ item.titleDate }}日
            <text class="text-xs text-fontPatch">{{ item.day }}</text>
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
defineProps<{
  list: BillData[]
}>()
</script>
