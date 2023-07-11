<template>
    <div class="expert_details">
        <!-- 达人详情信息 -->
        <expertInfo ref="expertInfoSon" @getDate="getDate" />
        <!-- tab切换 内容分析 or 粉丝分析-->
        <el-tabs class="demo-tabs" v-model="tabItem" @tab-click="handleClick">
            <!-- 内容分析 -->
            <el-tab-pane name="content">
                <template #label>
                    <span class="custom-tabs-label">
                        <i class="iconfont icon-neirong tab_icon content_icon"></i>
                        <span>内容分析</span>
                    </span>
                </template>
                <!-- 内容数据 -->
                <contentData />
                <!-- 内容分析的图表 -->
                <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <publishTime v-if="tabItem == 'content'" />
                    </el-col>
                </el-row>
                <el-row>
                    <videoInteraction v-if="tabItem == 'content'" />
                </el-row>
                <el-row>
                    <hotTag v-if="tabItem == 'content'" />
                </el-row>

                <!-- 所有视频 -->
                <allVideo v-if="tabItem == 'content'" />
            </el-tab-pane>
            <!-- 粉丝分析 -->
            <el-tab-pane name="fans">
                <template #label>
                    <span class="custom-tabs-label">
                        <i class="iconfont icon-fensix tab_icon"></i>
                        <span>粉丝分析</span>
                    </span>
                </template>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <fansNumber v-if="tabItem == 'fans'" />
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mr-2">
                        <fansSex v-if="tabItem == 'fans'" />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <fansAge v-if="tabItem == 'fans'" />
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mr-2">
                        <fansArea v-if="tabItem == 'fans'" />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <fansTikTokLiveness v-if="tabItem == 'fans'" />
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mr-2">
                        <fansEquipment v-if="tabItem == 'fans'" />
                    </el-col>
                </el-row>
            </el-tab-pane>
            <!-- 带货数据 -->
            <el-tab-pane name="sellGoods">
                <template #label>
                    <span class="custom-tabs-label">
                        <i class="iconfont icon-zhibodaihuo tab_icon"></i>
                        <span>带货数据</span>
                    </span>
                </template>

                <!-- 电商视频 -->
                <eCommerceVideo />
            </el-tab-pane>
            <!-- 邮件来往 -->
            <el-tab-pane name="emailContact" v-if="isShow">
                <template #label>
                    <span class="custom-tabs-label">
                        <i class="iconfont icon-zhibodaihuo tab_icon"></i>
                        <span>邮件来往</span>
                    </span>
                </template>

                <!-- 电视视频 -->
                <emailContact />
            </el-tab-pane>
            <!-- 合作信息 -->
            <el-tab-pane name="cooperationInformation" v-if="isShow">
                <template #label>
                    <span class="custom-tabs-label">
                        <i class="iconfont icon-hezuoguanxi tab_icon"></i>
                        <span>合作信息</span>
                    </span>
                </template>

                <cooperationInformation :favInfo="favInfo" v-if="tabItem === 'cooperationInformation'" />
            </el-tab-pane>
            <!-- 动态记录 -->
            <el-tab-pane name="dynamicRecording" v-if="isShow">
                <template #label>
                    <span class="custom-tabs-label">
                        <i class="iconfont icon-dongtai tab_icon"></i>
                        <span>动态记录</span>
                    </span>
                </template>
                <dynamicRecording />
            </el-tab-pane>
            <!-- 合作效果 -->
            <el-tab-pane name="cooperationResult" v-if="isShow">
                <template #label>
                    <span class="custom-tabs-label">
                        <i class="iconfont icon-hezuo tab_icon"></i>
                        <span>合作效果</span>
                    </span>
                </template>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang="ts">
import fansNumber from './components/echartsCom/fansNumber.vue'
import fansSex from './components/echartsCom/fansSex.vue'
import fansAge from './components/echartsCom/fansAge.vue'
import fansArea from './components/echartsCom/fansArea.vue'
import fansTikTokLiveness from './components/echartsCom/fansTikTokLiveness.vue'
import fansEquipment from './components/echartsCom/fansEquipment.vue'
import publishTime from './components/echartsCom/publishTime.vue'
import videoInteraction from './components/echartsCom/videoInteraction.vue'
import hotTag from './components/echartsCom/hotTag.vue'
import expertInfo from './components/expertInfo/expertInfo.vue'
import contentData from './components/contentAnalysis/contentData.vue'
import allVideo from './components/contentAnalysis/allVideo.vue'
import eCommerceVideo from './components/sellGoodsAnalysis/eCommerceVideo.vue'
import cooperationInformation from './components/cooperationInformation/index.vue'
import dynamicRecording from './components/dynamicRecording/index.vue'
import emailContact from './components/emailContact/index.vue'

import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { reqExpertDetail } from '@/api/expert/expertSearch'

const route = useRoute()

const favInfo = ref()
const isShow = ref(false)

// 获取子组件实例
const expertInfoSon = ref()

getDate()
async function getDate() {
    // 达人详情数据
    const id: any = route.query.id
    let res: any = await reqExpertDetail(id)
    if (res.code == '00000') {
        favInfo.value = res.result.favInfo
        res.result.favInfo ? (isShow.value = true) : (isShow.value = false)
    }
}

// tab切换 数据
const tabItem = ref('content')
const handleClick = (tab: any) => {
    tabItem.value = tab.props.name
}
</script>

<style lang="scss">
.expert_details {
    .el-tabs {
        min-width: 1200px;
    }
    .el-tabs__nav-scroll {
        padding: 10px 0 0 0;
    }
    .el-tabs__item {
        padding: 0;
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
}
</style>

<style scoped lang="scss">
.expert_details {
    .tab_icon {
        font-size: 14px;
        margin-right: 5px;
    }
    .content_icon {
        font-size: 12px;
    }
}
.aixin {
    font-size: 20px;
    color: #fff;
}
.aixinhezi {
    width: 30px;
    height: 30px;
    background-color: red;
    border-radius: 50%;
    line-height: 30px;
    text-align: center;
}
</style>
