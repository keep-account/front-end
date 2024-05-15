import { http } from '@/utils/https'
import type { Account } from '@/types/account'

// 获取账本信息
export const getAccountInfo = (id: number) => {
  return http<Account>({
    method: 'GET',
    url: `/account/${id}`,
  })
}
// 获取账本列表
export const getAccountList = () => {
  return http<Account>({
    method: 'GET',
    url: `/account/list?page=1&size=10`,
  })
}

// 修改账本

// 删除账本

// 增加账本
