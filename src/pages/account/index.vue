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
            <text @click="editAccout(item)">编辑</text>
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
    <uni-popup ref="popup" type="bottom" background-color="#fff" borderRadius="16px 16px 0 0">
      <view class="h-[200px] w-full px-4 box-border relative z-50 flex flex-col justify-between">
        <view class="my-2 text-center">
          <uni-icons type="closeempty" size="25" color="#666666" @click="closePop"></uni-icons>
        </view>
        <view class="pb-2 pt-2">
          <input
            :value="currentAccount.accountName"
            max="4"
            placeholder="请输入类目名称,不超过4个字"
            class="border-one h-10 rounded-xl pl-5 mb-2"
            @change="changeName"
          />
        </view>
        <view>
          <button class="bg-main text-white" @click="saveCategory">保存</button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import clsx from 'clsx'
import { onLoad } from '@dcloudio/uni-app'
import { getAccountList, addAccount, editAccount, deleteAccount } from '@/services/account'
import type { Account } from '@/types/account'
import { useAccountStore } from '@/store'
const account = useAccountStore()
const currentAccount = ref<Account>({
  id: 0,
  accountName: '',
  userId: 0,
  ctime: '',
  sharedUserIds: [],
})
const list = ref<Account[]>()
const inputDialog = ref()
const popup = ref<UniHelper.UniPopupInstance>()
// userid:0 不能删除 否则阔以删除
const isEdit = ref(false)

const radioChange = (evt: { detail: { value: string | number } }) => {
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
// 编辑账本
const editAccout = (item: Account) => {
  uni.showActionSheet({
    itemList: ['删除', '编辑'],
    success: function (res) {
      if (res.tapIndex == 0) {
        deleteCate(item)
      } else {
        // update
        popup.value?.open!()
        isEdit.value = true
        currentAccount.value = item
      }
    },
    fail: function (res) {
      console.log(res.errMsg)
    },
  })
}
// 删除
const deleteCate = async (item: Account) => {
  await deleteAccount(item.id)
  await getList()
}
const closePop = () => {
  isEdit.value = false
  popup.value?.close!()
}

// 新增/编辑类别
const saveCategory = async () => {
  if (isEdit.value) {
    isEdit.value = false
    await editAccount(
      {
        accountName: currentAccount.value.accountName,
      },
      currentAccount.value?.id,
    )
  }
  await getList()
  popup.value?.close!()
  account.setCurAccount(currentAccount.value)
}

const changeName = (e) => {
  if (e.detail.value.length == 0) return
  if (e.detail.value.length > 4) {
    currentAccount.value.accountName = e.detail.value.slice(0, 4)
  }
  currentAccount.value.accountName = e.detail.value
}

const getList = () => {
  getAccountList().then(({ data }) => {
    if (data && data.accounts) {
      list.value = data.accounts
      if (account && account.curAccount) {
        currentAccount.value = account.curAccount
      }
    }
  })
}
onLoad(() => {
  getList()
})
</script>
