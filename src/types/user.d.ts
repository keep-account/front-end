import { Account } from './account'
export type User = {
  id: number | string
  username: string
  openid: string
  signature: string
  avatar: string
}

export type UserInfo = User & {
  ownedAccounts: Account[]
  shareAccounts: Account[]
}
