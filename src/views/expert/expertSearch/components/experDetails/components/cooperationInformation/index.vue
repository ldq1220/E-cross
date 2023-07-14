<template>
    <div class="cooperation_information_box">
        <el-form :inline="true" :model="formData" label-position="top" class="form_box" :rules="rules">
            <!-- 左侧 -->
            <div class="form_left">
                <el-form-item label="合作状态" class="">
                    <el-select v-model="formData.cooperationStatus" style="width: 160px" v-show="isRedact" placeholder="合作状态">
                        <el-option label="未合作" :value="0" />
                        <el-option label="已寄样" :value="1" />
                        <el-option label="已上线合作视频" :value="2" />
                    </el-select>
                    <p class="redact_text" v-show="!isRedact">{{ cooperationDict(formData.cooperationStatus) }}</p>
                </el-form-item>

                <el-form-item label="合作报价" class="" style="min-width: 340px" v-show="isRedact">
                    <el-input v-model.number="formData.cooperationOffer1" placeholder="请输入内容" style="width: 45%">
                        <template #prepend>$</template>
                    </el-input>
                    <span style="padding: 0 10px">至</span>
                    <el-input v-model.number="formData.cooperationOffer2" placeholder="请输入内容" style="width: 45%">
                        <template #prepend>$</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="合作报价" class="" style="min-width: 340px" v-show="!isRedact">
                    <el-input v-model.number="formData.cooperationOffer1" placeholder="请输入内容" style="width: 45%" disabled>
                        <template #prepend>$</template>
                    </el-input>
                    <span style="padding: 0 10px">至</span>
                    <el-input v-model.number="formData.cooperationOffer2" placeholder="请输入内容" style="width: 45%" disabled>
                        <template #prepend>$</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="付款信息" class="form_height">
                    <el-input v-model="formData.paymentInfo" :rows="4" class="" type="textarea" placeholder="请输入付款信息" v-show="isRedact" />

                    <p class="redact_text" v-show="!isRedact">{{ formData.paymentInfo }}</p>
                </el-form-item>

                <el-form-item label="其他联系方式" class="form_height">
                    <el-input v-model="formData.contactInfo" :rows="4" type="textarea" placeholder="请输入其他联系方式" v-show="isRedact" />
                    <p class="redact_text" v-show="!isRedact">{{ formData.contactInfo }}</p>
                </el-form-item>

                <el-upload
                    v-model:file-list="fileList"
                    class="upload-demo"
                    :http-request="uploadContract"
                    multiple
                    :limit="1"
                    ref="upload"
                    :on-exceed="handleExceed"
                    :on-remove="removeFile"
                    v-show="isRedact"
                >
                    <el-button>
                        <el-icon><UploadFilled /></el-icon>
                        <p class="redact_text" style="margin-left: 10px">上传合同</p>
                    </el-button>
                    <template #tip>
                        <div class="el-upload__tip">支持扩展名：.rar .zip .doc .docx .pdf .jpg...</div>
                    </template>
                </el-upload>

                <a :href="formData.contractUrl" target="_blank" class="look_pact" v-show="formData.contractKey">
                    <!-- <a :href="fileList[0].url" target="_blank" class="look_pact" v-show="fileList[0].name"> -->
                    <i class="iconfont icon-neirong"></i>
                    查看合同
                </a>
            </div>

            <!-- 右侧 -->
            <div class="form_right">
                <el-form-item label="邮箱" prop="email" ref="emailDom">
                    <el-input v-model="formData.email" autocomplete="off" id="email_input" placeholder="请输入邮箱" style="width: 200px" v-show="isRedact" />
                    <p class="redact_text" v-show="!isRedact">{{ formData.email }}</p>
                </el-form-item>

                <el-form-item label="收货信息" class="form_height" style="margin-top: 98px">
                    <el-input v-model="formData.shippingInfo" :rows="4" type="textarea" placeholder="请输入收货信息" v-show="isRedact" />
                    <p class="redact_text more_text" v-show="!isRedact">
                        {{ formData.shippingInfo }}
                    </p>
                </el-form-item>

                <el-form-item label="备注" class="form_height">
                    <el-input v-model="formData.remark" :rows="4" type="textarea" placeholder="请输入备注" v-show="isRedact" />
                    <p class="redact_text" v-show="!isRedact">{{ formData.remark }}</p>
                </el-form-item>
            </div>
        </el-form>

        <div class="form_btn">
            <el-button v-show="isRedact" @click="quxiao">取消</el-button>
            <el-button class="save_btn" v-show="isRedact" @click="saveCooperationInfo">保存</el-button>
            <el-button class="save_btn" v-show="!isRedact" @click="bianji">编辑</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { reqFavInfluencers, reqGetOssSigned, reqGetFavInfluencers } from '@/api/expert/expertInfo'
import { cooperationDict } from '@/utils/allDict'
import axios from 'axios'
import { ElMessage, genFileId } from 'element-plus'
// @ts-ignore
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

const isRedact = ref(false) // 默认不编辑展示
const props = defineProps(['favInfo'])

const emailDom = ref() // 邮箱Dom
const signedUrl = ref()
const bianji = () => {
    isRedact.value = true
}
const quxiao = () => {
    isRedact.value = false
    getFavInfluencers()
}

onMounted(() => {
    getFavInfluencers()
})

//获取合作信息
const getFavInfluencers = async () => {
    const { id } = props.favInfo
    let { code, result } = await reqGetFavInfluencers(id)

    if (code === '00000') {
        Object.assign(formData, result)
        formData.cooperationOffer1 = result.cooperationOffer[0]
        formData.cooperationOffer2 = result.cooperationOffer[1]
        fileList.value = []
        fileList.value.push({
            name: result.contractKey.substring(result.contractKey.lastIndexOf('/') + 1),
            url: result.signedUrl,
        })
    }
}

const formData: any = reactive({
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
})

// 上传合同
// @ts-ignore
const fileList = ref<UploadUserFile[]>([])
// @ts-ignore
const upload = ref<UploadInstance>()
const fileData = ref()
const uploadContract = (data: any) => {
    fileData.value = data.file
}
// @ts-ignore
const handleExceed: UploadProps['onExceed'] = (files: any[]) => {
    fileData.value = files[0]
    upload.value!.clearFiles()
    // @ts-ignore
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
}
const removeFile = () => {
    upload.value.clearFiles()
    fileData.value = undefined
    formData.contractKey = ''
    formData.contractUrl = ''
}

// 保存合作信息
const saveCooperationInfo = async () => {
    if (formData.email) {
        await emailDom.value.validate() // 通过邮箱校验
    }

    // 上传合同
    if (fileData.value) {
        let res: any = await reqGetOssSigned({ scene: 1, key: fileData.value.name }) // 获取上传URL
        if (res.code === '00000') {
            signedUrl.value = res.result.signedUrl
            formData.contractKey = res.result.fullKey
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
    const favCateId: any = props.favInfo.id
    let cooperationOffer = []
    formData.cooperationOffer1 === '' ? (cooperationOffer[0] = undefined) : (cooperationOffer[0] = formData.cooperationOffer1)
    formData.cooperationOffer2 === '' ? (cooperationOffer[1] = undefined) : (cooperationOffer[1] = formData.cooperationOffer2)

    const data = {
        favCateId,
        cooperationStatus: formData.cooperationStatus || undefined,
        email: formData.email || undefined,
        cooperationOffer: cooperationOffer,
        paymentInfo: formData.paymentInfo || undefined,
        shippingInfo: formData.shippingInfo || undefined,
        contactInfo: formData.contactInfo || undefined,
        remark: formData.remark || undefined,
        contractKey: formData.contractKey || null,
    }
    await reqFavInfluencers(favCateId, data) // 更新合作信息

    getFavInfluencers()
    ElMessage.success('保存成功')
    isRedact.value = false
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

// 表单校验
const rules = reactive({
    email: [{ validator: validateEmail, trigger: 'blur' }],
})
</script>

<style lang="scss">
.cooperation_information_box {
    .form_box {
        .form_height {
            height: 124px;
        }
        .el-input-group__prepend {
            padding: 0 10px;
        }
        .el-textarea__inner {
            min-width: 340px;
        }
        .el-form-item__label {
            color: #333;
            font-weight: bold;
        }
    }
    .form_btn {
        margin-top: 22px;
        .el-button {
            padding: 0 22px;
        }
        .save_btn {
            background-color: $base-theme-color;
            border-color: $base-theme-color;
            color: #fff;
        }
        .save_btn:hover {
            color: #fff;
        }
    }
}
</style>
<style scoped lang="scss">
.cooperation_information_box {
    padding: 20px 40px;
    background-color: #fff;
    .form_box {
        width: 60%;
        display: flex;
        justify-content: space-between;
        .form_left,
        .form_right {
            width: 46%;
        }
        .el-input-group__prepend {
            padding: 0;
        }
        .redact_text {
            padding-left: 20px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3; /* 控制显示的行数 */
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
        }
        .look_pact {
            display: inline-block;
            // height: 59px;
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
}
</style>
@/utils/aDict@/utils/allDict
