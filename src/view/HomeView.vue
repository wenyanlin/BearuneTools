<template>
    <div class="flex justify-center items-center py-8">
        <div class="w-innerWidth columns">
            <div class="col-span-6 col-start-4 grid grid-cols-6 gap-6">
                <RouterLink :to="project.path" v-for="project in projects" :key="item"
                    class="col-span-3 aspect-[4/5] frame text-info border-solid font-normal overflow-hidden select-none cursor-pointer group hover:border-primary hover:bg-white">
                    <div class="aspect-[4/3] bg-sliver bg-light-bg">
                        <img :src="project.preview" alt="" class="object-contain" v-show="project.preview">
                    </div>
                    <div class="p-4 flex flex-col gap-2">
                        <h2 class="group-hover:text-primary overflow-hidden whitespace-nowrap text-ellipsis">{{ project.title }}</h2>
                        <p class="text-dGrey">{{ project.introduction }} </p>
                    </div>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import convertImageWebp from '@/assets/preview/convert image.webp';
import convertImageToWebp from '@/assets/preview/convert image to webp.webp';
// import qrcodeGenerator from '@/assets/preview/qrcode generator.webp';


const projects = [
    {
        title: '在線轉換圖像-WebP,JPG,PNG',
        introduction: '100%免費圖像轉換器，支持批量轉檔、有損壓縮、調整大小、重新命名。只在本地端執行，圖像不經過伺服器。支援WebP、JPG、PNG格式互相轉檔。',
        path: '/convert-image',
        preview: convertImageWebp,
    },
    {
        title: '一鍵轉WebP',
        introduction: '100%免費WebP轉換器，只在本地端執行，圖像不經過伺服器。僅支援JPG、PNG格式。',
        path: '/convert-image-to-webp',
        preview: convertImageToWebp,
    },
    // {
    //     title: 'QR碼產生器',
    //     introduction: '100%免費QR碼產生器，只在本地端執行，圖像不經過伺服器。',
    //     path: '/qrcode-generator',
    //     preview: convertImageToWebp,
    // }
]

</script>

<style lang="scss" scoped></style>