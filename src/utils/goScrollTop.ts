const goScrollTop = () => {
    setTimeout(() => {
        let layoutMainDom: any = document.querySelector('.layout_main')
        layoutMainDom?.scrollTo({
            top: 0,
            // behavior: 'smooth', // 添加平滑滚动效果
        })
    }, 0)
}

export default goScrollTop
