<template>
    <div style="background-color: #fff; padding: 20px; margin-bottom: 20px; width: 98%">
        <div id="fansEquipment" style="width: 100%; height: 440px"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { reqExpertFansDevice } from '@/api/expert/expertInfo'
import useExpertInfoData from '@/store/modules/expertInfoData'

const route = useRoute()
const expertInfoData = useExpertInfoData()

let option: object
let myChart: any

onMounted(async () => {
    getEchart()

    watch(
        () => expertInfoData.infoData.deviceDistribution,
        () => {
            let series = [{ data: expertInfoData.infoData.deviceDistribution }]
            myChart.setOption({ series })
        },
    )
})

const getEchart = async () => {
    let id: any = route.query.id
    let res: any = await reqExpertFansDevice(id)

    expertInfoData.getDeviceDistribution(res.result.deviceDistribution)

    setTimeout(() => {
        const chartDom = document.getElementById('fansEquipment')
        myChart = echarts.init(chartDom as any)

        option = {
            title: {
                text: '粉丝使用设备',
            },
            tooltip: {
                trigger: 'item',
            },
            legend: {
                top: '10%',
                left: 'center',
            },
            series: [
                {
                    name: '粉丝使用设备',
                    type: 'pie',
                    radius: ['40%', '73%'],
                    center: ['50%', '62%'], //饼状图位置
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 3,
                    },
                    label: {
                        show: true, // 显示文字标签
                        // position: 'inside', // 文字标签位置
                        position: 'outer',
                        alignTo: 'none',
                        bleedMargin: 5,
                        formatter: '{b}\n\n{d}%', // 文字标签内容，{b} 代表数据项名称，{d} 代表数据项比例 \n 换行
                        // color: '#fff',
                    },
                    emphasis: {
                        // 高亮状态的扇区和标签样式。
                        label: {
                            show: true,
                            fontSize: 20,
                            fontWeight: 'bold',
                        },
                    },
                    data: expertInfoData.infoData.deviceDistribution,
                    color: ['#EB5E28', '#7AC29A', '#FF9B8E', '#7A9E9F', '#8DD5E8', '#FF9B8E', '#EB5E28'], // 配置饼图颜色
                },
            ],
        }

        myChart.setOption(option as any)
    }, 0)
}
</script>

<style></style>
