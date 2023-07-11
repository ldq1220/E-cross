import { defineStore } from 'pinia'
import { ref } from 'vue'

const uselayoutSettingStore = defineStore('Setting', () => {
    const fold = ref(false) // 控制左侧菜单列表是否折叠
    const changeFold = () => {
        fold.value = !fold.value
    }

    const refresh = ref(false) // 控制刷新
    const refreshFn = () => {
        refresh.value = !refresh.value
    }


    return {
        fold,
        refresh,
        changeFold,
        refreshFn,
    }
})

export default uselayoutSettingStore
