<template>
    <!-- <el-config-provider :locale="locale"> -->
    <RouterView></RouterView>
    <!-- </el-config-provider> -->
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { reqRegionContryList } from './api/system'
import { reqSearchConditions } from '@/api/expert/expertSearch'
import useSystemStore from '@/store/modules/system'

const systemStore = useSystemStore()

onMounted(() => {
    getRegionContryList()
})

// 获取国家列表 并存储在pinia中
const getRegionContryList = async () => {
    // 获取 国家列表
    let res: any = await reqRegionContryList()
    if (res.code == '00000') {
        systemStore.contry = res.result
    }
    // 获取 创作类型
    let res2: any = await reqSearchConditions()
    if (res2.code == '00000') {
        systemStore.creativeTypes = res2.result.creativeTypes
    }
}
</script>

<style scoped></style>
