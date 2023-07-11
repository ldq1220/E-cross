import request from '@/utils/request'

// 定义请求地址字典
//项目用户相关的请求地址
enum API {
    SMSCODE_URL = 'app/user/sms-code', // 获取手机登录验证码
    LOGINVYSMSCODE_URL = 'app/user/login-by-smscode', // 短信验证码登录(自动注册)
    VERIFYEMAILTRIGGER_URL = 'app/user/verify-email/trigger/?', // 发送邮箱验证码
    EMAILREGISTER_URL = 'app/user/register', // Emali 账号注册
    USERLOGIN_URL = 'app/user/login', // 账密登录
    GETUSERMINE_URL = 'app/user/mine', // 获取用户个人信息
    REFRESHTOKEN_URL = 'app/user/refresh-token', // 刷新accessToken
}

// 获取手机登录验证码
export const reqSmsCode = (data: { phone: string }) => request.post(API.SMSCODE_URL, data)

// 短信验证码登录(自动注册)
export const reqLoginBySmsCode = (data: { phone: string; code: string }) => request.post(API.LOGINVYSMSCODE_URL, data)

// 发送邮箱验证码
export const reqSendVerifyEmail = (email: string) => request.post(API.VERIFYEMAILTRIGGER_URL + `email=${email}`)

// Emali 账号注册
export const reqEmailRegister = (data: { email: string; password: string; verifyCode: string }) => request.post(API.EMAILREGISTER_URL, data)

// 账密登录
export const reqUserLogin = (data: { email: string; password: string }) => request.post(API.USERLOGIN_URL, data)

// 获取用户个人信息
export const reqGetUserMine = () => request.get(API.GETUSERMINE_URL)

// 刷新accessToken
export const reqRegreshToken = () => request.post(API.REFRESHTOKEN_URL)
