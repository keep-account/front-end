<template>
  <view class="flex flex-col relative">
    <view class="bg-mainImg flex flex-col bg-main px-4">
      <view class="relative flex justify-center">
        <view class="flex justify-center items-center">
          <text class="text-lg text-white text-center" @click="toAccount"
            >{{ accountStore.curAccount?.accountName }}
          </text>
          &nbsp;
          <uni-icons type="loop" size="20" color="#ffffff"></uni-icons>
        </view>
        <view class="w-21 text-white h-5 z-10 border border-red-500 absolute top-0 right-0"
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
            <i class="font icon-arrow-right text-sm text-white inline rotate-90"></i>
          </picker>
        </view>
      </view>
      <text class="text-white mb-2">本月支出(元)</text>
      <text class="text-3xl text-white mb-6 font-bold">￥{{ billRes?.totalExpense }}</text>
      <view class="text-white pb-16 flex justify-start">
        <view class="w-1/2"
          ><text
            >收入 <text class="font-medium">￥{{ billRes?.totalIncome }}</text></text
          ></view
        >
        <view
          ><text
            >结余 <text class="font-medium">￥ {{ billRes?.remain || 0 }}</text></text
          >
        </view>
      </view>
    </view>
    <FixAdd @change-bill="changeBill" />
    <HomeBar :list="list" />
    <HomeList
      v-if="billRes?.bills.length"
      :list="billRes?.bills"
      @refresh="getBillList"
      @editPop="editPop"
    />
    <AddBill @refresh="getBillList" ref="modal" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import { getBillsByAccount } from '@/services/bill'
import { getUseInfo } from '@/services/user'
import { onLoad, onShow } from '@dcloudio/uni-app'
import type { BillRes, Bill } from '@/types/bill'
import type { HomeAddInstance } from '@/types/components'
import { useAccountStore } from '@/store'
import HomeList from './components/HomeList/index.vue'
import AddBill from './components/AddBill/index.vue'
import FixAdd from './components/AddBill/FixAdd.vue'
import HomeBar from './components/HomeBar/index.vue'
import { formatDate } from '@/utils'
import { HomeIcons } from '@/static/constant'
import type { Account } from '@/types/account'

const page = ref<number>(1)
const date = ref(formatDate(new Date(), 'YYYY-MM'))
const list = ref(HomeIcons)
// 月份切换 进行查询数据
const bindDateChange = (e) => {
  date.value = e.detail.value
  getBillsInfo()
}
const billRes = ref<BillRes>()
const accountStore = useAccountStore()
const curAccount = ref<Account>()
const modal = ref<HomeAddInstance>()

// 编辑弹框
const editPop = (item: Bill) => {
  changeBill(item)
}

const changeBill = (item?: Bill) => {
  if (modal.value && modal.value.changeBill) {
    if (item && Object.keys(item).length) {
      modal.value.changeBill(item)
    } else {
      console.log('新增')
      modal.value.changeBill()
    }
  }
}

const getBillList = async (name?: string) => {
  if (accountStore.curAccount) {
    const res = await getBillsByAccount({
      page: page.value,
      size: 10,
      startTime: dayjs(date.value).startOf('M').format('YYYY-MM-DD'),
      endTime: dayjs(date.value).endOf('M').format('YYYY-MM-DD'),
      accountId: accountStore.curAccount.id,
    })
    if (res.data) {
      billRes.value = res.data
    }
  }
}

const getBillsInfo = async () => {
  if (accountStore.curAccount) {
    getBillList()
  } else {
    const userInfo = await getUseInfo()
    // 1.拿到账本信息
    // 2.默认第一个为当前账本信息
    accountStore.setCurAccount(userInfo.data.shareAccounts[0])
    // 3.需要刷新账单列表
    getBillsInfo()
  }
}

uni.$once('indexUpdate', function (data) {
  getBillsInfo()
})

onShow(() => {
  if (curAccount) {
    // 如果id不同切换账本信息
    if (curAccount.value?.id != accountStore.curAccount?.id) {
      curAccount.value = accountStore.curAccount
      getBillsInfo()
    }
  }
})

onLoad(async () => {
  curAccount.value = accountStore.curAccount
  await getBillsInfo()
})

const toAccount = () => {
  if (accountStore.curAccount && accountStore.curAccount.id) {
    uni.navigateTo({
      url: '/pages/account/index',
    })
  }
}
</script>
