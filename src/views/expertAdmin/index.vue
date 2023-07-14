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

            <el-table-column width="80">
                <template #default="scope">
                    <img :src="scope.row.influencer.avatarKey" alt="" class="expert_head" />
                </template>
            </el-table-column>

            <el-table-column label="昵称" header-align="center">
                <template #default="scope">
                    <span class="expert_name">{{ scope.row.influencer.nickName }}</span>
                </template>
            </el-table-column>

            <el-table-column property="area" label="地区" min-width="115" align="center">
                <template #default="scope">
                    <i class="fi" :class="'fi-' + scope.row.influencer.countryCode.toLowerCase()" style="margin-right: 14px"></i>
                    <span class="expert_area">{{ getCountryCodeName(scope.row.influencer.countryCode) }}</span>
                </template>
            </el-table-column>

            <el-table-column property="type" label="创作类型" header-align="center" align="center" min-width="200">
                <template #default="scope">
                    <el-tag style="margin-right: 4px" type="danger" v-for="(item, index) in getLabelsFromValues(scope.row.influencer.topics, systemStore.creativeTypes)" :key="index">
                        {{ item }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column property="grouping" label="分组" align="center" />

            <el-table-column label="合作状态" width="130" header-align="center">
                <template #default="scope">
                    <el-select v-model="scope.row.cooperationStatus" placeholder="合作状态" class="groupingSelect">
                        <el-option label="未合作" :value="0" />
                        <el-option label="已寄样" :value="1" />
                        <el-option label="已上线合作视频" :value="2" />
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column property="num" label="推广数量" align="center" />
            <el-table-column property="remark" label="备注" show-overflow-tooltip align="center" />
            <el-table-column label="最新维护日期" min-width="150" align="center">
                <template #default="scope">
                    {{ dayjs.unix(scope.row.updatedAt).format('YYYY-MM-DD HH:mm') }}
                </template>
            </el-table-column>

            <el-table-column property="newEmail" label="" width="50">
                <template #default="scope">
                    <el-tooltip placement="top">
                        <template #content>收到1封kajh新邮件！点击查看</template>
                        <span class="iconfont icon-jinggao frequencyIcon" v-show="scope.row.newEmail"></span>
                    </el-tooltip>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="90" header-align="center">
                <template #default="scope">
                    <div class="op_icon">
                        <i class="iconfont icon-bianji operation_icon" @click="updataExpert(scope.row.id)"></i>
                        <i class="iconfont icon-shanchu operation_icon"></i>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <!-- 编辑达人 对话框 -->
        <div class="dialog">
            <el-dialog v-model="dialogFormVisible" title="编辑达人" @close="updateDialogClose">
                <el-form :inline="true" :model="form" label-position="top" ref="emailDom" :rules="rulesUpdate">
                    <!-- 左侧 -->
                    <div class="dialog_left">
                        <img :src="form.influencer.avatarKey" alt="" />
                        <span>{{ form.influencer.nickName }}</span>

                        <el-form-item label="合作状态" class="" style="margin-top: 20px">
                            <el-select v-model="form.cooperationStatus" style="width: 160px" placeholder="请选择合作状态">
                                <el-option label="未合作" :value="0" />
                                <el-option label="已寄样" :value="1" />
                                <el-option label="已上线合作视频" :value="2" />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="付款信息" class="">
                            <el-input v-model="form.paymentInfo" :rows="4" type="textarea" placeholder="请输入付款信息" />
                        </el-form-item>

                        <el-form-item label="其他联系方式" class="">
                            <el-input v-model="form.contactInfo" :rows="4" type="textarea" placeholder="请输入其他联系方式" />
                        </el-form-item>

                        <el-upload v-model:file-list="fileList" class="upload-demo" :http-request="uploadContract" multiple ref="upload" :limit="1" :on-exceed="handleExceed" :on-remove="removeFile">
                            <el-button type="">
                                <el-icon><UploadFilled /></el-icon>
                                <p style="margin-left: 10px">上传合同</p>
                            </el-button>
                            <template #tip>
                                <div class="el-upload__tip">支持扩展名：.rar .zip .doc .docx .pdf .jpg...</div>
                            </template>
                        </el-upload>

                        <a :href="form.contractUrl" target="_blank" class="look_pact" v-show="form.contractUrl">
                            <i class="iconfont icon-neirong"></i>
                            查看合同
                        </a>
                    </div>
                    <!-- 右侧 -->
                    <div class="dialog_right">
                        <el-form-item label="邮箱" class="" prop="email">
                            <el-input v-model="form.email" autocomplete="off" placeholder="请输入邮箱" style="width: 200px" />
                        </el-form-item>

                        <el-form-item label="合作报价" class="" style="min-width: 340px">
                            <el-input v-model.number="form.cooperationOffer1" placeholder="请输入内容" style="width: 45%">
                                <template #prepend>$</template>
                            </el-input>
                            <span style="padding: 0 10px">至</span>
                            <el-input v-model.number="form.cooperationOffer2" placeholder="请输入内容" style="width: 45%">
                                <template #prepend>$</template>
                            </el-input>
                        </el-form-item>

                        <el-form-item label="收货信息" class="">
                            <el-input v-model="form.shippingInfo" :rows="4" type="textarea" placeholder="请输入收货信息" />
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
import { getCountryCodeName, getLabelsFromValues } from '@/utils/allDict'
import { reqGetFavInfluencers, reqGetOssSigned, reqFavInfluencers } from '@/api/expert/expertInfo'
import useSystemStore from '@/store/modules/system'
import dayjs from 'dayjs'
import axios from 'axios'
import { ElMessage, genFileId } from 'element-plus'
// @ts-ignore
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

const systemStore = useSystemStore()

onMounted(() => {
    getFavInfluencersList()
})

// 列表数据
const tableData = ref()
// 获取列表
const getFavInfluencersList = async () => {
    let res: any = await reqFav_Influencers()
    if (res.code === '00000') {
        tableData.value = res.result
    }
}

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

// 控制编辑达人 对话框 显示与隐藏
const dialogFormVisible = ref(false)
const emailDom = ref()
const fileData = ref()
const signedUrl = ref()
const favCateId = ref()
// 上传合同
const uploadContract = (data: any) => {
    fileData.value = data.file
}
const form: any = reactive({
    cooperationStatus: undefined,
    email: undefined,
    cooperationOffer1: undefined,
    cooperationOffer2: undefined,
    paymentInfo: undefined,
    shippingInfo: undefined,
    contactInfo: undefined,
    remark: undefined,
    contractKey: undefined,
    contractUrl: undefined,
    influencer: {
        avatarKey: undefined,
        nickName: undefined,
    },
})
// @ts-ignore
const fileList = ref<UploadUserFile[]>([])
// @ts-ignore
const upload = ref<UploadInstance>()
// @ts-ignore
const handleExceed: UploadProps['onExceed'] = (files: any[]) => {
    fileData.value = files[0]
    upload.value!.clearFiles()
    // @ts-ignore
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
}
const updateDialogClose = () => {
    upload.value.clearFiles()
}
const removeFile = () => {
    upload.value.clearFiles()
    fileData.value = undefined
    form.contractKey = ''
    form.contractUrl = ''
}
// 编辑达人按钮
const updataExpert = async (id: number) => {
    favCateId.value = id
    const { code, result } = await reqGetFavInfluencers(id)
    if (code === '00000') {
        dialogFormVisible.value = true
        Object.assign(form, result)
        form.cooperationOffer1 = result.cooperationOffer[0] || undefined
        form.cooperationOffer2 = result.cooperationOffer[1] || undefined
        fileList.value = []
        fileList.value.push({
            name: result.contractKey.substring(result.contractKey.lastIndexOf('/') + 1),
            url: result.signedUrl,
        })
    }
}

// 编辑达人保存
const save = async () => {
    if (form.email) {
        await emailDom.value.validate() // 通过邮箱校验
    }
    // 上传合同
    if (fileData.value) {
        let res: any = await reqGetOssSigned({ scene: 1, key: fileData.value.name }) // 获取上传URL
        if (res.code === '00000') {
            signedUrl.value = res.result.signedUrl
            form.contractKey = res.result.fullKey
        }

        let config = {
            method: 'put',
            url: signedUrl.value,
            data: fileData.value,
            headers: {
                'Content-Type': fileData.value.type,
            },
        }
        axios(config)
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    let cooperationOffer = []
    form.cooperationOffer1 === '' ? (cooperationOffer[0] = undefined) : (cooperationOffer[0] = form.cooperationOffer1)
    form.cooperationOffer2 === '' ? (cooperationOffer[1] = undefined) : (cooperationOffer[1] = form.cooperationOffer2)

    console.log('form---------', form)

    const data = {
        favCateId: favCateId.value,
        cooperationStatus: form.cooperationStatus,
        email: form.email || undefined,
        cooperationOffer: cooperationOffer,
        paymentInfo: form.paymentInfo || undefined,
        shippingInfo: form.shippingInfo || undefined,
        contactInfo: form.contactInfo || undefined,
        remark: form.remark || undefined,
        contractKey: form.contractKey || null,
    }
    console.log('data-------', data)

    let res: any = await reqFavInfluencers(favCateId.value, data) // 更新合作信息
    if (res.code === '00000') {
        upload.value.clearFiles()
        getFavInfluencersList()
        ElMessage.success('保存成功')
        dialogFormVisible.value = false
    }
}
// 校验规则
const validateEmail = (_rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('邮箱不能为空'))
    } else if (!reg_email.test(value)) {
        callback(new Error('邮箱格式不正确'))
    } else {
        callback()
    }
}
const reg_email = /^([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)$/
const rulesUpdate = reactive({
    email: [{ validator: validateEmail, trigger: 'blur' }],
})
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
            border-radius: 50%;
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
                border-radius: 50%;
            }
            span {
                font-size: 16px;
                font-weight: 700;
                color: rgba(0, 0, 0, 1);
                margin-left: 20px;
            }
            .look_pact {
                display: inline-block;
                margin-top: 20px;
                color: $base-theme-color;
                text-decoration: none;
                font-size: 14px;
                cursor: pointer;
                i {
                    margin-right: 12px;
                    font-size: 14px;
                }
            }
            .look_pact:hover {
                text-decoration: underline;
            }
        }
        .dialog_right {
            flex-grow: 1;
        }
    }
}
</style>
