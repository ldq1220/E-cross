<template>
    <div class="screen_box">
        <!-- 搜索区 -->
        <div class="expert_search_box">
            <div class="search_input_box">
                <el-tag
                    v-for="(tag, index) in dynamicTags"
                    v-show="tag.tag"
                    :key="index"
                    class="mx-1 mr-1"
                    closable
                    :disable-transitions="false"
                    type="danger"
                    @close="handleClose(tag.code, tag.tag, tag.value)"
                >
                    {{ tag.tag }}
                </el-tag>
                <el-input class="search_input" v-model="searchText" placeholder="请输入达人昵称"></el-input>
            </div>
            <div class="search_btn_box">
                <el-button type="primary" class="search_btn" @click="send" :loading="expertSearchList.searchLoading">
                    <i class="iconfont icon-sousuo btn_icon1"></i>
                    搜索达人
                    <div class="flag"></div>
                </el-button>
            </div>
        </div>
        <!-- 筛选条件区 -->
        <div class="screen_condition">
            <!-- 地区 -->
            <div class="condition_box">
                <span class="condition_label">地区</span>
                <div class="condition_list">
                    <span class="condition_item" v-for="item in screenData.countrys" :key="item.code" :class="item.isactive ? 'active' : ''" @click="getScreen(screenData.countrys, item.code)">
                        {{ item.name_cn }}
                    </span>
                </div>
            </div>
            <!-- 创作类型 -->
            <div class="condition_box">
                <span class="condition_label">创作类型</span>
                <div class="condition_list creativeTypes">
                    <el-tree-select
                        v-model="creativeTypesValue"
                        :data="screenData.creativeTypes"
                        multiple
                        collapse-tags
                        collapse-tags-tooltip
                        :max-collapse-tags="10"
                        :render-after-expand="false"
                        show-checkbox
                        placeholder="创作类型"
                        check-strictly
                        check-on-click-node
                    />
                    <el-popover placement="bottom" :width="400" trigger="click">
                        <template #reference>
                            <el-button style="margin-right: 16px">选择创作类型</el-button>
                        </template>
                        <el-tree :data="screenData.creativeTypes" :props="props" show-checkbox @check="handleNodeClick" check-strictly check-on-click-node />
                    </el-popover>
                </div>
                <!-- <div class="creativeTypes_text">创作类型</div> -->
            </div>

            <!-- 其他筛选 -->
            <div class="condition_box">
                <span class="condition_label">其他筛选</span>
                <div class="condition_list">
                    <!-- 粉丝数 -->
                    <el-select v-model="fansNumValue" clearable @change="getSelectValue" @clear="clear('fansNumValue')" placeholder="粉丝数" class="frequencySelect">
                        <el-option v-for="item in fansNumOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>

                    <!-- 互动率 -->
                    <el-select v-model="frequencyValue" clearable @change="getSelectValue" @clear="clear('frequencyValue')" placeholder="互动率" class="frequencySelect">
                        <el-option v-for="item in frequencyOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>

                    <el-tooltip placement="top">
                        <template #content>达人近10个视频平均互动率（互动率=点赞数+评论数+分享数/播放量</template>
                        <span class="iconfont icon-bangzhu frequencyIcon"></span>
                    </el-tooltip>

                    <!-- 平均播放量 -->
                    <el-select v-model="playValue" clearable @change="getSelectValue" @clear="clear('playValue')" placeholder="平均播放量">
                        <el-option v-for="item in playOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <el-tooltip placement="top">
                        <template #content>达人近10个视频的平均播放量 (平均播放量=总播放量/视频数)</template>
                        <span class="iconfont icon-bangzhu frequencyIcon"></span>
                    </el-tooltip>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { reqSearchConditions } from '@/api/expert/expertSearch'
import useExpertSearchList from '@/store/modules/expertSearchList'

const expertSearchList = useExpertSearchList()

onMounted(() => {
    getSearchConditions()
})
// 添加筛选条件  并进行请求
const send = () => {
    expertSearchList.page = 1

    let countryCode = { ...dynamicTags.value[0] }.code
    let industryCode = { ...dynamicTags.value[1] }.code
    let minFollowerCnt = +fansNumValue.value.split('-')[0] || undefined
    let maxFollowerCnt = +fansNumValue.value.split('-')[1] || undefined
    let minEngagementRate = +frequencyValue.value.split('-')[0] || undefined
    let maxEngagementRate = +frequencyValue.value.split('-')[1] || undefined
    let minAvgPlayCnt = +playValue.value.split('-')[0] || undefined
    let maxAvgPlayCnt = +playValue.value.split('-')[1] || undefined
    let nickName = searchText.value || undefined

    let obj = { countryCode, nickName, industryCode, minFollowerCnt, maxFollowerCnt, minEngagementRate, maxEngagementRate, minAvgPlayCnt, maxAvgPlayCnt }
    Object.assign(expertSearchList.reqData, obj)
}

// 获取搜索达人所需的前置条件（如：国家、行业等）
const getSearchConditions = async () => {
    let res: any = await reqSearchConditions()
    if (res.code === '00000') {
        screenData.countrys = res.result.countrys
        screenData.creativeTypes = res.result.creativeTypes
        console.log(screenData.creativeTypes)

        screenData.countrys.forEach((item: { isactive: boolean }) => (item.isactive = false))
    }
}

// 搜索框 标签数据
const dynamicTags: any = ref([{}, {}, {}, {}, {}])

const handleClose = (code: string, tag: string, value: string) => {
    // 删除 搜索框展示标签
    dynamicTags.value.forEach((item: { tag: string }, index: any) => {
        if (item.tag == tag) {
            dynamicTags.value[index] = {}
        }
    })

    // 过滤数据  筛选区标签 去除选中状态
    for (const key in screenData) {
        screenData[key].forEach((item: { code: string; isactive: boolean }) => {
            if (item.code == code) return (item.isactive = false)
        })
    }

    console.log(code, dynamicTags.value, value)
    if (value == fansNumValue.value) {
        fansNumValue.value = ''
    } else if (value == frequencyValue.value) {
        frequencyValue.value = ''
    } else if (value == playValue.value) {
        playValue.value = ''
    }
}

// 搜索框内容
const searchText = ref('')
const creativeTypesValue = ref()

const props = {
    label: 'label',
    children: 'children',
}

const handleNodeClick = (currentData: any,allData: any) => {
  console.log(currentData,allData)
}

// 筛选条件数据
const screenData: any = reactive({
    countrys: [],
    creativeTypes: [],
})
//点击标签 获取已选内容
const getScreen = (data: any, code: any) => {
    dynamicTags.value = [{}, {}, {}, {}, {}]
    // 让 标签具有选中状态
    data.forEach((item: { isactive: boolean; code: any; name_cn: any; name: any }) => {
        !item.isactive && item.code == code ? (item.isactive = true) : (item.isactive = false)
    })

    // 过滤数据  让选中标签 展现在搜索框内
    screenData.countrys.forEach((item: { isactive: any; code: any; name_cn: any; name: any; fansNum: any }) => {
        if (item.isactive) {
            let newTag = {
                code: item.code,
                tag: item.name_cn || item.name || item.fansNum,
            }
            return (dynamicTags.value[0] = newTag)
        }
    })

    getSelectValue()
}
// 粉丝数下拉框
const fansNumValue = ref('')
const fansNumOptions = [
    {
        value: '0-10000',
        label: '1万以下',
    },
    {
        value: '10000-50000',
        label: '1万-5万',
    },
    {
        value: '50000-100000',
        label: '5万-10万',
    },
    {
        value: '100000-200000',
        label: '10万-20万',
    },
    {
        value: '200000-500000',
        label: '20万-50万',
    },
    {
        value: '500000-1000000',
        label: '50万-100万',
    },
    {
        value: '1000000',
        label: '100万以上',
    },
]

// 互动率下拉框
const frequencyValue = ref('')
const frequencyOptions = [
    {
        value: '0-0.05',
        label: '5%以下',
    },
    {
        value: '0.05-0.1',
        label: '5%-10%',
    },
    {
        value: '0.1-0.2',
        label: '10%-20%',
    },
    {
        value: '0.2-0.3',
        label: '20%-30%',
    },
    {
        value: '0.3-1',
        label: '30%以上',
    },
]
// 评价播放量 下拉框
const playValue = ref('')
const playOptions = [
    {
        value: '0-30000',
        label: '3万以内',
    },
    {
        value: '30000-10000',
        label: '3万-10万',
    },
    {
        value: '100000-500000',
        label: '10万-50万',
    },
    {
        value: '500000-1000000',
        label: '50万-100万',
    },
    {
        value: '1000000-5000000',
        label: '100万-500万',
    },
    {
        value: '5000000-10000000',
        label: '500万-1000万',
    },
    {
        value: '10000000-50000000',
        label: '1000万-5000万',
    },
    {
        value: '50000000',
        label: '5000万以上',
    },
]

// 改变下拉框选择内容
const getSelectValue = () => {
    fansNumOptions.forEach((item) => {
        if (item.value == fansNumValue.value) return (dynamicTags.value[2] = { tag: item.label, value: item.value })
    })
    frequencyOptions.forEach((item) => {
        if (item.value == frequencyValue.value) return (dynamicTags.value[3] = { tag: item.label, value: item.value })
    })
    playOptions.forEach((item) => {
        if (item.value == playValue.value) return (dynamicTags.value[4] = { tag: item.label, value: item.value })
    })
    console.log(dynamicTags.value)
}

// 点击清除下拉框内容图标
const clear = (type: string) => {
    if (type == 'fansNumValue') {
        fansNumValue.value = ''
        dynamicTags.value[2] = {}
    } else if (type == 'frequencyValue') {
        frequencyValue.value = ''
        dynamicTags.value[3] = {}
    } else {
        playValue.value = ''
        dynamicTags.value[4] = {}
    }
}
</script>

<style lang="scss">
.search_input {
    // 去除输入框边框
    .el-input__wrapper {
        box-shadow: none;
    }
}
.search_input_box {
    // 改变标签样式
    .el-tag {
        margin-right: 8px;
    }
    .el-input__wrapper.is-focus {
        box-shadow: 0 0 0 1px transparent inset !important;
    }
}
.screen_box {
    .condition_box {
        position: relative;
        .el-tag {
            margin-right: 20px;
        }
        .el-input__wrapper {
            width: 130px;
            margin-left: 11px;
        }
        .sexSelect {
            width: 80px;
        }
        .frequencySelect {
            width: 120px;
        }
        .el-input__inner {
            font-size: 12px;
        }
        .creativeTypes {
            .el-select-tags-wrapper {
                display: flex;
                // justify-content: space-between;
            }
            .el-select__tags {
                left: 140px;
            }
            .el-input__wrapper {
                width: 130px;
            }
            .el-tag {
                padding: 0 12px;
                background-color: var(--el-color-danger-light-9);
                --el-tag-text-color: var(--el-color-danger);
            }
            // .el-tag:first-child {
            //     margin-left: 20px;
            // }
            .el-tag__content {
                text-align: center;
            }
            .el-select__tags-text {
                max-width: 100px !important;
            }
        }
        .creativeTypes_text {
            position: absolute;
            top: 1px;
            left: 98px;
            color: #999;
            font-size: 12px;
            // z-index: -1;
        }
    }
}
</style>
<style scoped lang="scss">
.screen_box {
    padding: 1px 30px 10px 30px;
    // width: 100%;
    background-color: #fff;
    border-radius: 5px;
}

/* 搜索区 */
.expert_search_box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    /* 上边搜索部分 */
    .search_top {
        cursor: pointer;
        .search_top_tag {
            position: relative;
            width: 45px;
            height: 45px;
            opacity: 1;
            border-radius: 5px;
            background: rgba(247, 247, 247, 1);
            .tag_icontag {
                position: absolute;
                color: #a6a6a6;
                font-size: 22px;
                font-weight: 500;
                margin-left: 10px;
                line-height: 45px;
            }
            .tag_iconxia {
                position: absolute;
                color: #a6a6a6;
                font-size: 12px;
                width: 6px;
                height: 6px;
                top: 70%;
                left: 70%;
            }
        }
    }
    .search_input_box {
        padding: 0 20px;
        flex-grow: 1;
        margin: 0 0px 0 0px;
        display: flex;
        align-items: center;
        border: 1.25px solid rgba(0, 0, 0, 0.15);
        border-radius: 2.5px;
        .search_input {
            width: 100%;
            height: 48px;
            border-radius: 2.5px;
            .el-input__wrapper {
                box-shadow: none;
            }
        }
    }
    .search_btn_box {
        .search_btn {
            height: 50px;
            margin-left: 20px;
            width: 170px;
            background-color: $base-theme-color;
            border: none;
            .btn_icon1 {
                display: inline-block;
                margin-right: 10px;
                font-size: 22px;
            }
            .flag {
                width: 1px;
                height: 20px;
                background-color: #fff;
                margin: 0 10px 0 27px;
            }
            .btn_icon2 {
                font-size: 12px;
                line-height: 50px;
            }
        }
    }
}
// 筛选条件区
.screen_condition {
    position: relative;
    .condition_box {
        display: flex;
        font-size: 14px;
        font-weight: 400;
        line-height: 36px;
        margin: 18px 0;
        .condition_label {
            cursor: pointer;
            min-width: 60px;
            height: 36px;
            color: rgba(128, 128, 128, 1);
            margin-right: 16px;
        }
        .condition_list {
            flex-grow: 1;
        }

        .condition_item {
            display: inline-block;
            margin-right: 8px;
            padding: 0 18px;
            cursor: pointer;
            // width: 66px;
            text-align: center;
            border-radius: 5px;
            color: rgba(0, 0, 0, 1);
        }
        .condition_item.active {
            background: rgba(247, 247, 247, 1);
            color: rgba(255, 110, 108, 1);
        }
        .frequencyIcon {
            display: inline-block;
            color: rgba(128, 128, 128, 1);
            margin: 0 12px;
        }
    }
    .btn {
        position: absolute;
        bottom: 6px;
        right: 30px;
        .btn_clear {
            padding: 0 25px;
        }
    }
}
</style>
