//对外暴露配置路由(常量路由):全部用户都可以访问到的路由
export const constantRoute = [
    {
        //登录成功以后展示数据的路由
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'layout',
        meta: {
            title: '',
            hidden: false,
            icon: '',
        },
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    title: 'home',
                    hidden: false,
                    icon: 'HomeFilled',
                },
            },
        ],
    },
    {
        //404
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404',
        meta: {
            title: '404',
            hidden: true,
            icon: 'DocumentDelete',
        },
    },
]


export const asnycRoute = [
    {
        path: '/expert',
        component: () => import('@/layout/index.vue'),
        name: 'Expert',
        meta: {
            title: 'expert',
            icon: 'Lock',
            isShow: true,
        },
        redirect: '/expert/search',
        children: [
            {
                path: '/expert/search',
                component: () => import('@/views/expert/expertSearch/index.vue'),
                name: 'Search',
                meta: {
                    title: 'expertSearch',
                    icon: 'User',
                },
            },
            {
                path: '/expert/mate',
                component: () => import('@/views/expert/expertMate/index.vue'),
                name: 'Mate',
                meta: {
                    title: 'expertMate',
                    icon: 'UserFilled',
                },
            },
            {
                path: '/expert/details',
                component: () => import('@/views/expert/expertSearch/components/experDetails/index.vue'),
                name: 'Details',
                meta: {
                    title: 'expertDetails',
                    icon: 'UserFilled',
                    hidden: true,
                },
            },
            {
                path: '/expert/product-details',
                component: () => import('@/views/expert/expertSearch/components/productDetails/index.vue'),
                name: 'productDetails',
                meta: {
                    title: 'productDetails',
                    icon: 'UserFilled',
                    hidden: true,
                },
            },
            {
                path: '/topicExpertList',
                component: () => import('@/views/expert/expertSearch/components/topicSearch/components/topicExpertList.vue'),
                name: 'topicExpertList',
                meta: {
                    title: 'topicExpertList',
                    icon: 'UserFilled',
                    hidden: true,
                },
            },
        ],
    },
    {
        path: '/expertAdmin',
        component: () => import('@/layout/index.vue'),
        name: 'ExpertAdmin',
        meta: {
            title: 'expertAdmin',
            icon: 'Lock',
        },
        redirect: '/expert/admin',
        children: [
            {
                path: '/expert/admin',
                component: () => import('@/views/expertAdmin/index.vue'),
                name: 'expertAdmin',
                meta: {
                    title: 'expertAdmin',
                    icon: 'User',
                },
            },
            {
                path: '/expert/email',
                component: () => import('@/views/expertAdmin/sendEmail/index.vue'),
                name: 'expertEmail',
                meta: {
                    title: 'expertEmail',
                    icon: 'User',
                },
            },
        ],
    },
]

//任意路由
export const anyRoute = {
    // //任意路由
    // path: '/:pathMatch(.*)*',
    path: '/404',
    redirect: '/404',
    name: 'Any',
    meta: {
        title: '任意路由',
        hidden: true,
        icon: 'DataLine',
    },
}
