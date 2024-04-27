import type { LoginToken, User } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const useUserStore = defineStore(
  'user-cpp',
  () => {
    const profile = ref<User>({
      username: '',
      openid: '',
      avatar: '',
      signature: '',
      id: '',
    })

    // 保存会员信息，登录时使用
    const setProfile = (val: User) => {
      profile.value = val
    }

    // 清理会员信息，退出时使用
    const clearProfile = () => {
      console.log('clear profile')
      profile.value = {
        id: '',
        username: '',
        openid: '',
        avatar: '',
        signature: '',
      }
    }

    const token = ref('')
    const updateToken = (tokenU: string) => {
      token.value = tokenU
    }

    // 记得 return
    return {
      profile,
      setProfile,
      clearProfile,
      token,
      updateToken,
    }
  },
  {
    // 网页端配置
    // persist: true,
    // 小程序端配置
    persist: {
      paths: ['profile', 'token'],
    },
  },
)
