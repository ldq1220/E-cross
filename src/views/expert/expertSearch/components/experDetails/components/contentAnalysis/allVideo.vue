<template>
    <div class="all_video">
        <!-- 顶部容器 -->
        <el-row>
            <h3>近30个视频列表</h3>
        </el-row>
        <!-- 视频总数据 -->
        <div class="video_data">
            <div class="video_data_item play_num">
                <div class="icon_box">
                    <span class="iconfont icon-yanjing"></span>
                </div>
                <div class="data_box">
                    <p>{{ formatNumber(totalNum.totalView) }}</p>
                    <span>总播放量</span>
                </div>
            </div>
            <div class="video_data_item like_num">
                <div class="icon_box">
                    <span class="iconfont icon-dianzan_kuai"></span>
                </div>
                <div class="data_box">
                    <p>{{ formatNumber(totalNum.totalLike) }}</p>
                    <span>总点赞数</span>
                </div>
            </div>
            <div class="video_data_item comment_num">
                <div class="icon_box">
                    <span class="iconfont icon-pinglun"></span>
                </div>
                <div class="data_box">
                    <p>{{ formatNumber(totalNum.totalComment) }}</p>
                    <span>总评论数</span>
                </div>
            </div>
            <div class="video_data_item share_num">
                <div class="icon_box">
                    <span class="iconfont icon-htmal5icon20"></span>
                </div>
                <div class="data_box">
                    <p>{{ formatNumber(totalNum.totalShare) }}</p>
                    <span>总分享数</span>
                </div>
            </div>
        </div>
        <!-- 视频数据列表 -->
        <el-table :data="tableData" style="width: 100%" height="500px" :header-cell-style="{ background: '#F7F7F7', color: '#606266' }">
            <el-table-column prop="video" label="视频" width="500">
                <template #default="scope">
                    <div class="video_info">
                        <!-- 视频缩略图 -->
                        <div class="video_pic">
                            <!-- <img src="@/assets/images/bg.png" alt="" /> -->
                            <a :href="scope.row.tiktokVideoUrl" target="_blank">
                                <img :src="scope.row.coverKey" alt="" class="coverUrl" />
                                <div class="bg"></div>
                                <div class="play_btn">
                                    <i class="iconfont icon-shipinbofangshibofang play"></i>
                                </div>
                            </a>
                        </div>
                        <!-- 视频文案 -->
                        <div class="video_text">
                            <el-tooltip placement="top" popper-class="tool-tip">
                                <template #content>
                                    {{ scope.row.title }}
                                </template>
                                <h3>
                                    {{ scope.row.title }}
                                </h3>
                            </el-tooltip>
                            <!-- 视频发布时间 -->
                            <p class="video_time">
                                <span style="margin-right: 20px">{{ dayjs.unix(scope.row.createTime).format('HH:mm') }}</span>
                                <span>{{ dayjs.unix(scope.row.createTime).format('YYYY-MM-DD') }}</span>
                            </p>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="engagementRage" label="互动率" align="center" sortable>
                <template #default="scope">{{ formatEngagementRate(scope.row.engagementRage) }}%</template>
            </el-table-column>
            <el-table-column prop="views" label="播放量" align="center" sortable>
                <template #default="scope">
                    {{ formatNumber(scope.row.views) }}
                </template>
            </el-table-column>
            <el-table-column prop="like" label="点赞数" align="center" sortable>
                <template #default="scope">
                    {{ formatNumber(scope.row.like) }}
                </template>
            </el-table-column>
            <el-table-column prop="comment" label="评论数" align="center" sortable>
                <template #default="scope">
                    {{ formatNumber(scope.row.comment) }}
                </template>
            </el-table-column>
            <el-table-column prop="share" label="分享数" align="center" sortable>
                <template #default="scope">
                    {{ formatNumber(scope.row.share) }}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { reqExpertVideoList } from '@/api/expert/expertInfo'
import { dayjs } from 'element-plus'
import { formatNumber, formatEngagementRate } from '@/utils/formatNumber'
import { useRoute } from 'vue-router'

const route = useRoute()

const influencerId = ref()
const page = ref(1)
// 视频列表数据
const tableData: any = ref()
let totalNum = reactive({
    totalComment: null,
    totalLike: null,
    totalShare: null,
    totalView: null,
})

onMounted(() => {
    influencerId.value = route.query.id
    setTimeout(() => {
        getExpertVideoList()
    }, 0)
})

// 获取视频列表数据，并将其存储到变量tableData中。
const getExpertVideoList = async () => {
    let data = { page: page.value, limit: 30, influencerId: parseInt(influencerId.value) }
    let res: any = await reqExpertVideoList(data)
    if (res.code == '00000') {
        tableData.value = res.result.videos
        Object.assign(totalNum, {
            totalComment: res.result.totalComment,
            totalLike: res.result.totalLike,
            totalShare: res.result.totalShare,
            totalView: res.result.totalView,
        })
        // console.log( tableData.value);
    }
}
</script>

<style lang="scss">
// .all_video {
.el-table tr {
    cursor: pointer !important;
}
// }
</style>
<style lang="scss" scoped>
.all_video {
    border-radius: 5px;
    padding: 25px 15px 10px 25px;
    background: rgba(255, 255, 255, 1);

    h3 {
        font-size: 16px;
        font-weight: 700;
        color: rgba(56, 56, 56, 1);
    }

    .el-select {
        width: 120px;
    }

    .video_data {
        display: flex;
        justify-content: space-around;
        padding-bottom: 25px;
        margin: 25px 0;
        border-bottom: 1px solid rgba(229, 229, 229, 1);

        .video_data_item {
            display: flex;
            .icon_box {
                display: block;
                width: 45px;
                height: 45px;
                line-height: 45px;
                text-align: center;
                border-radius: 5px;
                margin-right: 15px;
                background: rgba(247, 247, 247, 1);
                cursor: pointer;
                .iconfont {
                    font-size: 25px;
                }
            }

            .data_box {
                p {
                    font-size: 18px;
                    font-weight: 400;
                    margin-bottom: 10px;
                    color: rgba(56, 56, 56, 1);
                }

                span {
                    font-size: 12px;
                    font-weight: 400;
                    color: rgba(128, 128, 128, 1);
                }
            }
        }
        .video_num .iconfont {
            color: rgba(122, 158, 159, 1);
        }
        .play_num .iconfont {
            color: rgba(235, 94, 40, 1);
        }
        .like_num .iconfont {
            color: rgba(243, 187, 69, 1);
        }
        .comment_num .iconfont {
            color: rgba(78, 89, 105, 1);
        }
        .share_num .iconfont {
            color: rgba(78, 89, 105, 1);
        }
    }

    .video_info {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .video_pic {
            position: relative;
            cursor: pointer;
            width: 60px;
            height: 80px;
            margin-right: 27px;
            background-size: cover;
            img {
                width: 60px;
                height: 80px;
            }

            .bg {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background-color: rgba(0, 0, 0, 0.2);
                transition: all 0.3s;
            }

            .play_btn {
                position: absolute;
                width: 30px;
                height: 30px;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                margin: auto;
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

        .video_pic:hover .play {
            color: $base-theme-color;
        }

        .video_pic:hover .bg {
            background-color: rgba(0, 0, 0, 0.4);
        }

        .video_text {
            width: 85%;

            h3 {
                height: 50px;
                font-size: 14px;
                line-height: 25px;
                color: rgba(56, 56, 56, 1);
                display: -webkit-box;
                word-break: break-all;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .video_time {
                font-size: 12px;
                padding-left: 10px;
                margin-top: 15px;
                color: #666;
            }
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
</style>

<style lang="scss">
.tool-tip {
    max-width: 400px;
}
</style>
