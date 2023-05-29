<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider">
            <!-- 展示菜单 -->
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollbar">
                <!-- 菜单组件-->
                <!-- 菜单组件-->
                <el-menu
                    :default-active="route.path"
                    background-color="#fff"
                    text-color="#1F1235"
                    :router="true"
                >
                    <!--根据路由动态生成菜单-->
                    <Menu :menuList="menuList"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar">
            <Tabbar />
        </div>
        <!-- 内容展示区域 -->
        <div class="layout_main">
            <Main></Main>
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
        background-color: #eb5e28;
    }
    .el-menu-item:hover{
        background-color: #f0f0f0;
    }
}
</style>
<style scoped lang="scss">
.layout_container {
    width: 100%;

    .layout_slider {
        width: $base-menu-width;
        height: calc(100vh - $base-tabbar-height);
        transition: all 0.3s;
        margin-top: $base-tabbar-height;
        .scrollbar {
            width: 100%;
            background-color: #fff;
            height: calc(100vh - $base-tabbar-height);
            .el-menu {
                border-right: none;
            }
        }
    }

    .layout_tabbar {
        position: fixed;
        display: flex;
        width: 100%;
        // height: $base-tabbar-height;
        padding: 47px 0 30px 0;
        top: -10px;
        left: 0;
        transition: all 0.3s;
        background-color: #fff;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width - 27px);
        height: calc(100vh - $base-tabbar-height);
        left: $base-menu-width;
        top: $base-tabbar-height;
        padding: 20px 0 20px 20px;
        overflow: auto;
        transition: all 0.3s;
    }
}
</style>
