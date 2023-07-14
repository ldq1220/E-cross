<template>
    <div class="ecommerce_video">
        <!-- 顶部容器 -->
        <el-row>
            <h3 class="title_text">电商视频</h3>
        </el-row>

        <!-- 视频数据列表 -->

        <el-table :data="tableData" style="width: 100%" :header-cell-style="{ background: '#F7F7F7', color: '#606266' }">
            <el-table-column prop="video" label="视频简介" width="500" header-align="center">
                <template #default="scope">
                    <div class="video_info">
                        <!-- 视频缩略图 -->
                        <div class="video_pic">
                            <!-- <img src="@/assets/images/bg.png" alt="" /> -->
                            <a :href="scope.row.videoUrl" target="_blank" class="img_box">
                                <img :src="scope.row.coverUrl" alt="" class="coverUrl" />
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
            <el-table-column prop="views" label="播放量" align="center">
                <template #default="scope">
                    {{ formatNumber(scope.row.views) }}
                </template>
            </el-table-column>
            <el-table-column prop="like" label="点赞数" align="center">
                <template #default="scope">
                    {{ formatNumber(scope.row.like) }}
                </template>
            </el-table-column>
            <el-table-column prop="comment" label="评论数" align="center">
                <template #default="scope">
                    {{ formatNumber(scope.row.comment) }}
                </template>
            </el-table-column>
            <el-table-column prop="share" label="分享数" align="center">
                <template #default="scope">
                    {{ formatNumber(scope.row.share) }}
                </template>
            </el-table-column>
            <el-table-column prop="share" label="发布日期" align="center">
                <template #default="scope">
                    {{ formatNumber(scope.row.share) }}
                </template>
            </el-table-column>

            <!-- 展开行 -->
            <el-table-column type="expand" width="100">
                <template #default="">
                    <div class="sellGoods">
                        <el-table :highlight-current-row="true" :data="tableData" style="width: 90%; margin: 0 auto" :header-cell-style="{ background: '#F7F7F7', color: '#606266' }">
                            <el-table-column prop="video" label="商品标题" width="700" header-align="center">
                                <template #default="scope">
                                    <div class="video_info">
                                        <!-- 视频缩略图 -->
                                        <div class="video_pic video_pic_box">
                                            <!-- <img src="@/assets/images/bg.png" alt="" /> -->
                                            <a :href="scope.row.videoUrl" target="_blank" class="img_box good_box">
                                                <!-- <img :src="scope.row.coverUrl" alt="" class="coverUrl" /> -->
                                                <img src="@/assets/images/good.png" alt="" class="coverUrl good" />
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
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="views" label="价格" align="center">
                                <template #default="scope">
                                    {{ formatNumber(scope.row.views) }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="like" label="总售卖量" align="center">
                                <template #default="scope">
                                    {{ formatNumber(scope.row.like) }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="comment" label="预计售卖量" align="center">
                                <template #default="scope">
                                    {{ formatNumber(scope.row.comment) }}
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { dayjs } from 'element-plus'
import { formatNumber } from '@/utils/formatNumber'

// const page = ref(1)
// 视频列表数据
const tableData: any = ref([
    {
        id: 789127,
        itemId: '7236484543111367941',
        title: '🙇🏻‍♂️',
        comment: 4259,
        engagement: 1420412,
        videoUrl:
            'https://v19.tiktokcdn-us.com/dcd572f9c024c667de6f86a59bb301a5/648a91b5/video/tos/useast2a/tos-useast2a-ve-0068c003/ost9tTsAgQAhIzo8FbzckyEGNIBQDKI7pfWCpU/?a=1233&ch=0&cr=0&dr=0&lr=all&cd=0%7C0%7C0%7C0&cv=1&br=1588&bt=794&cs=0&ds=3&ft=t5PLr-Inz7T2K_0fiyq8Z&mime_type=video_mp4&qs=0&rc=OTk2ODpmZGY1ZGY1Njg1ZUBpM3ZxODg6ZnBsazMzNzczM0A1YV4tLWA0XjYxYTRjX19jYSNfMzRycjRfZGpgLS1kMTZzcw%3D%3D&l=20230614222058987E32A477BA52FB367C&btag=e00000000',
        views: 6342179,
        share: 17546,
        coverUrl:
            'https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/3829d26a29cb4585b91b0e9823a82621_1684875360~c5_300x400.jpeg?x-expires=1686866400&x-signature=2YY3mf7RLvTpuZwHpaRYM%2BBwD6g%3D&s=AWEME_DETAIL&se=false&sh=&sc=cover&l=20230614222058987E32A477BA52FB367C',
        like: 1398607,
        createTime: '1684875359',
        engagementRage: 0.2239627736776272,
    },
    {
        id: 789124,
        itemId: '7215368942875921669',
        title: '3811mm 40mm 42mm 44mm 41mm 45mm Luxury TPU protector Iwatch Luminous Cover For Apple Watch case series 1/2/3/4/5/6/7',
        comment: 720,
        engagement: 937509,
        videoUrl:
            'https://v19.tiktokcdn-us.com/c06cffe7069136b858bb05c14ded6d5b/648061a5/video/tos/useast2a/tos-useast2a-pve-0068/ooC2QNZLzgkyfo2CmihQRvIIEAkUkhFoF1INHA/?a=1233&ch=0&cr=0&dr=0&lr=all&cd=0%7C0%7C0%7C0&cv=1&br=3442&bt=1721&cs=0&ds=3&ft=t5PLr-Inz7T4bZufiyq8Z&mime_type=video_mp4&qs=0&rc=NTo2N2Q2NTg0MzxoNmU6OkBpanNyNTg6Zm01ajMzNzczM0AxXzExMWBhX2AxMWBgXzUyYSNkXnJmcjQwNGVgLS1kMTZzcw%3D%3D&l=202306070453173B9A455E60F14651FBC3&btag=e00000000',
        views: 5254381,
        share: 3390,
        coverUrl:
            'https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/3be926e894cf437788cd43c2c7efbb3b_1679959002~c5_300x400.jpeg?x-expires=1686196800&x-signature=E%2BxNu3UrhEqWW%2Fhdo42rqWlG780%3D&s=AWEME_DETAIL&se=false&sh=&sc=cover&l=202306070453173B9A455E60F14651FBC3',
        like: 933399,
        createTime: '1679959001',
        engagementRage: 0.17842425206698942,
    },
    {
        id: 3485330,
        itemId: '7241288390317051141',
        title: '3811mm 40mm 42mm 44mm 41mm 45mm Luxury TPU protector Iwatch Luminous Cover For Apple Watch case series 1/2/3/4/5/6/7',
        comment: 2738,
        engagement: 378076,
        videoUrl: 'https://sf16-ies-music-va.tiktokcdn.com/obj/musically-maliva-obj/7222695982582123270.mp3',
        views: 2768123,
        share: 1396,
        coverUrl:
            'https://p16-sign-va.tiktokcdn.com/tos-maliva-i-photomode-us/769e8c273a8848a89f2ce1b26698218b~tplv-photomode-image.jpeg?from=photomode.AWEME_DETAIL&x-expires=1688076000&x-signature=YxAI8ncABeap5%2FPGHg9MSQe319s%3D',
        like: 373942,
        createTime: '1685993842',
        engagementRage: 0.13658208107081946,
    },
])

onMounted(() => {
    setTimeout(() => {
        // 修改展开行图表内容
        let cell: any = document.querySelector('.ecommerce_video')?.querySelectorAll('.el-table__expand-icon')
        for (let index = 0; index < cell.length; index++) {
            cell[index].innerHTML = `<i class="iconfont icon-zhankai-"></i> <span >查看商品</span>`
        }
    }, 0)
})
</script>

<style lang="scss">
.ecommerce_video {
    .el-table tr {
        cursor: pointer !important;
    }
    .sellGoods {
        .el-table__row {
            background-color: var(--el-fill-color-light);
            // background-color: #E5E5E5;
        }
    }
    .el-table__expand-icon {
        display: inline-block;
        color: #eb5328;
        .iconfont {
            transition: transform var(--el-transition-duration-fast) ease-in-out;
            font-size: 12px;
            margin-right: 5px;
        }
    }
    .el-table__expand-icon--expanded {
        transform: rotate(0deg);
    }
    .el-table__expand-icon--expanded .iconfont {
        display: inline-block;
        transform: rotate(90deg);
    }
}
</style>
<style lang="scss" scoped>
.ecommerce_video {
    border-radius: 5px;
    padding: 25px 15px 10px 25px;
    background: rgba(255, 255, 255, 1);

    .title_text {
        margin-bottom: 20px;
    }

    h3 {
        font-size: 16px;
        font-weight: 700;
        color: rgba(56, 56, 56, 1);
    }

    .el-select {
        width: 120px;
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
            .img_box {
                display: inline-block;
                width: 60px;
                height: 80px;
            }
            .good_box {
                width: 90px;
                height: 90px;
            }
            img {
                width: 60px;
                height: 80px;
            }
            .good {
                width: 90px;
                height: 90px;
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
        .video_pic_box {
            height: 90px;
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
