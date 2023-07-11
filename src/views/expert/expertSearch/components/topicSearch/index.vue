<template>
    <!-- 条件筛选区 -->
    <div class="screen_box">
        <!-- 搜索区 -->
        <div class="expert_search_box">
            <div class="search_input_box">
                <el-input class="search_input" v-model="searchInput" placeholder="请输入话题名称，仅支持英文"></el-input>
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
            <!-- 行业 -->
            <div class="condition_box">
                <span class="condition_label">行业</span>
                <div class="condition_list">
                    <span class="condition_item" v-for="item in screenData.industry" :key="item.code" :class="item.isactive ? 'active' : ''" @click="getScreen(screenData.industry, item.code)">
                        {{ item.name }}
                    </span>
                </div>
            </div>
            <!-- 时间 -->
            <div class="condition_box condition_time" :class="searchInput ? 'condition_box_none' : ''">
                <span class="condition_label">时间</span>
                <div class="condition_list">
                    <span class="condition_item" v-for="item in screenData.time" :key="item.code" :class="item.isactive ? 'active' : ''" @click="getScreen(screenData.time, item.code)">
                        {{ item.timeText }}
                    </span>
                </div>
            </div>
        </div>
    </div>

    <div class="product_list">
        <div class="product_list_box">
            <!-- 商品数据列表 -->
            <el-table :data="tableData" style="width: 46%" :header-cell-style="{ background: '#F7F7F7', color: '#606266' }">
                <el-table-column label="排序" type="index" width="70" align="center">
                    <template #default="scope">
                        <div class="product_info">{{ scope.row.index }}</div>
                    </template>
                </el-table-column>

                <el-table-column label="话题标签">
                    <template #default="">
                        <div class="product_info">#beauty</div>
                    </template>
                </el-table-column>

                <el-table-column property="commission_rate" label="观看量" align="center" />
                <el-table-column label="操作" align="center">
                    <template #default="">
                        <router-link :to="{ path: '/topicExpertList' }" target="_blank" style="display: block">
                            <el-button>相关达人</el-button>
                        </router-link>
                    </template>
                </el-table-column>
            </el-table>
            <div class="flag" style="width: 1px; background-color: rgb(229, 229, 229)"></div>

            <!-- 商品数据列表 -->
            <el-table :data="tableData2" style="width: 46%" :header-cell-style="{ background: '#F7F7F7', color: '#606266' }">
                <el-table-column label="排序" type="index" width="70" align="center">
                    <template #default="scope">
                        <div class="product_info">{{ scope.row.index }}</div>
                    </template>
                </el-table-column>

                <el-table-column label="话题标签">
                    <template #default="">
                        <div class="product_info">#beauty</div>
                    </template>
                </el-table-column>

                <el-table-column property="commission_rate" label="观看量" align="center" />
                <el-table-column label="操作" align="center">
                    <template #default="">
                        <el-button>相关达人</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

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

onMounted(() => {
    getSearchConditions()
})
// 添加筛选条件  并进行请求
const send = () => {}

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

// 搜索框内容
const searchInput = ref('')

// 筛选条件数据
const screenData: any = reactive({
    countrys: [],
    industry: [],
    time: [
        {
            code: '7',
            isactive: true,
            timeText: '近7天',
        },
        {
            code: '30',
            isactive: false,
            timeText: '近30天',
        },
        {
            code: '120',
            isactive: false,
            timeText: '近120天',
        },
    ],
})
//点击标签 获取已选内容
const getScreen = (data: any, code: any) => {
    // 让 标签具有选中状态
    data.forEach((item: { isactive: boolean; code: any; name_cn: any; name: any }) => {
        if (!item.isactive && item.code == code) {
            item.isactive = true
        } else {
            item.isactive = false
        }
    })
}

// 视频列表数据
const tableData = [
    {
        index: 1,
        commission_rate: '5万',
    },
    {
        index: 2,
        commission_rate: '5万',
    },
    {
        index: 3,
        commission_rate: '5万',
    },
    {
        index: 4,
        commission_rate: '5万',
    },
    {
        index: 5,
        commission_rate: '5万',
    },
]
const tableData2 = [
    {
        index: 6,
        commission_rate: '5万',
    },
    {
        index: 7,
        commission_rate: '5万',
    },
    {
        index: 8,
        commission_rate: '5万',
    },
    {
        index: 9,
        commission_rate: '5万',
    },
    {
        index: 10,
        commission_rate: '5万',
    },
]
</script>

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
    .condition_time {
        transition: all .5s;
    }
    .condition_box_none {
        height: 0;
        opacity: 0;
        margin: 0 ;
        transform: translateX(-30px);
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
    .product_list_box {
        display: flex;
        justify-content: space-between;
    }

    .el-select {
        width: 120px;
        float: right;
        margin-bottom: 15px;
    }

    .product_info {
        font-size: 20px;
        font-weight: 700;
        line-height: 28.96px;
        color: rgba(56, 56, 56, 1);
        padding: 16px 0px;
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
