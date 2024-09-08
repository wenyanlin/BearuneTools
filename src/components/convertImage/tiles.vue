<template>
    <div class="w-full flex flex-col justify-center items-center gap-2 bg-white33 border-2 border-tint1 dark:border-transparent group/tiles
        p-2 backdrop-blur-sm rounded-md">
        <div
            class="w-full aspect-[4/3] overflow-hidden bg-sliver rounded flex justify-center items-center dark:brightness-75 dark:group-hover/tiles:brightness-100 duration-150">
            <img :src="item.compressedPath" :alt="item.name" class="object-contain">
        </div>
        <!-- tiles - information -->
        <div class="w-full flex justify-between items-end">
            <ul class="controlPanel w-full text-sm flex flex-col gap-2">
                <li>
                    <label for="fileName">檔名：</label>
                    <input type="text" id="fileName" v-model="item.name">
                </li>
                <li class="flex items-center gap-2">
                    <label for="">格式：</label>
                    <div class="flex gap-2 items-center">
                        <div>{{ item.originalFile.type.split('/')[1].toUpperCase() }}</div>
                        <div>to</div>
                        <select ref="formatSelect" id="myselect">
                            <option value="1">JPG</option>
                            <option value="2">WEBP</option>
                            <option value="3">PNG</option>
                        </select>
                    </div>
                </li>
                <li class="flex items-center gap-2">
                    <label for="">品質：</label>
                    <div class="flex-1 flex items-center gap-1">
                        <input type="range" min="0.1" max="1.0" value="1.0" step="0.1" name="compressed">
                        <label for="compressed" class="w-10">×</label>
                    </div>
                </li>
                <li class="flex justify-between items-center">
                    <div class="flex items-center">
                        <label for="">尺寸：</label>
                        <div class="flex-1 flex items-center gap-1">
                            <label>長</label>
                            <input type="text" inputmode="numeric" :placeholder="item.width" pattern="\d*" class="w-1/4">
                            <span>×</span>
                            <label>寬</label>
                            <input type="text" inputmode="numeric" :placeholder="item.height" pattern="\d*" class="w-1/4">
                            <span>px</span>
                        </div>
                    </div>
                    <div class=" group/delete">
                        <div class="text-3xl text-lGrey cursor-pointer group-hover/delete:text-error group-hover/delete:brightness-110"
                            @click="removeItem">
                            <IconBin />
                        </div>
                    </div>

                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { IconBin } from '@/assets/icons';

const item = defineModel();

const emits = defineEmits(['remove']);

const removeItem = () => {
    emits('remove');
};

</script>

<style lang="scss" scoped>
.controlPanel {
    & li {
        @apply flex items-center;

        &>input {
            @apply flex-1;
        }
    }
}
</style>