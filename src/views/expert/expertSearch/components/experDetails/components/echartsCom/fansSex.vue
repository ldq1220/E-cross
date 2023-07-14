<template>
    <div style="background-color: #fff; padding: 20px; width: 98%; margin-bottom: 18px">
        <div id="fansSex" style="width: 100%; height: 390px"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { reqExpertFansSex } from '@/api/expert/expertInfo'
import { newArray } from '@/utils/formatNumber'

const route = useRoute()
let option: object

onMounted(async () => {
    let id: any = route.query.id
    let res: any = await reqExpertFansSex(id)
    const data = newArray(res.result.genderDistribution)
    data.forEach((item) => (item.name == 'Male' ? (item.name = '男性') : (item.name = '女性')))

    setTimeout(() => {
        const chartDom = document.getElementById('fansSex')
        const myChart = echarts.init(chartDom as any)

        option = {
            title: {
                text: '粉丝性别',
            },
            tooltip: {
                trigger: 'item',
            },
            legend: {
                top: '8%',
                left: 'center',
            },
            series: [
                {
                    name: '粉丝性别',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    center: ['50%', '58%'], //饼状图位置
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2,
                    },
                    label: {
                        show: true, // 显示文字标签
                        position: 'inside', // 文字标签位置
                        formatter: '{b}\n\n{d}%', // 文字标签内容，{b} 代表数据项名称，{d} 代表数据项比例 \n 换行
                        color: '#fff',
                    },
                    emphasis: {
                        // 高亮状态的扇区和标签样式。
                        label: {
                            show: true,
                            fontSize: 20,
                            fontWeight: 'bold',
                        },
                    },
                    labelLine: {
                        show: false,
                    },
                    data: data,
                    color: ['#68B3C8', '#FF9B8E'], // 配置饼图颜色
                },
            ],
        }
        myChart.setOption(option as any)
    }, 0)
})
</script>

<style></style>
