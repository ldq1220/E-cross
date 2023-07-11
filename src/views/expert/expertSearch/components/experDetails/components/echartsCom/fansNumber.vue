<template>
    <div style="background-color: #fff; padding: 20px; width: 98%; margin-bottom: 18px">
        <div id="main" style="width: 100%; height: 390px"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { reqExpertFansGrowh } from '@/api/expert/expertInfo'
import { getLastSevenData } from '@/utils/formatNumber'

const route = useRoute()
let option: object
onMounted(async () => {
    let id: any = route.query.id
    id = 16198 // 死数据
    let res: any = await reqExpertFansGrowh(id)
    const [lastSevenKeys, lastSevenValues] = getLastSevenData(res.result.followersCount)

    var chartDom = document.getElementById('main')
    let myChart = echarts.init(chartDom as any)

    // 渐变背景色配置项
    const gradientColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
            offset: 0,
            color: '#9BCDDB', // 起始颜色，透明度为 0.8
        },
        {
            offset: 1,
            color: '#F9FCFD', // 终止颜色，透明度为 0.8
        },
    ])

    option = {
        title: {
            text: '粉丝数变化',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985',
                },
            },
        },
        xAxis: {
            type: 'category',
            boundaryGap: true, // 控制曲线与x轴两端间距
            data: lastSevenKeys,
            axisTick: {
                show: true, // 控制x轴 刻度线是否显示
                alignWithLabel: true, // 控制刻度线在 x 轴上方是否对齐 不对齐显示刻度线。如果为false
            },
            axisLabel: {
                fontSize: 10, // 刻度文本颜色大小，默认14。如果不设置，则使用默认字体
            },
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: lastSevenValues,
                type: 'line',
                areaStyle: {
                    // 控制折线图的背景颜色
                    color: gradientColor,
                },
                color: '#94C9D8', // 曲线的颜色
                smooth: true, // 将曲线变圆滑
            },
        ],
    }

    myChart.setOption(option as any)
})
</script>
<style scoped lang="scss"></style>
