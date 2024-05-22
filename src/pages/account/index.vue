<template>
  <view class="flex flex-col bg-[#f6f6f6] p-4 h-screen">
    <radio-group @change="radioChange">
      <label class="mb-4 block" v-for="item in list" :key="item.id">
        <view
          :class="
            clsx('rounded px-4 py-2', {
              'bg-mainImg text-white': item.id === currentAccount?.id,
              'bg-white ': item.id !== currentAccount?.id,
            })
          "
        >
          <view class="text-lg my-2">
            <text>{{ item.accountName }}</text>
          </view>
          <view class="mb-2">
            <text
              :class="
                clsx({
                  'text-primarySix': item.id !== currentAccount?.id,
                })
              "
            >
              创建于{{ dayjs(item.ctime).format('YYYY-MM-DD') }}
            </text>
          </view>
          <view class="flex flex-row justify-between">
            <view>
              <radio :value="item.id" :checked="item.id === currentAccount?.id" />
              <text>{{ item.id === currentAccount?.id ? '当前账本' : '切换为该账本' }}</text>
            </view>
            <text>编辑</text>
          </view>
        </view>
      </label>
    </radio-group>
    <view>
      <uni-popup ref="inputDialog" type="dialog">
        <uni-popup-dialog
          ref="inputClose"
          mode="input"
          title="输入账本名称"
          value="默认账本"
          placeholder="请输入内容"
          @confirm="dialogInputConfirm"
        ></uni-popup-dialog>
      </uni-popup>
    </view>
    <view class="fixed bottom-10 left-0 right-0 bg-main text-white text-center py-3" @click="open">
      <text>新增账本</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import clsx from 'clsx'
import { onLoad } from '@dcloudio/uni-app'
import { getAccountList, addAccount } from '@/services/account'
import type { Account } from '@/types/account'
import { useAccountStore } from '@/store'
const account = useAccountStore()
const currentAccount = ref<Account>()
const list = ref<Account[]>()
const inputDialog = ref()

const radioChange = (evt) => {
  if (list.value && list.value.length) {
    const selected = list.value?.filter((el) => +el.id === +evt.detail.value)
    account.setCurAccount(selected[0])
    currentAccount.value = selected[0]
  }
}

// 新增账本
const open = () => {
  inputDialog.value.open()
}

const dialogInputConfirm = (val) => {
  uni.showLoading({
    title: '加载中',
  })
  addAccount({
    accountName: val,
  }).then((res) => {
    uni.hideLoading()
    getList()
    // 关闭窗口后，恢复默认内容
    inputDialog.value.close()
  })
}

const getList = () => {
  getAccountList().then(({ data }) => {
    if (data && data.accounts) {
      list.value = data.accounts
      currentAccount.value = account.curAccount
    }
  })
}
onLoad(() => {
  getList()
})
</script>
