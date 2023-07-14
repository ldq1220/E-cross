import { defineStore } from 'pinia'
import { ref } from 'vue'

const useSystemStore = defineStore('System', () => {
    const contry = ref()
    const creativeTypes = ref()

    return { contry, creativeTypes }
})

export default useSystemStore
