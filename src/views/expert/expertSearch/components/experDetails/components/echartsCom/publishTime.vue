<template>
    <el-row>
        <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
            <div style="background-color: #fff; padding: 20px; margin: 0 20px 20px 0; height: 460px; width: 98%" class="publishTime">
                <h4>发布时间表</h4>

                <div class="getMonth" style="margin-top: 20px">
                    <el-button @click="changeMonth('reduce')" :disabled="!disabled" class="add_btn">
                        <i class="iconfont icon-xiangqian"></i>
                    </el-button>
                    <span class="time_text">{{ year }}</span>
                    <el-button @click="changeMonth('add')" :disabled="disabled" class="subtract_btn">
                        <i class="iconfont icon-xiangqian1"></i>
                    </el-button>
                </div>

                <div id="publishTime" style="width: 100%; height: 320px"></div>
                <span class="time_tooltip">发布时间表是近30天内达人视频发布的具体日期和数量</span>
            </div>
        </el-col>

        <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
            <div style="background-color: #fff; padding: 20px; margin-bottom: 20px; width: 100%; height: 460px">
                <div class="issueHZ_box">
                    <div class="issueInfo">
                        <h4>发布频率</h4>
                        <div class="issueInfo_box">
                            <div class="issueInfo_item" v-if="issueHZData.avgWeeklyCounts">
                                <p>每周发布</p>
                                <span>{{ Math.round(issueHZData.avgWeeklyCounts) }}</span>
                            </div>
                            <div class="issueInfo_item" v-if="issueHZData.total">
                                <p>每月发布</p>
                                <span>{{ issueHZData.total }}</span>
                            </div>
                            <div class="issueInfo_item" v-if="issueHZData.lastVideoReleaseDate">
                                <p>最近视频发布日期</p>
                                <span>{{ issueHZData.lastVideoReleaseDate }}</span>
                            </div>
                            <!-- <div class="issueInfo_item">
                                <p>发布频率等级</p>
                                <span style="color: $base-theme-color">中等</span>
                            </div> -->
                        </div>
                    </div>
                    <div id="issueHz" style="height: 395px; width: 70%"></div>
                </div>
                <div class="issue_tooltip">发布频率是30天内达人视频发布的频次</div>
            </div>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, reactive, ref } from 'vue'
import { dayjs } from 'element-plus'
import { reqPublishTime } from '@/api/expert/expertInfo'
import { useRoute } from 'vue-router'

const route = useRoute()
const influencerId = ref()

const timeData = ref()
let myChart: any
let echartsInstance: any

const issueHZData: any = reactive({
    avgWeeklyCounts: null,
    dayCount: null,
    lastVideoReleaseDate: null,
    total: null,
})

onMounted(() => {
    influencerId.value = route.query.id
    year.value = dayjs().format('YYYY-MM')
    disabled.value = true
    getPublishTime(influencerId.value)
})

// 获取数据
const getPublishTime = async (influencerId: string) => {
    let res: any = await reqPublishTime(influencerId)
    if (res.code == '00000') {
        timeData.value = res.result.stats
        Object.assign(issueHZData, res.result.frequency)
        getechart()
        getIssueHZEcharts()
    }
}

const year = ref('')
const disabled = ref(false)
// 修改月份
const changeMonth = (type: string) => {
    let newTime = null
    if (type == 'reduce') {
        // 修改 year
        newTime = dayjs().subtract(1, 'month').unix()
        disabled.value = false
    } else {
        newTime = dayjs().subtract(0, 'month').unix()
        disabled.value = true
    }

    year.value = dayjs.unix(newTime).format('YYYY-MM')
    getPublishTime(influencerId.value)
}

// 获取图表方法
const getechart = () => {
    var chartDom = document.getElementById('publishTime')
    myChart = echarts.init(chartDom as any)

    var option

    option = {
        title: {
            // text:'发布时间表'
        },
        tooltip: {
            // 显示模式，通常设置为 'item'
            trigger: 'item',
            position: 'top',
            formatter: function (params: { value: string[] }) {
                let time = params.value[0]
                var value = params.value[1] || '0'
                return `<span style="display: inline-block;width: 10px;height: 10px;background-color: #C85B5A; border-radius: 50%;margin-right: 8px;"> </span> ${time} </br> <span style="display: inline-block;width: 10px;height: 10px;background-color: #C85B5A; border-radius: 50%;margin-right: 8px;"> </span>  ${value}`
            }, // 配置提示文字
            // 提示框的背景色
            backgroundColor: '#333',
            textStyle: {
                color: '#fff',
                fontSize: 14,
            },
            // 提示框元素之间的间隔距离
            padding: [10, 16],
            // 提示框样式
            extraCssText: 'border-radius: 6px;',
        },
        visualMap: [
            {
                show: false,
                min: 0,
                max: 10,
                calculable: true,
                seriesIndex: [2, 3, 4],
                orient: 'horizontal',
                left: '55%',
                bottom: 20,
                inRange: {
                    color: ['#C85B5A'],
                },
                pieces: [{ gt: -1, label: '', color: '#FFDAB9' }],
            },
            {
                show: false,
                min: 0,
                max: 1000,
                inRange: {
                    color: ['grey'],
                    opacity: [0, 0.3],
                },
                controller: {
                    inRange: {
                        opacity: [0.3, 0.6],
                    },
                    outOfRange: {
                        color: '#ccc',
                    },
                },
                seriesIndex: [1],
                orient: 'horizontal',
                left: '10%',
                bottom: 20,
            },
        ],
        calendar: [
            {
                range: '2017-02',
                left: -4600,
            },
            {
                range: '2017-01',
                left: -4600,
            },
            {
                range: '2017-03',
                left: -4600,
            },
            {
                orient: 'vertical',
                yearLabel: {
                    show: false, //隐藏title
                    margin: 40,
                },
                dayLabel: {
                    firstDay: 1,
                    nameMap: ['日', '一', '二', '三', '四', '五', '六'],
                    // nameMap: ['Sun', `Mon`, 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                },
                monthLabel: {
                    show: false, //隐藏title
                    nameMap: 'cn',
                    margin: 20,
                },
                cellSize: 40,
                top: '20%',
                left: '20%',
                range: year.value,
            },
        ],
        series: [
            {
                type: 'graph',
            },
            {
                type: 'heatmap',
                coordinateSystem: 'calendar',
            },
            {
                type: 'heatmap',
                coordinateSystem: 'calendar',
                calendarIndex: 3,
                // data: [
                //     ['2023-06-12', 1],
                //     ['2023-06-14', 2],
                // ],
                data: timeData.value,
                label: {
                    show: true, // 显示文字标签
                    position: 'inside', // 文字标签位置
                    formatter: function (params: { value: string[] }) {
                        // console.log(params);
                        // let time = params.value[0]
                        var value = params.value[1] || '0'
                        return value
                    }, // 配置提示文字
                    color: '#fff',
                },
            },
        ],
    }
    myChart.setOption(option)
}
// 获取发布频率 图标
const getIssueHZEcharts = () => {
    const chartDom = document.getElementById('issueHz')
    echartsInstance = echarts.init(chartDom as any)

    let option: object
    option = {
        tooltip: {
            trigger: 'item',
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '60%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2,
                },
                label: {
                    show: true,
                    formatter(param: { name: string; percent: number }) {
                        return param.name + '(' + param.percent + '%)'
                    },
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 18,
                        fontWeight: 'bold',
                    },
                },
                data: issueHZData.dayCount,
            },
        ],
    }

    echartsInstance.setOption(option as any)
}
</script>

<style lang="scss">
.publishTime {
    .el-button {
        background-color: #f7f8fa;
        border: none;
    }
}
</style>

<style scoped lang="scss">
.publishTime {
    .yuanquna {
        display: inline-block;
        width: 10px;
        height: 10px;
        background-color: green;
        border-radius: 50%;
        margin-right: 8px;
    }
    h4 {
        margin-top: 0;
        font-size: 20px;
        font-weight: 700;
        color: rgba(56, 56, 56, 1);
    }
    .getMonth {
        display: flex;
        justify-content: space-between;
        .add_btn {
            z-index: 999;
        }
    }
    .time_text {
        flex-grow: 1;
        height: 32px;
        margin: 0 18px;
        text-align: center;
        background-color: #f7f8fa;
        line-height: 32px;
        border-radius: 8px;
    }
    .time_tooltip {
        font-size: 12px;
        font-weight: 400;
        color: rgba(166, 166, 166, 1);
    }
}

.issueHZ_box {
    display: flex;
    justify-content: space-between;
    #issueHz {
        flex-grow: 1;
    }
    .issueInfo {
        width: 30%;
        .issueInfo_box {
            height: 82%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        h4 {
            font-size: 20px;
            font-weight: 700;
            color: rgba(56, 56, 56, 1);
        }
        .issueInfo_item {
            margin-left: 20px;
            width: 160px;
            opacity: 1;
            border-radius: 5px;
            background: rgba(247, 247, 247, 1);
            padding: 16px 20px;
            margin-top: 20px;
            p {
                font-size: 12px;
                color: rgba(128, 128, 128, 1);
                margin: 0px 0 8px 0px;
            }
            span {
                font-size: 18px;
                font-weight: bold;
                color: rgba(56, 56, 56, 1);
            }
        }
    }
}
.issue_tooltip {
    font-size: 12px;
    font-weight: 400;
    color: rgba(166, 166, 166, 1);
}
</style>
