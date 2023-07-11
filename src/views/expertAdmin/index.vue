<template>
    <div class="expert_admin">
        <!-- 达人跟进状态  echarts 图表 -->
        <expertAdminEcharts />

        <!-- 按钮组 -->
        <div class="btns">
            <div></div>
            <div>
                <el-button type="primary " class="btn add_expert" @click="dialogAddVisible = true">添加达人</el-button>
                <el-button class="btn grouping_management" plain>分组管理</el-button>
                <el-button class="btn batch_remove" plain>批量删除</el-button>
            </div>
        </div>

        <!-- 筛选区域 -->
        <div class="screen_condition">
            <!-- 联系状态 -->
            <div class="condition_box">
                <span class="condition_label">联系状态</span>
                <span class="condition_item" v-for="item in screenData.contactData" :key="item.id" :class="item.isactive ? 'active' : ''" @click="getScreen(screenData.contactData, item.id)">
                    {{ item.title }}
                </span>
            </div>
            <!-- 合作状态 -->
            <div class="condition_box">
                <span class="condition_label">合作状态</span>
                <span class="condition_item" v-for="item in screenData.cooperationData" :key="item.id" :class="item.isactive ? 'active' : ''" @click="getScreen(screenData.cooperationData, item.id)">
                    {{ item.title }}
                </span>
            </div>
            <!-- 达人分组 -->
            <div class="condition_box">
                <span class="condition_label">达人分组</span>
                <span class="condition_item" v-for="item in screenData.expertsData" :key="item.id" :class="item.isactive ? 'active' : ''" @click="getScreen(screenData.expertsData, item.id)">
                    {{ item.title }}
                </span>
            </div>
            <!-- 提醒过滤 -->
            <div class="condition_box">
                <span class="condition_label">提醒过滤</span>
                <span
                    class="condition_item"
                    v-for="item in screenData.tooltipFilterData"
                    :key="item.id"
                    :class="item.isactive ? 'active' : ''"
                    @click="getScreen(screenData.tooltipFilterData, item.id)"
                >
                    {{ item.title }}
                </span>
            </div>

            <!-- 按钮 -->
            <div class="btn">
                <el-button class="btn_clear" @click="clearSelected" plain>清除</el-button>
                <el-button type="primary" icon="Filter">筛选</el-button>
            </div>
        </div>

        <!-- 列表区域 -->
        <el-table :data="tableData" style="width: 100%" class="tabel_list">
            <el-table-column type="selection" width="55" />

            <el-table-column property="head" width="80">
                <template #default="scope">
                    <img :src="scope.row.head" alt="" class="expert_head" />
                </template>
            </el-table-column>

            <el-table-column property="name" label="昵称" width="130" header-align="center">
                <template #default="scope">
                    <span class="expert_name">{{ scope.row.name }}</span>
                </template>
            </el-table-column>

            <el-table-column property="area" label="地区" width="90" header-align="center">
                <template #default="scope">
                    <img src="/src/assets/images/guoqi.png" alt="" class="expert_guoqi" />
                    <span class="expert_area">{{ scope.row.area }}</span>
                </template>
            </el-table-column>

            <el-table-column property="type" label="类型" width="90" header-align="center">
                <template #default="scope">
                    <el-tag type="danger">{{ scope.row.type }}</el-tag>
                </template>
            </el-table-column>

            <el-table-column property="grouping" label="分组" width="80" />

            <el-table-column label="联系状态" width="80">
                <template #default="scope">
                    <el-tag type="warning">{{ scope.row.relation }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="合作状态" width="130" header-align="center">
                <template #default="scope">
                    <el-select v-model="groupingValue" clearable placeholder="未合作" class="groupingSelect">
                        <el-option v-for="item in scope.row.options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column property="num" label="推广数量" width="80" align="center" />
            <el-table-column property="remark" label="备注" show-overflow-tooltip align="center" />
            <el-table-column property="time" label="最新维护日期" width="160" />

            <el-table-column property="newEmail" label="" width="50">
                <template #default="scope">
                    <el-tooltip placement="top">
                        <template #content>收到1封kajh新邮件！点击查看</template>
                        <span class="iconfont icon-jinggao frequencyIcon" v-show="scope.row.newEmail"></span>
                    </el-tooltip>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="90" header-align="center">
                <template #default="">
                    <div class="op_icon">
                        <i class="iconfont icon-bianji operation_icon" @click="updataExpert"></i>
                        <i class="iconfont icon-shanchu operation_icon"></i>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <!-- 编辑达人 对话框 -->
        <div class="dialog">
            <el-dialog v-model="dialogFormVisible" title="编辑达人">
                <el-form :inline="true" :model="form" label-position="top">
                    <!-- 左侧 -->
                    <div class="dialog_left">
                        <img src="/src/assets//images//head.png" alt="" />
                        <span>Miss.BigLiu</span>

                        <el-form-item label="合作状态" class="" style="margin-top: 20px">
                            <el-select v-model="form.status" style="width: 160px">
                                <el-option label="已合作" :value="0" />
                                <el-option label="未合作" :value="1" />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="付款信息" class="">
                            <el-input v-model="form.paymentInfo" :rows="4" type="textarea" placeholder="请输入付款信息" />
                        </el-form-item>

                        <el-form-item label="其他联系方式" class="">
                            <el-input v-model="form.contact" :rows="4" type="textarea" placeholder="请输入其他联系方式" />
                        </el-form-item>

                        <el-upload v-model="form.fileList" class="upload-demo" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple :limit="3">
                            <el-button type="">
                                <el-icon><UploadFilled /></el-icon>
                                <p style="margin-left: 10px">上传合同</p>
                            </el-button>
                            <template #tip>
                                <div class="el-upload__tip">支持扩展名：.rar .zip .doc .docx .pdf .jpg...</div>
                            </template>
                        </el-upload>
                    </div>
                    <!-- 右侧 -->
                    <div class="dialog_right">
                        <el-form-item label="邮箱" class="">
                            <el-input v-model="form.email" autocomplete="off" placeholder="请输入邮箱" style="width: 200px" />
                        </el-form-item>

                        <el-form-item label="合作报价" class="">
                            <el-input v-model="form.offer" placeholder="请输入内容" style="width: 200px">
                                <template #prepend>$</template>
                            </el-input>
                        </el-form-item>

                        <el-form-item label="收货信息" class="">
                            <el-input v-model="form.receiving" :rows="4" type="textarea" placeholder="请输入收货信息" />
                        </el-form-item>

                        <el-form-item label="备注" class="">
                            <el-input v-model="form.remark" :rows="4" type="textarea" placeholder="请输入备注" />
                        </el-form-item>
                    </div>
                </el-form>

                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取消</el-button>
                        <el-button type="primary" @click="save" class="save">保存</el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
        <!-- 添加达人 对话框 -->
        <div class="addExpert_dialog">
            <el-dialog v-model="dialogAddVisible" title="添加达人" align-center>
                <el-tabs v-model="activeName" class="demo_tabs" @tab-click="handleClick">
                    <el-tab-pane label="手动添加" name="manual">
                        <el-form :model="addExpertForm" label-position="top" :rules="rules">
                            <el-form-item label="达人主页" prop="homePage" class="homePage">
                                <el-input v-model="addExpertForm.homePage" autocomplete="off" placeholder="请输入如https://www.tiktok.com/@1freeman1223" />
                            </el-form-item>

                            <div style="display: flex; justify-content: space-between">
                                <el-form-item label="合作状态" prop="cooperationState" class="" style="width: 228px; display: inline-block">
                                    <el-select v-model="addExpertForm.cooperationState" clearable placeholder="未合作" style="width: 100%">
                                        <el-option v-for="item in addExpertForm.cooperationStateOption" :key="item.value" :label="item.label" :value="item.value" />
                                    </el-select>
                                </el-form-item>

                                <el-form-item label="邮箱" prop="cooperationState" class="" style="width: 200px; display: inline-block">
                                    <el-input v-model="addExpertForm.email" placeholder="请输入邮箱" />
                                </el-form-item>
                            </div>

                            <el-form-item label="分组" prop="grouping" class="" style="width: 228px; display: inline-block">
                                <el-select v-model="addExpertForm.cooperationGrouping" clearable placeholder="默认" style="width: 100%">
                                    <el-option v-for="item in addExpertForm.cooperationGroupingOption" :key="item.value" :label="item.label" :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="导入添加" name="toLead" class="toLead">
                        <el-form :model="addExpertForm" label-position="top" :rules="rules">
                            <el-upload v-model="form.fileList" class="upload-demo" limit="10" action="" multiple>
                                <el-button type="">
                                    <el-icon><UploadFilled /></el-icon>
                                    <p style="margin-left: 10px">上传excel</p>
                                </el-button>
                                <template #tip>
                                    <div class="el-upload__tip">
                                        <p style="font-size: 12px; color: rgba(255, 141, 26, 0.65); margin: 12px 0 20px 0">下载导入excel模版</p>
                                        <span style="font-size: 12px; color: rgba(166, 166, 166, 0.65)">注意：请严格按excel模板来整理资料并进行导入。</span>
                                    </div>
                                </template>
                            </el-upload>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>

                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogAddVisible = false">取消</el-button>
                        <el-button type="primary" @click="save" class="save">保存</el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script setup lang="ts">
import expertAdminEcharts from './expertAdminEcharts.vue'
import { ref, reactive, onMounted } from 'vue'
import { reqFav_Influencers } from '@/api/expert/expertAdmin'

onMounted(() => {
    reqFav_Influencers(2)
})

// 筛选条件数据
const screenData: any = reactive({
    contactData: [
        { id: 0, title: '不限', isactive: false },
        { id: 1, title: '已联系', isactive: true },
        { id: 2, title: '未联系', isactive: false },
        { id: 3, title: '已查看邮件', isactive: false },
        { id: 4, title: '达人已回复', isactive: false },
        { id: 5, title: '达人未回复', isactive: false },
    ],
    cooperationData: [
        { id: 20, title: '不限', isactive: false },
        { id: 21, title: '未合作', isactive: false },
        { id: 22, title: '已寄样', isactive: true },
        { id: 23, title: '已上线合作视频', isactive: false },
    ],
    expertsData: [
        { id: 24, title: '默认', isactive: true },
        { id: 25, title: '外部导入', isactive: false },
        { id: 26, title: '超级达人组', isactive: false },
    ],
    tooltipFilterData: [
        { id: 27, title: '不过滤', isactive: true },
        { id: 28, title: '达人回复提醒（3）', isactive: false },
        { id: 29, title: '物流提醒（3）', isactive: false },
        { id: 30, title: '跟进提醒（3）', isactive: false },
    ],
})
//点击标签 获取已选内容
const getScreen = (data: any, id: number) => {
    data.forEach((item: { id: number; isactive: boolean; title: any }) => {
        item.id == id ? (item.isactive = true) : (item.isactive = false)
    })
}
// 清除按钮方法  清除所有已选择标签
const clearSelected = () => {
    for (const key in screenData) {
        screenData[key].forEach((item: any) => {
            item.isactive = false
        })
    }
}

// 添加达人 对话框
const dialogAddVisible = ref(false)
const activeName = ref('manual')
const handleClick = (tab: any) => {
    activeName.value = tab.props.name
}
const addExpertForm = reactive({
    homePage: '',
    cooperationState: '',
    cooperationStateOption: [
        {
            label: '未合作',
            value: '0',
        },
        {
            label: '已寄样',
            value: '1',
        },
        {
            label: '已上线合作视频',
            value: '2',
        },
    ],
    email: '',
    cooperationGrouping: '',
    cooperationGroupingOption: [
        {
            label: '默认',
            value: '0',
        },
    ],
})
const rules = reactive({
    homePage: [{ required: true, message: '达人主页不能为空', trigger: 'blur' }],
})

// 列表数据
const groupingValue = ref('')
const tableData = ref([
    {
        id: 0,
        head: '/src/assets/images/head.png',
        name: 'Miss.BigLiu',
        area: '美国',
        type: 'beauty',
        grouping: '默认',
        relation: '已联系',
        num: 123,
        options: [
            {
                value: '0',
                label: '达人分组',
            },
        ],
        remark: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦',
        time: '2023-06-01 12:20',
    },
    {
        id: 0,
        head: '/src/assets/images/head.png',
        name: 'Miss.BigLiu',
        area: '美国',
        type: 'beauty',
        grouping: '默认',
        relation: '已联系',
        num: 123,
        options: [
            {
                value: '0',
                label: '达人分组',
            },
        ],
        remark: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦',
        time: '2023-06-01 12:20',
    },
    {
        id: 0,
        head: '/src/assets/images/head.png',
        name: 'Miss.BigLiu',
        area: '美国',
        type: 'beauty',
        grouping: '默认',
        relation: '已联系',
        num: 123,
        options: [
            {
                value: '0',
                label: '达人分组',
            },
        ],
        remark: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦',
        time: '2023-06-01 12:20',
    },
    {
        id: 0,
        head: '/src/assets/images/head.png',
        name: 'Miss.BigLiu',
        area: '美国',
        type: 'beauty',
        grouping: '默认',
        relation: '已联系',
        num: 123,
        options: [
            {
                value: '0',
                label: '达人分组',
            },
        ],
        remark: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦',
        time: '2023-06-01 12:20',
    },
    {
        id: 0,
        head: '/src/assets/images/head.png',
        name: 'Miss.BigLiu',
        area: '美国',
        type: 'beauty',
        grouping: '默认',
        relation: '已联系',
        num: 123,
        options: [
            {
                value: '0',
                label: '达人分组',
            },
        ],
        remark: '啦啦啦啦啦啦啦啦啦啦啦',
        time: '2023-06-01 12:20',
        newEmail: true,
    },
])

// 控制编辑达人 对话框 显示与隐藏
const dialogFormVisible = ref(false)
const form = reactive({
    email: '',
    status: 1,
    paymentInfo: '',
    contact: '',
    offer: '',
    receiving: '',
    remark: '',
    fileList: [],
})

// 编辑达人按钮
const updataExpert = () => {
    dialogFormVisible.value = true
}
// 编辑达人保存
const save = () => {
    dialogFormVisible.value = false
}
</script>

<style lang="scss">
.expert_admin {
    .grouping_management,
    .batch_remove {
        --border-color: #d33;
    }
    .el-input__wrapper {
        width: 100px;
        font-size: 12px;
    }
    .dialog,
    .addExpert_dialog {
        .dialog-footer {
            .el-button {
                padding: 0 23px;
                border-radius: 2px;
            }
            .save {
                background-color: $base-theme-color;
                border: none;
            }
        }
    }
    // 添加达人对话框
    .addExpert_dialog {
        .el-dialog {
            width: 562px;
        }
        .el-dialog__header {
            margin-right: 0;
            padding-left: 31px;
            border-bottom: 1px solid rgba(229, 229, 229, 1);
        }
        .el-dialog__body {
            padding: 0 37px 30px 31px;
        }
        .el-dialog__footer {
            border-top: 1px solid rgba(229, 229, 229, 1);
        }
        .el-form-item {
            margin-top: 8px;
            .el-form-item__label {
                color: rgb(14, 13, 13);
            }
        }
        // tabs 样式
        .el-tabs__nav-scroll {
            padding: 16px 0 0 0;
        }
        .el-tabs__item {
            padding: 0;
            margin-right: 30px;
            font-size: 14px;
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
        .el-tabs__item:hover {
            color: $base-theme-color;
        }
        .el-tabs__item:last-child {
            margin-right: 0;
        }
        .el-tab-pane {
            width: 100%;
        }
        .el-row {
            justify-content: space-between;
        }
        .el-tabs__nav-wrap::after {
            background-color: transparent;
        }

        .homePage {
            label {
                position: relative;
            }
        }

        .toLead {
            .upload-demo {
                padding: 14px 0 0 0;
            }
        }
    }
}
</style>
<style scoped lang="scss">
.expert_admin {
    // 按钮组
    .btns {
        display: flex;
        justify-content: space-between;
        margin: 12px 0;
        .btn {
            padding: 19px 26px;
        }
        .add_expert {
            background-color: $base-theme-color;
            color: #fff;
            border: none;
        }
        .grouping_management {
            color: rgba(56, 56, 56, 1);
        }
        .batch_remove {
            color: rgba(212, 48, 48, 1);
        }
        .add_expert:hover,
        .grouping_management:hover,
        .batch_remove:hover {
            border-color: #fff;
            box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.3);
        }
    }

    // 筛选区域
    .screen_condition {
        padding: 20px;
        background-color: #fff;
        position: relative;
        .condition_box {
            font-size: 14px;
            font-weight: 400;
            line-height: 36px;
            margin: 18px 0;
            .condition_label {
                display: inline-block;
                cursor: pointer;
                width: 60px;
                height: 36px;
                color: rgba(128, 128, 128, 1);
                margin-right: 16px;
            }
            .condition_item {
                display: inline-block;
                margin-right: 8px;
                padding: 0 18px;
                cursor: pointer;
                // width: 66px;
                text-align: center;
                border-radius: 5px;
                color: rgba(0, 0, 0, 1);
            }
            .condition_item.active {
                background: rgba(247, 247, 247, 1);
                color: rgba(255, 110, 108, 1);
            }
            .popularizeSelect {
                width: 160px;
                margin-left: 20px;
            }
        }
        .btn {
            position: absolute;
            bottom: 6px;
            right: 30px;
            .btn_clear {
                padding: 0 25px;
            }
        }
    }

    // 列表区域
    .tabel_list {
        margin-top: 20px;
        .expert_head {
            width: 56px;
            height: 56px;
        }
        .expert_name {
            font-size: 18px;
            font-weight: 700;
            color: rgba(56, 56, 56, 1);
        }
        .expert_guoqi {
            vertical-align: middle;
            margin-right: 2px;
        }
        .frequencyIcon {
            font-size: 20px;
            color: $base-theme-color;
        }
        .op_icon {
            display: flex;
            justify-content: space-between;
        }
        .operation_icon {
            font-size: 20px;
            font-weight: bold;
        }
        .operation_icon:hover {
            color: $base-theme-color;
            cursor: pointer;
        }
    }

    // 编辑对话框
    .dialog {
        .dialog_left {
            display: inline-block;
            width: 50%;
            img {
                width: 60px;
                height: 60px;
                vertical-align: middle;
            }
            span {
                font-size: 16px;
                font-weight: 700;
                color: rgba(0, 0, 0, 1);
                margin-left: 20px;
            }
        }
        .dialog_right {
            flex-grow: 1;
        }
    }
}
</style>
