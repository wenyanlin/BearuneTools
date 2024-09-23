<template>
    <div class="w-full h-fit flex justify-between gap-2 select-none lg:flex-wrap lg:gap-1">
        <div :class="{ 'cursor-pointer': compressedFile, 'hover:brightness-95': compressedFile }"
            class="w-20 aspect-[4/3] bg-greyBlue overflow-hidden rounded flex justify-center items-center rounded-r-none dark:bg-sliver"
            @click="previewFile">
            <img :src="file.preview" :alt="`${file.name}-預覽圖`" class="object-contain">
        </div>
        <div class="flex flex-col flex-1 justify-center mr-4">
            <label>
                <input type="text" :placeholder="file.name" maxlength="100" class="titleInput" v-model="file.name">
            </label>
        </div>
        <div class="flex justify-center items-center relative">
            <Transition name="fade" mode="out-in">
                <button :class="{ 'invisible': file.state !== 'converted' }"
                    class="w-20 text-related1 border-related1 rounded-r-none hover:bg-related1 hover:text-white" @click="downloadItem"
                    :key="file.state">下載</button>
            </Transition>
            <Transition name="fade" mode="out-in">
                <button :class="{ 'invisible': file.state !== 'converted', 'bg-shade2': isOptional }"
                    class="w-8 px-0 text-related1 border-related1 border-l-0 rounded-l-none flex justify-center hover:bg-related1 hover:text-white"
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
        <div class="flex justify-center items-center text-2xl text-grey px-4" @click="removeFile(index)">
            <IconBin class="cursor-pointer" />
        </div>
    </div>
</template>

<script setup>
import { IconBin, IconReset, IconImage, IconLeftArrow } from '@/assets/icons';
import { ref, computed, watch } from 'vue';
import { saveAs } from 'file-saver';

const props = defineProps(['compressedFile', 'originalFile']);
const file = defineModel();
// const originalFile = computed(() => props.originalFile);
const compressedFile = computed(() => props.compressedFile);
const isOptional = ref(false);

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