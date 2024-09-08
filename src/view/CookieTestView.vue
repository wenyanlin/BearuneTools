<template>
    <button @click="handleClick">i see</button>
    <div v-if="showTips" class="tips" id="js-tips">
        <p>hello world!</p>
        <button @click="handleClick">i see</button>
    </div>
    <RouterLink to="/">回首頁</RouterLink>
</template>

<script setup>
import { onMounted, ref } from 'vue';

// 使用ref創建一個 reactive 變數來控制提示框的顯示狀態
const showTips = ref(true);

// 檢查 Cookie 是否存在
onMounted(() => {
    const tips = document.cookie.split('; ').find(row => row.startsWith('show='));

    if (tips && tips.split('=')[1] === 'on') {
        showTips.value = false;
    }
});

// 點擊按鈕後設置 Cookie 並隱藏提示框
const handleClick = () => {
    document.cookie = "show=on; max-age=" + 365 * 24 * 60 * 60 + "; SameSite=Lax";
    showTips.value = false;
};

</script>

<style lang="scss" scoped></style>