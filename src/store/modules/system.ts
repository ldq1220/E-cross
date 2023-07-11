import { defineStore } from 'pinia'
import { ref } from 'vue'

const useSystemStore = defineStore('System', () => {
    const contry = ref()

    return { contry }
})

export default useSystemStore
