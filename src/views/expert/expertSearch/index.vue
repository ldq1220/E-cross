<template>
    <!-- banner -->
    <div class="banner">Banner</div>
    <!-- 搜索区 -->
    <div class="expert_search_box">
        <div class="search_top">
            <div class="search_top_tag">
                <img
                    src="@/assets/images/expertSearch/Vector.png"
                    alt=""
                    class="tag_img"
                />
                <img
                    src="@/assets/images/expertSearch/Polygon 5.png"
                    alt=""
                    class="tag_icon"
                />
            </div>
        </div>
        <div class="search_input_box">
            <el-input class="search_input" placeholder="请输入搜索关键字" />
        </div>
        <div class="search_btn_box">
          <el-button type="primary" class="search_btn">
            <i class="iconfont icon-sousuo btn_icon1"></i>
            67.67万条结果
            <div class="flag"></div>
            <i class="iconfont icon-xiangxia1 btn_icon2"></i>
          </el-button>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
/* banner */
.banner {
    width: 100%;
    height: 75px;
    text-align: center;
    line-height: 75px;
    background-color: rgba(229, 229, 229, 1);
}

/* 搜索区 */
.expert_search_box {
    padding: 20px;
    background-color: #fff;
    margin-top: 23px;
    border-radius: 5px;
    display: flex;
    align-items: center;

    /* 上边搜索部分 */
    .search_top {
      cursor: pointer;
        .search_top_tag {
            position: relative;
            width: 45px;
            height: 45px;
            opacity: 1;
            border-radius: 5px;
            background: rgba(247, 247, 247, 1);
            .tag_img {
                position: absolute;
                width: 19px;
                height: 19px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
            .tag_icon {
                position: absolute;
                width: 6px;
                height: 6px;
                top: 70%;
                left: 70%;
            }
        }
    }
    .search_input_box{
      flex-grow: 1;
      margin: 0 9px 0 5px;
      .search_input{
        width: 100%;
        height: 50px !important;
        border-radius: 2.5px;
        // border: 1.25px solid rgba(0, 0, 0, 0.15);
      }
    }
    .search_btn_box{
      .search_btn{
        height: 50px;
        background-color:#EB5E28 ;
        border: none;
        .btn_icon1{
          display: inline-block;
          margin-right: 21px;
          font-size: 22px;
        }
        .flag {
          width: 1px;
          height: 20px;
          background-color: #fff;
          margin: 0 10px 0 37px;
        }
        .btn_icon2{
          font-size: 12px;
          line-height: 50px;
          // position: relative;
        }
      }
    }
}
</style>
