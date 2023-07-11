<template>
    <div class="fansArea_box" style="background-color: #fff; padding: 20px; margin-bottom: 20px; width: 98%; height: 500px">
        <div id="container" class="chart-container" style="width: 100%; height: 300px"></div>

        <div class="progress" style="width: 33%">
            <div class="progress_item" v-for="item in data" :key="item.name">
                <p style="font-size: 12px; margin-bottom: 5px">{{ item.contry }}</p>
                <el-progress :percentage="item.percentage" :stroke-width="12" :color="item.color" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import worldGeo from '@/assets/echarts/echarts-wordcloud'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { reqExpertFansCountry } from '@/api/expert/expertInfo'
import { formatNumber } from '@/utils/formatNumber'
import useExpertInfoData from '@/store/modules/expertInfoData'

const route = useRoute()
const expertInfoData = useExpertInfoData()

let option: object
let myChart: any
let data: any = ref()

onMounted(() => {
    getEchart()

    watch(
        () => expertInfoData.infoData.countryDistribution,
        () => {
            let series = [{ data: expertInfoData.infoData.countryDistribution }]
            myChart.setOption({ series })
        },
    )
})

const getEchart = () => {
    setTimeout(async () => {
        let id: any = route.query.id
        let res: any = await reqExpertFansCountry(id)

        expertInfoData.getCountryDistribution(res.result.countryDistribution)
        data.value = expertInfoData.infoData.countryDistribution

        const chartDom = document.getElementById('container')
        myChart = echarts.init(chartDom as any)
        echarts.registerMap('world', worldGeo)
        option = {
            title: {
                text: '粉丝区域',
            },
            // 默认的颜色数组 （如果不明确设置每个数据项的颜色，则会采用默认的数组
            // 此处的颜色为十六进制表示，也可以使用rgb来表示。简单地理解就是一串字符就代表一个颜色，挑选喜欢的颜色可以自行搜索颜色
            color: ['#ac6767', '#1d953f', '#6950a1', '#918597'],
            series: [
                {
                    // 图标类型为 地图
                    type: 'map',
                    name: '',
                    label: {
                        show: false,
                        position: 'top',
                        margin: 8,
                    },
                    center: ['0%', '10%'], //饼状图位置
                    map: 'world', // 地图类型为 世界地图
                    // data里的每一个{}中，是一项数据整体，标明了该项数据的名称，值，以及颜色等参数。注意：此处的字符串需要加双引号""(输入法切换至英文状态)
                    data: expertInfoData.infoData.countryDistribution,
                    roam: true,
                    zoom: 1,
                    // 去除各个国家上的小红点
                    showLegendSymbol: false,
                },
            ],

            // 鼠标悬浮，单击产生的效果（在网页上可以动态显示）
            tooltip: {
                show: true,
                trigger: 'item',
                formatter: function (params: { value: number; name: string }) {
                    let toolTiphtml = ''
                    if (isNaN(params.value)) {
                        // toolTiphtml = params.name + '暂无数据'
                    } else {
                        toolTiphtml = params.name + '：' + formatNumber(params.value)
                    }
                    return toolTiphtml
                },
            },
        }
        myChart.setOption(option as any)
    }, 0)
}
</script>

<style lang="scss" scoped>
.fansArea_box {
    /* display: flex; */
    justify-content: space-between;
}

.progress {
    /* margin-top: 130px; */
}
</style>
