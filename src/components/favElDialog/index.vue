<template>
    <div class="fav_dialog">
        <el-dialog v-model="flag" title="添加到收藏资源" center align-center :before-close="closeDialog" width="600">
            <el-radio-group v-model="radio">
                <div class="radio_item">
                    <el-radio :label="3">
                        tiktok网红
                        <span class="collect_num">2</span>
                    </el-radio>
                </div>
                <div class="radio_item">
                    <el-radio :label="6">
                        小店网红
                        <span class="collect_num">3</span>
                    </el-radio>
                </div>
                <div class="radio_item">
                    <el-radio :label="9">
                        自定义收藏夹
                        <span class="collect_num">0</span>
                    </el-radio>
                </div>
            </el-radio-group>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeDialog" plain>取消</el-button>
                    <el-button type="primary" class="confirm_btn" @click="submitCollect">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'

const props = defineProps(['dialogFormVisible'])
const $emit = defineEmits(['dialogClose', 'submitCollect'])

const flag = ref(false)

watch(
    () => props.dialogFormVisible,
    () => {
        props.dialogFormVisible ? (flag.value = true) : (flag.value = false)
    },
)

const radio = ref(3) // 对话框单选 绑定数据

const closeDialog = () => {
    $emit('dialogClose')
}

// 点击对话框 确定收藏
const submitCollect = () => {
    $emit('submitCollect')
}
</script>

<style lang="scss">
.fav_dialog {
    // 收藏对话框 单选框
    .el-radio-group {
        display: block;
        .el-radio__label {
            display: flex;
            flex-grow: 1;
            justify-content: space-between;
        }
    }
    .el-radio__input.is-checked .el-radio__inner {
        border-color: $base-theme-color;
        background: $base-theme-color;
    }
    .el-radio__input.is-checked + .el-radio__label {
        color: $base-theme-color;
    }
    .el-dialog__headerbtn:hover .el-dialog__close {
        color: $base-theme-color;
    }
    .el-dialog__headerbtn {
        top: 0;
    }
    .el-button {
        padding: 0 22px;
    }
    .confirm_btn {
        background-color: $base-theme-color;
        border-color: $base-theme-color;
    }
    header {
        border-bottom: 1px solid rgb(229, 229, 229);
        margin-right: 0;
    }
    footer {
        border-top: 1px solid rgb(229, 229, 229);
    }
}
</style>
<style scoped lang="scss">
// 收藏对话框
.radio_item {
    width: 100%;
    label {
        display: flex;
    }
    .collect_num {
        width: 30px;
        color: #050505;
        z-index: 999;
    }
}
</style>

<!-- 使用：
<template>
    <div>
        <el-button @click="fav">收藏</el-button>
        <favElDialog :dialogFormVisible="dialogFormVisible" @dialogClose="dialogCloseDef" @submitCollect="dialogSuccessDef"></favElDialog>
    </div>
</template>

<script setup lang="ts">
import favElDialog from '@/components/favElDialog/index.vue'
import { ref } from 'vue'

const dialogFormVisible = ref(false)

const fav = () => {
    dialogFormVisible.value = true
}

// 关闭弹窗
const dialogCloseDef = () => {
    dialogFormVisible.value = false
}
// 确定
const dialogSuccessDef = () => {
    ......
    dialogFormVisible.value = false
}
</script>

<style scoped lang="scss"></style> -->
