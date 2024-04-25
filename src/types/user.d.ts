export type User = {
  id: number | string
  username: string
  openid: string
  signature: string
  avatar: string
}

export type LoginResult = User & {
  access_token: string
}
