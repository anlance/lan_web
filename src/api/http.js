import axios from 'axios'
import {
    message
} from 'antd';
import {
    constant
} from './constant';

let loadingInstance = {
    close: () => {}
}
// process.env.NODE_ENV === 'production' ? 'http://123.207.49.214:8028' : 'http://123.207.49.214:8028'
// 创建axios实例
const service = axios.create({
    baseURL: constant.baseURL, // api的base_url
    timeout: 5000, // 请求超时时间
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    'method': 'POST'
    //设置默认请求头，使post请求发送的是formdata格式数据// axios的header默认的Content-Type好像是'application/json;charset=UTF-8',我的项目都是用json格式传输，如果需要更改的话，可以用这种方式修改
    // headers: {
    // "Content-Type": "application/x-www-form-urlencoded"
    // },
    // withCredentials: true, // 允许携带cookie
})

function cloneLoading() {
    loadingInstance.close()
}

// request拦截器
service.interceptors.request.use(config => {
    return config
}, error => {
    cloneLoading()
    // Do something with request error
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {
        cloneLoading()
        if (response.data.success === false) {
            message.error(response.data.errMsg, 1.5)
        } else if (response.data.data && response.data.code === 200) {
            message.success(response.data.data, 1.5)
        }
        return response.data
    }, error => {
        console.log('err' + error) // for debug
        cloneLoading()
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.desc = '请求错误'
                    break;
                case 401:
                    error.desc = '未授权，请登录'
                    break;
                case 403:
                    error.desc = '拒绝访问'
                    break;
                case 404:
                    error.desc = `请求地址出错: ${error.response.config.url}`
                    break;
                case 408:
                    error.desc = '请求超时'
                    break;
                case 500:
                    error.desc = '服务器内部错误'
                    break;
                case 501:
                    error.desc = '服务未实现'
                    break;
                case 502:
                    error.desc = '网关错误'
                    break;
                case 503:
                    error.desc = '服务不可用'
                    break;
                case 504:
                    error.desc = '网关超时'
                    break;
                case 505:
                    error.desc = 'HTTP版本不受支持'
                    break;
                default:
                    error.desc = '服务器内部错误'
                    break;
            }
            message.error(error.desc)
        }
        return Promise.reject(error)
    })
export default service

/**
 * get 方法封装
 * @param {string} url url
 * @param {JSON} params 参数
 * @returns 
 */
export function GET(url, params) {
    return service({
        url: url,
        method: 'get',
        params: params,
        headers: {
            'Authorization': getTokenHeader()
        }
    })
}

/**
 * post 方法封装
 * @param {string} url url
 * @param {JSON} params 参数
 * @returns 
 */
export function POST(url, params) {
    return service({
        url: url,
        data: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': getTokenHeader()
        }
    })
}

function getTokenHeader() {
    let token = window.localStorage.getItem("token");
    if (token === null || token === undefined || token === '') {
        return null;
    } else {
        return 'Bearer ' + window.localStorage.getItem("token");
    }
}