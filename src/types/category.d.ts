export type CategoryItem = {
  id: number
  categoryName: string
  userId?: number
  payType: number
  shareAccountId?: number
  upTime?: string
}

export type CategoryData = {
  categorys: CategoryItem[]
}
