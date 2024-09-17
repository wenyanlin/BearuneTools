<template>
    <div class="h-fit flex justify-between gap-2 select-none lg:flex-wrap lg:gap-1">
        <div class="flex gap-2 w-full">
            <div :class="{'cursor-pointer':compressedFile,'hover:brightness-95':compressedFile}" class="w-20 aspect-[4/3] bg-greyBlue overflow-hidden rounded
            flex justify-center items-center" @click="previewFile">
                <img :src="file.preview" :alt="`${file.name}-預覽圖`" class="object-contain">
            </div>
            <div class="flex flex-col flex-1 justify-center">
                <label>
                    <input type="text" :placeholder="file.name" maxlength="100" class="titleInput" v-model="file.name">
                </label>
                <div class="text-grey pl-2 text-sm" v-if="newFileSize == '0MB'">{{ originalFileSize }}</div>
                <div class="text-grey pl-2" v-else>
                    <del>{{ originalFileSize }}</del>
                    <span class="px-1">→</span>
                    <span class="text-primary">{{ newFileSize }}</span>
                </div>
            </div>
        </div>
        <div class="flex justify-end items-center gap-4 w-full lg:gap-2">
            <div class="flex justify-center items-center" v-if="file.state === 'unchanged' || file.state === 'changed'">
                <span>{{ types.find(item => item.mime === originalFile.type).name }}</span><span class="px-2">to</span>
                <select v-model="selectedType">
                    <option v-for="option in types" :value="option.mime">{{
                        option.name }}</option>
                </select>

            </div>
            <div class="flex justify-center items-center" v-else>
                <span>{{ types.find(item => item.mime === originalFile.type).name }}</span><span class="px-2">to</span>
                <span class="pr-2 pl-3 py-1 rounded-md w-24 font-semibold bg-greyBlue">{{ types.find(item =>
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
            <!-- <div>
                <Transition name="fade" mode="out-in">
                    <div :class="[{ 'invisible': file.state !== 'converted' }]"
                        class="w-20 h-6 leading-6 rounded text-white text-center bg-success text-sm" :key="file.state">
                        {{ file.state === 'converted' ? '轉換完成' : file.state === 'process' ? '轉換中' : '　　　　' }}</div>
                </Transition>
                <div class="h-6 leading-6 px-2 rounded text-white bg-error text-sm">轉換失敗</div>
            </div> -->
            <div class="flex justify-center items-center relative">
                <Transition name="fade" mode="out-in">
                    <button :class="{ 'invisible': file.state !== 'converted' }"
                        class="w-20 text-white border-primary rounded-r-none bg-primary hover:bg-shade2"
                        @click="downloadItem" :key="file.state">下載</button>
                </Transition>
                <Transition name="fade" mode="out-in">
                    <button :class="{ 'invisible': file.state !== 'converted', 'bg-shade2': isOptional }"
                        class="w-8 px-0 text-white border-primary rounded-l-none flex justify-center bg-primary hover:bg-shade2"
                        @click="openOptional" :key="file.state">
                        <IconLeftArrow class="-rotate-90" />
                    </button>
                </Transition>
                <div :class="{ 'flex': isOptional, 'hidden': !isOptional }"
                    class="absolute top-10 right-0 w-32 h-fit frame bg-white overflow-hidden z-50">
                    <div class="w-full flex flex-col justify-center items-start text-dGrey">
                        <!-- <Transition name="fade" mode="out-in">
                            <div class="w-full flex items-center gap-2 p-2 cursor-pointer group hover:bg-greyBlue"
                                @click="previewFile" :key="file.state">
                                <IconImage class="text-xl group-hover:-rotate-12" />
                                <span>預覽</span>
                            </div>
                        </Transition> -->
                        <Transition name="fade" mode="out-in">
                            <div class="w-full flex items-center gap-2 p-2 cursor-pointer group hover:bg-greyBlue"
                                @click="resetFile" :key="file.state">
                                <IconReset class="text-xl group-hover:rotate-45" />
                                <span>重新設定</span>
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>
            <div class="flex justify-center items-center text-2xl text-grey" @click="removeFile">
                <IconBin class="cursor-pointer" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { IconBin, IconSettings, IconInformation, IconReset, IconImage, IconLeftArrow } from '@/assets/icons';
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
const isOptional = ref(false);


const selectedType = ref(types[0].mime);

watch(file, async (newVal) => {
    // console.log(newVal);
    if (newVal.state === 'unchanged' || newVal.state === 'changed') {
        newVal.state = 'changed';
        selectedType.value = newVal.type;
    }
    await nextTick();
}, { immediate: true, deep: true });

watch(selectedType, (newVal) => {
    const updateFile = {
        ...file.value,
        type: newVal
    };
    file.value = { ...updateFile };
});

watch(compressedFile, (newVal) => {
    file.state = 'changed';
});

// const lastModified = computed(() => {
//     return new Date(file.value.lastModified);
// });

const originalFileSize = computed(() => {
    return originalFile.value ? `${(originalFile.value.size / 1024 / 1024).toFixed(2)}MB` : '0MB';
});

const newFileSize = computed(() => {
    return compressedFile.value ? `${(compressedFile.value.size / 1024 / 1024).toFixed(2)}MB` : '0MB';
});

const emits = defineEmits(['remove', 'reset', 'preview']);

const removeFile = () => {
    emits('remove');
};

const resetFile = () => {
    emits('reset');
};

const previewFile = () => {
    emits('preview');
};

const downloadItem = () => {
    // console.log(compressedFile.value);
    saveAs(compressedFile.value, file.value.name);
};

const openOptional = () => {
    isOptional.value = true;
    window.addEventListener('click', stopImmediate, { once: true });
};

const closetOptional = () => {
    isOptional.value = false;
};

const stopImmediate = (event) => {
    event.stopImmediatePropagation();
};

watch(isOptional, (newVal) => {
    if (newVal) {
        window.addEventListener('click', closetOptional, { once: true });
    }
})

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