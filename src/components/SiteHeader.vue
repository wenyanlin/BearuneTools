<template>
    <div class="w-full h-16 flex justify-center backdrop-blur-lg sticky top-0 z-40 border-b border-greyBlue xl:px-4">
        <div class="w-innerWidth flex justify-between items-center h-full xl:w-full">
            <div class="h-4/6 cursor-pointer py-1 px-2 flex gap-2 rounded-lg text-info hover:bg-greyBlue50"
                @click="navigateHome">
                <!-- <IconLogo /> -->
                <img src="/src/assets/icons/LOGO.webp" alt="" class="dark:hidden">
                <img src="/src/assets/icons/LOGO-dark.webp" alt="" class="hidden dark:block">
            </div>
            <div class="flex justify-between items-center gap-4 sm:hidden">
                <div class="flex navigation_links desktopMenu">
                    <RouterLink v-for="link in links" :key="link.path" :to="link.path"
                        class="navigation_link no-style-a">{{ link.title }}</RouterLink>
                </div>
                <button @click="goToWenyan"
                    class="border-primary text-primary hover:bg-shade1 hover:text-white">熊語清風</button>
                <SwitchButton :default-checked="currentTheme == 'dark' ? true : false" :run-event="switchTheme">
                </SwitchButton>
                <a href="https://buymeacoffee.com/bearune" class="no-style-a hover:bg-transparent hover:brightness-75"
                    target="_blank"><img src="/src/assets/bmc-button.svg" alt=""></a>

            </div>
            <div class="hidden justify-between items-center gap-8 sm:flex">
                <button class="p-0 border-none" @click.prevent="toggleMobileMenu">
                    <span :class="{ 'is-active': isOpen }" class="hamburger-container">
                        <span class="hamburger-top"></span>
                        <span class="hamburger-middle"></span>
                        <span class="hamburger-bottom"></span>
                    </span>
                </button>
                <Transition name="fade">
                    <div class="fixed top-16 left-0 w-full h-screen bg-white z-50 columns py-16" v-if="isOpen">
                        <div class="col-span-4 col-start-3 flex flex-col navigation_links xs:col-span-2 xs:col-start-2">
                            <RouterLink v-for="link in links" :key="link.path" :to="link.path"
                                class="navigation_link border-b !rounded-none border-sliver !border-solid !py-4 no-style-a">
                                {{ link.title }}</RouterLink>
                            <button @click="goToWenyan"
                                class="border-primary text-primary hover:bg-shade1 hover:text-white">熊語清風</button>
                            <div class="flex justify-between items-center bg-greyBlue mt-4 p-4 rounded-lg">
                                <span>外觀</span>
                                <SwitchButton :default-checked="currentTheme == 'dark' ? true : false"
                                    :run-event="switchTheme">
                                </SwitchButton>
                            </div>
                            <a href="https://buymeacoffee.com/bearune"
                                class="no-style-a hover:bg-transparent hover:brightness-75 w-full mt-4"
                                target="_blank"><img src="/src/assets/bmc-button.svg" alt=""></a>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SwitchButton from './switchButton.vue';
import { IconLogo } from '@/assets/icons'
import { watch } from 'vue';

const links = [
    {
        title: "QR碼產生器",
        path: "/qrcode-generator"
    },
    {
        title: "在線轉換圖像",
        path: "/convert-image"
    },
    {
        title: "一鍵轉WebP",
        path: "/convert-image-to-webp"
    }
]

const goToWenyan = () => {
    window.location.href = '/wenyan/';
}

const route = useRoute();
const router = useRouter();
const navigateHome = () => {
    router.push('/');
};

const systemSettingDark = ref();
const localStorageTheme = ref();
const currentTheme = ref();
const isOpen = ref(false);

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

const toggleMobileMenu = () => {
    isOpen.value = !isOpen.value;
    const isMobileDevice = () => {
        return /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
    }
    if (isOpen.value) {
        document.documentElement.style.overflow = 'hidden';
        if (!isMobileDevice()) {
            document.documentElement.style.paddingRight = '17px';
        }
    }
    else {
        document.documentElement.style.overflow = '';
        document.documentElement.style.paddingRight = '0';
    }
}

watch(() => route.fullPath, () => {
    if (isOpen.value) {
        toggleMobileMenu();
    }
});

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
        @apply py-1 px-2 rounded-lg duration-100;

        &:hover {
            @apply bg-greyBlue50;
        }
    }
}

.hamburger {
    &-container {
        @apply relative block w-5 h-5 overflow-hidden;

        &:hover {
            .hamburger {
                &-top {
                    @apply translate-x-1;
                }

                &-middle {
                    @apply translate-x-0;
                }

                &-bottom {
                    @apply translate-x-2;
                }
            }
        }

        &.is-active {
            .hamburger {
                &-top {
                    @apply top-1/2 -translate-x-0.5 rotate-45;
                }

                &-middle {
                    @apply translate-x-0 opacity-0;
                }

                &-bottom {
                    @apply top-1/2 -translate-x-0.5 -rotate-45;
                }
            }
        }
    }

    &-top,
    &-middle,
    &-bottom {
        @apply absolute w-5 h-0.5 bg-black rounded-full;
        transition: top .25s, background-color .5s, transform .25s, opacity .25s;
    }

    &-top {
        @apply top-0 left-0 translate-x-0 translate-y-0;
    }

    &-middle {
        @apply top-2 left-0 translate-x-2;
    }

    &-bottom {
        @apply top-4 left-0 translate-x-1;
    }
}
</style>