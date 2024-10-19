import type { BillRes } from '@/types/bill'
import { http } from '@/utils/https'
interface GetBillPayTypeParam {
  accountId: number
  startTime: string
  endTime: string
}

// 获取账单列表
export const getBillsPayTypeByAccount = (id: number, param: GetBillPayTypeParam) => {
  return http<BillRes>({
    method: 'GET',
    url: '/bill/type/' + id,
    data: param,
  })
}
