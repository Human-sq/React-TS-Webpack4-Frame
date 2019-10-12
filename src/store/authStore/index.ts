import { observable, action, reaction, runInAction } from 'mobx'

import { StoreExt } from '@utils/reactExt'
import { routerStore } from './../'
import { initialUserInfo, syncUserInfo } from './syncUserInfo'
import { message } from 'antd'
import Cookies from 'js-cookie'
// import { LOCALSTORAGE_KEYS } from '@constants/index'

export class AuthStore extends StoreExt {
    /**
     * 用户信息
     *
     * @type {IAuthStore.UserInfo}
     * @memberof AuthStore
     */
    @observable userInfo: IAuthStore.UserInfo = initialUserInfo
    @observable token = ''
    @observable Alluser = []
    constructor() {
        super()
        reaction(() => this.userInfo, syncUserInfo)
    }

    @action
    login = async (params: IAuthStore.LoginParams): Promise<any> => {
        try {
            const res = await this.api.auth.login(params)
            if (res.token) {
                const userData = atob(res.token.split('.')[1])
                localStorage.setItem('authUserData', res.token)
                runInAction(() => {
                    this.userInfo = JSON.parse(userData).data
                    this.token = res.token
                })
            } else {
                runInAction(() => {
                    this.userInfo = {
                        token: ''
                    }
                    this.token = ''
                })
                return res.msg || '请求失败，请联系管理员！'
            }
        } catch (err) {
            console.error(err)
        }
    }

    @action
    logout = () => {
        this.setUserInfo({ token: '' })
        routerStore.history.push('/login')
    }

    @action
    changePwd = async (form): Promise<any> => {
        try {
            const res = await this.api.auth.changePwd(form)
            if (res.msg) {
                return res
            }
            return '请求发送失败，请联系管理员！'
        } catch (err) {
            return '请求发送失败，请联系管理员！'
        }
    }

    /**
     * 初始化用户信息
     *
     * @memberof AuthStore
     */
    @action
    setUserInfo = (userInfo: IAuthStore.UserInfo): IAuthStore.UserInfo => {
        this.userInfo = userInfo
        return userInfo
    }

    @action
    getUserInfo2 = async (form?: object): Promise<any> => {
        const { uid } = JSON.parse(atob(localStorage.getItem('authUserData').split('.')[1])).data
        const res = await this.api.auth.getUserDetail({ uid })
        if (res.data) {
            runInAction(() => {
                ;[this.userInfo] = res.data
            })
        } else {
            runInAction(() => {
                this.userInfo = { token: '' }
            })
            return res.msg || '请求失败，请联系管理员！'
        }
    }

    @action
    getUserInfo = async (form?: object): Promise<any> => {
        if (localStorage.getItem('authUserData')) {
            const r = await this.getUserInfo2()
            if (r) {
                return message.error(r)
            }
        } else {
            Cookies.remove('Auth_token')
            routerStore.history.push('/login')
            message.error('登录已失效，请重新登录！')
        }
    }

    @action
    fetch_userData = async (form?: object): Promise<any> => {
        const res = await this.api.auth.getUserDetail(
            form || {
                uid: 0
            }
        )
        if (res.data) {
            runInAction(() => {
                this.Alluser = res.data
            })
        } else {
            runInAction(() => {
                this.Alluser = []
            })
            return res.msg || '请求失败，请联系管理员！'
        }
    }

    @action
    add_user = async (form?: object): Promise<any> => {
        const res = await this.api.auth.addUser(form)
        if (res.msg) {
            return res
        }
        return '请求发送失败，请联系管理员！'
    }

    @action
    modify_user = async (form?: object): Promise<any> => {
        const res = await this.api.auth.updateUser(form)
        if (res.msg) {
            return res
        }
        return '请求发送失败，请联系管理员！'
    }

    @action
    refresh_token = async (form?: object): Promise<any> => {
        const res = await this.api.auth.refreshToken(form)
        if (res.msg) {
            return res
        }
        return '请求发送失败，请联系管理员！'
    }

    @action
    init = () => {
        this.userInfo = { token: '' }
        this.Alluser = []
        this.token = ''
    }
}

export default new AuthStore()
