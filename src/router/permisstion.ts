// 路由鉴权
import router from './index'
import goScrollTop from '@/utils/goScrollTop'

// 引入进度条插件
// import nprogress from 'nprogress'
// 引入进度条样式
// import 'nprogress/nprogress.css'
// import store from '@/store/index' // 引入大仓库  用于小仓库的创建
// import useUserStore from '@/store/modules/user'

// const userStore = useUserStore(store)

// 全局前置守卫
router.beforeEach(async (_to, _from, next) => {
    goScrollTop()
    next()

    // nprogress.start() // 开始进度条
    //     const token = userStore.token
    //     const userName = userStore.userName

    //     // 判断token是否存在 已登录
    //     if (token) {
    //         // 进入 login 页面
    //         if (to.path == '/login') {
    //             next('/')
    //         } else {
    //             // 进入其他页面
    //             // 有用户信息
    //             if (userName) {
    //                 next()
    //             } else {
    //                 try {
    //                     await userStore.userInfo() // 获取用户信息
    //                     next()
    //                 } catch (error) {
    //                     // 获取用户信息失败  token 过期或者被更改
    //                     // 清除用户信息并跳转到登录页面
    //                     await userStore.userLogout()
    //                     next({ path: '/login', query: { redirect: to.path } })
    //                 }
    //             }
    //         }
    //     } else {
    //         //用户未登录判断
    //         if (to.path == '/login') {
    //             next()
    //         } else {
    //             next('/login')
    //         }
    //     }
})

// 全局后置守卫
router.afterEach(() => {
    // window.scrollTo(0,0);
    // nprogress.done() // 关闭进度条
    // document.title = '甄选—' + to.meta.title // 设置标题栏中的文本
    // document.title = '甄选—' + $t(`menu.${to.meta.title}`) // 设置标题栏中的文本
})
