import { Account } from "../account/account.entity"
import { Category } from "../category/category.entity"

export type Bill = {
  id: number
  userId?: number
  amount: number
  categoryId: number
  categoryName: string
  payType: number
  remark?: string
  shareAccount?: Account
  category?: Category
  ctime: string
}

export interface BillAdd
  extends Pick<
    Required<Bill>,
    "amount" | "categoryId" | "ctime" | "payType" | "remark" | "userId"
  > {
  accountId: number
}
const billadd: BillAdd = {}

export type BillData = {
  date: string
  bills: Bill[]
}[]
