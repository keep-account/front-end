<template>
  <view class="p-4 relative min-h-full">
    <view class="my-4">
      <block v-for="one in PayType" :key="one.id">
        <text
          :class="
            clsx('p-2 text-fontMajor text-base bg-payType rounded mx-1', {
              'text-main': one.id == curCategoryInfo.payType,
            })
          "
          @click="changePayType(one.id)"
          >{{ one.title }}</text
        >
      </block>
    </view>
    <view class="flex flex-row flex-wrap mb-5">
      <block v-for="item in data" :key="item.id">
        <view class="p-2" @click="editCate(item)">
          <text>{{ item.categoryName }}</text>
        </view>
      </block>
    </view>
    <view class="relative bottom-0 left-0 right-0 px-4">
      <button class="bg-main text-white" @click="openPop">新增</button>
    </view>
    <uni-popup ref="popup" type="bottom" background-color="#fff" borderRadius="16px 16px 0 0">
      <view class="h-[200px] w-full px-4 box-border relative z-50 flex flex-col justify-between">
        <view class="my-2 text-center">
          <uni-icons type="closeempty" size="25" color="#666666" @click="toggle"></uni-icons>
        </view>
        <view class="pb-2 pt-2">
          <input
            :value="curCategoryInfo.categoryName"
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
import { clsx } from 'clsx'
import { PayType } from '@/static/constant'
import type { CategoryItem, CategoryData } from '@/types/category'
import { getCategoryList, addCategory, deletCategory, updateCategory } from '@/services/category'
import { useAccountStore } from '@/store'
import { onLoad } from '@dcloudio/uni-app'

// userid:0 不能删除 否则阔以删除
const isEdit = ref(false)
const curCategoryInfo = ref<CategoryItem>({
  categoryName: '',
  payType: 1,
  id: 0,
})
const changePayType = (e) => {
  curCategoryInfo.value.payType = e
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
    data.value = res.data.categorys.filter((el) => el.payType == curCategoryInfo.value.payType)
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
const changeName = (e) => {
  if (e.detail.value.length > 4) {
    curCategoryInfo.value.categoryName = e.detail.value.slice(0, 4)
  }
  curCategoryInfo.value.categoryName = e.detail.value
}
const accountStore = useAccountStore()
// 新增/编辑类别
const saveCategory = async () => {
  if (isEdit.value && curCategoryInfo.value.id) {
    await updateCategory(
      {
        categoryName: curCategoryInfo.value.categoryName,
        accountId: accountStore.curAccount?.id,
        payType: curCategoryInfo.value.payType,
      },
      curCategoryInfo.value.id,
    )
  } else {
    await addCategory({
      categoryName: curCategoryInfo.value.categoryName,
      accountId: accountStore.curAccount?.id,
      payType: curCategoryInfo.value.payType,
    })
  }
  await getList()
  popup.value?.close!()
  curCategoryInfo.value.categoryName = ''
  curCategoryInfo.value.payType = 1
}

// click  edit
const editCate = async (item: CategoryItem) => {
  if (item.userId !== 0) {
    uni.showActionSheet({
      itemList: ['删除', '编辑'],
      success: function (res) {
        if (res.tapIndex == 0) {
          deleteCate(item)
        } else {
          // update
          openPop()
          isEdit.value = true
          curCategoryInfo.value = item
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      },
    })
  }
}
// 删除
const deleteCate = async (item: CategoryItem) => {
  await deletCategory(item.id)
  await getList()
}
</script>
