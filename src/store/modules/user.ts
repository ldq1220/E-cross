import { defineStore } from 'pinia'
import { ref } from 'vue'
import { constantRoute, asnycRoute, anyRoute } from '@/router/routes'
import { reqUserLogin, reqGetUserMine } from '@/api/user'
import { ElMessage, dayjs } from 'element-plus'

// 创建用户小仓库  ~函数式
const useUserStore = defineStore('User', () => {
    const loginDialogVisible = ref(false) // 控制登录弹窗是否打开

    // 存储用户路由表
    let menuRoutes: any = []
    menuRoutes = [...constantRoute, ...asnycRoute, anyRoute]

    const accessToken = ref('')
    const userInfo = ref() // 用户信息

    accessToken.value = localStorage.getItem('accessToken') || '' // 获取当前用户的 accessToken
    userInfo.value = JSON.parse(localStorage.getItem('UserMine') as string) || ''

    // 设置标识
    const setAccessToken = (data: { accessToken: string; refreshToken: string; accessTokenExpiresIn: string; refreshTokenExpiresIn: string }) => {
        accessToken.value = data.accessToken

        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)
        localStorage.setItem('accessTokenExpiresIn', data.accessTokenExpiresIn)
        localStorage.setItem('refreshTokenExpiresIn', data.refreshTokenExpiresIn)

        // 设置过期时间
        localStorage.setItem('accessTokenExpiresTime', parseInt(data.accessTokenExpiresIn) + dayjs().unix())
        localStorage.setItem('refreshTokenExpiresTime', parseInt(data.refreshTokenExpiresIn) + dayjs().unix())
    }

    // 用户注册
    const registerUser = async () => {}

    // 用户登录
    const userLogin = async (data: any) => {
        let res: any = await reqUserLogin(data)
        if (res.code === '00000') {
            let { accessToken, refreshToken, accessTokenExpiresIn, refreshTokenExpiresIn } = res.result
            let data: any = { accessToken, refreshToken, accessTokenExpiresIn, refreshTokenExpiresIn }
            setAccessToken(data)
            UserMine()
            // logoutTime()
            ElMessage.success('登录成功！')
        } else {
            // ElMessage.error(res.message)
            return Promise.reject(new Error(res.message))
        }
    }

    // 用户登录成功获取用户信息
    const UserMine = async () => {
        let res: any = await reqGetUserMine()
        if (res.code === '00000') {
            userInfo.value = res.result
            localStorage.setItem('UserMine', JSON.stringify(res.result))
        }
    }

    // 判断accessTokenExpiresIn是否过期 false:未过期 true：过期
    const isAccessTokenExpiresIn = () => {
        const accessTokenExpiresTime = localStorage.getItem('accessTokenExpiresTime') || '0'
        if (accessTokenExpiresTime) {
            let nowTime = dayjs().unix()
            return parseInt(accessTokenExpiresTime) - nowTime < 0
            // return parseInt(accessTokenExpiresTime) - nowTime > 0
        }
    }

    // 判断refreshTokenExpiresIn是否过期 false:未过期 true：过期
    const isRefreshTokenExpiresIn = () => {
        const refreshTokenExpiresTime = localStorage.getItem('refreshTokenExpiresTime') || '0'
        if (refreshTokenExpiresTime) {
            let nowTime = dayjs().unix()
            return parseInt(refreshTokenExpiresTime) - nowTime < 0
            // return parseInt(refreshTokenExpiresTime) - nowTime > 0
        }
    }

    // 退出登录
    const userLogout = () => {
        localStorage.clear()
        accessToken.value = ''
        userInfo.value = null
    }

    // 开启登录过期倒计时
    // const logoutTime = () => {
    //     setTimeout(async () => {
    //         if (!isRefreshTokenExpiresIn()) {
    //             logoutTime()
    //         } else {
    //             userLogout()
    //             ElNotification.error({
    //                 title: '提示',
    //                 message: '您的登录已过期，请重新登陆！',
    //                 duration: 0,
    //             })
    //         }
    //     }, 7200 * 1000)
    // }

    return {
        accessToken,
        menuRoutes,
        userInfo,
        loginDialogVisible,
        registerUser,
        userLogin,
        UserMine,
        userLogout,
        setAccessToken,
        isAccessTokenExpiresIn,
        isRefreshTokenExpiresIn,
    }
})

export default useUserStore
