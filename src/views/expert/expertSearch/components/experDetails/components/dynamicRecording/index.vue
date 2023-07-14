<template>
    <div class="dynamicRecording_box">
        <div class="dynamicRecording_top">
            <div></div>
            <div class="btns">
                <el-button type="primary " class="btn fill_dynamic" @click="addRecord">新增记录</el-button>
            </div>
        </div>
        <div class="dynamicRecording_bottom">
            <!-- 列表区域 -->
            <div class="table_list">
                <el-table :data="tableData" style="width: 100%" :header-cell-style="{ background: 'rgba(247, 247, 247, 1)', color: '#606266', padding: '8px 0' }">
                    <el-table-column type="selection" width="55" />

                    <el-table-column property="content" label="跟进记录描述" width="200">
                        <template #default="scope">
                            <span class="expert_name">{{ scope.row.content }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column property="cooperationStatus" label="合作状态" align="center">
                        <template #default="scope">
                            {{ cooperationDict(scope.row.cooperationStatus) }}
                        </template>
                    </el-table-column>

                    <el-table-column property="grouping" label="跟进人" align="center">
                        <template #default="scope">
                            <span>{{ scope.row.user.nickName }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column property="contactTool" label="联系工具" align="center">
                        <template #default="scope">
                            {{ contactToolDict(scope.row.contactTool) }}
                        </template>
                    </el-table-column>
                    <el-table-column label="跟进时间" width="160" align="center">
                        <template #default="scope">
                            {{ dayjs.unix(scope.row.currContactTime).format('YYYY-MM-DD HH:mm') }}
                        </template>
                    </el-table-column>
                    <el-table-column property="nextContactTime" label="计划下次跟进时间" width="160" align="center">
                        <template #default="scope">
                            <span v-if="scope.row.nextContactTime">
                                {{ dayjs.unix(scope.row.nextContactTime).format('YYYY-MM-DD HH:mm') }}
                            </span>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" property="nextContactTime" align="center" width="90">
                        <template #default="scope">
                            <div class="op_icon">
                                <i class="iconfont icon-bianji operation_icon" @click="updataRecord(scope.row)"></i>

                                <el-popconfirm width="220" confirm-button-text="确定" cancel-button-text="取消" icon-color="#eb5e28" title="确定删除此记录嘛？" @confirm="confirmDetele(scope.row.id)">
                                    <template #reference>
                                        <i class="iconfont icon-shanchu operation_icon"></i>
                                    </template>
                                </el-popconfirm>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页器 -->
                <div class="pagination">
                    <div class="placeholder"></div>
                    <el-pagination background layout="prev, pager, next" :total="100" v-model:current-page="page" @current-change="changePage" />
                </div>
            </div>
        </div>

        <el-dialog v-model="dialogFormVisible" :title="isisAddRecord ? '新增记录' : '编辑记录'" align-center center @close="closeDialog" style="width: 600px">
            <el-form :model="form" label-position="top" :rules="rules" ref="recordFormDom">
                <el-form-item label="跟进内容" prop="content">
                    <el-input type="textarea" :rows="4" v-model="form.content" autocomplete="off" placeholder="请填写跟进内容" />
                </el-form-item>
                <el-form-item label="联系工具" prop="contactTool">
                    <el-select v-model="form.contactTool" placeholder="跟请选择联系工具" placement="right" :disabled="!isisAddRecord">
                        <el-option label="Email" :value="1" />
                        <el-option label="Phone" :value="2" />
                        <el-option label="Instagram" :value="3" />
                        <el-option label="Youtube" :value="4" />
                        <el-option label="Twitter" :value="5" />
                        <el-option label="Facebook" :value="6" />
                        <el-option label="Whatsapp" :value="7" />
                        <el-option label="Zalo" :value="8" />
                        <el-option label="Line" :value="9" />
                    </el-select>
                </el-form-item>
                <div style="display: flex; justify-content: space-between">
                    <el-form-item label="本次跟进时间" prop="currContactTime">
                        <el-date-picker
                            v-model="form.currContactTime"
                            type="datetime"
                            value-format="X"
                            :disabled="!isisAddRecord"
                            :disabled-date="disabledDatesAfter"
                            :disabled-hours="disabledHoursAfter"
                            :disabled-minutes="disabledMinutesAfter"
                            :disabled-seconds="disabledSecondsAfter"
                            placeholder="请选择本次跟进时间"
                        />
                    </el-form-item>
                    <el-form-item label="下次跟进时间">
                        <el-date-picker
                            v-model="form.nextContactTime"
                            type="datetime"
                            :default-time="defaultTime"
                            value-format="X"
                            :disabled="form.nextContactTime < dayjs().unix() && form.nextContactTime"
                            :disabled-date="disabledDatesBefore"
                            :disabled-hours="disabledHoursBefore"
                            :disabled-minutes="disabledMinutesBefore"
                            :disabled-seconds="disabledSecondsBefore"
                            placeholder="请选择下次跟进时间"
                        />
                    </el-form-item>
                </div>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="saveRecord">保存</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { reqGetInteractions, reqAddInteractions, reqUpdateInfluencerInfoRecord, reqDeteleInfluencerInfoRecord } from '@/api/expert/expertInfo'
import { cooperationDict, contactToolDict } from '@/utils/allDict'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'

const route = useRoute()
const id = route.query.id as string
const updataRecordId = ref()
const page = ref(1)
const recordFormDom = ref()
const isisAddRecord = ref()

const changePage = () => {}
onMounted(() => {
    getList()
})

// 获取联系记录列表
const getList = async () => {
    let res: any = await reqGetInteractions(id)
    if (res.code === '00000') {
        tableData.value = res.result
    }
}

const tableData = ref()
const dialogFormVisible = ref(false)
const defaultTime = ref()

const form: any = reactive({
    influencerId: +id,
    content: undefined,
    contactTool: undefined,
    currContactTime: undefined,
    nextContactTime: undefined,
})
const rules = reactive({
    content: [{ required: true, message: '请填写跟进内容', trigger: 'blur' }],
    contactTool: [{ required: true, message: '请选择联系工具', trigger: 'blur' }],
    currContactTime: [{ required: true, message: '请选择本次跟进时间', trigger: 'blur' }],
})

// 新增记录
const addRecord = () => {
    isisAddRecord.value = true
    dialogFormVisible.value = true
    form.currContactTime = dayjs().unix()
    defaultTime.value = new Date(2000, 1, 1, 23, 59, 59) // 设置默认秒数 当前时间的秒数
}
// 编辑记录
const updataRecord = (data: any) => {
    isisAddRecord.value = false
    dialogFormVisible.value = true
    defaultTime.value = new Date(2000, 1, 1, 23, 59, 59) // 设置默认秒数 当前时间的秒数

    updataRecordId.value = data.id
    form.content = data.content
    form.contactTool = data.contactTool
    form.currContactTime = data.currContactTime
    form.nextContactTime = data.nextContactTime
}
// 关闭dialog
const closeDialog = () => {
    form.content = undefined
    form.contactTool = undefined
    form.currContactTime = undefined
    form.nextContactTime = undefined
}

// 保存记录
const saveRecord = async () => {
    if (isisAddRecord.value) {
        // 新增记录
        await recordFormDom.value.validate()
        form.nextContactTime = parseInt(form.nextContactTime) || undefined
        form.currContactTime = parseInt(form.currContactTime) || undefined

        let res: any = await reqAddInteractions(id, form)
        if (res.code === '00000') {
            ElMessage.success('添加成功')
            dialogFormVisible.value = false
            getList()
        }
    } else {
        // 编辑记录
        let data = {
            content: form.content,
            nextContactTime: (form.currContactTime = parseInt(form.currContactTime) || undefined),
        }
        let res: any = await reqUpdateInfluencerInfoRecord(updataRecordId.value, data)
        if (res.code === '00000') {
            getList()
            dialogFormVisible.value = false
        }
    }
}
// 删除此条记录
const confirmDetele = async (id: number) => {
    await reqDeteleInfluencerInfoRecord(id)
    ElMessage.success('删除成功')
    getList()
}

//  时间控件 对时间的判断
const disabledDatesAfter = (time: { getTime: () => number }) => {
    // 获取当前时间
    const now = new Date()
    // 禁用当前时间之前的所有日期
    return time.getTime() >= now.getTime()
}
const disabledHoursAfter = () => {
    const a = []
    for (let i = 0; i < 24; i++) {
        // 限制之前 < 之后 > ，下面同理
        if (new Date().getHours() >= i) continue
        a.push(i)
    }
    return a
}
const disabledMinutesAfter = () => {
    const a = []
    for (let i = 0; i < 60; i++) {
        // 限制之前 < 之后 > ，下面同理
        if (new Date().getMinutes() >= i) continue
        a.push(i)
    }
    return a
}
const disabledSecondsAfter = () => {
    const a = []
    for (let i = 0; i < 60; i++) {
        // 限制之前 < 之后 > ，下面同理
        if (new Date().getSeconds() >= i) continue
        a.push(i)
    }
    return a
}
const disabledDatesBefore = (time: { getTime: () => number }) => {
    // 获取当前时间
    const now = new Date()
    // 获取当前日期
    const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    // 判断时间是否在当前日期之前，但不包括当天
    return time.getTime() < currentDate.getTime()
}
const disabledHoursBefore = () => {
    const a = []
    for (let i = 0; i < 24; i++) {
        // 限制之前 < 之后 > ，下面同理
        if (new Date().getHours() <= i) continue
        a.push(i)
    }
    return a
}
const disabledMinutesBefore = () => {
    const a = []
    for (let i = 0; i < 60; i++) {
        // 限制之前 < 之后 > ，下面同理
        if (new Date().getMinutes() <= i) continue
        a.push(i)
    }
    return a
}
const disabledSecondsBefore = () => {
    const a = []
    for (let i = 0; i < 60; i++) {
        // 限制之前 < 之后 > ，下面同理
        if (new Date().getSeconds() <= i) continue
        a.push(i)
    }
    return a
}
</script>

<style lang="scss">
.dynamicRecording_box {
    .el-button {
        padding: 0 22px;
    }
}
.dynamicRecording_bottom {
    .pagination {
        .el-pagination {
            .el-pager li {
                background-color: #fff;
                border: 1px solid rgba(0, 0, 0, 0.15);
            }
            .el-pager .is-active {
                background-color: var(--el-color-primary);
                color: var(--el-color-white);
            }
        }
    }
}
</style>

<style scoped lang="scss">
.dynamicRecording_box {
    .dynamicRecording_top {
        padding: 20px 0 25px 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .btn {
            padding: 19px 26px;
        }
        .fill_dynamic {
            color: #fff;
            border: none;
        }
        .batch_remove {
            background-color: #fff;
            color: rgba(212, 48, 48, 1);
        }

        .batch_remove:hover {
            color: #409eff;
        }
    }
    .dynamicRecording_bottom {
        .table_list {
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
        }
        .el-table_3_column_23 {
            .cell {
                display: flex;
                justify-content: space-between;
            }
        }
        .op_icon {
            padding: 10px 0;
            display: flex;
            justify-content: space-between;
            .operation_icon {
                font-size: 20px;
                font-weight: bold;
            }
            .operation_icon:hover {
                color: $base-theme-color;
                cursor: pointer;
            }
        }
        // 分页
        .pagination {
            display: flex;
            justify-content: space-between;
            margin-top: 18px;
            .placeholder {
                flex-grow: 1;
            }
        }
    }
}
</style>
