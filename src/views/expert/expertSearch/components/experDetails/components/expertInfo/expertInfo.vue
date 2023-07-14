<template>
    <div class="content_box">
        <!-- 达人头像 -->
        <div class="expert_head">
            <img :src="expertDetail.avatarKey" alt="" class="head_img" />
        </div>
        <!-- 达人信息 -->
        <div class="expert_info_middle">
            <div class="data_box">
                数据更新时间
                <span class="update_time">{{ updateTime }}</span>
                <div class="update" @click="updateInfo">
                    <span class="iconfont icon-shuaxin"></span>
                    更新数据
                </div>
                <el-tooltip placement="top">
                    <template #content>点击后一旦更新完成会通过消息通知您。</template>
                    <span class="iconfont icon-bangzhu frequencyIcon"></span>
                </el-tooltip>
            </div>
            <div class="expert_name">{{ expertDetail.nickName }}</div>
            <div class="expert_country">
                <i class="fi country_icon" :class="'fi-' + expertDetail.countryCode.toLowerCase()"></i>
                {{ expertDetail.name_cn }}
                <span class="specialty" v-if="false"><i class="iconfont icon-lightning"></i></span>
                <span class="specialty_text" v-if="false">快速响应</span>
                <span class="often" v-if="false"><i class="iconfont icon-shipinbofangshibofang"></i></span>
                <span class="specialty_text" v-if="false">频繁发帖</span>
                <span class="specialty timely" v-if="false"><i class="iconfont icon-hetongbeian"></i></span>
                <span class="specialty_text" v-if="false">及时履约</span>
            </div>
            <div class="expert_label_box">
                <div class="product_type" v-if="expertDetail.topics">
                    <span>创作类型</span>
                    <el-tag style="margin-right: 4px" type="danger" v-for="(item, index) in getLabelsFromValues(expertDetail.topics, systemStore.creativeTypes)" :key="index">
                        {{ item }}
                    </el-tag>
                </div>
                <div class="expert_label">
                    <span>标签</span>
                    <el-tag v-for="(item, index) in expertDetail.categories" :key="index">{{ item }}</el-tag>
                </div>
            </div>
            <!-- 社交平台账号 -->
            <div class="social_platform" v-if="false">
                <div class="platform_item tiktok">
                    <span class="iconfont icon-douyin"></span>
                </div>
                <div class="platform_item youtube">
                    <span class="iconfont icon-Youtube-fill"></span>
                </div>
                <div class="platform_item insta">
                    <span class="iconfont icon-instagram"></span>
                </div>
                <div class="platform_item twitter">
                    <span class="iconfont icon-tuite"></span>
                </div>
                <div class="platform_item facebook">
                    <span class="iconfont icon-facebook"></span>
                </div>
            </div>
            <div class="expert_introduce_box">
                <el-tooltip placement="top">
                    <template #content>{{ expertDetail.brief }}</template>
                    <div class="expert_introduce">{{ expertDetail.brief }}</div>
                </el-tooltip>
            </div>
        </div>
        <div class="expert_info_right">
            <div class="expert_operate">
                <!-- 收藏按钮 -->
                <div class="operate_item collect" @click="favExpert">
                    <i class="iconfont icon-shoucang1" v-if="!expertDetail.favInfo || expertDetail.favInfo.status == 0"></i>
                    <i class="iconfont icon-shoucang trueCollect" v-else></i>
                </div>
                <!-- 邮件按钮 -->
                <el-tooltip placement="top" popper-class="tool-tip">
                    <template #content>{{ expertDetail.email }}</template>
                    <div class="operate_item letter" v-show="expertDetail.email">
                        <span class="iconfont icon-youjian"></span>
                    </div>
                </el-tooltip>

                <!-- 资料按钮 -->
                <div class="operate_item information" v-if="false">
                    <span class="iconfont icon-16"></span>
                </div>
            </div>
            <!-- 达人数据 -->
            <div class="details_data">
                <div class="details_data_item">
                    <p>{{ formatNumber(expertDetail.followerCnt) }}</p>
                    <span>粉丝数</span>
                </div>
                <div class="details_data_item">
                    <p>{{ formatNumber(expertDetail.likedCnt) }}</p>
                    <span>总点赞数</span>
                </div>
                <div class="details_data_item" v-show="false">
                    <p>{{ formatNumber(expertDetail.likedCnt) }}</p>
                    <span>推广产品数</span>
                </div>
            </div>
        </div>
        <!-- </cl-row> -->

        <!-- 收藏对话框 -->
        <favElDialog :dialogFormVisible="dialogFormVisible" @dialogClose="dialogCloseDef" @submitCollect="submitCollect"></favElDialog>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { formatNumber } from '@/utils/formatNumber'
import { reqUpdateInfluencerInfo, reqCancelCollect } from '@/api/expert/expertInfo'
import { reqExpertDetail } from '@/api/expert/expertSearch'
import useSystemStore from '@/store/modules/system'
import useExpertInfoData from '@/store/modules/expertInfoData'
import { ElMessage } from 'element-plus'
import favElDialog from '@/components/favElDialog/index.vue'
import { reqCollect } from '@/api/expert/expertSearch'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import { getLabelsFromValues } from '@/utils/allDict'

// @ts-ignore
import { BroadcastChannel } from 'broadcast-channel' // 广播 用于收藏

const route = useRoute()

const systemStore = useSystemStore()
const expertInfoData = useExpertInfoData()
const updateTime = ref('2023-06-01 15:23:46') // 更新时间
const dialogFormVisible = ref(false)
const setChannel = new BroadcastChannel('favExpert') // 创建广播实例

//数据
let expertDetail: any = reactive({
    id: undefined,
    userName: undefined,
    nickName: undefined,
    countryCode: '',
    name_cn: undefined,
    brief: undefined,
    followerCnt: undefined,
    likedCnt: undefined,
    avgViewsPerVideo: undefined,
    engagementRate: undefined,
    categories: [],
    avatarKey: undefined,
    email: undefined,
    favInfo: undefined,
    topics: undefined,
})

onMounted(() => {
    getExpertInfo()
})

// 接受广播 改变收藏状态
setChannel.onmessage = () => {
    getExpertInfo()
}

//获取达人详情数据
const getExpertInfo = async () => {
    const id: any = route.query.id
    let res: any = await reqExpertDetail(id)
    if (res.code == '00000') {
        Object.assign(expertDetail, res.result)
        systemStore.contry.forEach((contry: { code: string; name_cn: any }) => {
            if (contry.code == expertDetail.countryCode) {
                Object.assign(expertDetail, { name_cn: contry.name_cn })
            }
        })
    }
}

//收藏达人
const favExpert = async () => {
    if (expertDetail.favInfo && expertDetail.favInfo.status == 1) {
        await reqCancelCollect(expertDetail.favInfo.id)
        getExpertInfo()
        ElMessage.success('取消收藏')
        setChannel.postMessage() // 发送广播
    } else {
        dialogFormVisible.value = true
    }
}
const dialogCloseDef = () => {
    dialogFormVisible.value = false
}

// 点击对话框 确定收藏
const submitCollect = async () => {
    const res: any = await reqCollect(expertDetail.id)
    if (res.code === '00000') {
        getExpertInfo()
        ElMessage.success('收藏成功')
        setChannel.postMessage() // 发送广播
        dialogFormVisible.value = false // 隐藏对话框
    }
}

// 更新数据
const updateInfo = async () => {
    let res: any = await reqUpdateInfluencerInfo(expertDetail.id)
    if (res.code === '00000') {
        expertInfoData.getAgeDistribution(res.result.ageDistribution)
        expertInfoData.getActivityDistribution(res.result.activityDistribution.active, res.result.activityDistribution.inactive)
        expertInfoData.getCountryDistribution(res.result.countryDistribution)
        expertInfoData.getDeviceDistribution(res.result.deviceDistribution)

        // 改变更新时间 提示用户
        updateTime.value = dayjs().format('YYYY-MM-DD HH:mm:ss') // 更新时间 可以使用任何格式化的
        ElMessage.success('数据更新成功！')
    }
}
</script>

<style lang="scss" scoped>
.content_box {
    display: flex;
    height: 225px;
    min-width: 1200px;
    padding: 20px 35px 0 15px;
    border-radius: 5px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 242, 214, 1) 100%);
    border: 1px solid rgba(228, 88, 88, 0.16);

    .expert_head {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin: 10px 25px 0 0;

        .head_img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }
    }

    .expert_info_middle {
        width: 560px;
        .data_box {
            display: flex;
            font-size: 12px;
            color: rgba(128, 128, 128, 1);

            .update_time {
                color: rgba(0, 0, 0, 1);
                margin-left: 10px;
            }

            .update {
                color: rgba(235, 94, 40, 1);
                margin: 0 10px 0 10px;
                cursor: pointer;
                .iconfont {
                    font-size: 12px;
                }
            }
            .update:hover {
                color: #06b666;
                text-decoration: underline;
            }
        }

        .expert_name {
            font-size: 18px;
            font-weight: 700;
            color: rgba(0, 0, 0, 1);
            margin-top: 15px;
        }

        .expert_country {
            font-size: 14px;
            color: rgba(0, 0, 0, 1);
            margin-top: 10px;
            .country_icon {
                margin-right: 6px;
            }
            .sex_icon {
                margin-left: 6px;
                color: #00baad;
                font-size: 14px;
            }
            .specialty {
                display: inline-block;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background-color: #f4ea2a;
                text-align: center;
                line-height: 24px;
                margin: 0 8px 0 20px;
                i {
                    font-size: 18px;
                    color: #fff;
                }
            }
            .specialty_text {
                font-size: 14px;
                color: rgba(128, 128, 128, 1);
            }
            .often {
                display: inline-block;
                width: 23px;
                height: 23px;
                border-radius: 50%;
                border: 2px solid #d4237a;
                text-align: center;
                line-height: 20px;
                margin: 0 8px 0 20px;
                i {
                    font-size: 14px;
                    color: #d4237a;
                }
            }
            .timely {
                background-color: #06b666;
                i {
                    font-size: 14px;
                }
            }
        }

        .expert_label_box {
            display: flex;
            margin-top: 10px;
            font-size: 12px;
            align-items: center;
            color: rgba(128, 128, 128, 1);
            span {
                margin-right: 5px;
            }
            .product_type {
                margin-right: 10px;
            }
        }

        .social_platform {
            display: flex;
            margin-top: 10px;
            .platform_item {
                display: block;
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                border-radius: 50%;
                margin-right: 15px;
                background: #eee;
                cursor: pointer;
            }

            .youtube {
                color: #fff;
                background-color: rgba(207, 49, 52, 1);
                .iconfont {
                    font-size: 16px;
                }
            }

            .insta {
                color: #fff;
                background: linear-gradient(#2e4df4, transparent), linear-gradient(90deg, #fee285, transparent), linear-gradient(-90deg, #e2198e, transparent),
                    linear-gradient(-90deg, #f11b64, transparent);

                .iconfont {
                    font-size: 22px;
                }
            }

            .twitter {
                color: #fff;
                background-color: rgba(7, 171, 232, 1);

                .iconfont {
                    font-size: 14px;
                }
            }

            .facebook {
                color: #fff;
                background-color: rgba(55, 107, 157, 1);

                .iconfont {
                    font-size: 20px;
                }
            }
        }

        .expert_introduce_box {
            margin-top: 15px;

            .expert_introduce {
                width: 380px;
                height: 20px;
                font-size: 14px;
                line-height: 20px;
                color: rgba(56, 56, 56, 1);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }

    .expert_info_right {
        display: flex;
        align-items: flex-end;
        flex-direction: column;
        margin-left: auto;

        .expert_operate {
            display: flex;
            .operate_item {
                position: relative;
                width: 45px;
                height: 45px;
                text-align: center;
                line-height: 45px;
                border-radius: 5px;
                margin-left: 15px;
                background: rgba(247, 247, 247, 1);
                cursor: pointer;

                .iconfont {
                    font-size: 24px;
                    color: rgba(78, 89, 105, 1);
                    transition: all 0.3s;
                }
                .trueCollect {
                    color: $base-theme-color;
                }

                &:hover,
                .active {
                    .iconfont {
                        color: rgba(235, 94, 40, 1);
                    }
                }
            }
        }

        .details_data {
            display: flex;
            margin-top: 25px;
            .details_data_item {
                width: 100px;
                padding-left: 15px;
                border-left: 1px solid rgba(229, 229, 229, 1);
                p {
                    font-size: 18px;
                    margin-bottom: 10px;
                    color: rgba(235, 94, 40, 1);
                }
                span {
                    font-size: 14px;
                    color: rgba(128, 128, 128, 1);
                }
            }
        }
    }
}
</style>
