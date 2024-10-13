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
  return http<{
    accounts: Account[]
    total: number
  }>({
    method: 'GET',
    url: `/account/list?page=1&size=10`,
  })
}

// 修改账本
export const editAccount = (param: AddParam, id: number) => {
  return http<Account>({
    method: 'PUT',
    url: `/account/` + id,
    data: param,
  })
}

// 删除账本
export const deleteAccount = (id: number) => {
  return http({
    method: 'DELETE',
    url: `/account/${id}`,
  })
}

interface AddParam {
  accountName: string
}
// 增加账本
export const addAccount = (param: AddParam) => {
  return http<Account>({
    method: 'POST',
    url: `/account`,
    data: param,
  })
}
