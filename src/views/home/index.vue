<template>
    <div>
        <p>{{ $t('menu.home') }}</p>
        <span class="fi fi-gr"></span>
        <el-button type="primary" @keyup.enter="keyup">按钮</el-button>
        <router-link target="_blank" :to="{ path: '/expert/details', query: { id: '26995' } }">打开新的标签页</router-link>
        <el-input @keyup.enter="handleEnter">
            <el-button @click="handleButtonClick">点击</el-button>
        </el-input>
    </div>
</template>

<script setup lang="ts">
const keyup = () => {
    alert('按下enter')
}

const handleEnter = () => {
    // 回车键被按下时触发按钮的点击事件
    console.log('按下enter')
}
const handleButtonClick = () => {
    // 处理按钮点击事件的逻辑
    console.log('按钮被点击了')
}
</script>

<style scoped></style>
