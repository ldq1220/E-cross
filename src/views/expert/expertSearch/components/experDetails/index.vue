<template>
    <div class="expert_details">
        <el-tabs class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane>
                <template #label>
                    <span class="custom-tabs-label">
                        <i class="iconfont icon-24gf-playCircle tab_icon"></i>
                        <span>内容分析</span>
                    </span>
                </template>
                内容分析
            </el-tab-pane>

            <el-tab-pane>
                <template #label>
                    <span class="custom-tabs-label">
                        <i class="iconfont icon-haopingxiaolian tab_icon"></i>
                        <span>粉丝分析</span>
                    </span>
                </template>
                粉丝分析
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeName = ref('first')

const handleClick = (tab: any, event: Event) => {
    console.log(tab, event)
}
</script>

<style lang="scss">
.expert_details {
    .el-tabs__item.is-active {
        color: rgba(235, 94, 40, 1);
    }
    .el-tabs__active-bar.is-top{
        background-color: rgba(235, 94, 40, 1);
    }
    .el-tabs__item:hover{
        color: rgba(235, 94, 40, 1);
    }
}
</style>
<style scoped lang="scss">
.expert_details {
    .tab_icon {
        font-size: 12px;
        margin-right: 3px;
    }
}
</style>
