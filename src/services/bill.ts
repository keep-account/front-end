import type { BillRes } from '@/types/bill'
import { http } from '@/utils/https'

interface GetBillParam {
  page: number
  size: number
  accountId: number
  startTime: string
  endTime: string
}

// 获取账单列表
export const getBillsByAccount = (param: GetBillParam) => {
  return http<BillRes>({
    method: 'GET',
    url: '/bill/list',
    data: param,
  })
}

interface AddBillParam {
  amount: number
  categoryId: number
  remark: string
  accountId: number
  payType: number
  ctime: string
}
// 增加账单
export const addBill = (param: AddBillParam) => {
  return http({
    method: 'POST',
    url: '/bill',
    data: param,
  })
}

// 修改账单
export const updateBill = (param: AddBillParam, id: number) => {
  return http({
    method: 'PUT',
    url: '/bill/' + id,
    data: param,
  })
}

// 删除账单
export const removeBill = (id: number) => {
  return http({
    method: 'DELETE',
    url: `/bill/${id}`,
  })
}
