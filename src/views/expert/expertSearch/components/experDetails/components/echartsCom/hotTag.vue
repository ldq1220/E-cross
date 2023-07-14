<template>
    <div style="background-color: #fff; padding: 20px; margin-bottom: 20px; width: 100%">
        <div id="hotTag" style="width: 100%; height: 300px"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import 'echarts-wordcloud'
import { ref, onMounted, watch } from 'vue'
import { reqExpertLabelStats } from '@/api/expert/expertInfo'
import { useRoute } from 'vue-router'
import useI18nStore from '@/store/modules/i18n'

import { useI18n } from 'vue-i18n'
const { t } = useI18n() // 解构出t方法

const route = useRoute()
const i18nStore = useI18nStore()

let option: object
let influencerId = ref()
let myChart: any

onMounted(() => {
    influencerId.value = route.query.id
    getEcharts(influencerId.value)
})
watch(
    () => i18nStore.lang,
    () => {
        const chartDom = document.getElementById('hotTag')
        myChart = echarts.init(chartDom as any)
        myChart.setOption({
            title: {
                text: t('echarts.hotTagTitle'),
            },
        })
    },
)

const getEcharts = async (influencerId: string) => {
    let res: any = await reqExpertLabelStats(influencerId)

    const chartDom = document.getElementById('hotTag')
    myChart = echarts.init(chartDom as any)

    option = {
        title: {
            text: '视频标签热度',
        },
        tooltip: {
            show: true,
            borderColor: '#fe9a8bb3',
            borderWidth: 1,
            padding: [10, 15, 10, 15],
            confine: true,
            backgroundColor: 'rgba(255, 255, 255, .9)',
            textStyle: {
                color: 'hotpink',
                lineHeight: 22,
            },
            extraCssText: 'box-shadow: 0 4px 20px -4px rgba(199, 206, 215, .7);border-radius: 4px;',
        },
        series: [
            {
                type: 'wordCloud',
                shape: 'pentagon',
                left: 'center',
                top: 'center',
                width: '100%',
                height: '100%',
                right: null,
                bottom: null,
                sizeRange: [14, 50],
                rotationRange: [0, 0],
                rotationStep: 0,
                gridSize: 25,
                drawOutOfBound: false,
                layoutAnimation: true,
                textStyle: {
                    fontFamily: 'PingFangSC-Semibold',
                    fontWeight: 600,
                    color: function () {
                        let colors = ['#fe9a8bb3', '#fe9a8bb3', '#fe9a8b03', '#9E87FFb3', '#9E87FFb3', '#9E87FFb3', '#fe9a8bb3', '#fe9a8bb3', '#fe9a8bb3', '#73DDFF', '#58D5FF']
                        let num: any = Math.random() * 10
                        return colors[parseInt(num)]
                    },
                },
                emphasis: {
                    focus: 'none',
                },

                // Data is an array. Each array item must have name and value property.
                data: res.result,
            },
        ],
    }

    myChart.setOption(option as any)
}
</script>

<style scoped lang="scss"></style>
