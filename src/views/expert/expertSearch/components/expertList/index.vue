<template>
    <div class="expert_list">
        <el-table class="expert_table" ref="multipleTableRef" :data="tableData" style="width: 100%">
            <!-- 达人信息左边部分 -->
            <el-table-column property="name" label="" min-width="520">
                <template #default="scope">
                    <router-link target="_blank" :to="{ path: '/expert/details', query: { id: scope.row.id } }" class="expert_message" @click="setUserName(scope.row.userName)">
                        <div class="expert_head">
                            <img :src="scope.row.avatarKey" alt="" class="head_img" />
                            <div class="collect" @click.prevent="collectExpert(scope.row.id, scope.row.favInfo)">
                                <i class="iconfont icon-shoucang1" v-if="!scope.row.favInfo || scope.row.favInfo.status == 0"></i>
                                <i class="iconfont icon-shoucang trueCollect" v-else></i>
                            </div>
                        </div>
                        <div class="expert_details">
                            <h4>{{ scope.row.nickName }}</h4>
                            <p class="details_country">
                                <i class="fi" :class="'fi-' + scope.row.countryCode.toLowerCase()"></i>
                                <span style="margin-left: 6px">{{ scope.row.name_cn }}</span>
                            </p>
                            <div class="details_data">
                                <div class="details_data_item">
                                    <p>{{ formatNumber(scope.row.followerCnt) }}</p>
                                    <span>粉丝数</span>
                                </div>
                                <div class="details_data_item">
                                    <p>{{ formatNumber(scope.row.likedCnt) }}</p>
                                    <span>总点赞数</span>
                                </div>
                                <div class="details_data_item">
                                    <p>{{ formatNumber(scope.row.avgViewsPerVideo) }}</p>
                                    <span>平均播放量</span>
                                </div>
                                <div class="details_data_item">
                                    <p>{{ formatEngagementRate(scope.row.engagementRate) }}%</p>
                                    <span>互动率</span>
                                </div>
                            </div>
                            <el-tag type="danger" v-for="(item, index) in scope.row.categories" :key="index">{{ item }}</el-tag>
                        </div>
                    </router-link>
                </template>
            </el-table-column>

            <!-- 达人信息右边部分 视频 -->
            <el-table-column property="address" align="right" width="400">
                <template #header width="20px">
                    <el-select v-model="expertSelect" @change="changetop" clearable class="m-2" placeholder="粉丝数">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </template>

                <template #default="scope">
                    <div class="expert_video">
                        <div class="video_item" v-for="item in scope.row.recentVideos" :key="item.id">
                            <el-tooltip placement="top" v-if="item.title">
                                <template #content>{{ item.title }}</template>
                                <a :href="item.tiktokVideoUrl" target="_blank">
                                    <img :src="item.newCoverUrl" alt="" v-if="item.newCoverUrl" />
                                    <img src="@/assets/images/video_bg.jpg" alt="" v-else />
                                    <div class="bg"></div>
                                    <p class="video_data item1">
                                        <i class="iconfont icon-yanjing_xianshi"></i>
                                        <span>{{ formatNumber(item.views) }}</span>
                                    </p>
                                    <p class="video_data item2">
                                        <i class="iconfont icon-dianzan"></i>
                                        <span>{{ formatNumber(item.like) }}</span>
                                    </p>
                                    <p class="video_data item3">
                                        <i class="iconfont icon-xiaoxi"></i>
                                        <span>{{ formatNumber(item.comment) }}</span>
                                    </p>
                                    <p class="video_data item4">
                                        <i class="iconfont icon-fenxiang"></i>
                                        <span>{{ formatNumber(item.share) }}</span>
                                    </p>

                                    <div class="play_btn">
                                        <i class="iconfont icon-shipinbofangshibofang play"></i>
                                    </div>
                                </a>
                            </el-tooltip>

                            <a :href="item.tiktokVideoUrl" target="_blank" v-else>
                                <img :src="item.newCoverUrl" alt="" v-if="item.newCoverUrl" />
                                <img src="@/assets/images/video_bg.jpg" alt="" v-else />
                                <div class="bg"></div>
                                <p class="video_data item1">
                                    <i class="iconfont icon-yanjing_xianshi"></i>
                                    <span>{{ formatNumber(item.views) }}</span>
                                </p>
                                <p class="video_data item2">
                                    <i class="iconfont icon-dianzan"></i>
                                    <span>{{ formatNumber(item.like) }}</span>
                                </p>
                                <p class="video_data item3">
                                    <i class="iconfont icon-xiaoxi"></i>
                                    <span>{{ formatNumber(item.comment) }}</span>
                                </p>
                                <p class="video_data item4">
                                    <i class="iconfont icon-fenxiang"></i>
                                    <span>{{ formatNumber(item.share) }}</span>
                                </p>
                                <div class="play_btn">
                                    <i class="iconfont icon-shipinbofangshibofang play"></i>
                                </div>
                            </a>
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <div class="pagination">
            <div class="placeholder"></div>
            <el-pagination background layout="prev, pager, next" :total="100" v-model:current-page="expertSearchList.page" @current-change="changePage" />
        </div>

        <!-- 收藏对话框 -->
        <favElDialog :dialogFormVisible="dialogFormVisible" @dialogClose="dialogCloseDef" @submitCollect="submitCollect"></favElDialog>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { reqExpertList, reqCollect } from '@/api/expert/expertSearch'
import { reqCancelCollect } from '@/api/expert/expertInfo'
import { formatNumber, formatEngagementRate } from '@/utils/formatNumber'
import useExpertSearchList from '@/store/modules/expertSearchList'
import useSystemStore from '@/store/modules/system'
import goScrollTop from '@/utils/goScrollTop'
import favElDialog from '@/components/favElDialog/index.vue'
import { ElMessage } from 'element-plus'

const expertSearchList = useExpertSearchList()
const systemStore = useSystemStore()

// 达人列表数据
const tableData = ref([])
const nowId = ref()

onMounted(() => {
    getExpertList()
})

watch(expertSearchList.reqData, () => {
    getExpertList()
})

// 获取达人列表
const getExpertList = async () => {
    expertSearchList.searchLoading = true

    let res: any = await reqExpertList(expertSearchList.reqData)
    if (res.code == '00000') {
        tableData.value = res.result
        // 添加国家code 对应的中文名称
        tableData.value.forEach((item: any) => {
            systemStore.contry.forEach((contry: { code: any; name_cn: any }) => {
                if (item.countryCode == contry.code) {
                    Object.assign(item, { name_cn: contry.name_cn })
                }
            })
        })
        expertSearchList.searchLoading = false
    }
}

// 达人排序数据
const expertSelect = ref('')
const options = [
    {
        value: '1',
        label: '粉丝数',
    },
    {
        value: '2',
        label: '互动率',
    },
    {
        value: '3',
        label: '平均播放量',
    },
]
// 更改排序
const changetop = (value: number) => {
    expertSearchList.reqData.sortType = +value
}

// 点击收藏
const collectExpert = async (id: number, favInfo: any) => {
    if (favInfo && favInfo.status == 1) {
        await reqCancelCollect(favInfo.id)
        getExpertList()
        ElMessage.success('取消收藏')
    } else {
        nowId.value = id
        dialogFormVisible.value = true
    }
}
// 控制收藏对话框 显示 or 隐藏
const dialogFormVisible = ref(false)

// 关闭收藏对话框
const dialogCloseDef = () => {
    dialogFormVisible.value = false
}

// 点击对话框 确定收藏
const submitCollect = async () => {
    const res: any = await reqCollect(nowId.value)
    if (res.code === '00000') {
        getExpertList()
        ElMessage.success('收藏成功')
        dialogFormVisible.value = false // 隐藏对话框
    }
}

// 点击达人 跳转达人详情
const setUserName = (userName: string) => {
    localStorage.setItem('userName', userName) // 存贮userName
}

// 切换分页
const changePage = (value: number) => {
    expertSearchList.page = value
    goScrollTop()
}
</script>

<style lang="scss">
.expert_list {
    .el-select {
        width: 120px;
    }
    .el-tag {
        margin-right: 5px;
    }
    // 分页
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
    // 收藏对话框 单选框
    // .el-radio-group {
    //     display: block;
    //     .el-radio__label {
    //         display: flex;
    //         flex-grow: 1;
    //         justify-content: space-between;
    //     }
    // }
}
</style>
<style scoped lang="scss">
.expert_list {
    margin-top: 28px;
    padding: 0 20px 20px 20px;
    background-color: #fff;
    position: relative;
    .checkAll {
        position: absolute;
        left: 0;
        top: 0;
    }
    // 达人信息左边部分
    .expert_message {
        width: 100%;
        display: flex;
        cursor: pointer;
        text-decoration: none;
        .expert_head {
            position: relative;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin: 5px 25px 0 0;
            .head_img {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                border: 1px solid #f3f3f3;
            }
            .collect {
                position: absolute;
                cursor: pointer;
                width: 41px;
                height: 41px;
                bottom: -6px;
                right: -8px;
                background: rgba(247, 247, 247, 1);
                box-shadow: 4px 4px 15px #000;
                border-radius: 50%;
                text-align: center;
                line-height: 41px;
                i {
                    font-size: 28px;
                }
                .trueCollect {
                    color: $base-theme-color;
                }
            }
            .collect:hover i {
                color: $base-theme-color;
            }
        }
        .expert_details {
            flex-grow: 1;
            h4 {
                font-size: 18px;
                font-weight: 700;
                color: rgba(0, 0, 0, 1);
            }
            .details_country {
                margin: 5px 0 14px 0;
                i {
                    font-size: 12px;
                    font-weight: bold;
                    color: #050505;
                    margin-right: 5px;
                }
                span {
                    font-size: 16px;
                    color: rgba(0, 0, 0, 1);
                }
            }
            .details_data {
                display: flex;
                .details_data_item {
                    padding: 3px 0 3px 10px;
                    width: 90px;
                    margin-bottom: 14px;
                    border-left: 1px solid rgba(229, 229, 229, 1);
                    p {
                        font-size: 18px;
                        color: rgba(98, 70, 234, 1);
                    }
                    span {
                        font-size: 14px;
                        color: rgba(128, 128, 128, 1);
                    }
                }
            }
        }
    }
    // 达人信息 右边部分
    .expert_video {
        display: flex;
        justify-content: space-between;

        .video_item {
            position: relative;
            cursor: pointer;
            width: 120px;
            height: 160px;
            a {
                display: block;
            }
            img {
                width: 120px;
                height: 160px;
            }
            .bg {
                position: absolute;
                width: 120px;
                height: 160px;
                top: 0;
                left: 0;
                background-color: rgba(0, 0, 0, 0.2);
                transition: all 0.3s;
            }
            .video_data {
                position: absolute;
                font-size: 12px;
                color: #fff;
                font-weight: bold;
                text-align: left;
                i {
                    margin: 0 5px;
                }
            }
            .item1 {
                top: 6px;
            }
            .item2 {
                top: 27px;
            }

            .item3 {
                top: 50px;
            }
            .item4 {
                top: 71px;
            }
            .play_btn {
                position: absolute;
                width: 30px;
                height: 30px;
                bottom: 10px;
                right: 10px;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.3);
                transition: all 0.3s;
            }
            .play {
                position: absolute;
                bottom: 4px;
                right: 5px;
                color: #fff;
                font-size: 18px;
            }
        }
        .video_item:hover .play {
            color: #ff6e6c;
        }
        .video_item:hover .bg {
            background-color: rgba(0, 0, 0, 0.4);
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
}
</style>
