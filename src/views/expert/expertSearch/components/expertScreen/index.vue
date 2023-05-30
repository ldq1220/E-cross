<template>
    <div class="screen_box">
        <!-- 搜索区 -->
        <div class="expert_search_box">
            <div class="search_top" @click="showTagBox">
                <div class="search_top_tag">
                    <!-- <img src="@/assets/images/expertSearch/Vector.png" alt="" class="tag_img" /> -->
                    <!-- <img src="@/assets/images/expertSearch/Polygon 5.png" alt="" class="tag_icon" /> -->
                    <i class="iconfont icon-biaoqian tag_icontag"></i>
                    <i class="iconfont icon-xiajiantou tag_iconxia" v-show="isShowTag"></i>
                    <i class="iconfont icon-shangjiantou tag_iconxia" v-show="!isShowTag"></i>
                </div>
            </div>
            <div class="search_input_box">
                <el-tag v-for="tag in dynamicTags" :key="tag.id" class="mx-1 mr-1" closable :disable-transitions="false" type="danger" @close="handleClose(tag.id)">
                    {{ tag.tag }}
                </el-tag>
                <el-input class="search_input" v-model="searchText" placeholder="请输入搜索关键字"></el-input>
            </div>
            <div class="search_btn_box">
                <el-button type="primary" class="search_btn">
                    <i class="iconfont icon-sousuo btn_icon1"></i>
                    67.67万条结果
                    <div class="flag"></div>
                    <i class="iconfont icon-xiangxia1 btn_icon2"></i>
                </el-button>
            </div>
        </div>
        <!-- 筛选条件区 -->
        <div class="screen_condition" v-show="!isShowTag">
            <!-- 地区 -->
            <div class="condition_box">
                <span class="condition_label">地区</span>
                <span class="condition_item" v-for="item in screenData.areaData" :key="item.id" :class="item.isactive ? 'active' : ''" @click="getScreen(screenData.areaData, item.id)">
                    {{ item.title }}
                </span>
            </div>
            <!-- 带货类型 -->
            <div class="condition_box">
                <span class="condition_label">带货类型</span>
                <span class="condition_item" v-for="item in screenData.typeData" :key="item.id" :class="item.isactive ? 'active' : ''" @click="getScreen(screenData.typeData, item.id)">
                    {{ item.title }}
                </span>
            </div>
            <!-- 粉丝数 -->
            <div class="condition_box">
                <span class="condition_label">粉丝数</span>
                <span class="condition_item" v-for="item in screenData.fansNumData" :key="item.id" :class="item.isactive ? 'active' : ''" @click="getScreen(screenData.fansNumData, item.id)">
                    {{ item.title }}
                </span>
            </div>
            <!-- 其他筛选 -->
            <div class="condition_box">
                <span class="condition_label">其他筛选</span>
                <!-- 性别 下拉框 -->
                <el-select v-model="sexValue" clearable placeholder="性别" class="sexSelect">
                    <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <!-- 互动率 -->
                <el-select v-model="frequencyValue" clearable placeholder="互动率" class="frequencySelect">
                    <el-option v-for="item in frequencyOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>

                <el-tooltip placement="top">
                    <template #content>达人近10个视频平均互动率（互动率=点赞数+评论数+分享数/播放量</template>
                    <span class="iconfont icon-bangzhu frequencyIcon"></span>
                </el-tooltip>

                <!-- 平均播放量 -->
                <el-select v-model="playValue" clearable placeholder="平均播放量">
                    <el-option v-for="item in playOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-tooltip placement="top">
                    <template #content>达人近10个视频的平均播放量 (平均播放量=总播放量/视频数)</template>
                    <span class="iconfont icon-bangzhu frequencyIcon"></span>
                </el-tooltip>
            </div>
            <!-- 已选 -->
            <div class="condition_box">
                <span class="condition_label">已选</span>
                <el-tag v-for="item in screenData.selectedData" :key="item.id" class="mx-1 mr-1" closable :disable-transitions="false" type="danger" @close="removeTag(item.id)">
                    {{ item.title }}
                </el-tag>
            </div>
            <!-- 按钮 -->
            <div class="btn">
                <el-button class="btn_clear" @click="clearSelected">清除</el-button>
                <el-button type="primary" icon="Filter">筛选</el-button>
            </div>
        </div>
        <!-- 搜索tag -->
        <div class="tag_box" v-show="isShowTag">
            <h3>热门行业与产品搜索标签</h3>
            <div class="tag_item" v-for="item in tagData" :key="item.id">
                <h4 class="tag_title">{{ item.title }}</h4>
                <el-tag class="tag" :class="tag.isactive ? 'active' : ''" type="info" v-for="tag in item.data" :key="tag.id" @click="addScreenTag(tag.id)">{{ tag.tag }}</el-tag>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// 搜索框 标签数据
const dynamicTags = ref([
    { id: 0, tag: 'beauty' },
    { id: 10, tag: 'Manicure' },
])
const handleClose = (id: number) => {
    dynamicTags.value.forEach((item, index) => {
        if (item.id == id) {
            dynamicTags.value.splice(index, 1)
        }

        for (const key in tagData) {
            tagData[key].data.forEach((item: any) => {
                if (item.id == id) {
                    item.isactive = false
                }
            })
        }
    })
}

// 搜索框内容
const searchText = ref('')
// 控制搜索tag 显示和隐藏
const isShowTag = ref(false)
// 点击标签 展示tag区域
const showTagBox = () => {
    isShowTag.value = !isShowTag.value
}

// tag区域 数据
const tagData: any = reactive({
    clothingFashion: {
        id: '001',
        title: 'Clothing & Fashion',
        data: [
            { id: 0, tag: 'beauty', isactive: true },
            { id: 1, tag: 'foot', isactive: false },
            { id: 2, tag: 'zxcv', isactive: false },
            { id: 3, tag: 'asdf', isactive: false },
            { id: 4, tag: 'qwer', isactive: false },
        ],
    },
    beautyHair: {
        id: '002',
        title: 'Beauty & Hair',
        data: [
            { id: 10, tag: 'Manicure', isactive: true },
            { id: 11, tag: 'oiuy', isactive: false },
            { id: 12, tag: 'yrte', isactive: false },
            { id: 13, tag: 'lkjh', isactive: false },
            { id: 14, tag: 'mbnv', isactive: false },
        ],
    },
})

// 点击tag标签 添加到选择数组中去
const addScreenTag = (id: number) => {
    for (const key in tagData) {
        tagData[key].data.forEach((item: any) => {
            if (item.id == id && item.isactive) {
                item.isactive = false
                dynamicTags.value.forEach((tag, index) => {
                    if (tag.id == id) {
                        dynamicTags.value.splice(index, 1)
                    }
                })
                return
            }

            if (item.id == id && !item.isactive) {
                item.isactive = true;
                dynamicTags.value.unshift(item)
            }
        })
    }
}



// 筛选条件数据
const screenData: any = reactive({
    areaData: [
        { id: 0, title: '不限', isactive: false },
        { id: 1, title: '美国', isactive: true },
        { id: 2, title: '英国', isactive: false },
        { id: 3, title: '越南', isactive: false },
        { id: 4, title: '泰国', isactive: false },
        { id: 5, title: '美国', isactive: false },
        { id: 6, title: '英国', isactive: false },
        { id: 7, title: '意大利', isactive: false },
        { id: 8, title: '俄罗斯', isactive: false },
    ],
    typeData: [
        { id: 20, title: '不限', isactive: false },
        { id: 21, title: '家具', isactive: false },
        { id: 22, title: '居家日用', isactive: true },
        { id: 23, title: '家装建材', isactive: false },
        { id: 24, title: '宠物用品', isactive: false },
        // { id: 25, title: '家具', isactive: false },
        // { id: 26, title: '家具', isactive: false },
        // { id: 27, title: '居家日用', isactive: false },
        // { id: 28, title: '家装建材', isactive: false },
        // { id: 29, title: '宠物用品', isactive: false },
        // { id: 10, title: '家具', isactive: false },
        // { id: 11, title: '家具', isactive: false },
        // { id: 12, title: '居家日用', isactive: false },
        // { id: 13, title: '家装建材', isactive: false },
        // { id: 14, title: '宠物用品', isactive: false },
        // { id: 15, title: '家具', isactive: false },
        // { id: 16, title: '家具', isactive: false },
        // { id: 17, title: '居家日用', isactive: false },
        // { id: 18, title: '家装建材', isactive: false },
        // { id: 19, title: '宠物用品', isactive: false },
    ],
    fansNumData: [
        { id: 31, title: '不限', isactive: false },
        { id: 32, title: '1万以下', isactive: true },
        { id: 33, title: '1万-5万', isactive: false },
    ],
    selectedData: [
        { id: 1, title: '美国' },
        { id: 22, title: '居家日用' },
        { id: 32, title: '1万以下' },
    ],
})
//点击标签 获取已选内容
const getScreen = (data: any, id: number) => {
    data.forEach((item: { id: number; isactive: boolean; title: any }) => {
        if (item.id == id && !item.isactive) {
            item.isactive = true
            screenData.selectedData.push(item)
            return
        }

        if (item.id == id && item.isactive) {
            item.isactive = false
            screenData.selectedData.forEach((item: { id: number }, index: any) => {
                if (item.id == id) {
                    screenData.selectedData.splice(index, 1)
                }
            })
        }
    })
}
// 删除已选标签
const removeTag = (id: any) => {
    screenData.selectedData.map((item: any, index: number) => {
        if (item.id == id) {
            screenData.selectedData.splice(index, 1)
        }
    })

    for (const key in screenData) {
        screenData[key].forEach((item: any) => {
            if (item.id == id) {
                item.isactive = false
            }
        })
    }
}
// 清除按钮方法  清除所有已选择标签
const clearSelected = () => {
    screenData.selectedData = []

    for (const key in screenData) {
        screenData[key].forEach((item: any) => {
            item.isactive = false
        })
    }
}

// 性别下拉框
const sexValue = ref('')
const sexOptions = [
    {
        value: '0',
        label: '男',
    },
    {
        value: '1',
        label: '女',
    },
]
// 互动率下拉框
const frequencyValue = ref('')
const frequencyOptions = [
    {
        value: '0',
        label: '5%以下',
    },
    {
        value: '1',
        label: '5%-10%',
    },
    {
        value: '2',
        label: '10%-20%',
    },
    {
        value: '3',
        label: '20%-30%',
    },
    {
        value: '4',
        label: '30%以上',
    },
]
// 评价播放量 下拉框
const playValue = ref('')
const playOptions = [
    {
        value: '0',
        label: '30K以内',
    },
    {
        value: '1',
        label: '30K-100K',
    },
    {
        value: '2',
        label: '100K-500K',
    },
    {
        value: '3',
        label: '500K-1M',
    },
    {
        value: '4',
        label: '1M-5M',
    },
    {
        value: '5',
        label: '5M-10M',
    },
    {
        value: '6',
        label: '10M-50M',
    },
    {
        value: '7',
        label: '50M以上',
    },
]

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
}
.condition_box {
    .el-tag {
        margin-right: 20px;
    }
    .el-input__wrapper {
        width: 120px;
        margin-left: 11px;
    }
    .sexSelect {
        width: 80px;
    }
    .frequencySelect {
        width: 100px;
    }
    .el-input__inner {
        font-size: 12px;
    }
}
</style>
<style scoped lang="scss">
.screen_box {
    padding: 21px 23px 1px 30px;
    width: 100%;
    background-color: #fff;
    margin-top: 23px;
    border-radius: 5px;
}

/* 搜索区 */
.expert_search_box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
        margin: 0 9px 0 5px;
        display: flex;
        align-items: center;
        border: 1.25px solid rgba(0, 0, 0, 0.15);
        border-radius: 2.5px;
        .search_input {
            width: 100%;
            height: 50px !important;
            border-radius: 2.5px;
            .el-input__wrapper {
                box-shadow: none;
            }
        }
    }
    .search_btn_box {
        .search_btn {
            height: 50px;
            background-color: #eb5e28;
            border: none;
            .btn_icon1 {
                display: inline-block;
                margin-right: 21px;
                font-size: 22px;
            }
            .flag {
                width: 1px;
                height: 20px;
                background-color: #fff;
                margin: 0 10px 0 37px;
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
    margin-top: 30px;
    position: relative;
    .condition_box {
        font-size: 14px;
        font-weight: 400;
        line-height: 36px;
        margin: 18px 0;
        .condition_label {
            display: inline-block;
            cursor: pointer;
            width: 60px;
            height: 36px;
            color: rgba(128, 128, 128, 1);
            margin-right: 16px;
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

// tag 筛选区域
.tag_box {
    border-top: 1px solid rgba(229, 229, 229, 1);
    margin: 18px 0 17px 0;
    height: 266px;
    overflow: auto;

    h3 {
        font-size: 16px;
        font-weight: 700;
        color: rgba(56, 56, 56, 1);
        margin-top: 17px;
    }
    .tag_title {
        font-size: 14px;
        font-weight: 700;
        color: rgba(56, 56, 56, 1);
        margin: 17px 0 15px 0;
    }
    .tag {
        cursor: pointer;
        margin-right: 15px;
    }
    .tag:hover {
        color: var(--el-color-danger);
    }
    .tag.active {
        background-color: #fff1f0;
        color: var(--el-color-danger);
    }
}
/* for Chrome */
.tag_box::-webkit-scrollbar {
    display: none;
}
</style>
