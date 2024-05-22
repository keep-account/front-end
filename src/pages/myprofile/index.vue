<template>
  <view class="flex flex-col px-4">
    <view>
      <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
        <image class="avatar" :src="userInfo.avatar"></image>
      </button>
    </view>
    <view class="flex flex-row mb-10">
      <text class="text-primarySix">昵称：</text>
      <input
        type="nickname"
        :value="userInfo.nickName"
        placeholder="请输入昵称"
        @change="getNickname"
      />
    </view>
    <view class="flex flex-row mb-10">
      <text class="text-primarySix">个性签名：</text>
      <input :value="userInfo.signature" @change="getSignature" />
    </view>
    <view>
      <button class="bg-main text-white" @click="saveProfile">保存</button>
    </view>
  </view>
</template>
<script setup lang="ts">
import { updateUserInfo } from '@/services/user'
import { baseURL } from '@/utils/https'
import { useUserStore } from '@/store'
import { ref, onMounted } from 'vue'
const useStore = useUserStore()
const isChangeImg = ref(false)
const userInfo = ref({
  nickName: '微信默认账户',
  avatar:
    'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
  signature: '个性签名',
})

const onChooseAvatar = (e) => {
  isChangeImg.value = true
  userInfo.value.avatar = e.detail.avatarUrl
}
const getNickname = (e) => {
  userInfo.value.nickName = e.detail.value
}
const getSignature = (e) => {
  userInfo.value.signature = e.detail.value
}
// 图片保存和简介要分开
const saveProfile = async () => {
  uni.showLoading({
    title: '保存中',
  })
  if (isChangeImg.value) {
    uni.uploadFile({
      url: '/upload',
      name: 'file',
      filePath: userInfo.value.avatar,
      success: async (res) => {
        isChangeImg.value = false
        const data = JSON.parse(res.data)
        const fileRes = data.data.filename
        const avatarUrl = baseURL + '/uploads/' + fileRes
        const profile = useStore.profile
        useStore.setProfile({
          ...profile,
          username: userInfo.value.nickName,
          avatar: avatarUrl,
          signature: userInfo.value.signature,
        })
        await updateUserInfo({
          avatar: avatarUrl,
          username: userInfo.value.nickName,
          id: profile.id,
          signature: userInfo.value.signature,
        })
        uni.showToast({ icon: 'success', title: '更新成功' })
      },
      fail: (e) => {
        console.log(e)
      },
      complete: (e) => {
        uni.hideLoading()
      },
    })
  } else {
    const profile = useStore.profile
    useStore.setProfile({
      ...profile,
      username: userInfo.value.nickName,
      signature: userInfo.value.signature,
    })
    await updateUserInfo({
      avatar: profile.avatar,
      username: userInfo.value.nickName,
      id: profile.id,
      signature: userInfo.value.signature,
    })
    uni.showToast({ icon: 'success', title: '更新成功' })
  }
}
onMounted(() => {
  userInfo.value.avatar = useStore.profile.avatar
  userInfo.value.nickName = useStore.profile.username
  userInfo.value.signature = useStore.profile.signature
})
</script>
<style>
.avatar-wrapper {
  padding: 0;
  width: 56px !important;
  border-radius: 8px;
  margin-top: 40px;
  margin-bottom: 40px;
}

.avatar {
  display: block;
  width: 56px;
  height: 56px;
}
</style>
