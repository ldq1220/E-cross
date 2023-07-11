import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { newArray, formatEngagementRate, getTopSixDataFive, getTopSixData } from '@/utils/formatNumber'
import useSystemStore from '@/store/modules/system'

const systemStore = useSystemStore()

const useExpertInfoData = defineStore('expertInfoData', () => {
    const infoData: any = reactive({
        activityDistribution: null, // 粉丝活跃
        inactivityDistribution: null, // 粉丝不活跃
        ageDistribution: null, // 分析年龄
        countryDistribution: null, // 粉丝区域
        deviceDistribution: null, //粉丝使用设备
    })

    const getActivityDistribution = (active: any, inactive: any) => {
        let perActive = active / (active * 1 + inactive * 1)
        let PerInactive = inactive / (active * 1 + inactive * 1)
        infoData.activityDistribution = formatEngagementRate(perActive)
        infoData.inactivityDistribution = formatEngagementRate(PerInactive)
    }

    const getAgeDistribution = (data: any) => {
        infoData.ageDistribution = newArray(data)
    }

    const getCountryDistribution = (data: any) => {
        infoData.countryDistribution = getTopSixDataFive(data)

        let sum: number = 0
        let contry: any = [
            {
                name: 'Afghanistan',
                value: '阿富汗',
            },
            {
                name: 'Other',
                value: '其他',
            },
            {
                name: 'Aland Islands',
                value: '奥兰群岛',
            },
            {
                name: 'Albania',
                value: '阿尔巴尼亚',
            },
            {
                name: 'Algeria',
                value: '阿尔及利亚',
            },
            {
                name: 'American Samoa',
                value: '美属萨摩亚',
            },
            {
                name: 'Andorra',
                value: '安道尔',
            },
            {
                name: 'Angola',
                value: '安哥拉',
            },
            {
                name: 'Anguilla',
                value: '安圭拉',
            },
            {
                name: 'Antigua and Barbuda',
                value: '安提瓜和巴布达',
            },
            {
                name: 'Argentina',
                value: '阿根廷',
            },
            {
                name: 'Armenia',
                value: '亚美尼亚',
            },
            {
                name: 'Aruba',
                value: '阿鲁巴',
            },
            {
                name: 'Australia',
                value: '澳大利亚',
            },
            {
                name: 'Austria',
                value: '奥地利',
            },
            {
                name: 'Azerbaijan',
                value: '阿塞拜疆',
            },
            {
                name: 'Bangladesh',
                value: '孟加拉',
            },
            {
                name: 'Bahrain',
                value: '巴林',
            },
            {
                name: 'Bahamas',
                value: '巴哈马',
            },
            {
                name: 'Barbados',
                value: '巴巴多斯',
            },
            {
                name: 'Belarus',
                value: '白俄罗斯',
            },
            {
                name: 'Belgium',
                value: '比利时',
            },
            {
                name: 'Belize',
                value: '伯利兹',
            },
            {
                name: 'Benin',
                value: '贝宁',
            },
            {
                name: 'Bermuda',
                value: '百慕大',
            },
            {
                name: 'Bhutan',
                value: '不丹',
            },
            {
                name: 'Bolivia',
                value: '玻利维亚',
            },
            {
                name: 'Bosnia and Herzegovina',
                value: '波斯尼亚和黑塞哥维那',
            },
            {
                name: 'Botswana',
                value: '博茨瓦纳',
            },
            {
                name: 'Bouvet Island',
                value: '布维岛',
            },
            {
                name: 'Brazil',
                value: '巴西',
            },
            {
                name: 'Brunei',
                value: '文莱',
            },
            {
                name: 'Bulgaria',
                value: '保加利亚',
            },
            {
                name: 'Burkina Faso',
                value: '布基纳法索',
            },
            {
                name: 'Burundi',
                value: '布隆迪',
            },
            {
                name: 'Cambodia',
                value: '柬埔寨',
            },
            {
                name: 'Cameroon',
                value: '喀麦隆',
            },
            {
                name: 'Canada',
                value: '加拿大',
            },
            {
                name: 'Cape Verde',
                value: '佛得角',
            },
            {
                name: 'Central African Republic',
                value: '中非',
            },
            {
                name: 'Chad',
                value: '乍得',
            },
            {
                name: 'Chile',
                value: '智利',
            },
            {
                name: 'Christmas Islands',
                value: '圣诞岛',
            },
            {
                name: 'Cocos (keeling) Islands',
                value: '科科斯（基林）群岛',
            },
            {
                name: 'Colombia',
                value: '哥伦比亚',
            },
            {
                name: 'Comoros',
                value: '科摩罗',
            },
            {
                name: 'Congo (Congo-Kinshasa)',
                value: '刚果（金）',
            },
            {
                name: 'Congo',
                value: '刚果',
            },
            {
                name: 'Cook Islands',
                value: '库克群岛',
            },
            {
                name: 'Costa Rica',
                value: '哥斯达黎加',
            },
            {
                name: 'Cote D’Ivoire',
                value: '科特迪瓦',
            },
            {
                name: 'China',
                value: '中国',
            },
            {
                name: 'Croatia',
                value: '克罗地亚',
            },
            {
                name: 'Cuba',
                value: '古巴',
            },
            {
                name: 'Czech',
                value: '捷克',
            },
            {
                name: 'Cyprus',
                value: '塞浦路斯',
            },
            {
                name: 'Denmark',
                value: '丹麦',
            },
            {
                name: 'Djibouti',
                value: '吉布提',
            },
            {
                name: 'Dominica',
                value: '多米尼加',
            },
            {
                name: 'East Timor',
                value: '东帝汶',
            },
            {
                name: 'Ecuador',
                value: '厄瓜多尔',
            },
            {
                name: 'Egypt',
                value: '埃及',
            },
            {
                name: 'Equatorial Guinea',
                value: '赤道几内亚',
            },
            {
                name: 'Eritrea',
                value: '厄立特里亚',
            },
            {
                name: 'Estonia',
                value: '爱沙尼亚',
            },
            {
                name: 'Ethiopia',
                value: '埃塞俄比亚',
            },
            {
                name: 'Faroe Islands',
                value: '法罗群岛',
            },
            {
                name: 'Fiji',
                value: '斐济',
            },
            {
                name: 'Finland',
                value: 'Finland',
            },
            {
                name: 'France',
                value: '法国',
            },
            {
                name: 'Franch Metropolitan',
                value: '法国大都会',
            },
            {
                name: 'Franch Guiana',
                value: '法属圭亚那',
            },
            {
                name: 'French Polynesia',
                value: '法属波利尼西亚',
            },
            {
                name: 'Gabon',
                value: '加蓬',
            },
            {
                name: 'Gambia',
                value: '冈比亚',
            },
            {
                name: 'Georgia',
                value: '格鲁吉亚',
            },
            {
                name: 'Germany',
                value: '德国',
            },
            {
                name: 'Ghana',
                value: '加纳',
            },
            {
                name: 'Gibraltar',
                value: '直布罗陀',
            },
            {
                name: 'Greece',
                value: '希腊',
            },
            {
                name: 'Grenada',
                value: '格林纳达',
            },
            {
                name: 'Guadeloupe',
                value: '瓜德罗普岛',
            },
            {
                name: 'Guam',
                value: '关岛',
            },
            {
                name: 'Guatemala',
                value: '危地马拉',
            },
            {
                name: 'Guernsey',
                value: '根西岛',
            },
            {
                name: 'Guinea-Bissau',
                value: '几内亚比绍',
            },
            {
                name: 'Guinea',
                value: '几内亚',
            },
            {
                name: 'Guyana',
                value: '圭亚那',
            },
            {
                name: 'Hong Kong',
                value: '香港 （中国）',
            },
            {
                name: 'Haiti',
                value: '海地',
            },
            {
                name: 'Honduras',
                value: '洪都拉斯',
            },
            {
                name: 'Hungary',
                value: '匈牙利',
            },
            {
                name: 'Iceland',
                value: '冰岛',
            },
            {
                name: 'India',
                value: '印度',
            },
            {
                name: 'Indonesia',
                value: '印度尼西亚',
            },
            {
                name: 'Iran',
                value: '伊朗',
            },
            {
                name: 'Iraq',
                value: '伊拉克',
            },
            {
                name: 'Ireland',
                value: '爱尔兰',
            },
            {
                name: 'Isle of Man',
                value: '马恩岛',
            },
            {
                name: 'Israel',
                value: '以色列',
            },
            {
                name: 'Italy',
                value: '意大利',
            },
            {
                name: 'Jamaica',
                value: '牙买加',
            },
            {
                name: 'Japan',
                value: '日本',
            },
            {
                name: 'Jersey',
                value: '泽西岛',
            },
            {
                name: 'Jordan',
                value: '约旦',
            },
            {
                name: 'Kazakhstan',
                value: '哈萨克斯坦',
            },
            {
                name: 'Kenya',
                value: '肯尼亚',
            },
            {
                name: 'Kiribati',
                value: '基里巴斯',
            },
            {
                name: 'Korea (South)',
                value: '韩国',
            },
            {
                name: 'Korea (North)',
                value: '朝鲜',
            },
            {
                name: 'Kuwait',
                value: '科威特',
            },
            {
                name: 'Kyrgyzstan',
                value: '吉尔吉斯斯坦',
            },
            {
                name: 'Laos',
                value: '老挝',
            },
            {
                name: 'Latvia',
                value: '拉脱维亚',
            },
            {
                name: 'Lebanon',
                value: '黎巴嫩',
            },
            {
                name: 'Lesotho',
                value: '莱索托',
            },
            {
                name: 'Liberia',
                value: '利比里亚',
            },
            {
                name: 'Libya',
                value: '利比亚',
            },
            {
                name: 'Liechtenstein',
                value: '列支敦士登',
            },
            {
                name: 'Lithuania',
                value: '立陶宛',
            },
            {
                name: 'Luxembourg',
                value: '卢森堡',
            },
            {
                name: 'Macau',
                value: '澳门（中国）',
            },
            {
                name: 'Macedonia',
                value: '马其顿',
            },
            {
                name: 'Malawi',
                value: '马拉维',
            },
            {
                name: 'Malaysia',
                value: '马来西亚',
            },
            {
                name: 'Madagascar',
                value: '马达加斯加',
            },
            {
                name: 'Maldives',
                value: '马尔代夫',
            },
            {
                name: 'Mali',
                value: '马里',
            },
            {
                name: 'Malta',
                value: '马耳他',
            },
            {
                name: 'Marshall Islands',
                value: '马绍尔群岛',
            },
            {
                name: 'Martinique',
                value: '马提尼克岛',
            },
            {
                name: 'Mauritania',
                value: '毛里塔尼亚',
            },
            {
                name: 'Mauritius',
                value: '毛里求斯',
            },
            {
                name: 'Mayotte',
                value: '马约特',
            },
            {
                name: 'Mexico',
                value: '墨西哥',
            },
            {
                name: 'Micronesia',
                value: '密克罗尼西亚',
            },
            {
                name: 'Moldova',
                value: '摩尔多瓦',
            },
            {
                name: 'Monaco',
                value: '摩纳哥',
            },
            {
                name: 'Mongolia',
                value: '蒙古',
            },
            {
                name: 'Montenegro',
                value: '黑山',
            },
            {
                name: 'Montserrat',
                value: '蒙特塞拉特',
            },
            {
                name: 'Morocco',
                value: '摩洛哥',
            },
            {
                name: 'Mozambique',
                value: '莫桑比克',
            },
            {
                name: 'Myanmar',
                value: '缅甸',
            },
            {
                name: 'Namibia',
                value: '纳米比亚',
            },
            {
                name: 'Nauru',
                value: '瑙鲁',
            },
            {
                name: 'Nepal',
                value: '尼泊尔',
            },
            {
                name: 'Netherlands',
                value: '荷兰',
            },
            {
                name: 'New Caledonia',
                value: '新喀里多尼亚',
            },
            {
                name: 'New Zealand',
                value: '新西兰',
            },
            {
                name: 'Nicaragua',
                value: '尼加拉瓜',
            },
            {
                name: 'Niger',
                value: '尼日尔',
            },
            {
                name: 'Nigeria',
                value: '尼日利亚',
            },
            {
                name: 'Niue',
                value: '纽埃',
            },
            {
                name: 'Norfolk Island',
                value: '诺福克岛',
            },
            {
                name: 'Norway',
                value: '挪威',
            },
            {
                name: 'Oman',
                value: '阿曼',
            },
            {
                name: 'Pakistan',
                value: '巴基斯坦',
            },
            {
                name: 'Palau',
                value: '帕劳',
            },
            {
                name: 'Palestine',
                value: '巴勒斯坦',
            },
            {
                name: 'Panama',
                value: '巴拿马',
            },
            {
                name: 'Papua New Guinea',
                value: '巴布亚新几内亚',
            },
            {
                name: 'Paraguay',
                value: '巴拉圭',
            },
            {
                name: 'Peru',
                value: '秘鲁',
            },
            {
                name: 'Philippines',
                value: '菲律宾',
            },
            {
                name: 'Pitcairn Islands',
                value: '皮特凯恩群岛',
            },
            {
                name: 'Poland',
                value: '波兰',
            },
            {
                name: 'Portugal',
                value: '葡萄牙',
            },
            {
                name: 'Puerto Rico',
                value: '波多黎各',
            },
            {
                name: 'Qatar',
                value: '卡塔尔',
            },
            {
                name: 'Reunion',
                value: '留尼汪岛',
            },
            {
                name: 'Romania',
                value: '罗马尼亚',
            },
            {
                name: 'Rwanda',
                value: '卢旺达',
            },
            {
                name: 'Russian Federation',
                value: '俄罗斯联邦',
            },
            {
                name: 'Saint Helena',
                value: '圣赫勒拿',
            },
            {
                name: 'Saint Kitts-Nevis',
                value: '圣基茨和尼维斯',
            },
            {
                name: 'Saint Lucia',
                value: '圣卢西亚',
            },
            {
                name: 'Saint Vincent and the Grenadines',
                value: '圣文森特和格林纳丁斯',
            },
            {
                name: 'El Salvador',
                value: '萨尔瓦多',
            },
            {
                name: 'Samoa',
                value: '萨摩亚',
            },
            {
                name: 'San Marino',
                value: '圣马力诺',
            },
            {
                name: 'Sao Tome and Principe',
                value: '圣多美和普林西比',
            },
            {
                name: 'Saudi Arabia',
                value: '沙特阿拉伯',
            },
            {
                name: 'Senegal',
                value: '塞内加尔',
            },
            {
                name: 'Seychelles',
                value: '塞舌尔',
            },
            {
                name: 'Sierra Leone',
                value: '塞拉利昂',
            },
            {
                name: 'Singapore',
                value: '新加坡',
            },
            {
                name: 'Serbia',
                value: '塞尔维亚',
            },
            {
                name: 'Slovakia',
                value: '斯洛伐克',
            },
            {
                name: 'Slovenia',
                value: '斯洛文尼亚',
            },
            {
                name: 'Solomon Islands',
                value: '所罗门群岛',
            },
            {
                name: 'Somalia',
                value: '索马里',
            },
            {
                name: 'South Africa',
                value: '南非',
            },
            {
                name: 'Spain',
                value: '西班牙',
            },
            {
                name: 'Sri Lanka',
                value: '斯里兰卡',
            },
            {
                name: 'Sudan',
                value: '苏丹',
            },
            {
                name: 'Suriname',
                value: '苏里南',
            },
            {
                name: 'Swaziland',
                value: '斯威士兰',
            },
            {
                name: 'Sweden',
                value: '瑞典',
            },
            {
                name: 'Switzerland',
                value: '瑞士',
            },
            {
                name: 'Syria',
                value: '叙利亚',
            },
            {
                name: 'Tajikistan',
                value: '塔吉克斯坦',
            },
            {
                name: 'Tanzania',
                value: '坦桑尼亚',
            },
            {
                name: 'Taiwan',
                value: '台湾 （中国）',
            },
            {
                name: 'Thailand',
                value: '泰国',
            },
            {
                name: 'Trinidad and Tobago',
                value: '特立尼达和多巴哥',
            },
            {
                name: 'Timor-Leste',
                value: '东帝汶',
            },
            {
                name: 'Togo',
                value: '多哥',
            },
            {
                name: 'Tokelau',
                value: '托克劳',
            },
            {
                name: 'Tonga',
                value: '汤加',
            },
            {
                name: 'Tunisia',
                value: '突尼斯',
            },
            {
                name: 'Turkey',
                value: '土耳其',
            },
            {
                name: 'Turkmenistan',
                value: '土库曼斯坦',
            },
            {
                name: 'Tuvalu',
                value: '图瓦卢',
            },
            {
                name: 'Uganda',
                value: '乌干达',
            },
            {
                name: 'Ukraine',
                value: '乌克兰',
            },
            {
                name: 'United Arab Emirates',
                value: '阿拉伯联合酋长国',
            },
            {
                name: 'United Kingdom',
                value: '英国',
            },
            {
                name: 'United States',
                value: '美国',
            },
            {
                name: 'Uruguay',
                value: '乌拉圭',
            },
            {
                name: 'Uzbekistan',
                value: '乌兹别克斯坦',
            },
            {
                name: 'Vanuatu',
                value: '瓦努阿图',
            },
            {
                name: 'Vatican City',
                value: '梵蒂冈',
            },
            {
                name: 'Venezuela',
                value: '委内瑞拉',
            },
            {
                name: 'Vietnam',
                value: '越南',
            },
            {
                name: 'Wallis and Futuna',
                value: '瓦利斯群岛和富图纳群岛',
            },
            {
                name: 'Western Sahara',
                value: '西撒哈拉',
            },
            {
                name: 'Yemen',
                value: '也门',
            },
            {
                name: 'Yugoslavia',
                value: '南斯拉夫',
            },
            {
                name: 'Zambia',
                value: '赞比亚',
            },
            {
                name: 'Zimbabwe',
                value: '津巴布韦',
            },
        ]
        // 定义颜色数组
        let colors = ['#ff7f50', '#ff6b81', '#2ed573', '#3742fa', '#82589F']

        contry = JSON.parse(JSON.stringify(contry))

        for (const key in data) {
            sum += parseInt(data[key])
        }

        infoData.countryDistribution.forEach((item: { name: any }) => {
            systemStore.contry.forEach((contry: { code: any; name_cn: any }) => {
                if (item.name == contry.code) {
                    Object.assign(item, { contry: contry.name_cn })
                }
            })
        })

        infoData.countryDistribution.forEach((item: { contry: any; value: number }, index: number) => {
            contry.forEach((contry: { value: any; name: any }) => {
                if (item.contry == contry.value) {
                    Object.assign(item, { name: contry.name, itemStyle: { areaColor: colors[index] }, color: colors[index], percentage: formatEngagementRate(item.value / sum) })
                }
            })
        })
    }

    const getDeviceDistribution = (data: any) => {
        infoData.deviceDistribution = getTopSixData(data)

        infoData.deviceDistribution.forEach((item: any, index: any) => {
            if (item.name == 'UNKNOWN') {
                infoData.deviceDistribution.splice(index, 1) //移除未知的数据标志位,即name为UNKNOWN的数据在数组中的
                infoData.deviceDistribution[infoData.deviceDistribution.length - 1].value =
                    parseInt(infoData.deviceDistribution[infoData.deviceDistribution.length - 1].value) + parseInt(item.value) + ''
            }
        })
        infoData.deviceDistribution.sort((a: any, b: any) => {
            // 索引值越大，value 数值越小
            return a.value - b.value || b.index - a.index
        })
    }

    return {
        infoData,
        getAgeDistribution,
        getActivityDistribution,
        getCountryDistribution,
        getDeviceDistribution,
    }
})

export default useExpertInfoData
