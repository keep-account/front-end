import { Category } from './category'

export type Bill = {
  id: number
  userId?: number
  amount: number
  categoryId: number
  categoryName?: string
  payType: number
  remark?: string
  category?: Category
  ctime: string
  upTime: string
  shareAccountId: number
}

export interface BillAdd
  extends Pick<
    Required<Bill>,
    'amount' | 'categoryId' | 'ctime' | 'payType' | 'remark' | 'userId'
  > {
  accountId: number
}
const billadd: BillAdd = {}

export type BillData = {
  date: string
  bills: Bill[]
  totalExpense: number
  totalIncome: number
}[]
