<template>
    <div class="logo_box">
        <div class="logo">
            <img src="../../../public//logo.png" alt="" />
        </div>
        <div class="logo_text">
            <h1>E-Cross</h1>
            <p>TikTok跨境易达</p>
        </div>
    </div>
</template>

<script setup lang="ts"></script>
<style scoped lang="scss">
.logo_box {
    display: flex;
    .logo {
        width: 87px;
        height: $base-menu-logo-height;
        color: white;
        display: flex;
        align-items: center;
        padding: 8px;
        cursor: pointer;
        img {
            min-width: 100%;
            height: $base-menu-logo-height;
        }
    }
    .logo_text {
        min-width: 120px;
        h1 {
            font-size: 22px;
            font-weight: 700;
        }

        p {
            font-size: $base-logo-title-fontSize;
            font-weight: 700;
            color: $base-theme-color;
            margin-top: 5px;
        }
    }
}
</style>
