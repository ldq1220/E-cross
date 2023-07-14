// 对数值单位进行换算
export const formatNumber = (num: any) => {
    const digit = Math.floor(num).toString().length
    let res = num
    if (digit >= 5 && digit <= 8) {
        res = (num / 10000).toFixed(1) + '万'
    } else if (digit >= 9) {
        res = (num / 100000000).toFixed(1) + '亿'
    } else {
        // res = num.toFixed(1).toString()
        res = Math.round(num)
    }
    return res
}

// 计算一个数值的百分比
export const formatEngagementRate = (num: any) => {
    return Math.round(num * 1000) / 10
}

// 对一个对象 key-value 的value 取值  生成数组对象 {name：key,value:values}  获取前五个 其他归为其他
export const getTopSixData = (obj: any) => {
    // 获取对象中 key 对应的 value 数组并进行排序
    const arr = Object.entries(obj).map(([name, value]) => ({ name, value }))
    arr.sort((a: any, b: any) => b.value - a.value)

    // 只取数组前六项，并将第七项以后的 value 相加
    let sum = 0
    const data = arr.slice(0, 5).map(({ name, value }) => {
        sum += parseInt(value as any)
        return { name, value }
    })
    // 在数组最后添加一个对象，表示其他数值之和
    data.push({ name: '其他', value: sum + '' })

    // 返回结果数组
    return data
}

// 对一个对象 key-value 的value 取值  生成数组对象 {name：key,value:values}  只获取前五个
export const getTopSixDataFive = (obj: any) => {
    // 获取对象中 key 对应的 value 数组并进行排序
    const arr = Object.entries(obj).map(([name, value]) => ({ name, value }))
    arr.sort((a: any, b: any) => b.value - a.value)

    // 只取数组前六项，并将第七项以后的 value 相加
    let data: any = null
    const data1 = arr.slice(0, 5).map(({ name, value }) => {
        return { name, value }
    })
    const data2 = arr.slice(0, 6).map(({ name, value }) => {
        return { name, value }
    })

    const flag = data1.some((item) => item.name === 'Other')
    flag ? (data = data2.filter((item) => item.name !== 'Other')) : (data = data1)

    // 返回结果数组
    return data
}

// 对一个对象 key-value 的value 取值  生成数组对象 {name：key,value:values}
export const newArray = (obj: any) => {
    return Object.entries(obj).map(([key, value]) => ({
        name: key,
        value,
    }))
}

// 现在我有一个对象 内容是 key：value 帮我写一个方法 获取这个对象的最后七条数据 并且把key 和 value 保存到两个数值中去 key和value在数值中的索引保持一致
export const getLastSevenData = (obj: any) => {
    const keys = Object.keys(obj) // 获取对象的键数组
    const values = Object.values(obj) // 获取对象的值数组
    const lastSevenKeys = keys.slice(-7) // 获取最后七个键
    const lastSevenValues = values.slice(-7) // 获取最后七个值
    return [lastSevenKeys, lastSevenValues]
}
// const [lastSevenKeys, lastSevenValues] = getLastSevenData(obj) 调用
