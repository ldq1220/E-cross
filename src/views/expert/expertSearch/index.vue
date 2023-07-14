<template>
    <div class="big_box">
        <!-- banner -->
        <div class="banner">Banner</div>

        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="按达人搜" name="expert">
                <!-- 筛选搜索区 -->
                <expertScreen />
                <!--达人列表区  -->
                <expertList />
            </el-tab-pane>
            <el-tab-pane label="按商品搜" name="commodity">
                <productSearch />
            </el-tab-pane>
            <el-tab-pane label="按话题搜" name="top">
                <topicSerach />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import expertScreen from './components/expertScreen/index.vue'
import expertList from './components/expertList/index.vue'
import productSearch from './components/productSearch/index.vue'
import topicSerach from './components/topicSearch/index.vue'

// tabs 标签
const activeName = ref('expert')
const handleClick = (tab: { paneName: string }, _event: Event) => {
    activeName.value = tab.paneName
}
</script>

<style lang="scss">
.big_box {
    .el-tabs__nav-scroll {
        padding: 10px 0 0 0;
    }
    .el-tabs__item {
        padding: 0 5px;
        margin-right: 30px;
        font-size: 15px;
        font-weight: 550;
        color: rgba(0, 0, 0, 0.65);
    }
    .el-tabs__item.is-active {
        color: $base-theme-color;
        border-bottom: 3px solid $base-theme-color;
    }
    .el-tabs__active-bar.is-top {
        background-color: $base-theme-color;
    }
    .el-tabs__active-bar.is-top {
        background-color: transparent;
    }
    .el-tabs__item:hover {
        color: $base-theme-color;
    }
    .el-tabs__item:last-child {
        margin-right: 0;
    }
}
</style>

<style scoped lang="scss">
/* banner */
.banner {
    width: 100%;
    height: 75px;
    text-align: center;
    line-height: 75px;
    background-color: rgba(229, 229, 229, 1);
}
// .big_box {
// min-width: 1010px;
// }
</style>
