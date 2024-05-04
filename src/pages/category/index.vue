<template>
  <view class="p-4 relative min-h-full">
    <view class="my-4">
      <block v-for="one in PayType" :key="one.id">
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
    <view class="flex flex-row flex-wrap mb-5">
      <block v-for="item in data" :key="item.id">
        <view class="p-2">
          <text>{{ item.categoryName }}</text>
        </view>
      </block>
    </view>
    <view class="relative bottom-0 left-0 right-0 px-4">
      <button class="bg-main text-white" @click="openPop">新增</button>
    </view>
    <uni-popup ref="popup" type="bottom" background-color="#fff" borderRadius="16px 16px 0 0">
      <view class="h-[200px] w-full px-4 box-border relative z-50 flex flex-col justify-center">
        <view class="mb-3 text-center">
          <uni-icons type="closeempty" size="25" color="#666666" @click="toggle"></uni-icons>
        </view>
        <view class="pb-4 pt-2">
          <input
            :value="categoryName"
            max="4"
            placeholder="请输入类目名称,不超过4个字"
            class="border-one h-10 rounded-2xl pl-5"
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
import { clsx } from 'clsx'
import { PayType } from '@/static/constant'
import type { CategoryItem, CategoryData } from '@/types/category'
import { getCategoryList, addCategory } from '@/services/category'
import { useAccountStore } from '@/store'
import { onLoad } from '@dcloudio/uni-app'

const payType = ref(1)
const changePayType = (e) => {
  payType.value = e
  if (originData.value && originData.value.length) {
    data.value = originData.value.filter((el) => el.payType == e)
  }
}

const data = ref<CategoryItem[]>()
const originData = ref<CategoryItem[]>()
const getList = async () => {
  const res = await getCategoryList({
    page: 1,
    size: 20,
  })
  if (res.data.categorys && res.data.categorys.length) {
    originData.value = res.data.categorys
    data.value = res.data.categorys.filter((el) => el.payType == payType.value)
  }
}
// 获取分类列表
onLoad(() => {
  getList()
})
const popup = ref<UniHelper.UniPopupInstance>()
const openPop = () => {
  popup.value?.open!()
}
const toggle = () => {
  popup.value?.close!()
}
const categoryName = ref('')
const changeName = (e) => {
  if (e.detail.value.length > 4) {
    categoryName.value = e.detail.value.slice(0, 4)
  }
  categoryName.value = e.detail.value
}
const accountStore = useAccountStore()
// 新增类别
const saveCategory = async () => {
  await addCategory({
    categoryName: categoryName.value,
    accountId: accountStore.curAccount?.id,
    payType: payType.value,
  })
  await getList()
  popup.value?.close!()
  categoryName.value = ''
}
</script>
