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
              <text class="text-primary">{{
                DataTransfer(item.totalIncome - item.totalExpense)
              }}</text></text
            >
          </view>
        </view>
        <uni-swipe-action>
          <uni-swipe-action-item
            v-for="one in item.bills"
            :key="one.id"
            @click="onClick($event, one)"
            :rightOptions="options"
            @change="change"
            class="flex flex-col last-of-type:border-none"
          >
            <view class="flex flex-row justify-between items-center py-2 borderB" style="">
              <view>
                <view class="flex flex-row items-center">
                  <!-- <i class="font icon-unlock text-lg mr-2"></i> -->
                  <!-- <uni-icons type="fire-filled" size="20" color="#666666"></uni-icons> -->
                  <view>
                    <text class="text-fontMain text-base">{{ one.category?.categoryName }}</text>
                    <view>
                      <text class="text-xs text-fontPatch"
                        >{{ dayjs(one.ctime).format('HH:mm') }} &nbsp; {{ one.remark }}</text
                      >
                    </view>
                  </view>
                </view>
              </view>
              <text class="text-fontMain text-base font-bold mr-2">
                {{ one.payType === 1 ? '-' : '+' }}{{ Number(one.amount) }}
              </text>
            </view>
          </uni-swipe-action-item>
        </uni-swipe-action>
      </view>
    </block>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import { removeBill } from '@/services/bill'
import type { Bill, BillData } from '@/types/bill'
defineProps<{
  list: BillData[]
}>()
const emit = defineEmits(['refresh', 'editPop'])
const options = [
  {
    text: '编辑',
    style: {
      backgroundColor: '#ff8155',
    },
  },
  {
    text: '删除',
    style: {
      backgroundColor: '#f9a01f',
    },
  },
]
const onClick = async (e, one: Bill) => {
  const { index } = e
  if (index == 1 && one && one.id) {
    //delete
    await removeBill(one.id)
    emit('refresh')
    uni.showToast({ title: 'Done' })
  } else {
    // 打开编辑弹框
    emit('editPop', one)
    // actionsheet.value.closeAll()
  }
}
const change = (e) => {
  console.log(e, 'change ')
}
const DataTransfer = (data: number) => {
  return +(data * 100).toFixed(2) / 100
}
</script>
