<template>
    <div class="status_echart">
        <div id="followUp_status" style="width: 100%; height: 320px"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted } from 'vue'

let option: object
onMounted(() => {
    setTimeout(() => {
        let chartDom = document.getElementById('followUp_status')
        let mychart = echarts.init(chartDom as any)

        option = {
            //你的代码
            title: {
                text: '达人跟进状态',
            },
            dataset: {
                source: [
                    // ['reagent', 'num'],
                    ['reagent', 'num', 'amount', 'per'],
                    ['已上线合作视频达人', 400, 420, 2.6],
                    ['已寄样达人', 500, 100, 26],
                    ['达人已回复', 1000, 200, 40],
                    ['已查看达人', 5000, 300, 16],
                    ['已联系达人', 8000, 250, 9.2],
                    ['全部达人', 10000, 150, 93.3],
                ],
            },
            tooltip: {
                formatter: function (params: any) {
                    return params.name + ':' + params.data[1]
                },
            },
            // grid: {},
            xAxis: [
                {
                    type: 'value',
                    name: '数量',
                    axisLabel: {
                        formatter: function (value: any) {
                            return value
                        },
                    },
                },
            ],
            yAxis: {
                type: 'category',
            },
            visualMap: {
                show: false,
                orient: 'horizontal',
                left: 'center',
                min: 10,
                max: 100,
                dimension: 3,
                text: ['低消耗', '高消耗'],
                inRange: {
                    color: ['#FD665F', '#FFCE34', '#65B581'],
                },
            },
            series: {
                type: 'bar',
                encode: {
                    x: 'sum',
                    y: 'reagent',
                },
                label: {
                    position: 'right',
                    show: true,
                    formatter: function (params: any) {
                        return params.data[1]
                    },
                },
            },
        }

        mychart.setOption(option as any)
    }, 0)
})
</script>

<style scoped lang="scss">
.status_echart {
    padding: 20px;
    background-color: #fff;
}
</style>
