import request from '@/utils/request'

enum API {
    EXPERTCONTENTSTATS_URL = '/web/influencers/', //  获取一个达人的内容统计
    EXPERTPUBLISHTIME_URL = '/web/video/stats/releaseDate/?', // 获取达人发布日期统计
    EXPERTENGAGMENT_URL = '/web/video/stats/engagement/?', // 获取近10个视频的互动统计
    EXPERTLABELSTATS_URL = '/web/video/stats/label/?', // 获取所有达人标签的统计信息
    EXPERTVIDEOLIST_URL = '/web/video/search-list', //  获取一个达人的视频列表页面
    EXPERTFANSGROWH_URL = '/web/influencers/', // 获取一个达人粉丝增长 || 粉丝性别  || 粉丝年龄 || 粉丝国家分布 || 粉丝活跃分布 || 粉丝设备分布 ||
    UPADATEINFLUENCERINFO_URL = '/web/influencers/', // 更新达人信息
    FAV_INFLUENCERS_URL = '/web/fav-influencers/', // 获取:get 达人合作信息 || 更新:post 达人合作信息 || 取消收藏:delete
    OSS_SIGNED_URL = '/oss/signed-url/generate', // 获取CF预签名URL
}

// 获取一个达人的内容统计
export const reqExpertContentStats = (id: number) => request.get(API.EXPERTCONTENTSTATS_URL + id + '/stats')

// 获取达人发布日期统计
export const reqPublishTime = (influencerId: string) => request.get(API.EXPERTPUBLISHTIME_URL + `influencerId=${influencerId}`)

// 获取近10个视频的互动统计
export const reqExpertEngagement = (influencerId: string) => request.get(API.EXPERTENGAGMENT_URL + `influencerId=${influencerId}`)

// 获取所有达人标签的统计信息
export const reqExpertLabelStats = (influencerId: string) => request.get(API.EXPERTLABELSTATS_URL + `influencerId=${influencerId}`)

// 获取一个达人的视频列表页面
export const reqExpertVideoList = (data: any) => request.post(API.EXPERTVIDEOLIST_URL, data)

// 获取一个达人粉丝增长
export const reqExpertFansGrowh = (id: number) => request.get(API.EXPERTFANSGROWH_URL + id + '/followers_count')

// 获取一达人的粉丝性别分布
export const reqExpertFansSex = (id: number) => request.get(API.EXPERTFANSGROWH_URL + id + '/gender_distribution')

// 获取一达人的粉丝年龄分布
export const reqExpertFansAge = (id: number) => request.get(API.EXPERTFANSGROWH_URL + id + '/age_distribution')

// 获取一个达人的粉丝国家分布
export const reqExpertFansCountry = (id: number) => request.get(API.EXPERTFANSGROWH_URL + id + '/country_distribution')

// 获取一个达人的粉丝活跃分布
export const reqExpertFansActivity = (id: number) => request.get(API.EXPERTFANSGROWH_URL + id + '/activity_distribution')

// 获取一个达人的粉丝设备分布
export const reqExpertFansDevice = (id: number) => request.get(API.EXPERTFANSGROWH_URL + id + '/device_distribution')

// 更新达人信息
export const reqUpdateInfluencerInfo = (id: number) => request.patch(API.UPADATEINFLUENCERINFO_URL + id + '/grab')

// 更新达人合作信息
export const reqGetFavInfluencers = (id: number) => request.get<any, any>(API.FAV_INFLUENCERS_URL + id)

// 更新达人合作信息
export const reqFavInfluencers = (id: number, data: any) => request.post(API.FAV_INFLUENCERS_URL + id, data)

// 取消收藏达人
export const reqCancelCollect = (id: number) => request.delete(API.FAV_INFLUENCERS_URL + id)

// 获取CF预签名URL
export const reqGetOssSigned = (data: any) => request.post(API.OSS_SIGNED_URL, data)
