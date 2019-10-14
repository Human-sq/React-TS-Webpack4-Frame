import axios, { AxiosRequestConfig as _AxiosRequestConfig, Method } from 'axios'
// import qs from 'qs'
import { message } from 'antd'
// import { setHeader } from '../config/index'
import { setHeader, BASEURL } from '@config'

export interface AxiosRequestConfig extends _AxiosRequestConfig {
    startTime?: Date
}

export interface HttpResquest {
    get?(url: string, data?: object, baseUrl?: string): Promise<any>
    post?(url: string, data: object, baseUrl?: string): Promise<any>
    delete?(url: string, data: object, baseUrl?: string): Promise<any>
    put?(url: string, data: object, baseUrl?: string): Promise<any>
}

// const formatParams = data => {
//     const keys = Object.keys(data).filter(key => undefined !== data[key])
//     if (keys.length) {
//         return `${keys.map(key => `${key}=${data[key]}`).join('&')}`
//     }
//     return ''
// }

// enum HTTPERROR {
//     LOGICERROR,
//     TIMEOUTERROR,
//     NETWORKERROR
// }

// const TOKENERROR = [401, 402, 403]

const DEFAULTCONFIG = {
    baseURL: BASEURL[process.env.APP_ENV]
}

const http: HttpResquest = {}
const methods: Method[] = ['get', 'post', 'put', 'delete']

// const authTimer: NodeJS.Timer = null

// const isSuccess = res => res.errCode === 0
// const resFormat = res => res.response || res.data || {}

methods.forEach(v => {
    http[v] = (url: string, data: object, baseUrl = 'BASE') => {
        const axiosConfig: AxiosRequestConfig = {
            method: v,
            url,
            baseURL: baseUrl.includes('http') ? baseUrl : DEFAULTCONFIG.baseURL[baseUrl],
            headers: setHeader()
        }
        const instance = axios.create(DEFAULTCONFIG)
        // // Add a request interceptor
        // instance.interceptors.request.use(
        //     cfg => {
        //         cfg.params = { ...cfg.params, ts: Date.now() / 1000 }
        //         return cfg
        //     },
        //     error => Promise.reject(error)
        // )
        // // Add a response interceptor
        // instance.interceptors.response.use(
        //     response => {
        //         const rdata =
        //             typeof response.data === 'object' && !isNaN(response.data.length) ? response.data[0] : response.data
        //         if (!isSuccess(rdata)) {
        //             return Promise.reject({
        //                 msg: rdata.msg,
        //                 errCode: rdata.errCode,
        //                 type: HTTPERROR[HTTPERROR.LOGICERROR],
        //                 config: response.config
        //             })
        //         }
        //         return resFormat(rdata)
        //     },
        //     error => {
        //         if (TOKENERROR.includes(error.response.status)) {
        //             message.destroy()
        //             message.error('Authentication failure, Please relogin!')
        //             clearTimeout(authTimer)
        //             authTimer = setTimeout(() => {
        //                 location.replace('/#/login')
        //             }, 300)
        //             return
        //         }
        //         return Promise.reject({
        //             msg: error.response.statusText || error.message || 'network error',
        //             type: /^timeout of/.test(error.message)
        //                 ? HTTPERROR[HTTPERROR.TIMEOUTERROR]
        //                 : HTTPERROR[HTTPERROR.NETWORKERROR],
        //             config: error.config
        //         })
        //     }
        // )
        if (v === 'get') {
            axiosConfig.params = data
        } else {
            axiosConfig.data = JSON.stringify(data)
        }
        axiosConfig.startTime = new Date()
        return instance
            .request(axiosConfig)
            .then(res => res.data)
            .catch(err => {
                message.destroy()
                message.error(err.response || err.msg || err.stack || 'unknown error')
                return Promise.reject(
                    axiosConfig.url.includes('autoScript.set') ? { err } : { err, stack: err.msg || err.stack || '' }
                )
            })
    }
})

export default http
