<template>
    <!-- 条件筛选区 -->
    <div class="screen_box">
        <!-- 搜索区 -->
        <div class="expert_search_box">
            <div class="search_input_box">
                <el-tag v-for="tag in dynamicTags" v-show="tag.tag" :key="tag.code" class="mx-1 mr-1" closable :disable-transitions="false" type="danger" @close="handleClose(tag.code)">
                    {{ tag.tag }}
                </el-tag>
                <el-input class="search_input" v-model="searchText" placeholder="请输入商品关键词，支持中文和英文"></el-input>
            </div>
            <div class="search_btn_box">
                <el-button type="primary" class="search_btn" @click="send">
                    <i class="iconfont icon-sousuo btn_icon1"></i>
                    立即搜索
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
            <!-- 带货类型 -->
            <div class="condition_box">
                <span class="condition_label">行业</span>
                <div class="condition_list">
                    <span class="condition_item" v-for="item in screenData.industry" :key="item.code" :class="item.isactive ? 'active' : ''" @click="getScreen(screenData.industry, item.code)">
                        {{ item.name }}
                    </span>
                </div>
            </div>
        </div>
    </div>

    <div class="product_list">
        <!-- 筛选组件 -->
        <el-select v-model="expertSelect" clearable class="m-2" placeholder="默认排序">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <!-- 商品数据列表 -->
        <el-table :data="tableData" style="width: 100%" :header-cell-style="{ background: '#F7F7F7', color: '#606266' }">
            <el-table-column prop="product" label="商品" width="600" header-align="center">
                <template #default="">
                    <div class="product_info" @click="gotoProductDetail">
                        <!-- 商品缩略图 -->
                        <div class="product_pic">
                            <img src="@/assets/images/good.png" alt="" />
                            <div class="bg"></div>
                        </div>
                        <!-- 视频文案 -->
                        <div class="product_text">
                            <el-tooltip placement="top" popper-class="tool-tip">
                                <template #content>3811mm 40mm 42mm 44mm 41mm 45mm Luxury TPU protector Iwatch Luminous Cover For Apple Watch case series 1/2/3/4/5/6/7</template>
                                <h3>3811mm 40mm 42mm 44mm 41mm 45mm Luxury TPU protector Iwatch Luminous Cover For Apple Watch case series 1/2/3/4/5/6/7</h3>
                            </el-tooltip>
                            <!-- 免费图标 -->
                            <div class="free_icon">
                                <span class="iconfont icon-mianfei1"></span>
                            </div>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="expert_num" label="关联达人数" align="center" />
            <el-table-column prop="price" label="价格" align="center" />
            <el-table-column prop="commission_rate" label="佣金率" align="center" />
            <el-table-column prop="sale_num" label="总售卖量" align="center" />
            <el-table-column prop="expected_sale" label="预计销售额" align="center" />
        </el-table>
        <!-- 翻页组件 -->
        <div class="pagination">
            <div class="placeholder"></div>
            <el-pagination background layout="prev, pager, next" :total="1000" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { reqSearchConditions } from '@/api/expert/expertSearch'
import useExpertSearchList from '@/store/modules/expertSearchList'
import { useRouter } from 'vue-router'

const router = useRouter()
const expertSearchList = useExpertSearchList()

onMounted(() => {
    getSearchConditions()
})
// 添加筛选条件  并进行请求
const send = () => {
    let country_code = { ...dynamicTags.value[0] }.code
    let industryCode = { ...dynamicTags.value[1] }.code

    let obj = { country_code, industryCode }
    Object.assign(expertSearchList.reqData, obj)
}

// 获取搜索达人所需的前置条件（如：国家、行业等）
const getSearchConditions = async () => {
    let res: any = await reqSearchConditions()
    if (res.code === '00000') {
        screenData.countrys = res.result.countrys
        screenData.industry = res.result.industry
        screenData.countrys.forEach((item: { isactive: boolean }) => (item.isactive = false))
        screenData.industry.forEach((item: { isactive: boolean }) => (item.isactive = false))
    }
}

// 搜索框 标签数据
const dynamicTags: any = ref([])

const handleClose = (code: string) => {
    // 删除 搜索框展示标签
    dynamicTags.value.forEach((item: { code: string }, index: any) => {
        if (item.code == code) {
            dynamicTags.value.splice(index, 1)
        }
    })
    // 过滤数据  筛选区标签 去除选中状态
    for (const key in screenData) {
        screenData[key].forEach((item: { code: string; isactive: boolean }) => {
            if (item.code == code) return (item.isactive = false)
        })
    }
}

// 搜索框内容
const searchText = ref('')

// 筛选条件数据
const screenData: any = reactive({
    countrys: [],
    industry: [],
})
//点击标签 获取已选内容
const getScreen = (data: any, code: any) => {
    dynamicTags.value = [{}, {}]
    // 让 标签具有选中状态
    data.forEach((item: { isactive: boolean; code: any; name_cn: any; name: any }) => {
        if (!item.isactive && item.code == code) {
            item.isactive = true
        } else {
            item.isactive = false
        }
    })
    // 过滤数据  让选中标签 展现在搜索框内
    screenData.countrys.forEach((item: { isactive: any; code: any; name_cn: any; name: any; fansNum: any }) => {
        if (item.isactive) {
            let newTag = {
                code: item.code,
                // tag: item.name_cn ? item.name_cn : item.name,
                tag: item.name_cn || item.name || item.fansNum,
            }
            return (dynamicTags.value[0] = newTag)
        }
    })
    screenData.industry.forEach((item: { isactive: any; code: any; name_cn: any; name: any; fansNum: any }) => {
        if (item.isactive) {
            let newTag = {
                code: item.code,
                // tag: item.name_cn ? item.name_cn : item.name,
                tag: item.name_cn || item.name || item.fansNum,
            }
            return (dynamicTags.value[1] = newTag)
        }
    })
}

// 达人排序数据
const expertSelect = ref('')
const options = [
    {
        value: '0',
        label: '粉丝数',
    },
    {
        value: '1',
        label: '点赞数',
    },
    {
        value: '2',
        label: '互动率',
    },
    {
        value: '3',
        label: '平均播放量',
    },
]
// 视频列表数据
const tableData = [
    {
        expert_num: '2300',
        price: '25.00 MVR',
        commission_rate: '24%',
        sale_num: '789',
        expected_sale: '175',
    },
    {
        expert_num: '2300',
        price: '25.00 MVR',
        commission_rate: '24%',
        sale_num: '789',
        expected_sale: '175',
    },
    {
        expert_num: '2300',
        price: '25.00 MVR',
        commission_rate: '24%',
        sale_num: '789',
        expected_sale: '175',
    },
]

// 跳转商品详情页
const gotoProductDetail = () => {
    router.push('/expert/product-details')
}
</script>

<style lang="scss">
.product_list {
    .el-table__row {
        cursor: pointer;
    }
}
.screen_box {
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
    }
}
</style>

<style lang="scss">
.product_list {
    .pagination {
        .el-pagination {
            .el-pager li {
                background-color: #fff;
                border: 1px solid rgba(0, 0, 0, 0.15);
            }
            .el-pager .is-active {
                background-color: var(--el-color-primary);
                color: var(--el-color-white);
            }
        }
    }
}
</style>
<style lang="scss" scoped>
.screen_box {
    padding: 1px 30px 10px 30px;
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
            background-color: $base-theme-color;
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
                margin: 0 10px 0 27px;
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
.product_list {
    padding: 30px;
    margin-top: 28px;
    background-color: #fff;
    border-radius: 5px;

    .el-select {
        width: 120px;
        float: right;
        margin-bottom: 15px;
    }

    .product_info {
        display: flex;
        align-items: center;

        .product_pic {
            position: relative;
            cursor: pointer;
            width: 90px;
            height: 90px;
            margin-right: 10px;

            img {
                width: 100%;
                height: 100%;
            }

            .bg {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background-color: rgba(0, 0, 0, 0.2);
                transition: all 0.3s;
            }
        }

        .product_pic:hover .bg {
            background-color: rgba(0, 0, 0, 0.4);
        }

        .product_text {
            width: 70%;

            h3 {
                height: 50px;
                font-size: 14px;
                line-height: 25px;
                font-weight: 700;
                color: rgba(56, 56, 56, 1);
                display: -webkit-box;
                word-break: break-all;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .free_icon {
                margin-top: 15px;

                .iconfont {
                    color: rgba(234, 149, 24, 1);
                }
            }
        }
    }

    // 分页
    .pagination {
        display: flex;
        justify-content: space-between;
        margin-top: 18px;
        .placeholder {
            flex-grow: 1;
        }
    }
}
</style>
