import { http } from '@/utils/https'
import type { LoginResult } from '@/types/user'

export interface LoginParam {
  code: string
}

export const Login = async (data: LoginParam) => {
  return await http<LoginResult>({
    method: 'POST',
    url: '/auth/mp',
    data,
  })
}
