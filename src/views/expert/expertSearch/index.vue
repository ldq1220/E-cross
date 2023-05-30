<template>
  <div class="big_box">
     <!-- banner -->
     <div class="banner">Banner</div>
  
     <!-- 筛选搜索区 -->
     <expertScreen />

     <!--达人列表区  -->
     <expertList/>
  </div>
   
</template>

<script setup lang="ts">
import expertScreen from './components/expertScreen/index.vue'
import expertList from './components/expertList/index.vue'

</script>

<style scoped lang="scss">
/* banner */
.banner {
    width: 100%;
    height: 75px;
    text-align: center;
    line-height: 75px;
    background-color: rgba(229, 229, 229, 1);
}


</style>
