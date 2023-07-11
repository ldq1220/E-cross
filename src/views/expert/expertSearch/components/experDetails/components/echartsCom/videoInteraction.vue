<template>
    <div style="background-color: #fff; padding: 20px; margin-bottom: 20px; width: 100%">
        <div id="videoInteraction" style="width: 100%; height: 500px"></div>
        <div class="video_tooltip">视频的互动(包括播放、点赞、评论、分享)，时区为达人频道的时区</div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import { reqExpertEngagement } from '@/api/expert/expertInfo'
import { formatNumber } from '@/utils/formatNumber'
import { dayjs } from 'element-plus'
import { useRoute } from 'vue-router'

const route = useRoute()

let option: object
let influencerId = ref()
let myChart: any

onMounted(() => {
    influencerId.value = route.query.id

    setTimeout(() => {
        getEcharts(influencerId.value)
    }, 0)
})

const getEcharts = async (influencerId: string) => {
    let res: any = await reqExpertEngagement(influencerId)
    let XAxisData: any = [] // x轴坐标
    let comment: any = [] // 评论数
    let engagement: any = [] // 互动数
    let views: any = [] // 播放量
    let share: any = [] // 分享数
    let like: any = [] //点赞量

    res.result.forEach((item: { createdAt: any; comment: any; engagement: any; views: any; share: any; like: any }, index: string | number) => {
        XAxisData[index] = dayjs.unix(item.createdAt).format('YYYY-MM-DD')
        comment[index] = item.comment
        engagement[index] = Math.min(100, parseInt('' + (item.engagement / item.views) * 100)) // 计算互动分数
        views[index] = item.views
        share[index] = item.share
        like[index] = item.like
    })
    const chartDom = document.getElementById('videoInteraction')
    myChart = echarts.init(chartDom as any)
    const colors = ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#93CFE6']
    option = {
        title: {
            text: '视频互动',
        },
        color: colors,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
            },
            formatter: (params: any[]) => {
                // 构建 tooltip 内容
                const { name } = params[0].data
                let Interaction = params.pop()
                const tem = params
                    .map(
                        (item: any, index: any) => `
                                <div :key="${index}" style="display: flex;margin: 10px 0;">
                                    <span style="display: inline-block; transform: translateY(4px); width: 15px; height: 15px; border-radius: 50%; background-color: ${item.color};"></span>
                                    <div style="font-size: 14px;margin: 0 20px 0 5px">${item.seriesName}</div>
                                    <div style="font-size: 14px;font-weight: bold;color:#666666">${formatNumber(item.value)}</div>
                                </div>
                        `,
                    )
                    .join('')
                const tooltipHtml = `
                    <div style="display: flex; align-items: center;">
                        <img src="https://picsum.photos/50/50?random=${name}" alt="" width="100" height="150">
                        <div style="margin-left:20px;">
                            <div>${params[0].axisValue}</div>
                            ${tem}
                            <div :key="${Interaction.value}" style="display: flex;margin: 10px 0;">
                                <span style="display: inline-block; transform: translateY(4px); width: 15px; height: 15px; border-radius: 50%; background-color: ${Interaction.color};"></span>
                                <div style="font-size: 14px;margin: 0 20px 0 5px">${Interaction.seriesName}</div>
                                <div style="font-size: 14px;font-weight: bold;color:#666666">${Interaction.value}%</div>
                            </div>
                        </div>
                    </div>
                `
                return tooltipHtml
            },
        },
        grid: {
            right: '20%',
            top: '20%',
        },
        legend: {
            data: ['播放量', '点赞数', '评论数', '分享数', '互动率'],
            top: '5%',
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true,
                },
                // prettier-ignore
                data: XAxisData,
            },
        ],
        yAxis: [
            {
                show: false,
                type: 'value',
                name: 'Evaporation',
                position: 'right',
                alignTicks: true,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: colors[0],
                    },
                },
                axisLabel: {
                    formatter: '{value} ml',
                },
            },
            {
                type: 'value',
                name: '播放量',
                position: 'left',
                alignTicks: true,
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#9D9FA5',
                    },
                },
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisLabel: {
                    formatter: function (value: number) {
                        let num: number = value / 10000
                        return `${num}万`
                    },
                },
            },
            {
                type: 'value',
                name: '互动率',
                position: 'right',
                alignTicks: true,
                offset: 30,
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#9D9FA5',
                    },
                },
                axisLabel: {
                    formatter: '{value}%',
                },
            },
        ],
        series: [
            {
                name: '播放量',
                type: 'bar',
                yAxisIndex: 1,
                data: views,
            },
            {
                name: '点赞数',
                type: 'bar',
                yAxisIndex: 1,
                data: like,
            },
            {
                name: '评论数',
                type: 'bar',
                yAxisIndex: 1,
                data: comment,
            },
            {
                name: '分享数',
                type: 'bar',
                yAxisIndex: 1,
                data: share,
            },
            {
                name: '互动率',
                type: 'line',
                yAxisIndex: 2,
                data: engagement,
            },
        ],
    }
    myChart.setOption(option as any)
}
</script>

<style scoped lang="scss">
.video_tooltip {
    font-size: 12px;
    font-weight: 400;
    color: rgba(166, 166, 166, 1);
}
</style>
