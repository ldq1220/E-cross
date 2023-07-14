import useSystemStore from '@/store/modules/system'
const systemStore = useSystemStore()

//  合作状态
export const cooperationDict = (num: number) => {
    let cooperation = ''

    switch (num) {
        case 0:
            cooperation = '未合作'
            break
        case 1:
            cooperation = '已寄样'
            break
        case 2:
            cooperation = '已上线合作视频'
            break

        default:
            break
    }
    return cooperation
}

// 联系工具
export const contactToolDict = (num: number) => {
    let cooperation = ''

    switch (num) {
        case 1:
            cooperation = 'Email'
            break
        case 2:
            cooperation = 'Phone'
            break
        case 3:
            cooperation = 'Instagram'
            break
        case 4:
            cooperation = 'Youtube'
            break
        case 5:
            cooperation = 'Twitter'
            break
        case 6:
            cooperation = 'Facebook'
            break
        case 7:
            cooperation = 'Whatsapp'
            break
        case 8:
            cooperation = 'Zalo'
            break
        case 9:
            cooperation = 'Line'
            break

        default:
            break
    }
    return cooperation
}

// 找到countryCode 对应的name_cn
export const getCountryCodeName = (code: string) => {
    const foundItem = systemStore.contry.find((item: { code: string }) => item.code === code)
    if (foundItem) return foundItem.name_cn

    // 如果没有找到匹配项，则可以返回一个默认值或者其他处理方式
    return ''
}

// 过滤 创造类型
export const getLabelsFromValues = (values: any, data: any) => {
    const labels: any[] = []

    if (values) {
        const findLabel = (values: string | any[], data: any[]) => {
            data.forEach((item: any) => {
                if (values.includes(item.value)) {
                    labels.push(item.label)
                }
                if (item.children && item.children.length) {
                    findLabel(values, item.children)
                }
            })
        }

        findLabel(values, data)

        return labels
    }
}
