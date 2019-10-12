import Cookies from 'js-cookie'

// import { LOCALSTORAGE_KEYS } from '@constants/index'

export const initialUserInfo = (() => {
    const localUserInfo = Cookies.get('Auth_token')
    const _userInfo: IAuthStore.UserInfo = localUserInfo
        ? JSON.parse(atob(localUserInfo.split('.')[1])).data
        : { token: '' }
    return _userInfo
})()

export let userInfo: IAuthStore.UserInfo = initialUserInfo

/**
 * syncUserInfo for http
 *
 * @export
 * @param {IAuthStore.UserInfo} data
 */
export function syncUserInfo(data: IAuthStore.UserInfo) {
    userInfo = data
}
