<template>
    <div class="content_data">
        <h3>视频数据</h3>
        <div class="data_box">
            <div class="card" v-show="false">
                <span class="tag">
                    <el-tag type="danger" round>直播</el-tag>
                </span>
                <h4>直播视频数</h4>
                <p></p>
                <el-tooltip placement="top">
                    <template #content>近30天内达人的电商直播间总数量</template>
                    <span class="tooltip_text">近30天内达人的电商直播间总数量</span>
                </el-tooltip>
            </div>
            <div class="card" v-show="false">
                <span class="tag">
                    <el-tag type="danger" round>直播</el-tag>
                </span>
                <h4>直播GPM</h4>
                <p></p>
                <el-tooltip placement="top">
                    <template #content>千次直播 GMV (GPM) 表示每 1000 次直播视频播放量所产生的商品交易总额</template>
                    <span class="tooltip_text">千次直播 GMV (GPM) 表示每 1000 次直播视频播放量所产生的商品交易总额</span>
                </el-tooltip>
            </div>
            <div class="card" v-show="false">
                <span class="tag">
                    <el-tag type="danger" round>直播</el-tag>
                </span>
                <h4>直播平均观众数</h4>
                <p></p>
                <el-tooltip placement="top">
                    <template #content>近30天内达人的电商直播视频平均观众数</template>
                    <span class="tooltip_text">近30天内达人的电商直播视频平均观众数</span>
                </el-tooltip>
            </div>
            <div class="card" v-show="false">
                <span class="tag">
                    <el-tag type="danger" round>直播</el-tag>
                </span>
                <h4>直播平均点赞数</h4>
                <p></p>
                <el-tooltip placement="top">
                    <template #content>近30天内达人的电商直播间收到的平均点赞数</template>
                    <span class="tooltip_text">近30天内达人的电商直播间收到的平均点赞数</span>
                </el-tooltip>
            </div>
            <div class="card" v-show="false">
                <span class="tag">
                    <el-tag type="danger" round>直播</el-tag>
                </span>
                <h4>直播平均评论数</h4>
                <p></p>
                <el-tooltip placement="top">
                    <template #content>近30天内达人的电商直播间收到的平均评论数</template>
                    <span class="tooltip_text">近30天内达人的电商直播间收到的平均评论数</span>
                </el-tooltip>
            </div>
        </div>

        <div class="data_box">
            <div class="card">
                <span class="tag">
                    <el-tag type="success" round>视频</el-tag>
                </span>
                <h4>平均播放量</h4>
                <p>{{ formatNumber(contentData.avgViewsPerVideo) }}</p>
                <el-tooltip placement="top">
                    <template #content>达人近10个视频的平均播放量 (平均播放量=总播放量/视频数)</template>
                    <span class="tooltip_text">达人近10个视频的平均播放量 (平均播放量=总播放量/视频数)</span>
                </el-tooltip>
            </div>
            <div class="card">
                <span class="tag">
                    <el-tag type="success" round>视频</el-tag>
                </span>
                <h4>互动率</h4>
                <p>{{ formatEngagementRate(contentData.engagementRate) }}%</p>
                <el-tooltip placement="top">
                    <template #content>达人近10个视频平均互动率（互动率=点赞数+评论数+分享数/播放量</template>
                    <span class="tooltip_text">达人近10个视频平均互动率（互动率=点赞数+评论数+分享数/播放量</span>
                </el-tooltip>
            </div>
            <div class="card" v-show="false">
                <span class="tag">
                    <el-tag type="success" round>视频</el-tag>
                </span>
                <h4>视频GPM</h4>
                <p></p>
                <el-tooltip placement="top">
                    <template #content>千次视频 GMV (GPM) 表示每 1000 次短视频播放量所产生的商品交易总额。</template>
                    <span class="tooltip_text">千次视频 GMV (GPM) 表示每 1000 次短视频播放量所产生的商品交易总额。</span>
                </el-tooltip>
            </div>
            <div class="card">
                <span class="tag">
                    <el-tag type="success" round>视频</el-tag>
                </span>
                <h4>完播率</h4>
                <p>{{ formatEngagementRate(contentData.avgVideoCompletionRate) }}%</p>
                <el-tooltip placement="top">
                    <template #content>达人近 30 个视频完播率（完播率=完整播放视频的次数/视频观看总数（平均值）</template>
                    <span class="tooltip_text">达人近 30 个视频完播率（完播率=完整播放视频的次数/视频观看总数（平均值）</span>
                </el-tooltip>
            </div>
            <div class="flag"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { reqExpertContentStats } from '@/api/expert/expertInfo'
import { formatNumber, formatEngagementRate } from '@/utils/formatNumber'

let contentData = reactive({
    engagementRate: null,
    avgViewsPerVideo: null,
    avgVideoCompletionRate: null,
})

const route = useRoute()
onMounted(async () => {
    let id: any = route.query.id
    let res: any = await reqExpertContentStats(id)
    if (res.code == '00000') return Object.assign(contentData, res.result)
})
</script>

<style lang="scss" scoped>
.content_data {
    border-radius: 5px;
    padding: 15px 20px 0px 20px;
    margin-bottom: 25px;
    min-width: 920px;
    background-color: #fff;

    h3 {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 20px;
        color: rgba(56, 56, 56, 1);
    }
    .video_Data {
        margin-top: 40px;
    }

    .data_box {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .card {
            position: relative;
            border-radius: 5px;
            padding: 25px 40px 20px 20px;
            background: rgba(247, 247, 247, 1);
            margin-bottom: 30px;
            cursor: pointer; /* 鼠标移入时显示手型 */
            .tag {
                position: absolute;
                text-align: center;
                top: 10px;
                right: 10px;
                font-size: 14px;
            }
            h4 {
                font-size: 14px;
                font-weight: 400;
                color: rgba(128, 128, 128, 1);
            }

            p {
                font-size: 24px;
                font-weight: 400;
                margin: 15px 0;
                color: $base-theme-color;
            }

            .tooltip_text {
                font-size: 12px;
                font-weight: 400;
                color: rgba(166, 166, 166, 1);
                display: inline-block;
                width: 160px; /* 设置span宽度 */
                overflow: hidden;
                white-space: nowrap; /* 防止文本换行 */
                text-overflow: ellipsis; /* 文本超出显示省略号 */
            }
        }
        .flag {
            width: 220px;
        }
    }
}
</style>
