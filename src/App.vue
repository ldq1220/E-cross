<template>
    <!-- <el-config-provider :locale="locale"> -->
        <RouterView></RouterView>
    <!-- </el-config-provider> -->
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { reqRegionContryList } from './api/system'
import useSystemStore from '@/store/modules/system'

const systemStore = useSystemStore()

onMounted(() => {
    getRegionContryList()
})

// 获取国家列表 并存储在pinia中
const getRegionContryList = async () => {
    let res: any = await reqRegionContryList()
    if(res.code == '00000') return systemStore.contry = res.result
}
</script>

<style scoped></style>
