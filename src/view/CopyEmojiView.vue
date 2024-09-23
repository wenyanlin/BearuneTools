<template>
    <div class="h-full flex justify-center items-center sm:px-4">
        <div class="w-innerWidth columns justify-center items-center py-8 sm:w-full">
            <div class="col-span-8 col-start-3 flex flex-col sm:col-start-1 xs:col-span-4">
                <h1>Emoji大全</h1>
                <div>點擊表情符號即可複製。目前共有<b>{{ total }}</b>種Emjio可以複製，並提供膚色及髮色切換。</div>
            </div>
            <div
                class="col-span-8 col-start-3 grid grid-cols-8 gap-6 relativesm:col-start-1 sm:grid-cols-8 xs:col-span-4 xs:grid-cols-4">
                <div class="col-span-2 sticky top-20 h-fit flex flex-col gap-2 sm:col-span-3 xs:col-span-4 frame">
                    <div class="p-4 flex flex-col gap-4">
                        <div>搜尋關鍵字</div>
                        <div>快速導覽分類</div>
                    </div>
                </div>
                <div class="col-span-6 flex flex-col gap-2 sm:col-span-5 xs:col-span-4">
                    <div class="frame">
                        <div class="p-4 border-b border-lGrey dark:border-sliver">
                            <h2>近期使用過</h2>
                        </div>
                        <div class="p-4 leading-8 text-3xl min-h-16">
                           
                        </div>
                    </div>
                    <div class="frame" v-for="cate in allEmoji" :key="cate.slug">
                        <div class="p-4 border-b border-lGrey dark:border-sliver">
                            <h2>{{ cate.slug }}</h2>
                        </div>
                        <div class="p-4 leading-8 text-3xl">
                            <span
                                class="segoe-ui-emoji inline-flex py-1 text-center border border-transparent cursor-pointer rounded hover:border-primary active:bg-tint2"
                                v-for="item in cate.subCategories" :key="item.slug"
                                @click="copyEmoji(`${item.character}`)">
                                {{ item.character }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { reactive } from 'vue';
import { onMounted, ref } from 'vue';

const allEmoji = ref();
const total = ref(0);

const getAllEmoji = async () => {
    try {
        const response = await axios.get('src/plugins/emoji.json');
        allEmoji.value = response.data;
        console.log(allEmoji.value.length);
        total.value = allEmoji.value.reduce((acc, c) => {
            return acc + c.subCategories.length;
        }, 0);
        console.log(a);
    } catch (error) {
        console.error('cannot get all emoji', error);
    }
}

const copyEmoji = (emoji) => {
    navigator.clipboard.writeText(emoji).then(() => {

    });
}

onMounted(() => {
    getAllEmoji();
})

</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&display=swap');

.noto-color-emoji-regular {
    font-family: 'Noto Color Emoji', 'Noto Color Emoji', sans-serif;
    font-weight: 400;
}

.segoe-ui-emoji {
    font-family: 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif;
    font-weight: 400;
}
</style>