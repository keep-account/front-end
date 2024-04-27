import type { Account } from '@/types/account'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const useAccountStore = defineStore(
  'user-account',
  () => {
    const curAccount = ref<Account>()

    const setCurAccount = (val: Account) => {
      curAccount.value = val
    }

    const clearCurAccount = () => {
      curAccount.value = undefined
    }

    // 记得 return
    return {
      curAccount,
      setCurAccount,
      clearCurAccount,
    }
  },
  {
    // 网页端配置
    // persist: true,
    // 小程序端配置
    persist: {
      paths: ['curAccount'],
    },
  },
)
