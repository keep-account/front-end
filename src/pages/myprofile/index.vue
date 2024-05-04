<template>
  <view class="flex flex-col px-4">
    <view>
      <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
        <image class="avatar" :src="avatar"></image>
      </button>
    </view>
    <view class="flex flex-row mb-10">
      <text>昵称：</text>
      <input type="nickname" :value="nickName" placeholder="请输入昵称" @change="getNickname" />
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
import { ref, computed } from 'vue'
const nickName = ref('')
const useStore = useUserStore()
const deavatarUrl =
  'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'
const avatar = ref(deavatarUrl)
const onChooseAvatar = (e) => {
  avatar.value = e.detail.avatarUrl
}
const getNickname = (e) => {
  nickName.value = e.detail.value
}
const saveProfile = async () => {
  uni.uploadFile({
    url: '/upload',
    name: 'file',
    filePath: avatar.value,
    success: async (res) => {
      const data = JSON.parse(res.data)
      const fileRes = data.data.filename
      const avatarUrl = baseURL + '/uploads/' + fileRes
      const profile = useStore.profile
      useStore.setProfile({
        ...profile,
        username: nickName.value,
        avatar: avatarUrl,
      })
      const userInfo = await updateUserInfo({
        avatar: avatarUrl,
        username: nickName.value,
        id: profile.id,
      })
      uni.showToast({ icon: 'success', title: '更新成功' })
      uni.navigateBack()
    },
  })
}
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
