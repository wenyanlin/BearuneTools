<template>
    <div class="w-full h-16 flex justify-center backdrop-blur-lg bg-50 sticky top-0 z-40 border-b border-greyBlue">
        <div class="w-innerWidth flex justify-between items-center h-full">
            <div class="h-4/6 cursor-pointer py-1 px-2 flex gap-2 rounded-lg text-info hover:bg-greyBlue50"
                @click="navigateHome">
                <IconLogo />
            </div>
            <div class="flex justify-between items-center gap-8">
                <div class="flex gap-1 navigation_links">
                    <!-- <RouterLink to="/convert-image" class="navigation_link no-style-a">圖片轉ICO</RouterLink>
                    <RouterLink to="/convert-image" class="navigation_link no-style-a">圖片轉檔</RouterLink>
                    <RouterLink to="/convert-image" class="navigation_link no-style-a">圖片裁剪</RouterLink> -->
                    <RouterLink to="/convert-image" class="navigation_link no-style-a">在線轉換圖像</RouterLink>
                    <RouterLink to="/about-me" class="navigation_link no-style-a">關於我</RouterLink>
                    <!-- <RouterLink to="/convert-image" class="navigation_link no-style-a">多功能圖片處理工具</RouterLink> -->
                    <!-- <RouterLink to="/convert-image" class="navigation_link no-style-a">Bearune系列</RouterLink> -->
                </div>
                <SwitchButton :default-checked="currentTheme == 'dark' ? true : false" :run-event="switchTheme">
                </SwitchButton>
                <a href="https://buymeacoffee.com/bearune" class="no-style-a hover:bg-transparent hover:brightness-75" target="_blank"><img src="/src/assets/bmc-button.svg" alt="" ></a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import SwitchButton from './switchButton.vue';
import { IconLogo } from '@/assets/icons'

const router = useRouter();
const navigateHome = () => {
    router.push('/');
};

const systemSettingDark = ref();
const localStorageTheme = ref();
const currentTheme = ref();

const getDefaultTheme = (localStorageTheme, systemSettingDark) => {
    if (localStorageTheme.value !== null) {
        return localStorageTheme.value;
    }

    if (systemSettingDark.value.matches) {
        return 'dark';
    }

    return 'light';
}

const updateThemeOnHtmlEl = (theme) => {
    document.querySelector('html').setAttribute('data-theme', theme);
}

const switchTheme = () => {
    const newTheme = currentTheme.value === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);

    updateThemeOnHtmlEl(newTheme);

    currentTheme.value = newTheme;
}

onMounted(() => {
    systemSettingDark.value = window.matchMedia('(prefers-color-scheme: dark)');
    localStorageTheme.value = localStorage.getItem('theme');
    currentTheme.value = getDefaultTheme(localStorageTheme, systemSettingDark);
    updateThemeOnHtmlEl(currentTheme.value);
})
</script>

<style lang="scss" scoped>
.navigation {
    &_link {
        @apply py-1 px-4 rounded-lg duration-100;

        &:hover {
            @apply bg-greyBlue50;
        }
    }
}
</style>