<template>
    <div class="send_email" :xl="6">
        <div class="email_form">
            <div class="form_left">
                <el-form :model="form" label-width="80px" label-position="left">
                    <el-form-item label="收件人">
                        <el-input v-model="form.name" />
                    </el-form-item>
                    <el-form-item label="主题">
                        <el-input v-model="form.theme" />
                    </el-form-item>
                    <el-form-item label="">
                        <el-upload
                            v-model="form.fileList"
                            class="upload-demo"
                            :on-exceed="handleExceed"
                            limit="10"
                            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                            multiple
                            :before-upload="beforeAvatarUpload"
                        >
                            <el-button>
                                <el-icon><UploadFilled /></el-icon>
                                <p style="margin-left: 10px">添加附件</p>
                            </el-button>
                            <template #tip>
                                <div class="el-upload__tip">附件数量上限为10个，且总大小不超过5MB</div>
                            </template>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="正文">
                        <el-input v-model="form.paymentInfo" :rows="10" resize="none" type="textarea" />
                    </el-form-item>
                    <el-form-item label="">
                        <div class="form_btn">
                            <div class="left_btn">
                                <el-button>一键翻译</el-button>
                            </div>
                            <div class="right_btn">
                                <el-button>取消</el-button>
                                <el-button>存草稿</el-button>
                                <el-button class="send_btn">定时发送</el-button>
                                <el-button class="send_btn">立即发送</el-button>
                            </div>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
            <div class="form_right">
                <div class="right_item">
                    <div class="item_box">
                        <i class="iconfont icon-shoucang"></i>
                    </div>
                    <p>AI翻译</p>
                </div>
                <div class="right_item">
                    <div class="item_box">
                        <i class="iconfont icon-shoucang"></i>
                    </div>
                    <p>AI合同</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { UploadProps } from 'element-plus/lib/components/upload/src/upload.js'

const form = reactive({
    name: '',
    theme: '',
    fileList: '',
    paymentInfo: '',
})

// 上传文件 超出最大限制 调用方法
const handleExceed: UploadProps['onExceed'] = (files: string | any[], uploadFiles: string | any[]) => {
    ElMessage.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length} totally`)
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile: { type: string; size: number }) => {
    ElMessage.error(rawFile.size / 1024 / 1024 + 'MB')
    console.log(rawFile)
    return true
}
</script>

<style lang="scss">
.send_email {
    .el-button {
        padding: 19px 26px;
        span {
            font-size: 14px;
        }
    }
}
</style>
<style scoped lang="scss">
.send_email {
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    .email_form {
        display: flex;
        justify-content: space-between;
        .form_left {
            flex-grow: 1;
            .form_btn {
                display: flex;
                width: 100%;
                justify-content: space-between;
                .send_btn {
                    background-color: $base-theme-color;
                    color: #fff;
                }
            }
        }
        .form_right {
            padding: 0 20px 0 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .right_item {
                .item_box {
                    width: 45px;
                    height: 45px;
                    border-radius: 5px;
                    background: rgba(247, 247, 247, 1);
                    text-align: center;
                    i {
                        font-size: 24px;
                        line-height: 45px;
                        color: $base-theme-color;
                    }
                }
                p {
                    font-size: 12px;
                    line-height: 17.38px;
                    text-align: center;
                    color: rgba(0, 0, 0, 1);
                    margin: 5px 0 9px 0;
                }
            }
        }
    }
}
</style>
