import request from '@/utils/request'

// 定义请求地址字典
// 达人线索 - 达人搜索
enum API {
    EXPERTSEARCHCONDITIONS_URL = '/web/influencer/search-conditions', // 获取搜索达人所需的前置条件（如：国家、行业等）
    EXPERTLIST_URL = '/web/influencer/search-list', // 获取达人列表
    EXPERTDETAIL_URL = '/web/influencers/', // 获取一个达人的详情
    EXPERTTOP_URL = '/web/influencer/rank/?', // 获取达人排行榜数据
    EXPERTCOLLECT_URL = '/web/influencers/', // 收藏一个达人
}

// 获取搜索达人所需的前置条件（如：国家、行业等）
export const reqSearchConditions = () => request.get(API.EXPERTSEARCHCONDITIONS_URL)

// 获取达人列表
export const reqExpertList = (data: any) => request.post(API.EXPERTLIST_URL, data)

// 获取一个达人的详情
export const reqExpertDetail = (id: number) => request.get(API.EXPERTDETAIL_URL + id)

// 获取达人排行榜数据
export const reqExpertTop = (type: number) => request.get(API.EXPERTTOP_URL + `type=${type}`)

// 收藏一个达人
export const reqCollect = (id: number) => request.post(API.EXPERTCOLLECT_URL + id + '/collect')

