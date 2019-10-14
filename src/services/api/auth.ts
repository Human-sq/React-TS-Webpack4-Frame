import http from '@services/http'
import { ApiList } from '@config'

export default {
    login(data: object): Promise<any> {
        return http.post('/login', data || {}, ApiList.BASE)
    },

    changePwd(data: object): Promise<any> {
        return http.put('/user/password', data || {}, ApiList.BASE)
    },

    getUserDetail(data: object): Promise<any> {
        return http.get('/user/detail', data || {}, ApiList.BASE)
    },

    addUser(data: object): Promise<any> {
        return http.post('/user/add', data || {}, ApiList.BASE)
    },

    updateUser(data: object): Promise<any> {
        return http.post('/user/modify', data || {}, ApiList.BASE)
    },

    refreshToken(data: object): Promise<any> {
        return http.put('/cache/token/refresh', data || {}, ApiList.BASE)
    }
}
