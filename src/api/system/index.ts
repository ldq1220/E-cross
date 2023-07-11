import request from '@/utils/request'

enum API {
    CONTRY_URL = '/system/region/contry', // 获取国家列表
}

// 获取国家列表
export const reqRegionContryList = () => request.get(API.CONTRY_URL)
