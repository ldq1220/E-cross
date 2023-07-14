<template>
    <div style="background-color: #fff; padding: 20px; margin-bottom: 20px; width: 98%">
        <div id="fansTikTokLiveness" style="width: 100%; height: 440px"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { reqExpertFansActivity } from '@/api/expert/expertInfo'
import useExpertInfoData from '@/store/modules/expertInfoData'

const route = useRoute()
const expertInfoData = useExpertInfoData()

let option: object
let myChart: any

onMounted(() => {
    getEchart()

    watch(
        () => expertInfoData.infoData.activityDistribution,
        () => {
            let series = [
                {
                    data: [expertInfoData.infoData.activityDistribution],
                },
                { data: [expertInfoData.infoData.inactivityDistribution] },
            ]
            myChart.setOption({ series })
        },
    )
})

const getEchart = async () => {
    let id: any = route.query.id
    let res: any = await reqExpertFansActivity(id)
    if ((res.code = '00000')) {
        expertInfoData.getActivityDistribution(res.result.activityDistribution.active, res.result.activityDistribution.inactive)
    }

    const chartDom = document.getElementById('fansTikTokLiveness')
    myChart = echarts.init(chartDom as any)
    option = {
        title: {
            text: '粉丝TikTok活跃度',
        },
        color: ['#FF9B8E', '#b2bec3'],
        // 设置图表的位置
        grid: {
            x: 0, // 左间距
            y: 60, // 上间距
            x2: 50, // 右间距
            y2: 30, // 下间距
            containLabel: true, // grid 区域是否包含坐标轴的刻度标签, 常用于『防止标签溢出』的场景
        },
        // 提示框组件
        tooltip: {
            trigger: 'axis', // 触发类型, axis: 坐标轴触发
            axisPointer: {
                // 指示器类型  'line' 直线指示器 'shadow' 阴影指示器 'none' 无指示器 'cross' 十字准星指示器。
                // 其实是种简写，表示启用两个正交的轴的 axisPointer。
                type: 'none',
            },
            textStyle: {
                // color: '#cdd3ee', // 文字颜色
            },
            // 提示框浮层内容格式器，支持字符串模板和回调函数两种形式
            // 折线（区域）图、柱状（条形）图、K线图 : {a}（系列名称），{b}（类目值），{c}（数值）, {d}（无）
            formatter: '{b}：<br />{a0}: {c0}%<br />{a1}: {c1}%',
        },
        // 图例组件
        legend: {
            textStyle: {
                // 文本样式
                fontSize: 16,
                color: '#33333',
            },
            top: 20, // 定位
            data: ['活跃', '不活跃'], // 图例的数据数组
        },
        // X轴
        xAxis: {
            type: 'value', // 坐标轴类型,   'value' 数值轴，适用于连续数据
            // 坐标轴刻度
            axisTick: {
                show: true, // 是否显示坐标轴刻度 默认显示
            },
            // 坐标轴轴线
            axisLine: {
                // 是否显示坐标轴轴线 默认显示
                show: true, // 是否显示坐标轴轴线 默认显示
            },
            // 坐标轴在图表区域中的分隔线
            splitLine: {
                show: false, // 是否显示分隔线。默认数值轴显示
            },
            // 坐标轴刻度标签
            axisLabel: {
                show: true, // 是否显示刻度标签 默认显示
            },
        },
        yAxis: [
            // 左侧Y轴
            {
                type: 'category', // 坐标轴类型,  'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据
                // 坐标轴刻度
                axisTick: {
                    show: true, // 是否显示坐标轴刻度 默认显示
                },
                // 坐标轴轴线
                axisLine: {
                    // 是否显示坐标轴轴线 默认显示
                    show: true, // 是否显示坐标轴轴线 默认显示
                    lineStyle: {
                        // 坐标轴线线的颜色
                        color: '#cdd3ee',
                    },
                },
                // 坐标轴在图表区域中的分隔线
                splitLine: {
                    show: false, // 是否显示分隔线。默认数值轴显示
                },
                // 坐标轴刻度标签
                axisLabel: {
                    show: true, // 是否显示刻度标签 默认显示
                    fontSize: 16, // 文字的字体大小
                    color: '#cdd3ee', // 刻度标签文字的颜色
                    // 使用字符串模板，模板变量为刻度默认标签 {value}
                    formatter: '{value}',
                },
                data: ['活跃度'], // 类目数据，在类目轴（type: 'category'）中有效
            },
        ],
        // 系列列表
        series: [
            {
                type: 'bar', // 系列类型
                name: '活跃', // 系列名称, 用于tooltip的显示, legend 的图例筛选
                // 数据堆叠，同个类目轴上系列配置相同的stack值后，后一个系列的值会在前一个系列的值上相加
                stack: '总量',
                barMaxWidth: 160, // 柱条的最大宽度，不设时自适应
                // 图形上的文本标签
                label: {
                    show: true,
                    // 标签的位置 left right bottom top inside，绝对的像素值 position: [10, 10]，相对的百分比 position: ['50%', '50%']
                    position: 'inside',
                    formatter: `活跃 {c}%`, //显示百分号
                    fontSize: 20, //字体大小
                    color: '#fff',
                },
                data: [expertInfoData.infoData.activityDistribution], // 系列中的数据内容数组
            },
            {
                type: 'bar', // 系列类型
                name: '不活跃', // 系列名称, 用于tooltip的显示, legend 的图例筛选
                // 数据堆叠，同个类目轴上系列配置相同的stack值后，后一个系列的值会在前一个系列的值上相加
                stack: '总量',
                barMaxWidth: 160, // 柱条的最大宽度，不设时自适应
                // 图形上的文本标签
                label: {
                    show: true,
                    // 标签的位置 left right bottom top inside，绝对的像素值 position: [10, 10]，相对的百分比 position: ['50%', '50%']
                    position: 'inside',
                    formatter: '不活跃 {c}%', //显示百分号
                    fontSize: 20, //字体大小
                    color: '#fff',
                },
                data: [expertInfoData.infoData.inactivityDistribution], // 系列中的数据内容数组
            },
        ],
    }
    myChart.setOption(option as any)
}
</script>

<style></style>
