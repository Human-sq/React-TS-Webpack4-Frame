import { AuthStore as AuthStoreModel } from './index'

export as namespace IAuthStore

export interface AuthStore extends AuthStoreModel {}

export interface LoginParams {
    account: string
    password: string
}

export interface UserInfo {
    role_name?: string
    email?: string
    mobile?: string
    account?: string
    username?: string
    token: string
    uid?: number
    login_time?: number
}
