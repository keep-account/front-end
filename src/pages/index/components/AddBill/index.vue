<template>
  <view>
    <uni-popup
      ref="popup"
      type="bottom"
      background-color="#fff"
      borderRadius="16px 16px 0 0"
      @change="changePopup"
    >
      <view class="h-[570px] w-full px-4 box-border relative z-50">
        <view class="my-5">
          <uni-icons type="closeempty" size="25" color="#666666" @click="toggle"></uni-icons>
        </view>
        <view class="flex flex-row justify-between w-full items-center">
          <view>
            <block v-for="one in PayType" :key="one.id">
              <text
                :class="
                  clsx('p-2 text-fontMajor text-sm bg-payType rounded mx-1', {
                    'text-main': one.id == billInfo.payType,
                  })
                "
                @click="changePayType(one.id)"
                >{{ one.title }}</text
              >
            </block>
          </view>
          <view class="text-fontMain h-6 bg-payType p-1 rounded"
            ><picker
              mode="date"
              :value="date"
              start="2014-01-01"
              @change="bindDateChange"
              class="flex flex-row text-sm"
            >
              <text class="picker">
                {{ date }}
              </text>
              <uni-icons type="bottom" size="16"></uni-icons>
            </picker>
          </view>
        </view>
        <view class="my-5">
          <text class="text-fontMain font-extrabold text-2xl">￥</text>
          <text class="text-fontMain font-extrabold text-4xl">{{ Number(billInfo.amount) }}</text>
        </view>
        <Categorylist
          v-if="selectCate && selectCate.categoryName"
          :list="categoryData || []"
          @click-cate="clickCate"
          :selectCate="selectCate"
        />
        <view class="px-2 fixed bottom-0 right-0 left-0 bg-[#f9f9f9]">
          <view class="flex flex-row flex-nowrap py-2 w-full pr-4">
            <uni-icons type="compose" size="25" color="#666666"></uni-icons>
            <input
              class="text-fontMajor p-1 borderB w-full"
              placeholder="添加备注..."
              :value="billInfo.remark"
              @input="clearInput"
            />
            <uni-icons
              type="clear"
              size="25"
              color="#666666"
              v-if="showClearIcon"
              @click="clearIcon"
            ></uni-icons>
          </view>
          <Keyboard @click-board="clickKeyboard" />
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onShow, onLoad } from '@dcloudio/uni-app'
import { clsx } from 'clsx'
import dayjs from 'dayjs'
import Categorylist from './ListCate.vue'
import Keyboard from './Keyboard.vue'
import type { CategoryItem } from '@/types/category'
import type { Bill } from '@/types/bill'
import { getCategoryList } from '@/services/category'
import { addBill, updateBill } from '@/services/bill'
import { formatDate } from '@/utils'
import { PayType } from '@/static/constant'
import { useAccountStore } from '@/store'
const emit = defineEmits(['refresh'])
const accountStore = useAccountStore()
const date = ref(formatDate(new Date(), 'YYYY-MM-DD'))
const isEdit = ref(false)
const showClearIcon = ref(false)
const billInfo = ref<Bill>({
  remark: '',
  amount: '',
  payType: 1, // 选择的收支payType
  categoryId: 0,
  ctime: formatDate(new Date(), 'YYYY-MM-DD'),
  upTime: formatDate(new Date(), 'YYYY-MM-DD'),
})

// 备注相关
const clearInput = (e) => {
  billInfo.value.remark = e.detail.value
  if (e.detail.value.length > 0) {
    showClearIcon.value = true
  } else {
    showClearIcon.value = false
  }
}
const clearIcon = () => {
  showClearIcon.value = false
  billInfo.value.remark = ''
}
const categoryData = ref<CategoryItem[]>()
const originData = ref<CategoryItem[]>()

// payType类型改变
const changePayType = (e) => {
  billInfo.value.payType = +e
  if (originData.value && originData.value.length) {
    categoryData.value = originData.value.filter((el) => el.payType == e)
    selectCate.value = categoryData.value[0]
  }
}

// 弹出层组件
const popup = ref<UniHelper.UniPopupInstance>()
const selectCate = ref<CategoryItem>()

const clickCate = (category: CategoryItem) => {
  selectCate.value = category
}

const getGoryList = async () => {
  const res = await getCategoryList({
    page: 1,
    size: 20,
  })
  if (res.data.categorys && res.data.categorys.length) {
    originData.value = res.data.categorys
    categoryData.value = res.data.categorys.filter((el) => el.payType == billInfo.value.payType)
    selectCate.value = res.data.categorys[0]
  }
}

const toggle = () => {
  popup.value?.close!()
}

const changePopup = (e) => {
  if (e.show) {
    uni.hideTabBar()
  } else {
    uni.showTabBar()
  }
}

const changeBill = (bill?: Bill) => {
  console.log(bill, 'bill-changeBill')
  if (bill) {
    billInfo.value = bill
    // 需要设置属性
    date.value = dayjs(bill.ctime).format('YYYY-MM-DD')
    // 分类
    changePayType(bill.payType)
    selectCate.value = bill.category
    isEdit.value = true
  } else {
    resetParam()
  }
  popup.value?.open!()
}

const bindDateChange = (e) => {
  date.value = e.detail.value
}

const resetParam = () => {
  date.value = formatDate(new Date(), 'YYYY-MM-DD')
  billInfo.value.amount = '' // 金额
  billInfo.value.payType = 1 // 收支
  billInfo.value.remark = '' // 备注
  // 分类
  if (originData && originData.value && originData.value[0]) {
    selectCate.value = originData.value.filter((el) => el.payType == billInfo.value.payType)[0]
  }
  changePayType(1)
}
// 区分编辑和添加
const saveBill = async () => {
  if (!selectCate.value?.id) {
    uni.showToast({ icon: 'none', title: '请选择类目' })
  }
  if (accountStore.curAccount && selectCate.value?.id) {
    // 传入的时间 选择的日期+当前时间小时/分/秒
    let selectTime = dayjs().format('HH:mm:ss')
    let lastTime = `${date.value}T${selectTime}`
    if (isEdit.value && billInfo.value?.id) {
      await updateBill(
        {
          amount: +billInfo.value.amount,
          payType: billInfo.value.payType,
          categoryId: selectCate.value?.id,
          remark: billInfo.value.remark || '',
          accountId: accountStore.curAccount.id,
          ctime: lastTime,
        },
        billInfo.value?.id,
      )
    } else {
      await addBill({
        amount: +billInfo.value.amount,
        payType: billInfo.value.payType,
        categoryId: selectCate.value?.id,
        remark: billInfo.value.remark || '',
        accountId: accountStore.curAccount.id,
        ctime: lastTime,
      })
    }
    toggle()
    resetParam()
    // 提醒父组件刷新列表
    emit('refresh')
    uni.showToast({ icon: 'success', title: '添加成功' })
  }
}

// 键盘相关
const clickKeyboard = (e) => {
  let val = '' + billInfo.value.amount
  switch (e) {
    case 'enter':
      saveBill()
      break
    case 'delete':
      if (val.length >= 1) {
        const len = val.length - 1
        billInfo.value.amount = val.substring(0, len)
      }
      break
    case 'again':
      // 当前的需要保存 然后再次打开编辑弹框
      uni.showToast({
        title: '努力实现中',
        duration: 2000,
      })
      break
    case 'point':
      if (val) {
        if (val.slice(-1) == '.') {
        } else {
          billInfo.value.amount += '.'
        }
      } else {
        billInfo.value.amount = '0.'
      }
      break
    default:
      if (val) {
        billInfo.value.amount += `${e}`
      } else {
        billInfo.value.amount = `${e}`
      }
  }
}

// 获取分类列表
onShow(async () => {
  await getGoryList()
})

// 暴露方法
defineExpose({
  changeBill,
})
</script>
