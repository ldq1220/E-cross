<template>
    <div class="dynamicRecording_box">
        <div class="dynamicRecording_top">
            <div class="top_tooltip">最新动态：收到一封kajg新邮件！点击查看</div>
            <div class="btns">
                <el-button type="primary " class="btn fill_dynamic">填写动态</el-button>
                <el-button class="btn batch_remove">批量删除</el-button>
            </div>
        </div>
        <div class="dynamicRecording_bottom">
            <!-- 列表区域 -->
            <div class="table_list">
                <el-table :data="tableData" style="width: 100%" :header-cell-style="{ background: 'rgba(247, 247, 247, 1)', color: '#606266', padding: '8px 0' }">
                    <el-table-column type="selection" width="55" />

                    <el-table-column property="name" label="跟进记录描述" width="200">
                        <template #default="scope">
                            <span class="expert_name">{{ scope.row.name }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column property="area" label="联系状态" align="center">
                        <template #default="scope">
                            <el-tag type="success">{{ scope.row.area }}</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column property="type" label="合作状态" align="center">
                        <!-- <template #default="scope">
                            {{ scope.row.type }}
                        </template> -->
                    </el-table-column>

                    <el-table-column property="grouping" label="跟进人" align="center" />

                    <el-table-column property="num" label="类型" align="center" />
                    <el-table-column property="time" label="跟进时间" width="160" align="center" />
                    <el-table-column property="nextTime" label="计划下次跟进时间" width="160" align="center" />

                    <el-table-column label="操作" align="center" width="90">
                        <template #default="">
                            <div class="op_icon">
                                <i class="iconfont icon-bianji operation_icon"></i>
                                <i class="iconfont icon-shanchu operation_icon"></i>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页器 -->
                <div class="pagination">
                    <div class="placeholder"></div>
                    <el-pagination background layout="prev, pager, next" :total="100" v-model:current-page="page" @current-change="changePage" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const page = ref(1)
const changePage = ()=>{}

const tableData = ref([
    {
        id: 0,
        name: '监视视频效果',
        area: '达人已回复',
        type: '已上线合作视频',
        grouping: '茶米',
        num: '电话',
        time: '2023-06-01 12:20',
        nextTime: '2023-07-23',
    },
    {
        id: 0,
        name: '我寄了4个样品过去了',
        area: '达人已回复',
        type: '已寄样',
        grouping: '茶米',
        num: '电话',
        time: '2023-06-01 12:20',
        nextTime: '2023-07-23',
    },
    {
        id: 0,
        name: '我寄了4个样品过去了',
        area: '达人已回复',
        type: '未合作',
        grouping: '茶米',
        num: '电话',
        time: '2023-06-01 12:20',
        nextTime: '2023-07-23',
    },
    {
        id: 0,
        name: '我寄了4个样品过去了',
        area: '达人已回复',
        type: '已寄样',
        grouping: '茶米',
        num: '电话',
        time: '2023-06-01 12:20',
        nextTime: '2023-07-23',
    },
])
</script>

<style lang="scss">
.dynamicRecording_bottom {
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

<style scoped lang="scss">
.dynamicRecording_box {
    .dynamicRecording_top {
        padding: 20px 0 25px 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .top_tooltip {
            font-size: 14px;
            color: rgba(212, 48, 48, 1);
            cursor: pointer;
        }
        .top_tooltip:hover {
            color: #06b666;
            text-decoration: underline;
        }
        .btn {
            padding: 19px 26px;
        }
        .fill_dynamic {
            background-color: $base-theme-color;
            color: #fff;
            border: none;
        }
        .batch_remove {
            background-color: #fff;
            color: rgba(212, 48, 48, 1);
        }

        .batch_remove:hover {
            color: #409eff;
        }
    }
    .dynamicRecording_bottom {
        .table_list {
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
        }
        .el-table_3_column_23 {
            .cell {
                display: flex;
                justify-content: space-between;
            }
        }
        .op_icon {
            padding: 10px 0;
            display: flex;
            justify-content: space-between;
            .operation_icon {
                font-size: 20px;
                font-weight: bold;
            }
            .operation_icon:hover {
                color: $base-theme-color;
                cursor: pointer;
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
}
</style>
