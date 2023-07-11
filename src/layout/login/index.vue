<template>
    <div class="login_box">
        <div class="login_text" @click="userStore.loginDialogVisible = true">登录/注册</div>
        <input type="text" placeholder="请输入密码" id="copyVal" v-model="formData.registerPassword" />

        <!-- 登录对话框 -->
        <el-dialog v-model="userStore.loginDialogVisible" width="30%" center :show-close="false">
            <div class="login_content">
                <div class="content_left">
                    <img src="@/assets/images/login-bg.jpg" alt="" />
                </div>
                <!-- 短信登录、账密登录 -->
                <div class="content_right" v-show="isLogin">
                    <el-tabs v-model="activeName" class="demo-tabs">
                        <el-tab-pane label="短信登录" name="phone">
                            <el-form class="login_form" :model="formData" :rules="rules" ref="smsLoginFormDom">
                                <el-form-item prop="userPhone" autocomplete="off">
                                    <el-input v-model="formData.userPhone" class="login_input" maxlength="11" placeholder="请输入手机号" />
                                </el-form-item>
                                <el-form-item prop="authCode">
                                    <div class="code_box">
                                        <el-input v-model="formData.authCode" maxlength="6" @keyup.enter="smsLogin" class="login_input code_input" ref="smsCodeInputRef" placeholder="请输入验证码" />
                                        <el-button class="code_btn" @click="getPhoneCode" :disabled="phoneCodeFlag">{{ phoneCode }}</el-button>
                                    </div>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" class="login_btn" @click="smsLogin">登录</el-button>
                                </el-form-item>
                            </el-form>

                            <p class="content_text">若未注册，自动创建新账户</p>
                            <div class="tooltip">
                                <p @click="isLogin = false">注册邮箱账号？</p>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="账密登录" name="password">
                            <el-form class="login_form" :model="formData" ref="loginFormDom" :rules="rules">
                                <el-form-item prop="userAccount">
                                    <el-input v-model="formData.userAccount" class="login_input" placeholder="请输入手机号/邮箱" />
                                </el-form-item>
                                <el-form-item prop="userPassword">
                                    <el-input
                                        type="password"
                                        @keyup.enter="userLogin"
                                        class="login_input"
                                        v-model="formData.userPassword"
                                        maxlength="20"
                                        placeholder="请输入密码"
                                        show-password
                                    ></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" class="login_btn" @click="userLogin">登录</el-button>
                                </el-form-item>
                            </el-form>

                            <div class="tooltip password_tooltip">
                                <p @click="isLogin = false">注册邮箱账号？</p>
                                <p>忘记密码？</p>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
                <!-- 注册邮箱账号 -->
                <div class="register" v-show="!isLogin">
                    <h3>注册邮箱账号</h3>
                    <el-form class="login_form" :model="formData" :rules="rules" ref="registerFormDom">
                        <el-form-item prop="registerEmail">
                            <el-input v-model="formData.registerEmail" class="login_input" placeholder="请输入邮箱账号" />
                        </el-form-item>
                        <el-form-item prop="registerCode">
                            <div class="code_box">
                                <el-input v-model="formData.registerCode" class="login_input code_input" maxlength="6" ref="emailCodeInputRef" placeholder="请输入验证码" />
                                <el-button class="code_btn" @click="getEmailCode" :disabled="emailCodeFlag">{{ emailCode }}</el-button>
                            </div>
                        </el-form-item>
                        <el-form-item prop="registerPassword" class="pass_box">
                            <el-input
                                type="password"
                                class="login_input"
                                @focus="registerPassTooltipShow = true"
                                @blur="registerPassTooltipShow = false"
                                @input="ruleEmailPassword"
                                @keyup.enter="sendVerifyEmail"
                                v-model="formData.registerPassword"
                                placeholder="请输入密码"
                                maxlength="20"
                                show-password
                            ></el-input>

                            <div shadow="hover" class="pass_tooltip" v-show="registerPassTooltipShow">
                                <p>
                                    <i class="iconfont icon-zhengque5" v-show="registerPasswordRule1"></i>
                                    <i class="iconfont icon-cuowu cuowu" v-show="!registerPasswordRule1"></i>
                                    6-20个字符,只能包含字母、数字以及标点符号
                                </p>
                                <p>
                                    <i class="iconfont icon-zhengque5" v-show="registerPasswordRule2"></i>
                                    <i class="iconfont icon-cuowu cuowu" v-show="!registerPasswordRule2"></i>
                                    字母、数字和标点符号至少包含2种
                                </p>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" plain class="login_btn" @click="sendVerifyEmail" data-clipboard-action="copy" data-clipboard-target="#copyVal">注册</el-button>
                        </el-form-item>
                    </el-form>

                    <div class="tooltip register_tooltip">
                        <p @click="isLogin = true">已有邮箱账号？</p>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import Clipboard from 'clipboard'
import { Ref, nextTick, reactive, ref } from 'vue'
import { ElMessage, ElNotification } from 'element-plus'
import { reqSendVerifyEmail, reqEmailRegister, reqSmsCode, reqLoginBySmsCode } from '@/api/user'
import uselayoutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()
const layoutSettingStore = uselayoutSettingStore()

const activeName = ref('phone')
const isLogin = ref(true)

const registerPasswordRule1 = ref(false)
const registerPasswordRule2 = ref(false)
const registerPassTooltipShow = ref(false)

const smsLoginFormDom = ref()
const registerFormDom = ref()
const loginFormDom = ref()

const reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
const reg_email = /^([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)$/
const reg_registerPass = /^(?=[a-zA-Z0-9!@#$%^&*()\-_=+{};:,<.>]*$)(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()\-_=+{};:,<.>.]{6,20}$/ // 邮箱注册 密码 总校验
const reg_registerPass1 = /^[a-zA-Z0-9!@#$%^&*()\-_=+{};:,.<>]{6,20}$/ // 校验  6-20个字符,只能包含字母、数字以及标点符号
const reg_registerPass2 = /^(?=.*[a-zA-Z])(?=.*[0-9!@#$%^&*()\-_=+{};:,<.>.])[\da-zA-Z!@#$%^&*()\-_=+{};:,<.>.]{6,20}$/ // 校验 字母、数字和标点符号至少包含2种

const ruleEmailPassword = () => {
    reg_registerPass1.test(formData.registerPassword) ? (registerPasswordRule1.value = true) : (registerPasswordRule1.value = false)
    reg_registerPass2.test(formData.registerPassword) ? (registerPasswordRule2.value = true) : (registerPasswordRule2.value = false)
}

const formData = reactive({
    userPhone: '',
    authCode: '',
    userAccount: '',
    userPassword: '',
    registerEmail: '',
    registerCode: '',
    registerPassword: '',
})

// 短信登录
const phoneCode: Ref<string | number> = ref('获取验证码')
const phoneCodeFlag = ref(false)
const smsCodeInputRef = ref()
let phoneCodeTime: any = null
const getPhoneCode = async () => {
    if (!formData.userPhone) return ElMessage.error('请输入手机号')
    if (!reg_tel.test(formData.userPhone)) return

    if (phoneCodeFlag.value) return
    phoneCodeFlag.value = true

    smsCodeInputRef.value.focus() // 短信验证码 输入框 自动获取焦点
    formData.authCode = ''
    let data = { phone: formData.userPhone }
    let res: any = await reqSmsCode(data)

    if (res.code === '00000') {
        let num = 60
        phoneCode.value = num + 's'
        num--
        phoneCodeTime = setInterval(() => {
            phoneCode.value = num-- + 's'
            if (num < -1) {
                phoneCode.value = '获取验证码'
                phoneCodeFlag.value = false
                clearInterval(phoneCodeTime)
            }
        }, 1000)
    } else {
        phoneCodeFlag.value = false
    }
}
const smsLogin = async () => {
    await smsLoginFormDom.value.validate()

    let data = {
        phone: formData.userPhone,
        code: formData.authCode,
    }
    let res: any = await reqLoginBySmsCode(data)
    if (res.code === '00000') {
        let { accessToken, refreshToken, accessTokenExpiresIn, refreshTokenExpiresIn } = res.result
        let data: any = { accessToken, refreshToken, accessTokenExpiresIn, refreshTokenExpiresIn }
        userStore.setAccessToken(data)
        userStore.UserMine()
        userStore.logoutTime()
        userStore.loginDialogVisible = false

        layoutSettingStore.refreshFn() // 重新挂载组件

        formData.userPhone = ''
        formData.authCode = ''
        clearInterval(phoneCodeTime)
        phoneCode.value = '获取验证码'
        ElMessage.success('登录成功！')
    } else {
        formData.authCode = ''
    }
}

// 注册邮箱： 发送验证码
const emailCode = ref('获取验证码')
const emailCodeFlag = ref(false)
const emailCodeInputRef = ref()
let emailCodeTime: any = null
const getEmailCode = async () => {
    if (!formData.registerEmail.trim()) return ElMessage.error('请输入邮箱账号')
    if (!reg_email.test(formData.registerEmail)) return

    if (emailCodeFlag.value) return
    emailCodeFlag.value = true

    formData.registerCode = ''
    let res: any = await reqSendVerifyEmail(formData.registerEmail)

    if (res.code === '00000') {
        emailCodeInputRef.value.focus() // 邮箱验证码输入框 自动获取焦点
        let num = 60
        emailCode.value = num + 's'
        num--
        emailCodeTime = setInterval(() => {
            emailCode.value = num-- + 's'
            if (num < -1) {
                emailCode.value = '获取验证码'
                emailCodeFlag.value = false
                clearInterval(emailCodeTime)
            }
        }, 1000)
    } else {
        emailCodeFlag.value = false
    }
}
const sendVerifyEmail = async () => {
    // 校验 注册邮政 form
    await registerFormDom.value.validate()

    copyRegisterEmailPass()

    let data = {
        email: formData.registerEmail,
        password: formData.registerPassword,
        verifyCode: formData.registerCode,
    }

    let res: any = await reqEmailRegister(data)
    if (res.code === '00000') {
        let { accessToken, refreshToken, accessTokenExpiresIn, refreshTokenExpiresIn } = res.result
        let data: any = { accessToken, refreshToken, accessTokenExpiresIn, refreshTokenExpiresIn }
        userStore.setAccessToken(data)
        userStore.UserMine()
        userStore.logoutTime()
        userStore.loginDialogVisible = false

        emailCodeFlag.value = false

        ElNotification({
            title: '注册成功',
            message: '密码已复制到剪贴板，请妥善保存',
            type: 'success',
        })

        formData.registerEmail = ''
        formData.registerCode = ''
        clearInterval(emailCodeTime)
        emailCode.value = '获取验证码'
        layoutSettingStore.refreshFn() // 重新挂载组件

        setTimeout(() => {
            formData.registerPassword = ''
        }, 10)
    } else {
        formData.registerCode = ''
    }
}

// 账密登录
const userLogin = async () => {
    // 校验 账密注册 form
    await loginFormDom.value.validate()
    let data = { email: formData.userAccount, password: formData.userPassword }
    try {
        await userStore.userLogin(data)
        userStore.loginDialogVisible = false

        layoutSettingStore.refreshFn() // 重新挂载组件

        formData.userAccount = ''
        formData.userPassword = ''
    } catch (error: any) {}
}

// 组定义表单校验规则
const validateUserPhone = (_rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('手机号不能为空'))
    } else if (!reg_tel.test(value)) {
        callback(new Error('手机号格式不正确'))
    } else {
        callback()
    }
}
const validateUserAccount = (_rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('手机号/邮箱不能为空'))
    } else if (!reg_tel.test(value) && !reg_email.test(value)) {
        callback(new Error('手机号/邮箱格式不正确'))
    } else {
        callback()
    }
}
const validateRegisterEmail = (_rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('邮箱不能为空'))
    } else if (!reg_email.test(value)) {
        callback(new Error('邮箱格式不正确'))
    } else {
        callback()
    }
}
const validateRegisterPassword = (_rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('密码不能为空'))
    } else if (!reg_registerPass.test(value)) {
        callback(new Error('密码格式不正确'))
    } else {
        callback()
    }
}

// 表单校验规则
const rules = reactive({
    userPhone: [{ validator: validateUserPhone, trigger: 'blur' }],
    userAccount: [{ validator: validateUserAccount, trigger: 'blur' }],
    authCode: [
        { required: true, message: '验证码不能为空', trigger: 'blur' },
        { min: 6, message: '邮箱验证码为六位', trigger: 'blur' },
    ],
    userPassword: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
    registerEmail: [{ validator: validateRegisterEmail, trigger: 'blur' }],
    registerCode: [
        { required: true, message: '验证码不能为空', trigger: 'blur' },
        { min: 6, message: '邮箱验证码为六位', trigger: 'blur' },
    ],
    registerPassword: [{ validator: validateRegisterPassword, trigger: 'blur' }],
})

// 复制密码
const copyRegisterEmailPass = () => {
    nextTick(() => {
        console.log('密码已复制')

        var clipboard = new Clipboard('.login_btn')
        clipboard.on('success', (e) => {
            e.clearSelection()
            // 释放内存
            clipboard.destroy()
        })
        clipboard.on('error', () => {
            // 不支持复制
            ElMessage({
                type: 'info',
                message: '不支持自动复制',
            })
            // 释放内存
            clipboard.destroy()
        })
    })
}
</script>

<style lang="scss">
.login_box {
    .el-dialog__header {
        padding: 0;
        margin-right: 0;
    }
    .el-dialog--center {
        position: relative;
        width: 600px;
        border-radius: 14px;
        .el-dialog__body {
            padding: 0;
        }
    }
    .el-tabs__item {
        color: #999;
        font-weight: 700;
        font-size: 18px;
        cursor: pointer;
    }
    .el-tabs__item.is-active {
        color: #333;
    }
    .el-tabs__active-bar {
        background-color: transparent;
    }
    .el-form-item {
        margin-bottom: 20px;
    }
    .el-form-item__error {
        padding-left: 6px;
    }
    .login_input {
        .el-input__wrapper {
            height: 44px;
        }
        .el-input__wrapper.is-focus {
            box-shadow: 0 0 0 1px $base-theme-color inset;
        }
        .el-input__inner {
            height: 44px;
            padding-left: 10px;
        }
    }
    .code_input {
        width: 180px;
        .el-input__inner {
            padding-left: 10px;
        }
    }
    .el-button--primary.is-link,
    .el-button--primary.is-plain,
    .el-button--primary.is-text {
        --el-button-text-color: #fff;
    }
}
</style>

<style scoped lang="scss">
.login_box {
    position: relative;
    #copyVal {
        position: absolute;
        left: -99999999px;
        top: -99999999px;
    }
    .login_text {
        width: 120px;
        padding: 20px;
    }
    .login_content {
        display: flex;
        .content_left {
            width: 240px;
            img {
                width: 240px;
                height: 100%;
                border-radius: 14px 0 0 14px;
            }
        }
        .content_right {
            flex-grow: 1;
            padding: 50px 30px;
            transition: 0.5s; /* 添加过渡效果，以改变 opacity 属性 */

            .content_text {
                margin-top: 20px;
                text-align: center;
            }

            .password_tooltip {
                margin-top: 74px;
            }
        }
        .login_btn {
            width: 100%;
            height: 44px;
            background-color: #eb5e28;
            border: none;
        }
        .tooltip {
            display: flex;
            justify-content: space-between;
            margin-top: 40px;
            p {
                color: #eb5e28;
            }
            p:hover {
                text-decoration: underline;
            }
        }
        .code_box {
            width: 100%;
            display: flex;
        }
        .pass_box {
            .copy_icon {
                position: absolute;
                right: 30px;
                top: 7px;
                font-size: 14px;
                color: #999;
            }
            .copy_icon:hover {
                color: #666;
            }
            .pass_tooltip {
                z-index: 99;
                position: absolute;
                top: 50px;
                left: 10px;
                background-color: #ffffff;
                border: 1px solid #c7c7c7;
                padding: 0 6px;
                font-size: 12px;
                border-radius: 4px;
                color: #999;
                i {
                    color: #11aa66;
                    font-weight: bold;
                }
                .cuowu {
                    font-size: 16px;
                    color: #f56c6c;
                }
            }
            .pass_tooltip::before {
                content: '';
                position: absolute;
                top: -12px;
                left: 5px;
                border: 6px solid #b8b8b8;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-top: 6px solid transparent;
            }
        }
        .code_btn {
            flex-grow: 1;
            border-color: #393a4b;
            font-size: 14px;
            height: 44px;
            border: none;
            background-color: #fff;
            border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
            box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
            margin-left: 14px;
        }
        .code_btn:hover {
            --el-button-hover-text-color: #eb5e28;
        }
        .register {
            flex-grow: 1;
            padding: 50px 30px;
            h3 {
                margin-bottom: 20px;
                text-align: center;
                color: #333;
                font-weight: 700;
                font-size: 18px;
                cursor: pointer;
            }
            .register_tooltip {
                margin-top: 26px;
            }
        }
    }
}
</style>
