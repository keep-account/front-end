import { http } from '@/utils/https'
import type { LoginToken, UserInfo, User } from '@/types/user'

export interface LoginParam {
  code: string
}

export const Login = async (data: LoginParam) => {
  return await http<LoginToken & User>({
    method: 'POST',
    url: '/auth/mp',
    data,
  })
}

export const getUseInfo = async () => {
  return await http<UserInfo>({
    method: 'GET',
    url: '/user/info',
  })
}

export interface UpdateUser {}

// update
export const updateUserInfo = async (param: Pick<User, 'avatar' | 'username' | 'id'>) => {
  return await http<UserInfo>({
    method: 'PUT',
    url: `/user/${param.id}`,
    data: param,
  })
}

// upload 上传文件
export const uploadFile = async () => {
  return await http<UserInfo>({
    method: 'POST',
    url: `/upload`,
    // data: ,
  })
}
