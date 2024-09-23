<template>
    <div class=" flex justify-center py-8 sm:px-4">
        <div class="w-innerWidth columns h-fit">
            <div class="col-span-6 col-start-4 grid grid-cols-6 gap-6 h-fit
            lg:col-span-8 lg:col-start-3 sm:col-span-8 sm:col-start-1 sm:grid-cols-8 xs:col-span-4 xs:grid-cols-4">
                <RouterLink :to="project.path" v-for="project in projects" :key="item"
                    class="col-span-3 aspect-[4/5] frame text-info border-solid font-normal overflow-hidden select-none cursor-pointer group hover:border-primary hover:bg-white
                    sm:col-span-4">
                    <div class="aspect-[4/3] bg-sliver bg-light-bg">
                        <img :src="project.preview" alt="" class="object-contain" v-show="project.preview">
                    </div>
                    <div class="p-4 flex flex-col xs:p-2">
                        <h2 class="group-hover:text-primary overflow-hidden whitespace-nowrap text-ellipsis dark:text-black">{{
                            project.title }}</h2>
                        <p class="text-dGrey clamp">{{ project.introduction }} </p>
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
import qrcodeGenerator from '@/assets/preview/qrcode generator.webp';


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
    {
        title: 'QR碼產生器（極簡版）',
        introduction: '目前正在開發中，未來將會增加更多客製內容。',
        path: '/qrcode-generator',
        preview: qrcodeGenerator,
    }
]

</script>

<style lang="scss" scoped>
.clamp {
    @apply line-clamp-4 lg:!line-clamp-4 md:!line-clamp-2 sm:!line-clamp-3 xs:!line-clamp-4;
}

@media (max-width: 1342px) {
  .clamp {
    @apply line-clamp-3;
  }
}
</style>