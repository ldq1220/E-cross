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

