<template>
    <div class="flex justify-center sm:px-4">
        <div class="w-innerWidth h-fit columns justify-center items-center py-8 sm:w-full">
            <div class="col-span-6 col-start-4 flex flex-col sm:col-span-8 sm:col-start-1 xs:col-span-4">
                <h1>QR碼產生器</h1>
                <div>目前正在開發中，未來將會增加更多客製內容。</div>
            </div>
            <div class="col-span-6 col-start-4 grid grid-cols-6 gap-6 relative
            sm:col-span-8 sm:col-start-1 sm:grid-cols-8 xs:col-span-4 xs:grid-cols-4">
                <div class="col-span-4 flex flex-col gap-2 sm:col-span-5 xs:col-span-4">
                    <div class="frame">
                        <div class="p-4 border-b border-lGrey dark:border-sliver">
                            <h2>選擇類別</h2>
                        </div>
                        <div class="p-4 flex flex-wrap gap-4">
                            <button :class="{ 'target': item.name === type.name }" class="typeSelected dark:border-sliver"
                                v-for="item in types" :key="item.name" @click="typeSelected(item)">{{ item.name
                                }}</button>
                        </div>
                    </div>
                    <div class="frame">
                        <div :class="{ '!flex': type.name === '文字' }" class="hidden p-4 flex-col gap-1">
                            <div>文字</div>
                            <textarea name="text" placeholder="輸入文字" rows="4" maxlength="1000"
                                class="border border-greyBlue p-2" v-model="textType"></textarea>
                        </div>
                        <div :class="{ '!flex': type.name === '網址' }" class="hidden p-4 flex-col gap-1">
                            <div>網址</div>
                            <input type="url" placeholder="輸入網址" rows="1" maxlength="1000"
                                class="border border-greyBlue p-2" v-model="urlType" />
                        </div>
                    </div>
                    <!-- <div class="frame">
                        <div class="p-4 border-b border-lGrey">
                            <h2>選擇顏色</h2>
                        </div>
                        <div class="p-4">
                            <div>背景色</div>
                            <div class="picker"></div>
                        </div>
                    </div> -->
                   
                </div>
                <div class="col-span-2 sticky top-20 h-fit flex flex-col gap-2 sm:col-span-3 xs:col-span-4">
                    <div class="frame aspect-square bg-sliver p-4">
                        <img :src="qrcode" alt="QR Code" v-if="qrcode">
                    </div>
                    <div class="flex justify-end" v-if="qrcode">
                        <button @click="downloadQR"
                            class="bg-primary border-primary text-white py-4 duration-150 dark:text-black">下載QR碼</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import QRCode from 'qrcode';
// import Pickr from '@simonwep/pickr';
// import '@simonwep/pickr/dist/themes/nano.min.css';
import { watch } from 'vue';

const qrcode = ref('');
const types = [
    { name: '文字' },
    { name: '網址' }
];
const type = ref(types[0]);
const textType = ref('');
const urlType = ref('');
// let pickr = null;
const selectedColor = ref('#ffffff'); // 預設背景色

const typeSelected = (selectedType) => {
    qrcode.value = '';
    type.value = selectedType;
};

const generateQR = async (text, bgColor) => {
    try {
        const response = await QRCode.toDataURL(text, {
            scale: 10,
            color: {
                dark: '#000000', // 設置QR碼顏色
                light: bgColor   // 背景顏色
            }
        });
        return response;
    } catch (err) {
        console.error(err);
    }
};

// 監聽文字或網址變化時生成 QR 碼
watch(textType, async (newVal) => {
    if (newVal) {
        qrcode.value = await generateQR(newVal, selectedColor.value);
    }
});

watch(urlType, async (newVal) => {
    if (newVal) {
        qrcode.value = await generateQR(newVal, selectedColor.value);
    }
});

// 設置顏色選擇器並在顏色變更時更新
// onMounted(() => {
//     pickr = Pickr.create({
//         el: '.picker',
//         theme: 'nano', // or 'monolith', or 'nano'

//         swatches: [
//             'rgba(244, 67, 54, 1)',
//             'rgba(233, 30, 99, 0.95)',
//             'rgba(156, 39, 176, 0.9)',
//             'rgba(103, 58, 183, 0.85)',
//             'rgba(63, 81, 181, 0.8)',
//             'rgba(33, 150, 243, 0.75)',
//             'rgba(3, 169, 244, 0.7)',
//             'rgba(0, 188, 212, 0.7)',
//             'rgba(0, 150, 136, 0.75)',
//             'rgba(76, 175, 80, 0.8)',
//             'rgba(139, 195, 74, 0.85)',
//             'rgba(205, 220, 57, 0.9)',
//             'rgba(255, 235, 59, 0.95)',
//             'rgba(255, 193, 7, 1)'
//         ],

//         components: {

//             // Main components
//             preview: true,
//             opacity: true,
//             hue: true,

//             // Input / output Options
//             interaction: {
//                 // hex: true,
//                 // rgba: true,
//                 // hsla: true,
//                 // hsva: true,
//                 // cmyk: true,
//                 input: true,
//                 clear: true,
//                 save: true
//             }
//         }
//     });
    
// });





// 下載 QR 碼功能
const downloadQR = () => {
    const link = document.createElement('a');
    link.href = qrcode.value;
    link.download = 'qrcode.png';
    link.click();
};
</script>

<style lang="scss" scoped>
button {
    &.typeSelected {
        @apply flex-1;

        &.target {
            @apply border-related1 bg-related1 text-white;
        }
    }
}
</style>