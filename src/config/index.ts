import Cookies from 'js-cookie'

/**
 * 设置请求头
 * @param opt
 */
const setHeader = () => {
    const token = Cookies.get('Auth_token')
    return {
        'Content-Type': 'application/json',
        Authorization: token || '',
        'X-iChangTou-BigData-APP-ID': 'bigdatabase'
    }
}

const AliIconUrl = '//at.alicdn.com/t/font_1094576_v2nfmaw5gl.js'

const BASEURL = {
    dev: {
        BASE: 'http://172.168.1.10:82/auth'
    },
    prod: {
        BASE: 'http://172.168.1.10:82/auth'
    }
}

export interface ApiListProps {
    BASE: string
}

const ApiList: ApiListProps = {
    BASE: 'BASE'
}

export { setHeader, BASEURL, ApiList, AliIconUrl }
