<template>
    <div class="w-full h-full flex flex-col justify-center items-center xl:px-4">
        <div class="w-innerWidth columns justify-center py-8 relative xl:w-full">
            <div class="col-span-6 col-start-4 grid grid-cols-6 gap-6
                sm:col-span-8 sm:col-start-1 sm:grid-cols-8
                xs:col-span-4 xs:grid-cols-4">
                <div class="col-span-6 sm:col-span-8 xs:col-span-4">
                    <h1>一鍵轉WebP</h1>
                    <div>100%免費WebP轉換器，只在本地端執行，圖像不經過伺服器。僅支援JPG、PNG格式。<span class="text-primary"
                            v-if="isIOS()"><br>*目前ios不支援轉webp</span></div>
                </div>
                <div :class="{ 'gradientBorder': !imageFiles.length }" class="col-span-6 frame flex flex-col gap-4 justify-center items-center bg-white bg-light-bg dark:bg-dark-bg
                sm:col-span-8 xs:col-span-4">
                    <label for="imgUploads" @dragover="handleDragOver" @dragleave="dragLeave" @drop.prevent="handleDrop"
                        :class="{ 'isDragging': isDragging }"
                        class="w-full h-64 cursor-pointer flex justify-center items-center">
                        <span><span
                                class="border-b border-primary border-dotted text-center">選擇檔案</span>或拖曳圖片至此……</span>
                    </label>
                    <input type="file" id="imgUploads" class="hidden" multiple="multiple"
                        accept=".webp, .png, .jpg, .jpeg" @change="handleFileSelect">
                </div>
                <div class="col-span-6 h-fit flex flex-col gap-1 w-full sm:col-span-8 xs:col-span-4"
                    v-if="originalFiles.length">
                    <div v-for="(file, index) in imageFiles" :key="file.id" class="frame">
                        <List v-model="imageFiles[index]" @remove="removeFile(index)" @reset="resetFile(index)"
                            @preview=" openPreviewFile(index)" :original-file="originalFiles[index]"
                            :compressed-file="compressedFiles[index]"></List>
                    </div>
                </div>
                <div class="col-span-6 frame h-fit sm:col-span-8 xs:col-span-4">
                    <div class="w-full h-fit p-4 border-b border-lGrey border-solid dark:border-white">
                        <h2>批量選項</h2>
                    </div>
                    <div class="flex flex-col gap-4 px-4 py-6">
                        <div class="flex flex-col gap-4 dark:border-sliver">
                            <label>
                                有損壓縮
                                <select class="w-48" v-model.number="quality">
                                    <option :value="0">預設（最佳化）</option>
                                    <option :value="1">100%（原圖）</option>
                                    <option :value="0.9">90%</option>
                                    <option :value="0.8">80%</option>
                                    <option :value="0.7">70%</option>
                                    <option :value="0.6">60%</option>
                                    <option :value="0.5">50%</option>
                                    <option :value="0.4">40%</option>
                                    <option :value="0.3">30%</option>
                                    <option :value="0.2">20%</option>
                                    <option :value="0.1">10%</option>
                                    <!-- <option :value="0">自定義</option> -->
                                </select>
                            </label>
                            <label>
                                寬度
                                <input type="number" class="w-48" min="0" max="4096" v-model.number="width">
                            </label>
                            <label>
                                高度
                                <input type="number" class="w-48" min="0" max="4096" v-model.number="height">
                            </label>
                            <label>
                                適合大小
                                <select class="w-48" v-model="resize">
                                    <option value="none">保持源圖像尺寸</option>
                                    <option value="contain">等比 Contain</option>
                                    <option value="cover">撐滿 Cover</option>
                                    <!-- <option value="0">自定義</option> -->
                                </select>
                            </label>
                        </div>
                    </div>
                </div>
                <div
                    class="col-span-6 grid grid-cols-6 gap-6 items-center sm:col-span-8 sm:grid-cols-8 xs:col-span-4 xs:grid-cols-4">
                    <button @click="clearAll" v-if="originalFiles.length"
                        class="col-span-1 col-start-4 text-center p-0 border-0 sm:col-start-6 xs:col-start-1">清除全部</button>
                    <!-- click需設置防抖 -->
                    <button :class="{
                        '!bg-lGrey': !imageFiles.length, '!border-lGrey': !imageFiles.length,
                        'bg-related1': isAllConverted === 'unconverted', 'border-related1': isAllConverted === 'unconverted',
                        'bg-grey': isAllConverted === 'converting', 'border-grey': isAllConverted === 'converting'
                    }" class="col-span-2 col-start-5 bg-primary border-primary text-white py-4 duration-150 sm:col-start-7 xs:col-start-2"
                        @click="isAllConverted === 'converted' ? clickDownload() : clickStart()" :key="isAllConverted">
                        {{ isAllConverted === 'converted' ? '批量下載' : isAllConverted === 'converting' ? '轉換中…'
                            : '批量轉換' }}
                    </button>
                </div>
            </div>
        </div>
        <div class="w-innerWidth columns justify-center py-8 relative xl:w-full">
            <div class="col-span-6 col-start-4 grid grid-cols-6 gap-6
                sm:col-span-8 sm:col-start-1 sm:grid-cols-8
                xs:col-span-4 xs:grid-cols-4">
                <div
                    class="col-span-6 border-t border-greyBlue mt-16 pt-16 flex flex-col gap-6 sm:col-span-8 xs:col-span-4">
                    <h1>為什麼我們要將圖片轉換？</h1>
                    <div class="text-md">
                        <p class="w-full">將圖片轉換或壓縮的主要目的是提升圖片的使用效率，這通常適用於網站、應用程序或是其他需要處理大量圖片的情境中。這裡有幾個常見的原因：
                        </p>
                        <ol class="w-full list-decimal pl-6">
                            <li>
                                <h2>減少文件大小，提升加載速度</h2>
                                圖片文件通常非常大，尤其是高清圖片。當網站或應用程序需要處理多張圖片時，壓縮圖片可以顯著減少文件大小，從而提升加載速度，提供更流暢的用戶體驗。這在手機端或網速較慢的情況下尤為重要。
                            </li>
                            <li>
                                <h2>優化儲存空間</h2>
                                不論是本地存儲還是雲端存儲，圖片佔用的空間都會累積。壓縮圖片或將其轉換為更有效的格式（如WebP），可以節省大量儲存空間，同時維持圖片質量。這對於大型應用、電子商務網站等需要儲存大量圖片的系統來說，尤其重要。
                            </li>
                            <li>
                                <h2>兼容不同格式和設備</h2>
                                不同的設備、瀏覽器或應用程序對圖片格式的支持程度不同。將圖片轉換為多種格式（如JPEG、PNG、WebP等），能確保圖片在不同的平台上正確顯示。例如，WebP
                                格式有著比 JPEG 或 PNG 更高的壓縮效率，且保留更多的圖片質量，但並不是所有平台都支持它，因此需要根據需求進行轉換。
                            </li>
                            <li>
                                <h2>提升用戶體驗</h2>壓縮和優化圖片能減少網站或應用加載時間，從而減少跳出率並提高用戶留存率。這特別對於電商網站、社交媒體平台等依賴高效用戶交互的應用場景尤為重要。
                            </li>
                        </ol>
                    </div>
                </div>
                <div
                    class="col-span-6 border-t border-greyBlue mt-16 pt-16 flex flex-col gap-6 sm:col-span-8 xs:col-span-4">
                    <h1>比較JPG、PNG、WEBP</h1>
                    <div class="text-md">
                        <table class="w-full">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>JPG (JPEG)</th>
                                    <th>PNG</th>
                                    <th>WEBP</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>壓縮率/文件大小</th>
                                    <td>壓縮率高，較小</td>
                                    <td>壓縮率低，較大</td>
                                    <td>壓縮率高，三種格式中最小</td>
                                </tr>
                                <tr>
                                    <th>載入速度</th>
                                    <td>較快</td>
                                    <td>較慢</td>
                                    <td>最快</td>
                                </tr>
                                <tr>
                                    <th>壓縮方式</th>
                                    <td>有損壓縮</td>
                                    <td>支持有損和無損壓縮</td>
                                    <td>支持有損和無損壓縮</td>
                                </tr>
                                <tr>
                                    <th>圖像品質</th>
                                    <td>有損壓縮可能降低品質，適合照片或多色圖片</td>
                                    <td>保持高品質，適合需要透明背景的圖像</td>
                                    <td>有損壓縮品質優於 JPG，無損壓縮優於 PNG</td>
                                </tr>
                                <tr>
                                    <th>透明支持</th>
                                    <td>不支持透明</td>
                                    <td>支持透明</td>
                                    <td>支持透明</td>
                                </tr>
                                <tr>
                                    <th>色彩支持</th>
                                    <td>24-bit 色彩（約 1670 萬種顏色）</td>
                                    <td>24-bit 色彩 + 8-bit 透明度通道</td>
                                    <td>24-bit 色彩 + 8-bit 透明度通道</td>
                                </tr>
                                <tr>
                                    <th>支援動畫</th>
                                    <td>無</td>
                                    <td>無</td>
                                    <td>有</td>
                                </tr>
                                <tr>
                                    <th>適用場景</th>
                                    <td>照片、需要小文件大小且對透明度要求不高的圖像</td>
                                    <td>需要高品質、透明背景或圖標的圖像</td>
                                    <td>現代網頁上推薦的格式，適合需要透明和動態效果的圖像。</td>
                                </tr>
                                <tr>
                                    <th>壓縮品質/性能</th>
                                    <td>有損壓縮的品質隨壓縮率增加而下降</td>
                                    <td>無損壓縮保持高品質</td>
                                    <td>在高壓縮下仍保持較好品質</td>
                                </tr>
                                <tr>
                                    <th>瀏覽器、軟體支持</th>
                                    <td>廣泛支持</td>
                                    <td>廣泛支持</td>
                                    <td>較舊的瀏覽器、軟體可能不支援，但正在增長</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div
                    class="col-span-6 border-t border-greyBlue mt-16 pt-16 flex flex-col gap-6 sm:col-span-8 xs:col-span-4">
                    <h1>常見問題</h1>
                    <ol class="w-full list-decimal pl-6 lg:w-3/4 md:w-full">
                        <li>
                            <h2>Bearune網站轉檔支援什麼格式轉什麼格式？</h2>
                            <b>目前支援JPG、PNG格式轉WebP</b>，列出來如下：JPG轉WebP（JPG to WebP）、PNG轉WebP（PNG to WebP）
                        </li>
                        <li>
                            <h2>如果我遇到轉檔失敗，哪裡可以回報？</h2>
                            首先我們要先向您道歉，因為目前網站還在測試當中，可能會產生一些Bug，且目前尚未設置回報區域，但未來將會增設，敬請期待。
                        </li>
                    </ol>
                </div>
            </div>

        </div>
        <div :class="{ 'invisible': !togglePreview }"
            class="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center">
            <div class="absolute top-0 left-0 w-full h-full backdrop-blur-sm cursor-pointer -z-10"
                @click="closePreviewFile()"></div>
            <div class="flex flex-col justify-center items-center w-2/3 h-2/3 bg-black overflow-hidden relative
            lg:w-full lg:h-full">
                <div
                    class="w-full h-16 backdrop-blur-sm flex justify-between gap-2 items-center p-4 text-white relative">
                    <div class="w-full overflow-hidden whitespace-nowrap text-ellipsis">{{ previewImg.name }}</div>
                    <div class="absolute top-full left-4 bg-white33 opacity-50 rounded py-1 px-2">
                        {{ isMousedown ? 'Before' : 'After（試試長按）' }}</div>
                    <div class="flex gap-4 items-center">
                        <div class="flex gap-2">
                            <div>{{ (currentPreviewImg.size / 1024 / 1024).toFixed(2) }}MB</div>
                            <div>
                                {{ previewImg.width }}×{{ previewImg.height }}
                            </div>
                        </div>
                        <div class="w-fit cursor-pointer text-white text-3xl" @click="closePreviewFile()">
                            <IconClose />
                        </div>
                    </div>
                </div>
                <div class="w-full h-[calc(100%-4rem)] flex justify-center items-center cursor-pointer"
                    @mousedown="startLongPress" @mouseup="endLongPress" @mouseleave="endLongPress"
                    @touchstart="startLongPress" @touchend="endLongPress" @touchcancel="endLongPress"
                    @contextmenu="disableContextMenu">
                    <Transition name="fade" mode="out-in">
                        <img :src="currentPreviewImg.url" class="object-contain max-w-full max-h-full" alt="預覽圖"
                            :key="previewImg.url">
                    </Transition>
                </div>
                <div class="absolute top-1/2 left-4 text-4xl bg-white50 rounded-md py-4 cursor-pointer"
                    @click="switchPreview('prev')">
                    <IconLeftArrow />
                </div>
                <div class="absolute top-1/2 right-4 text-4xl bg-white50 rounded-md py-4 cursor-pointer"
                    @click="switchPreview('next')">
                    <IconLeftArrow class="rotate-180" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, watch, computed } from 'vue';
import { IconClose, IconLeftArrow } from '@/assets/icons';
import NProgress from 'nprogress';
import Compressor from 'compressorjs';
import JSZip from 'jszip';
import { saveAs } from 'file-saver'
import List from '@/components/convertImageToWebpView/List.vue';
import { isIOS } from '@/plugins/checkDevice.js';

const isDragging = ref(false); //用來跟蹤用戶是否正在拖拽文件到頁面上
const isAllConverted = ref('unconverted'); //unconverted,converting, converted ;
const isMousedown = ref(false);

const imageFiles = reactive([]);
const originalFiles = reactive([]);
const compressedFiles = reactive([]);
const previewImg = ref('');
const currentPreviewImg = computed(() => {
    return isMousedown.value
        ? { size: previewImg.value.originalSize, url: previewImg.value.originalUrl }
        : { size: previewImg.value.size, url: previewImg.value.url };
});

const togglePreview = ref(false);

//v-model

const width = ref();
const height = ref();
const quality = ref(0);
const resize = ref('none');

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
};

const compressFile = (file) => {
    return new Promise((resolve, reject) => {
        new Compressor(file.rawfile, {
            quality: file.quality != 0 ? file.quality : 0.8,
            mimeType: 'image/webp',
            convertType: 'image/webp',
            convertSize: Infinity,
            width: file.width,
            height: file.height,
            resize: file.resize,
            success: (result) => {
                resolve(result); // 壓縮成功，返回壓縮後的圖片
            },
            error: (err) => {
                reject(err); // 壓縮過程中出錯
            }
        });
    });
};

const clickStart = async () => {
    if (imageFiles.length === 0) return;
    else if (imageFiles.every((file) => file.state === 'converted')) {
        return;
    }
    else {
        try {
            NProgress.start();
            isAllConverted.value = 'converting';
            const filePromises = imageFiles.map(async (file, index) => {
                if (file.state !== 'converted') {
                    // 僅對變化的文件進行壓縮處理
                    compressedFiles[index] = await compressFile(file, index);
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
};

class FileNameManager {
    constructor() {
        this.usedNames = new Set();
    }

    // 確保檔案名稱唯一
    getUniqueFileName(baseName, extension) {
        let uniqueName = `${baseName}.${extension}`;
        let index = 1;

        while (this.usedNames.has(uniqueName)) {
            uniqueName = `${baseName} (${index}).${extension}`;
            index++;
        }

        this.usedNames.add(uniqueName);
        return uniqueName;
    }
};

const clickDownload = async () => {
    const fileNameManager = new FileNameManager(); // 創建 FileNameManager 實例

    const zip = new JSZip();
    compressedFiles.map((file, index) => {
        const baseName = imageFiles[index].name; // 提取檔案基礎名稱
        const extension = file.name.split('.').pop(); // 獲取檔案擴展名
        const uniqueName = fileNameManager.getUniqueFileName(baseName, extension);
        zip.file(uniqueName, file, { base64: true });
        // zip.file(`${imageFiles[index].name}.${file.name.split('.').pop()}`, file, { base64: true });
    })
    zip.generateAsync({ type: 'blob' }).then((content) => saveAs(content, 'bearuneImage.zip'))
};

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
        if (newVal === file.quality) return;
        imageFiles[index] = { ...file, quality: newVal };
    });
    isAllConverted.value = 'unconverted';
});

watch(resize, (newVal) => {
    if (isAllConverted.value === 'converted') return;
    imageFiles.forEach((file, index) => {
        if (newVal === file.resize) return;
        imageFiles[index] = { ...file, resize: newVal };
        // console.log(imageFiles[index].resize);
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
                    state: 'unconverted', //unconverted, converted
                    preview: URL.createObjectURL(file),
                    name: rawfile.name.replace(/\.[^/.]+$/, ''),
                    size: rawfile.size,
                    type: rawfile.type,
                    lastModified: rawfile.lastModified,
                    rawfile: rawfile,
                    quality: quality.value || 1,
                    width: width.value || undefined,
                    height: height.value || undefined,
                    resize: resize || 'none',
                };
                imageFiles.push({
                    ...content,
                    type: 'image/webp'
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

const clearAll = () => {
    imageFiles.length = 0;
    originalFiles.length = 0;
    compressedFiles.length = 0;
    isAllConverted.value = 'unconverted';
};

const resetFile = (index) => {
    const content = {
        state: 'unconverted', //unconverted, converted
        name: originalFiles[index].name.replace(/\.[^/.]+$/, ''),
        size: originalFiles[index].size,
        type: originalFiles[index].type,
        lastModified: originalFiles[index].lastModified,
        quality: quality.value || 1,
        width: width.value || undefined,
        height: height.value || undefined,
        resize: resize || 'none',
    };
    imageFiles[index] = { ...imageFiles[index], ...content };
    originalFiles[index] = { ...originalFiles[index], ...content };
    compressedFiles[index] = '';
    // console.log(imageFiles[index]);
    isAllConverted.value = 'unconverted';
};

const openPreviewFile = (index) => {
    if (compressedFiles[index]) {
        togglePreview.value = true;
        const url = URL.createObjectURL(compressedFiles[index]);
        const originalUrl = URL.createObjectURL(originalFiles[index].rawfile);
        previewImg.value = {
            name: imageFiles[index].name,
            type: compressedFiles[index].type,
            size: compressedFiles[index].size,
            url,
            // originalName:originalFiles[index].rawfile.name,
            originalType: originalFiles[index].rawfile.type,
            originalSize: originalFiles[index].rawfile.size,
            originalUrl,
            width: 0,
            height: 0,
            index
        };
        const img = new Image();
        img.onload = () => {
            previewImg.value.width = img.naturalWidth;
            previewImg.value.height = img.naturalHeight;
        };
        img.onerror = (error) => {
            console.error("Image failed to load:", error);
            URL.revokeObjectURL(url);
        };
        img.src = url;
    }
};

const closePreviewFile = () => {
    togglePreview.value = false;
    previewImg.value = '';
    URL.revokeObjectURL(previewImg.value.url);
};

const switchPreview = (e) => {
    const index = e === 'prev'
        ? (previewImg.value.index - 1 >= 0 ? previewImg.value.index - 1 : compressedFiles.length - 1)
        : (previewImg.value.index + 1 < compressedFiles.length ? previewImg.value.index + 1 : 0);
    openPreviewFile(index);
};

watch(togglePreview, (newVal) => {
    if (newVal) {
        // 禁用滾動條
        document.documentElement.style.overflow = 'hidden';
    } else {
        // 恢復滾動條
        document.documentElement.style.overflow = '';
    }
});

//處理拖拉過來的檔案
const handleDrop = (e) => {
    isDragging.value = false;
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
    e.target.value = '';
    isAllConverted.value = 'unconverted';
};

//處理點選進來的檔案
const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
    e.target.value = '';
    isAllConverted.value = 'unconverted';
};

//處理拖拉樣式
const handleDragOver = (e) => {
    e.preventDefault();
    isDragging.value = true;
};

const dragLeave = (e) => {
    isDragging.value = false;
};

let pressTimer = null;

const startLongPress = () => {
    pressTimer = setTimeout(() => {
        isMousedown.value = true;
    }, 100); // 長按100毫秒後切換圖片
};

const endLongPress = () => {
    // 清除計時器，恢復預覽圖片
    if (pressTimer) {
        clearTimeout(pressTimer);
        pressTimer = null;
    }
    isMousedown.value = false;
};

// 禁用右鍵選單的函數
const disableContextMenu = (event) => {
    event.preventDefault();
};

</script>

<style lang="scss" scoped>
.isDragging {
    @apply border-primary border-dotted bg-primary50;
}

.gradientBorder {
    @apply relative;

    &::after {
        @apply content-[''] absolute -top-1 -left-1 -z-20 w-[calc(100%+8px)] h-[calc(100%+8px)] rounded-lg bg-tint150 opacity-0;
        animation: fadeInOut 1s;
        animation-iteration-count: 2;
    }

    @keyframes fadeInOut {

        0% {
            opacity: 0;
        }

        50% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }
}

ol {
    @apply py-8;

    li {
        @apply py-8;

        h2 {
            @apply font-medium pb-4;
        }
    }
}
</style>