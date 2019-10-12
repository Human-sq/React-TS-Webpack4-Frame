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

const BASEURL = {
    dev: {
        BASE: 'http://172.168.1.10:82/auth'
    },
    prod: {
        BASE: 'http://172.168.1.10:82/auth'
    }
}

export { setHeader, BASEURL }
