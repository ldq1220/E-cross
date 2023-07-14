import { defineStore } from 'pinia'
import { ref } from 'vue'

const useI18nStore = defineStore('System', () => {
    const lang = ref('zn')

    return { lang }
})

export default useI18nStore
