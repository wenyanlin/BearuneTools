<template>
    <div class="h-16 pb-2 flex gap-4 justify-between select-none">
        <div class="flex gap-2 w-[30rem]">
            <div class="w-20 h-14 bg-greyBlue overflow-hidden rounded cursor-pointer hover:brightness-90 duration-150
            flex justify-center items-center">
                <img :src="file.preview" :alt="`${file.name}-預覽圖`" class="object-contain">
            </div>
            <div class="flex flex-col py-1 flex-1">
                <label>
                    <input type="text" :placeholder="file.name" maxlength="100" class="titleInput" v-model="file.name">
                </label>
                <div class="text-grey pl-2" v-if="true">{{ originalFileSize }}</div>
                <div class="text-grey pl-2" v-else>
                    <del>{{ originalFileSize }}</del>
                    <span class="px-1">→</span>
                    <span class="text-primary">123 KB</span>
                    <span class="text-primary text-sm">（節省了81.6%）</span>
                </div>
            </div>
        </div>
        <div class="flex items-center gap-4 py-2 pr-4">
            <div class="flex justify-center items-center">
                <span>{{ types.find(item => item.mime === originalFile.type).name }}</span><span class="px-2">to</span>
                <select v-model="selectedType" v-if="file.state === 'unchanged' || file.state === 'changed'">
                    <option v-for="option in types" :value="option.mime">{{
                        option.name }}</option>
                </select>
                <span class="pr-2 pl-3 py-1 rounded-md w-24 font-semibold bg-sliver" v-else>{{ types.find(item =>
                    item.mime === compressedFile.type).name }}</span>
            </div>
            <!-- <div
                class="cursor-pointer group flex justify-center items-center text-2xl text-dGrey border border-greyBlue bg-white py-2 px-2 rounded-md hover:bg-sliver duration-150">
                <IconInformation />
            </div>
            <div
                class="cursor-pointer group flex justify-center items-center text-2xl text-dGrey border border-greyBlue bg-white py-2 px-2 rounded-md hover:bg-sliver duration-150">
                <IconSettings />
            </div> -->
            <div>
                <Transition name="fade" mode="out-in">
                    <div :class="[{ 'invisible': file.state !== 'converted' }]"
                        class="h-6 leading-6 px-2 rounded text-white bg-success text-sm" :key="file.state">
                        {{ file.state === 'converted' ? '轉換完成' : file.state === 'process' ? '轉換中' : '　　　　' }}</div>
                </Transition>
                <!-- <div class="h-6 leading-6 px-2 rounded text-white bg-error text-sm">轉換失敗</div> -->
            </div>
            <div>
                <Transition name="fade" mode="out-in">
                    <button :class="[{ 'invisible': file.state !== 'converted' }]"
                        class="border border-primary text-primary hover:bg-primary hover:text-white"
                        @click="downloadItem" :key="file.state">下載</button>
                </Transition>
            </div>
            <Transition name="fade" mode="out-in">
                <div :class="[{ 'invisible': file.state !== 'converted' }]"
                class="flex justify-center items-center text-2xl text-grey cursor-pointer hover:rotate-12"
                @click="previewFile" :key="file.state">
                    <IconImage />
                </div>
            </Transition>
            <Transition name="fade" mode="out-in">
                <div :class="[{ 'invisible': file.state !== 'converted' }]"
                class="flex justify-center items-center text-2xl text-grey cursor-pointer hover:rotate-12"
                @click="resetFile" :key="file.state">
                    <IconReset />
                </div>
            </Transition>
            <div class="flex justify-center items-center text-2xl text-grey" @click="removeFile">
                <IconBin class="cursor-pointer" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { IconBin, IconSettings, IconInformation, IconReset, IconImage } from '@/assets/icons'
import { ref, computed, watch, nextTick } from 'vue';
import { saveAs } from 'file-saver';

const types = [
    {
        'name': 'WEBP',
        'mime': 'image/webp'
    },
    {
        'name': 'JPG',
        'mime': 'image/jpeg'
    },
    {
        'name': 'PNG',
        'mime': 'image/png'
    }
];

const props = defineProps(['compressedFile', 'originalFile']);
const file = defineModel();
const originalFile = computed(() => props.originalFile);
const compressedFile = computed(() => props.compressedFile);


const selectedType = ref(types[0].mime);

watch(file, async (newVal) => {
    // console.log(newVal.name);
    if (newVal.state === 'unchanged' || newVal.state === 'changed') {
        newVal.state = 'changed';
        selectedType.value = newVal.type;
    }
    await nextTick();
}, { immediate: true, deep:true });

watch(selectedType, (newVal) => {
    const updateFile = {
        ...file.value,
        type: newVal
    };
    file.value = { ...updateFile };
});

watch(compressedFile, (newVal) => {
    file.state = 'changed';
})

// const lastModified = computed(() => {
//     return new Date(file.value.lastModified);
// });

const originalFileSize = computed(() => {
    return originalFile.value ? `${(originalFile.value.size / 1024 / 1024).toFixed(2)}MB` : '0MB';
});

const emits = defineEmits(['remove', 'reset', 'preview']);

const removeFile = () => {
    emits('remove');
};

const resetFile = () =>{
    emits('reset');
}

const previewFile = ()=>{
    emits('preview');
}

const downloadItem = () => {
    // console.log(compressedFile.value);
    saveAs(compressedFile.value, file.value.name);
}

// onMounted(()=>{
//     console.log('渲染');
// })

</script>

<style lang="scss" scoped>
.titleInput {
    @apply border-transparent pl-2 py-0 w-full;

    &::placeholder {
        @apply text-info font-normal;
    }

    &:focus {
        @apply border;

        &::placeholder {
            @apply text-grey;
        }
    }
}
</style>