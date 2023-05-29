<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <!-- logo -->
            <Logo></Logo>
            <!-- 面包屑 -->
            <div class="crumbs">
                <el-breadcrumb separator-icon="ArrowRight">
                    <!-- 面包动态展示路由名字与标题 -->
                    <el-breadcrumb-item
                        v-for="item in route.matched"
                        :key="item.path"
                        v-show="item.meta.title"
                        :to="item.path"
                    >
                        <!-- 面包屑展示匹配路由的标题 -->
                        <span>{{ $t(`menu.${item.meta.title}`) }}</span>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="tabbar_right">
            <Setting />
        </div>
    </div>
</template>

<script setup lang="ts">
import Setting from './setting/index.vue'
import Logo from '../logo/index.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
<script lang="ts">
export default {
    name: 'Tabbar',
}
</script>
<style scoped lang="scss">
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .tabbar_left {
        display: flex;
        align-items: center;
        margin-left: 20px;
    }

    .tabbar_right {
        display: flex;
        align-items: center;
    }
}

.crumbs {
    margin-left: 53px;
    position: relative;
    padding: 0 20px;
    min-width: 250px;
    span {
        font-size: 20px;
        font-weight: 700;
    }
}
.crumbs::before {
    position: absolute;
    display: inline-block;
    content: '';
    width: 2px;
    height: 40px;
    top: -50%;
    left: 0px;
    background: rgba(255, 110, 108, 1);
}
</style>
