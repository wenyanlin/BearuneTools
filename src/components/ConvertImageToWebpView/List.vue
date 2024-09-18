<template>
    <div class="w-full h-fit flex justify-between gap-2 select-none lg:flex-wrap lg:gap-1">
        <div :class="{'cursor-pointer':compressedFile,'hover:brightness-95':compressedFile}" class="w-20 aspect-[4/3] bg-greyBlue overflow-hidden rounded flex justify-center items-center rounded-r-none dark:bg-sliver" @click="previewFile">
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
                    class="w-20 text-related1 border-related1 hover:bg-related1 hover:text-white"
                    @click="downloadItem" :key="file.state">下載</button>
            </Transition>
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

const emits = defineEmits(['remove', 'reset', 'preview']);

const removeFile = () => {
    emits('remove');
};

const previewFile = () => {
    emits('preview');
};

const downloadItem = () => {
    // console.log(compressedFile.value);
    saveAs(compressedFile.value, file.value.name);
};
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