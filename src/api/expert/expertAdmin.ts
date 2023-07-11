import request from '@/utils/request'

enum API {
    FAV_INFLUENCERS_URL = '/web/fav-influencers?', // 获取收藏的达人列表
}

export const reqFav_Influencers = (id: number) => request.get(API.FAV_INFLUENCERS_URL + 'id=' + id)
