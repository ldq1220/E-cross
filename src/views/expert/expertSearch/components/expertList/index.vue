<template>
    <div class="expert_list">
        <el-table class="expert_table" ref="multipleTableRef" :data="tableData" style="width: 100%">
            <el-table-column type="selection" width="50" label="全选" />
            <!-- 达人信息左边部分 -->
            <el-table-column property="name" label="">
                <template #default="scope">
                    <div class="expert_message" @click="gotoDetails">
                        <div class="expert_head">
                            <img src="@/assets/images/head.png" alt="" class="head_img" />
                            <div class="collect" @click="collectExpert">
                                <i class="iconfont icon-shoucang1" v-show="!isCollect"></i>
                                <i class="iconfont icon-shoucang trueCollect" v-show="isCollect"></i>
                            </div>
                        </div>
                        <div class="expert_details">
                            <h4>Miss.BigLiu</h4>
                            <p class="details_country">
                                <i class="iconfont icon-weizhi"></i>
                                <span>英国</span>
                            </p>
                            <div class="details_data">
                                <div class="details_data_item">
                                    <p>3,470万</p>
                                    <span>粉丝数</span>
                                </div>
                                <div class="details_data_item">
                                    <p>16亿</p>
                                    <span>总点赞数</span>
                                </div>
                                <div class="details_data_item">
                                    <p>1.7亿</p>
                                    <span>平均播放量</span>
                                </div>
                                <div class="details_data_item">
                                    <p>6.21%</p>
                                    <span>互动率</span>
                                </div>
                            </div>
                            <el-tag class="ml-2" type="danger">beauty</el-tag>
                            <el-tag class="ml-2" type="danger">food</el-tag>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <!-- 达人信息右边部分 -->
            <el-table-column property="address" align="right" width="400px">
                <template #header width="20px">
                    <el-select class="m-2" placeholder="默认排序">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </template>

                <template #default="scope">
                    <div class="expert_video">
                        <div class="video_item">
                            <!-- <img src="@/assets/images/bg.png" alt="" /> -->
                            <div class="bg"></div>
                            <p class="video_data item1">
                                <i class="iconfont icon-yanjing_xianshi"></i>
                                <span>378400</span>
                            </p>
                            <p class="video_data item2">
                                <i class="iconfont icon-dianzan"></i>
                                <span>198</span>
                            </p>
                            <p class="video_data item3">
                                <i class="iconfont icon-xiaoxi"></i>
                                <span>235</span>
                            </p>
                            <p class="video_data item4">
                                <i class="iconfont icon-fenxiang"></i>
                                <span>86</span>
                            </p>

                            <div class="play_btn">
                                <i class="iconfont icon-shipinbofangshibofang play"></i>
                            </div>
                        </div>
                        <div class="video_item">
                            <!-- <img src="@/assets/images/bg.png" alt="" /> -->
                            <div class="bg"></div>
                            <p class="video_data item1">
                                <i class="iconfont icon-yanjing_xianshi"></i>
                                <span>378400</span>
                            </p>
                            <p class="video_data item2">
                                <i class="iconfont icon-dianzan"></i>
                                <span>198</span>
                            </p>
                            <p class="video_data item3">
                                <i class="iconfont icon-xiaoxi"></i>
                                <span>235</span>
                            </p>
                            <p class="video_data item4">
                                <i class="iconfont icon-fenxiang"></i>
                                <span>86</span>
                            </p>

                            <div class="play_btn">
                                <i class="iconfont icon-shipinbofangshibofang play"></i>
                            </div>
                        </div>
                        <div class="video_item">
                            <!-- <img src="@/assets/images/bg.png" alt="" /> -->
                            <div class="bg"></div>
                            <p class="video_data item1">
                                <i class="iconfont icon-yanjing_xianshi"></i>
                                <span>378400</span>
                            </p>
                            <p class="video_data item2">
                                <i class="iconfont icon-dianzan"></i>
                                <span>198</span>
                            </p>
                            <p class="video_data item3">
                                <i class="iconfont icon-xiaoxi"></i>
                                <span>235</span>
                            </p>
                            <p class="video_data item4">
                                <i class="iconfont icon-fenxiang"></i>
                                <span>86</span>
                            </p>

                            <div class="play_btn">
                                <i class="iconfont icon-shipinbofangshibofang play"></i>
                            </div>
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// 达人列表数据
const tableData = ref([
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
])
// 达人排序数据
const options = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
]
// 达人是否收藏
let isCollect = ref(false)
// 点击收藏
const collectExpert = () => {
    isCollect.value = !isCollect.value
}

// 点击达人 跳转达人详情
const gotoDetails = () => {
    router.push('/expert/details')
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
            }
            .collect {
                position: absolute;
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
                    color: #e45858;
                }
            }
            .collect:hover i {
                color: #e45858;
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
                    padding: 3px 14px 3px 5px;
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
            background-image: url('@/assets/images/bg.png');
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
}
</style>
