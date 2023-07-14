import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

const useExpertSearchList = defineStore('expertSearchList', () => {
    const page = ref(1)
    const searchLoading = ref(false)

    // 请求列表数据
    const reqData = reactive({
        page: page, // 页码 0..N, 默认为1
        limit: 20, // 每页显示条数 默认为20
        nickName: undefined, // 昵称
        countryCode: undefined, // 国家代码
        sortType: 1, // 排序类型（按粉丝数/互动率/平均播放量） ******必填*******
        industryCode: undefined, // 带货类型
        minEngagementRate: undefined, // 最小互动率
        maxEngagementRate: undefined, // 最大互动率
        minFollowerCnt: undefined, // 最小粉丝数
        maxFollowerCnt: undefined, // 最大粉丝数
        minAvgPlayCnt: undefined, // 最小平均播放量
        maxAvgPlayCnt: undefined, // 最大平均播放量
    })

    return {
        page,
        reqData,
        searchLoading,
    }
})

export default useExpertSearchList
