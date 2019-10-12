import http from '@services/http'

export default {
    login(data: object): Promise<any> {
        return http.post('/login', data || {})
    },

    changePwd(data: object): Promise<any> {
        return http.put('/user/password', data || {})
    },

    getUserDetail(data: object): Promise<any> {
        return http.get('/user/detail', data || {})
    },

    addUser(data: object): Promise<any> {
        return http.post('/user/add', data || {})
    },

    updateUser(data: object): Promise<any> {
        return http.post('/user/modify', data || {})
    },

    refreshToken(data: object): Promise<any> {
        return http.put('/cache/token/refresh', data || {})
    }
}
