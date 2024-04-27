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
// 增加账单

// 修改账单

// 删除账单
