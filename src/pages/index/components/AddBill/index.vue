<template>
  <view>
    <FixAdd @change-bill="changeBill" />
    <uni-popup ref="popup" type="bottom" background-color="#fff" borderRadius="16px 16px 0 0">
      <view class="h-[600px] w-full px-4 box-border relative z-50">
        <view class="my-5">
          <uni-icons type="closeempty" size="25" color="#666666" @click="toggle"></uni-icons>
        </view>
        <view class="flex flex-row justify-between w-full">
          <view>
            <block v-for="one in payTypeData" :key="one.id">
              <text
                :class="
                  clsx('p-2 text-fontMajor text-base bg-payType rounded mx-1', {
                    'text-main': one.id == payType,
                  })
                "
                @click="changePayType(one.id)"
                >{{ one.title }}</text
              >
            </block>
          </view>
          <view class="text-fontMain h-6 bg-payType px-2 py-1 rounded"
            ><picker
              mode="date"
              :value="date"
              start="2014-01-01"
              @change="bindDateChange"
              class="flex flex-row"
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
          <text class="text-fontMain font-extrabold text-4xl">{{ amount }}</text>
        </view>
        <CategoryList :list="list" @click-cate="clickCate" />
        <view class="flex flex-row flex-nowrap my-5">
          <uni-icons type="compose" size="25" color="#666666"></uni-icons>
          <input
            class="text-fontMajor p-1 borderB"
            placeholder="添加备注..."
            :value="inputClearValue"
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
    </uni-popup>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import clsx from 'clsx'
import { clsx } from 'clsx'
import CategoryList from './CategoryList.vue'
import FixAdd from './FixAdd.vue'
import Keyboard from './Keyboard.vue'
import { formatDate } from '@/utils'
const date = ref(formatDate(new Date(), 'YYYY-MM-DD'))
const inputClearValue = ref('')
const showClearIcon = ref(false)
const list = ref([
  {
    id: 1,
    categoryName: '早饭',
    payType: 1,
    userId: 0,
    ctime: '2024-04-11T10:16:57.304Z',
    upTime: '2024-04-17T11:54:52.000Z',
  },
  {
    id: 2,
    categoryName: '午饭',
    payType: 1,
    userId: 0,
    ctime: '2024-04-11T10:19:40.540Z',
    upTime: '2024-04-17T11:55:11.000Z',
  },
  {
    id: 4,
    categoryName: '晚饭',
    payType: 1,
    userId: 0,
    ctime: '2024-04-11T10:20:49.299Z',
    upTime: '2024-04-17T11:55:36.000Z',
  },
])

const payTypeData = ref([
  {
    id: 1,
    title: '支出',
  },
  {
    id: 2,
    title: '收入',
  },
  {
    id: 0,
    title: '不计入收支',
  },
])

//  选择的收支payType
const payType = ref<number>(1)

// 输入的金额
const amount = ref<string>('')

// 弹出层组件
const popup = ref<UniHelper.UniPopupInstance>()

const clickCate = (name: string) => {
  uni.showToast({ icon: 'none', title: name })
  console.log(name)
}

const toggle = (e) => {
  popup.value?.close!()
  uni.showTabBar()
}
const changeBill = (e) => {
  uni.hideTabBar()
  popup.value?.open!('bottom')
  // 轻提示
}

const bindDateChange = (e) => {
  console.log('picker发送选择改变，携带值为', e.detail.value)
  date.value = e.detail.value
}

// payType类型改变
const changePayType = (e) => {
  console.log(e, 'e')
  payType.value = +e
}

// 键盘相关
const clickKeyboard = (e) => {
  console.log(e, 'clickboard', typeof e == 'number')
  switch (e) {
    case 'enter':
      uni.showToast({ icon: 'none', title: amount.value })
      break
    case 'delete':
      if (amount.value.length >= 1) {
        const len = amount.value.length - 1
        amount.value = amount.value.substring(0, len)
      }
      break
    case 'again':
      uni.showToast({ icon: 'none', title: 'again' })
      break
    case 'point':
      if (amount.value) {
        if (amount.value.slice(-1) == '.') {
        } else {
          amount.value += '.'
        }
      } else {
        amount.value = '0.'
      }
      break
    default:
      if (amount.value) {
        amount.value += `${e}`
      } else {
        amount.value = `${e}`
      }
      console.log(amount.value, 'valll')
  }
}

// 备注相关
const clearInput = (e) => {
  inputClearValue.value = e.detail.value
  if (e.detail.value.length > 0) {
    showClearIcon.value = true
  } else {
    showClearIcon.value = false
  }
}
const clearIcon = () => {
  showClearIcon.value = false
  inputClearValue.value = ''
}
</script>
