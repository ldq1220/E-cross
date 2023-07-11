<template>
    <div class="content_box">
        <!-- 商品缩略图 -->
        <div class="product_pic">
            <img src="https://img.js.design/assets/img/647f049d275dab5aa216aba2.png#864a98f6fd3e062a8e2fd71aab237bdf" alt=""
                class="product_img" />
        </div>
        <!-- 达人信息 -->
        <div class="product_info">
            <div class="data_box">
                数据更新时间
                <span class="update_time">2023-04-28 15:23:46</span>
                <div class="update">
                    <span class="iconfont icon-shuaxin"></span>
                    更新数据
                </div>
                <el-tooltip placement="top">
                    <template #content>点击后一旦更新完成会通过消息通知您。</template>
                    <span class="iconfont icon-bangzhu frequencyIcon"></span>
                </el-tooltip>
            </div>
            <div class="product_name">3811mm 40mm 42mm 44mm 41mm 45mm Luxury TPU protector Iwatch Luminous Cover For Apple
                Watch case series 1/2/3/4/5/6/7</div>
            <div class="product_score_box">
                <div class="product_sample">
                    <sapn class="iconfont icon-mianfei1"></sapn>
                    <span class="sample_text">免费样品</span>
                </div>
                <div class="product_score">
                    <sapn class="iconfont icon-shoucang2"></sapn>
                    <span class="score">4.6</span>
                    <span class="eval_num">(2367)</span>
                </div>
            </div>
            <!-- 商品数据 -->
            <div class="details_data">
                <div class="details_data_item">
                    <p>58</p>
                    <span>关联达人数</span>
                </div>
                <div class="details_data_item">
                    <p>6.21%</p>
                    <span>佣金率</span>
                </div>
                <div class="details_data_item">
                    <p>345</p>
                    <span>样品申请人数</span>
                </div>
                <div class="details_data_item">
                    <p>25.00 <i class="currency">USD</i></p>
                    <span>互动率</span>
                </div>
                <div class="details_data_item">
                    <p>1.7亿</p>
                    <span>总售卖量</span>
                </div>
                <div class="details_data_item">
                    <p>6.21%</p>
                    <span>预计销售额</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// import { defineExpose, reactive } from 'vue'
// import { formatNumber, formatEngagementRate } from '@/utils/formatNumber'
// import useSystemStore from '@/store/modules/system'

// const systemStore = useSystemStore()

// //数据
// let expertDetail = reactive({
//     nick_name: '',
//     country_code: '',
//     name_cn: '',
//     brief: '',
//     follower_cnt: 0,
//     liked_cnt: 0,
//     avg_views_per_video: 0,
//     engagement_rate: 0,
//     categories: [],
//     avatarKey: '',
// })
// //定义方法  获取父组件请求的数据
// const handler = (data: any) => {
//     Object.assign(expertDetail, data)
//     systemStore.contry.forEach((contry: { code: string; name_cn: any }) => {
//         if (contry.code == expertDetail.country_code) {
//             Object.assign(expertDetail, { name_cn: contry.name_cn })
//         }
//     })
// }
// // 向父组件暴露
// defineExpose({
//     handler,
// })
</script>

<style lang="scss" scoped>
.content_box {
    display: flex;
    min-width: 920px;
    padding: 25px 25px 30px;
    border-radius: 5px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 1)0%, rgba(199, 235, 215, 1) 100%);
    border: 1px solid rgba(228, 88, 88, 0.16);

    .product_pic {
        width: 90px;
        height: 90px;
        margin-right: 30px;

        .product_img {
            width: 90px;
            height: 90px;
        }
    }

    .product_info {
        min-width: 700px;
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
        }

        .product_name {
            max-height: 50px;
            line-height: 25px;
            font-size: 18px;
            font-weight: 700;
            color: rgba(0, 0, 0, 1);
            margin-top: 5px;
            display: -webkit-box;
            word-break: break-all;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .product_score_box {
            display: flex;
            margin-top: 10px;

            .product_sample {
                display: flex;
                align-items: center;
                color: rgba(255, 141, 26, 1);
                margin-right: 30px;
                font-size: 12px;
                cursor: pointer;

                .iconfont {
                    font-size: 22px;
                    margin-right: 5px;
                }

            }

            .product_score {
                display: flex;
                align-items: center;
                font-size: 14px;
                color: rgba(128, 128, 128, 1);
                cursor: pointer;

                .iconfont {
                    font-size: 22px;
                    margin-right: 5px;
                    color: rgba(250, 217, 126, 1);
                }

                .score {
                    margin-right: 5px;
                }
            }
        }
    }

    .details_data {
        display: flex;
        margin-top: 25px;

        .details_data_item {
            padding: 10px 30px 10px 20px;
            border-left: 1px solid rgba(255, 255, 255, 1);

            p {
                font-size: 18px;
                margin-bottom: 10px;
                color: rgba(235, 94, 40, 1);
            }

            span {
                font-size: 14px;
                color: rgba(128, 128, 128, 1);
            }
            .currency{
                font-size: 12px;
                color: rgba(128, 128, 128, 1);
            }
        }
    }
}</style>
