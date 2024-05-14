import type { CategoryItem, CategoryData } from '@/types/category'
import { http } from '@/utils/https'

interface Param {
  page: number
  size: number
}
export const getCategoryList = (data: Param) => {
  return http<CategoryData>({
    method: 'GET',
    url: '/category/list',
    data,
  })
}

interface AddParam {
  categoryName: string
  payType: number
  accountId?: number
}
// add
export const addCategory = (data: AddParam) => {
  return http<CategoryData>({
    method: 'POST',
    url: '/category',
    data,
  })
}

// remove
export const deletCategory = (id: number) => {
  return http<CategoryData>({
    method: 'DELETE',
    url: '/category/' + id,
  })
}

// update
export const updateCategory = (data: AddParam, id: number) => {
  return http<CategoryData>({
    method: 'PUT',
    url: '/category/' + id,
    data,
  })
}
