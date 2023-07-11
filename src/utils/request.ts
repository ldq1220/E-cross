// 引入axios
import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user.ts'
import { reqRegreshToken } from '@/api/user'
import store from '@/store'
import { dayjs } from 'element-plus'

const userStore = useUserStore(store)
let isRefreshing = false // 是否刷新中

// 请求队列
// let queue: Array<(token: string) => void> = []

// 创建axios实例
const request = axios.create({
    baseURL: '/api',
    timeout: 15000,
})

// 配置请求拦截器
request.interceptors.request.use(async (config) => {
    // 配置请求头
    const authorization = userStore.accessToken

    // 验证token
    if (authorization) {
        config.headers.authorization = 'Bearer ' + authorization
    }

    // 如果 accessToken 过期
    if (userStore.isAccessTokenExpiresIn()) {
        // 如果 refreshToken 未过期
        if (!userStore.isRefreshTokenExpiresIn()) {
            // 利用 refreshToken 获取新 token
            config.headers.authorization = 'Bearer ' + localStorage.getItem('refreshToken')

            // 是否在刷新中
            if (!isRefreshing) {
                isRefreshing = true

                let res: any = await reqRegreshToken()
                if (res.code === '00000') {
                    isRefreshing = false

                    localStorage.setItem('accessToken', res.result.accessToken)
                    localStorage.setItem('accessTokenExpiresIn', res.result.accessTokenExpiresIn)
                    localStorage.setItem('accessTokenExpiresTime', parseInt(res.result.accessTokenExpiresIn) + dayjs().unix())

                    userStore.accessToken = res.result.accessToken
                    config.headers.authorization = 'Bearer ' + userStore.accessToken

                    // return new Promise((resolve) => {
                    //     // 继续请求
                    //     // 重新设置 token
                    //     if (config.headers) {
                    //         config.headers.authorization = 'Bearer ' +  userStore.accessToken
                    //     }
                    //     resolve(config)
                    // })
                }
            }
        }
    }

    return config
})

// 配置响应拦截器
request.interceptors.response.use(
    (response) => {
        return response.data // 返回响应数据
    },
    (error) => {
        // 失败回调
        let message = error.response.data.message

        const { status } = error.response
        if (status === 401) {
            userStore.userLogout() // 退出登录
        }

        ElMessage.closeAll(); // 关闭所有提示

        // 错误的提示信息
        ElMessage.error(message)

        return error.response.data // 返回响应数据或错误信息的包装器
    },
)

export default request
