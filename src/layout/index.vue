<template>
    <div class="layout_container">
        <!-- 顶部导航 -->
        <div class="layout_tabbar">
            <Tabbar />
        </div>
        <div class="content">
            <!-- 左侧菜单 -->
            <div class="layout_slider">
                <!-- 展示菜单 -->
                <!-- 滚动组件 -->
                <el-scrollbar class="scrollbar">
                    <!-- 菜单组件-->
                    <!-- 菜单组件-->
                    <el-menu :default-active="route.path" background-color="#fff" text-color="#1F1235" :router="true">
                        <!--根据路由动态生成菜单-->
                        <Menu :menuList="menuList"></Menu>
                    </el-menu>
                </el-scrollbar>
            </div>
            <!-- 内容展示区域 -->
            <div class="layout_main">
                <keep-alive>
                    <Main></Main>
                </keep-alive>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import useUserStore from '@/store/modules/user.ts'
import { useRoute } from 'vue-router'

// 获取路由表信息  并传送给 菜单组件
const userStore = useUserStore()
const menuList = userStore.menuRoutes

const route = useRoute()
</script>

<style lang="scss">
.layout_container {
    .el-menu-item.is-active {
        color: #fff;
        background-color: $base-theme-color;
    }
    .el-menu-item:hover {
        background-color: #f0f0f0;
    }
}
</style>
<style scoped lang="scss">
.layout_container {
    width: 100%;
    margin-top: 10px;

    .layout_tabbar {
        position: fixed;
        display: flex;
        width: 100%;
        // height: $base-tabbar-height;
        padding: 40px 0 30px 0;
        top: -10px;
        left: 0;
        transition: all 0.3s;
        background-color: #fff;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
    }
    .content {
        position: fixed;
        z-index: -1;
        height: calc(100vh - $base-tabbar-height);
        display: flex;
        justify-content: space-between;
        margin-top: calc($base-tabbar-height);
        .layout_slider {
            width: $base-menu-width;
            height: calc(100vh - $base-tabbar-height);
            transition: all 0.3s;
            .scrollbar {
                width: 100%;
                background-color: #fff;
                height: calc(100vh - $base-tabbar-height);
                .el-menu {
                    border-right: none;
                }
            }
        }
        .layout_main {
            width: calc(100vw - $base-menu-width);
            height: calc(100vh - $base-tabbar-height - 8px);
            transition: all 0.3s;
            padding: 0 30px 20px 30px;
            overflow: auto;
        }

        //滚动条
        // .layout_main::-webkit-scrollbar {
        //     width: 8px;
        //     height: 8px;
        // }

        // .layout_main::-webkit-scrollbar-track {
        //     background: rgb(239, 239, 239);
        //     border-radius: 2px;
        // }

        // .layout_main::-webkit-scrollbar-thumb {
        //     background: #bfbfbf;
        //     border-radius: 10px;
        // }

        // .layout_main::-webkit-scrollbar-thumb:hover {
        //     background: #bfbfbf;
        // }

        // .layout_main::-webkit-scrollbar-corner {
        //     background: #bfbfbf;
        // }
    }
}
</style>
