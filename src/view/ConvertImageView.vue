<template>
    <div class="w-full h-full flex flex-col justify-center items-center">
        <div class="w-innerWidth columns justify-center py-8 relative">
            <div class="col-span-12 sm:col-span-8 xs:col-span-4">
                <h1>在線轉換圖像</h1>
                <div>100%免費圖像轉換器，支持批量轉檔、壓縮、調整大小、重新命名。只在本地端執行，圖像不經過伺服器。</div>
            </div>
            <div
                class="col-span-12 frame flex flex-col gap-4 justify-center items-center backdrop-blur-xs bg-light-bg dark:bg-dark-bg">
                <label for="imgUploads" @dragover="handleDragOver" @dragleave="dragLeave" @drop.prevent="handleDrop"
                    :class="{ 'isDragging': isDragging }"
                    class="w-full h-64 cursor-pointer flex justify-center items-center">
                    <span><span class="border-b border-primary border-dotted text-center">選擇檔案</span>或拖曳圖片至此……</span>
                </label>
                <input type="file" id="imgUploads" class="hidden" multiple="multiple" @change="handleFileSelect">
            </div>
            <div class="col-span-9 frame backdrop-blur-xs min-h-full max-h-fit">
                <div class="w-full h-fit p-4 border-b border-lGrey border-solid">
                    <h2>圖像預覽</h2>
                </div>
                <div class="grid grid-cols-9 gap-2 mx-4 my-6 relative">
                    <Transition name="fade" mode="out-in">
                        <div class="col-span-9 flex flex-col gap-2" v-if="!imageFiles.length">
                            <div class="border-b border-greyBlue pb-2 last:border-none" v-for="item in 4" :key="item">
                                <div class="h-16 flex gap-4 justify-between select-none">
                                    <div class="flex gap-2 w-[30rem]">
                                        <div class="w-20 h-full bg-greyBlue overflow    -hidden rounded-md cursor-pointer hover:brightness-90 duration-150
                            flex justify-center items-center">
                                        </div>
                                        <div class="flex flex-col gap-1 flex-1">
                                            <div class="bg-greyBlue flex-1 rounded-md"></div>
                                            <div class="text-grey pl-2 bg-greyBlue w-fit flex-1 rounded-md">　　　　</div>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-4 py-2 pr-4">
                                        <div class="flex justify-center items-center gap-1">
                                            <span class="pr-2 pl-3 py-4 rounded-md w-16 bg-greyBlue"></span>
                                            <span class="px-1 rounded-md bg-greyBlue">　</span>
                                            <span class="pr-2 pl-3 py-4 rounded-md w-24 bg-greyBlue"></span>
                                        </div>
                                        <div>
                                            <div class="h-6 leading-6 px-2 rounded text-white bg-greyBlue text-sm">　　　　
                                            </div>
                                            <!-- <div class="h-6 leading-6 px-2 rounded text-white bg-error text-sm">轉換失敗</div> -->
                                        </div>
                                        <div>
                                            <div class="bg-greyBlue rounded-md py-4 px-8"></div>
                                        </div>
                                        <div class="w-6 h-6 bg-greyBlue rounded-md">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <TransitionGroup tag="div" name="list" class="col-span-9 flex flex-col gap-2" v-else>
                            <div v-for="(item, index) in imageFiles" :key="item.id || index"
                                :style="{ top: `${index * 64 + (index - 1) * 8 + 20}px` }"
                                class="h-16 border-b border-greyBlue last:border-none">
                                <List v-model="imageFiles[index]" @remove="removeFile(index)"
                                    :original-file="originalFiles[index]" :compressed-file="compressedFiles[index]">
                                </List>
                            </div>
                        </TransitionGroup>
                    </Transition>
                </div>
            </div>
            <div class="col-span-3 sticky top-20 h-fit flex flex-col gap-4">
                <div class="frame backdrop-blur-xs h-fit">
                    <div class="w-full h-fit p-4 border-b border-lGrey border-solid">
                        <h2>輸出面板</h2>
                    </div>
                    <div class="flex flex-col gap-4 px-4 py-6">
                        <!-- <div class="flex flex-col gap-4 pb-4 border-b border-greyBlue">
                            <label>
                                源文件
                                <button class="w-48">批量下載</button>
                            </label>
                            <label></label>
                        </div> -->
                        <!-- <div class="flex flex-col gap-4">
                            <h3>輸出文件</h3>
                            <button class="bg-primary border-primary text-white">批量下載</button>
                            <label>儲存至：</label>
                        </div> -->
                        <!-- click需設置防抖 -->
                        <button :class="{
                            'bg-related1': isAllConverted === 'unconverted', 'border-related1': isAllConverted === 'unconverted',
                            'bg-grey': isAllConverted === 'converting', 'border-grey': isAllConverted === 'converting'
                        }" class="bg-primary border-primary text-white py-4 duration-150"
                            @click="isAllConverted === 'converted' ? clickDownload() : clickStart()"
                            :key="isAllConverted">
                            {{ isAllConverted === 'converted' ? '批量下載' : isAllConverted === 'converting' ? '轉換中…'
                                : '批量轉換' }}
                        </button>
                    </div>
                </div>
                <div class="frame backdrop-blur-xs h-fit">
                    <div class="w-full h-fit p-4 border-b border-lGrey border-solid">
                        <h2>批量選項</h2>
                    </div>
                    <div class="flex flex-col gap-4 px-4 py-6">
                        <div class="flex flex-col gap-4 pb-4 border-b border-greyBlue">
                            <h3>圖像資訊</h3>
                            <label>
                                檔案類型
                                <select class="w-48" v-model="selectedType">
                                    <option v-for="option in types" :value="option.mime">{{
                                        option.name }}</option>
                                </select>
                            </label>
                            <label>
                                品質壓縮
                                <select class="w-48" v-model.number="quality">
                                    <option :value="0.8">維持原始品質</option>
                                    <option :value="0.1">10%</option>
                                    <option :value="0.2">20%</option>
                                    <option :value="0.3">30%</option>
                                    <option :value="0.4">40%</option>
                                    <option :value="0.5">50%</option>
                                    <option :value="0.6">60%</option>
                                    <option :value="0.7">70%</option>
                                    <option :value="0.8">80%</option>
                                    <option :value="0.9">90%</option>
                                    <option :value="0">自定義</option>
                                </select>
                            </label>
                            <!-- <label>
                                圖像名稱
                                <input type="text" class="w-48" placeholder="維持原來的名稱">
                            </label> -->
                            <label>
                                保留Exif
                                <input type="checkbox" checked>
                            </label>
                        </div>
                        <div class="flex flex-col gap-4 pb-4 border-b border-greyBlue">
                            <h3>圖像大小</h3>
                            <label>
                                最大寬度
                                <input type="number" class="w-48" max="4096" min="0" placeholder="4096"
                                    v-model.number="maxWidth">
                            </label>
                            <label>
                                最大高度
                                <input type="number" class="w-48" max="4096" min="0" placeholder="4096"
                                    v-model.number="maxHeight">
                            </label>
                            <label>
                                最小寬度
                                <input type="number" class="w-48" placeholder="0" v-model.number="minWidth">
                            </label>
                            <label>
                                最小高度
                                <input type="number" class="w-48" placeholder="0" v-model.number="minHeight">
                            </label>
                            <label>
                                寬度
                                <input type="number" class="w-48" v-model.number="width">
                            </label>
                            <label>
                                高度
                                <input type="number" class="w-48" v-model.number="height">
                            </label>
                            <label>
                                適合大小
                                <select class="w-48">
                                    <option value="none">保持源圖像尺寸</option>
                                    <option value="contain">等比 Contain</option>
                                    <option value="cover">撐滿 Cover</option>
                                    <option value="0">自定義</option>
                                </select>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-innerWidth columns justify-center py-8 relative">
            <div class="col-span-12 border-t border-greyBlue mt-16 pt-16 sm:col-span-8 xs:col-span-4">
                <h1>如何轉換圖像？</h1>
            </div>
            <div class="col-span-12 border-t border-greyBlue mt-16 pt-16 sm:col-span-8 xs:col-span-4">
                <h1>為什麼我們要將圖片轉換？</h1>
            </div>
            <div class="col-span-12 border-t border-greyBlue mt-16 pt-16 sm:col-span-8 xs:col-span-4">
                <h1>比較JPG、PNG、WEBP</h1>
            </div>
            <div class="col-span-12 border-t border-greyBlue mt-16 pt-16 sm:col-span-8 xs:col-span-4">
                <h1>常見問題</h1>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch, computed, nextTick } from 'vue';
import NProgress from 'nprogress';
import Compressor from 'compressorjs';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import List from '@/components/convertImage/List.vue';
import { IconBin } from '@/assets/icons'

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

const isDragging = ref(false); //用來跟蹤用戶是否正在拖拽文件到頁面上
const isAllConverted = ref('unconverted'); //unconverted,converting, converted 

const imageFiles = reactive([]); //是一個反應式數組，儲存用戶上傳的圖片文件及相關信息
const originalFiles = reactive([]);
const compressedFiles = reactive([]);

//v-model
const selectedType = ref(types[0].mime);
const maxWidth = ref();
const maxHeight = ref();
const minWidth = ref();
const minHeight = ref();
const width = ref();
const height = ref();
const quality = ref(0.8);

const generatePreview = (file) => {
    return new Promise((resolve, reject) => {
        new Compressor(file, {
            quality: 1, // 設置圖像質量（1 表示 100% 的質量）
            maxWidth: 80, // 最大寬度
            maxHeight: 56, // 最大高度
            success(result) {
                // result 是壓縮後的圖像文件，可以將其上傳到服務器或進一步處理
                resolve(result);
            },
            error(err) {
                console.error('圖像壓縮錯誤：', err.message);
                reject(file);
            }
        });
    });
}

const compressFile = (file) => {
    return new Promise((resolve, reject) => {
        new Compressor(file.rawfile, {
            quality: file.quality, // 壓縮質量設置
            mimeType: file.type,
            maxWidth: file.maxWidth,
            maxHeight: file.maxHeight,
            minWidth: file.minWidth,
            minHeight: file.minHeight,
            width: file.width,
            height: file.height,
            success: (result) => {
                resolve(result); // 壓縮成功，返回壓縮後的圖片
            },
            error: (err) => {
                reject(err); // 壓縮過程中出錯
            }
        });
    });
}

const clickStart = async () => {
    if (imageFiles.length === 0) return;
    else if (imageFiles.every((file) => file.state === 'unchanged' || file.state === 'converted')) {
        return;
    }
    else {
        try {
            NProgress.start();
            isAllConverted.value = 'converting';
            const filePromises = imageFiles.map(async (file, index) => {
                if (file.state !== 'converted') {
                    // console.log(`File at index ${index} has changed.`);
                    // 僅對變化的文件進行壓縮處理
                    compressedFiles[index] = await compressFile(file);
                    file.state = 'converted';
                }
            });
            await Promise.all(filePromises);
        } catch (error) {
            console.error('處理圖片出錯:', error);
        } finally {
            NProgress.done();
            isAllConverted.value = 'converted';
        }
    }
}

const clickDownload = async () => {
    const zip = new JSZip();
    compressedFiles.map((file) => {
        zip.file(file.name, file, { base64: true });
    })
    zip.generateAsync({ type: 'blob' }).then((content) => saveAs(content, 'bearuneImage.zip'))
};

watch(selectedType, (newVal) => {
    if (isAllConverted.value === 'converted') return;
    imageFiles.forEach((file, index) => {
        imageFiles[index] = { ...file, type: newVal };
    });
    isAllConverted.value = 'unconverted';
});

watch(maxWidth, (newVal) => {
    if (isAllConverted.value === 'converted') return;
    imageFiles.forEach((file, index) => {
        if (newVal === file.maxWidth) return;
        imageFiles[index] = { ...file, maxWidth: newVal };
    });
    isAllConverted.value = 'unconverted';
});

watch(maxHeight, (newVal) => {
    if (isAllConverted.value === 'converted') return;
    imageFiles.forEach((file, index) => {
        if (newVal === file.maxHeight) return;
        imageFiles[index] = { ...file, maxHeight: newVal };
    });
    isAllConverted.value = 'unconverted';
});

watch(minWidth, (newVal) => {
    if (isAllConverted.value === 'converted') return;
    imageFiles.forEach((file, index) => {
        if (newVal === file.minWidth) return;
        imageFiles[index] = { ...file, minWidth: newVal };
    });
    isAllConverted.value = 'unconverted';
});

watch(minHeight, (newVal) => {
    if (isAllConverted.value === 'converted') return;
    imageFiles.forEach((file, index) => {
        if (newVal === file.minHeight) return;
        imageFiles[index] = { ...file, minHeight: newVal };
    });
    isAllConverted.value = 'unconverted';
});

watch(width, (newVal) => {
    if (isAllConverted.value === 'converted') return;
    imageFiles.forEach((file, index) => {
        if (newVal === file.width) return;
        imageFiles[index] = { ...file, width: newVal };
    });
    isAllConverted.value = 'unconverted';
});

watch(height, (newVal) => {
    if (isAllConverted.value === 'converted') return;
    imageFiles.forEach((file, index) => {
        if (newVal === file.height) return;
        imageFiles[index] = { ...file, height: newVal };
    });
    isAllConverted.value = 'unconverted';
});

watch(quality, (newVal) => {
    if (isAllConverted.value === 'converted') return;
    imageFiles.forEach((file, index) => {
        console.log(file.quality);
        if (newVal === file.quality) return;
        imageFiles[index] = { ...file, quality: newVal };
    });
    isAllConverted.value = 'unconverted';
});

//載入後立即處理檔案
const processFiles = async (files) => {
    NProgress.start();
    try {
        const filePromises = files.map(async (rawfile) => {
            if (rawfile && rawfile.type.startsWith('image/')) {
                const file = await generatePreview(rawfile);
                const content = {
                    id: Date.now() + Math.random(),
                    state: 'unchanged', //unchanged, changed, converted
                    preview: URL.createObjectURL(file),
                    name: rawfile.name.replace(/\.[^/.]+$/, ''),
                    size: rawfile.size,
                    type: rawfile.type,
                    lastModified: rawfile.lastModified,
                    quality: 1,
                    rawfile: rawfile
                };
                imageFiles.push({
                    ...content,
                    type: selectedType || rawfile.type
                });
                originalFiles.push(content);
            }
        });
        await Promise.all(filePromises);
    } catch (error) {
        console.error('處理圖片出錯:', error);
    } finally {
        NProgress.done();
    }
};

//清除單張圖片
const removeFile = (index) => {
    imageFiles.splice(index, 1);
    originalFiles.splice(index, 1);
    compressedFiles.splice(index, 1);
    if (imageFiles.length <= 0) {
        isAllConverted.value = 'unconverted';
    }
};

//清除所有圖片
const clear = () => {
    imageFiles.length = 0;
    steps.value = 1;
}

//處理拖拉過來的檔案
const handleDrop = (e) => {
    isDragging.value = false;
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
    isAllConverted.value = 'unconverted';
}

//處理點選進來的檔案
const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
    isAllConverted.value = 'unconverted';
};

//處理拖拉樣式
const handleDragOver = (e) => {
    e.preventDefault();
    isDragging.value = true;
}

const dragLeave = (e) => {
    isDragging.value = false;
}

onMounted(() => {
    document.addEventListener('wheel', { passive: true });
})
</script>

<style lang="scss" scoped>
.isDragging {
    @apply border-primary border-dotted bg-primary50;
}
</style>