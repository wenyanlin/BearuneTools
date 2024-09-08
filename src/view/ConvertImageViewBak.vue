<template>
  <div class="w-full h-fit flex justify-center items-center">
    <Transition name="fade" mode="out-in">
      <div class="w-innerWidth columns justify-center items-center py-16" v-if="steps === 1">
        <h1 class="col-span-12 text-center">多功能圖片處理工具</h1>
        <div class="col-span-12 text-center">
          可分別、批量操作不同類型的圖片：轉檔、壓縮、裁剪、調整大小、重新命名
          <!-- <ul>
          <li>個別、批量轉換 JPG、PNG、GIF、TIF、PSD、SVG、WEBP、HEIC 至 JPG、PNG、GIF、TIF、PSD、SVG、WEBP、HEIC</li>
          <li>個別、批量調整圖片長寬</li>
          <li>個別、批量調整壓縮圖片</li>
        </ul> -->
        </div>
        <div class="col-span-8 col-start-3">
          <label for="imgUploads" @dragover="handleDragOver" @drop.prevent="handleDrop"
            :class="{ 'isDragging': isDragging }"
            class="aspect-[5/3] bg-sliver50 backdrop-blur-xs rounded-3xl flex flex-col gap-4 justify-center items-center border-4 border-tint1">
            <div
              class="w-80 h-20 rounded-xl bg-primary border border-primary flex justify-center items-center cursor-pointer duration-100 hover:bg-tint1">
              <span class="text-white text-xl tracking-wider">選擇多張圖片</span>
            </div>
            <span>or 拖曳批量圖片至此</span>
          </label>
          <input type="file" id="imgUploads" ref="clickInput" class="hidden" multiple="multiple"
            @change="handleFileSelect">
        </div>
      </div>
      <div class="w-full mx-6 min-h-[calc(100vh-4rem)] columns justify-between" v-else-if="steps === 2">
        <!-- left side -->
        <div
          class="col-span-2 h-[calc(100vh-6rem)] border-2 border-tint1 rounded-md backdrop-blur-sm mt-4 mb-4 sticky top-20">
          <div class="grid grid-cols-2 gap-6 p-6">
            <h2 class="col-span-2 h-fit text-center">控制面板</h2>
            <div class="col-span-2 flex flex-col gap-6">
              <!-- convert to -->
              <div class="flex flex-col gap-2">
                <h3>類型：</h3>
                <select ref="unifiedFormat">
                  <option value="1">JPG</option>
                  <option value="2">WEBP</option>
                  <option value="3">PNG</option>
                  <option value="0">自定義</option>
                </select>
              </div>
              <div class="flex flex-col gap-2">
                <h3>品質：</h3>
                <div class="flex items-center gap-1">
                  <input type="range" min="0.1" max="1.0" value="1.0" step="0.1" name="compressed" list="compressed"
                    v-model="rawCompressedValue">
                  <label for="compressed" class="w-10">×{{ compressedValue }}</label>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <div class="flex justify-between items-center">
                  <h3>尺寸：</h3>
                  <label for="aspectRatio" class="check-box">
                    <input type="checkbox" name="aspectRatio" id="aspectRatio" v-model="isRadio">
                    <span></span>原始比例
                  </label>
                </div>
                <div class="flex items-center gap-1">
                  <label>寬</label>
                  <input type="text" inputmode="numeric" pattern="\d*" class="w-1/2" v-model="unifiedWidth">
                  <span>×</span>
                  <label>高</label>
                  <input type="text" inputmode="numeric" pattern="\d*" class="w-1/2" v-model="unifiedHeight">
                  <span>px</span>
                </div>
              </div>
              <!-- click to convert -->
              <button @click="clickStart">開始轉換</button>
            </div>
          </div>
        </div>
        <!-- right side -->
        <div class="col-span-10 flex flex-col relative">
          <!-- right side - control area -->
          <div class="flex justify-between p-4 pl-0">
            <div class="flex items-center gap-2 cursor-pointer" @click="clear">
              <IconLeftArrow />返回 back
            </div>
            <div class="flex gap-4">
              <div
                :class="[{ 'cursor-pointer': view === 'table' }, { 'border-primary': view === 'tiles' }, { 'text-primary': view === 'tiles' }]"
                class="rounded-md text-2xl text-grey border border-lGrey p-2 duration-150" @click="view = 'tiles'">
                <IconTiles />
              </div>
              <div
                :class="[{ 'cursor-pointer': view === 'tiles' }, { 'border-primary': view === 'table' }, { 'text-primary': view === 'table' }]"
                class="rounded-md text-2xl text-grey border border-lGrey p-2 duration-150" @click="view = 'table'">
                <IconTable />
              </div>
            </div>
          </div>
          <!-- right side - preview area -->
          <Transition name="fade" mode="out-in" appear>
            <TransitionGroup tag="div" name="list" class="grid grid-cols-10 gap-6 mb-6 relative place-items-center"
              :key="view">
              <div v-for="(item, index) in imageFiles" :key="item.name"
                :class="[{ 'col-span-2': view === 'tiles' }, { 'col-span-10': view === 'table' }]">
                <!-- tiles -->
                <div v-if="view === 'tiles'">
                  <Tiles v-model="imageFiles[index]" :index="index" @remove="removeItem(index)">
                  </Tiles>
                </div>
                <!-- table -->
                <div v-else>
                  <Table :item="item" :key="index"></Table>
                </div>
              </div>
            </TransitionGroup>
          </Transition>
        </div>
      </div>
      <div class="w-innerWidth columns justify-center items-center py-16" v-else>
        <button @click="clickDownload">一鍵下載</button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { reactive, ref, watch, computed } from 'vue';
import Compressor from 'compressorjs';
import { saveAs } from 'file-saver';
import { IconLeftArrow, IconTable, IconTiles } from '@/assets/icons'
import Tiles from '../components/convertImage/tiles.vue';
import Table from '../components/convertImage/table.vue';
import NProgress from 'nprogress';

const imageFiles = reactive([]); //是一個反應式數組，儲存用戶上傳的圖片文件及相關信息

//trace
const isDragging = ref(false); //用來跟蹤用戶是否正在拖拽文件到頁面上
const isRadio = ref(true);
const unifiedFormat = ref(''); //用來跟蹤用戶選擇的文件格式

const unifiedWidthInput = ref(''); // 用戶輸入的寬度值
const unifiedHeightInput = ref(''); // 用戶輸入的高度值

const unifiedWidth = computed({
  get() {
    // 返回 '自訂'
    if (isRadio.value && unifiedHeightInput.value) {
      return '自訂';
    }
    // 返回用戶的輸入值
    return unifiedWidthInput.value;
  },
  set(value) {
    // 將用戶的輸入值儲存起來
    unifiedWidthInput.value = value;
  }
});

const unifiedHeight = computed({
  get() {
    // 返回 '自訂'
    if (isRadio.value && unifiedWidthInput.value) {
      return '自訂';
    }
    // 返回用戶的輸入值
    return unifiedHeightInput.value;
  },
  set(value) {
    // 將用戶的輸入值儲存起來
    unifiedHeightInput.value = value;
  }
});

// 當 isRadio 或其他條件變更時，重設輸入值
watch([isRadio, unifiedWidthInput, unifiedHeightInput], ([isRadioValue, width, height]) => {
  if (isRadioValue) {
    if (width) {
      unifiedHeightInput.value = '';
    } else if (height) {
      unifiedWidthInput.value = '';
    }
  }
});

//about ui
const steps = ref(1); //來控制界面中流程的進度
const view = ref('tiles'); //用來管理當前的視圖
const rawCompressedValue = ref(1); //相關於壓縮質量設置
const compressedValue = computed(() => Number(rawCompressedValue.value).toFixed(1)); //相關於壓縮質量設置
const formats = ["image/jpg", "image/webp", "image/png"];

// step=2
//start convert
const clickStart = () => {
  imageFiles.map((file) => {
    const type = unifiedFormat.value.value - 1;
    const canvasFile = imgToCanvas(
      file.imageType,
      unifiedWidth.value ? Number(unifiedWidth.value) : undefined,
      unifiedHeight.value ? Number(unifiedHeight.value) : undefined
    );
    canvasToBlob(canvasFile, formats[type]).then(blob => {
      downloadImageFromBlob(blob, `${file.name.replace(/\.[^/.]+$/, '')}.` + formats[type].split('/')[1]); // 使用適當的文件名
    }).catch(error => {
      console.error('Failed to download image:', error);
    });
  })
};

// 將object轉成file
// const objectToFile = (file, fn) => {
//   let objFile = new FileReader();
//   try {
//     objFile.readAsDataURL(file.originalFile);
//     objFile.onload = (e) => {
//       let image = new Image();
//       image.src = e.target.result; // base64 數據
//       image.onload = () => {
//         fn(image);
//       };
//     };
//   } catch (e) {
//     console.log("請上傳圖片！" + e);
//   }
// }

//將canvas轉成blob
const canvasToBlob = (canvas, format) => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Failed to create blob from canvas'));
      }
    }, format);
  });
}

// 將image轉成canvas
const imgToCanvas = (image, newWidth = image.width, newHeight = image.height) => {
  let canvas = document.createElement("canvas");
  canvas.width = newWidth;
  canvas.height = newHeight;
  canvas.getContext("2d").drawImage(image, 0, 0, newWidth, newHeight);
  return canvas;
}

//將file轉成image
const fileToImg = (file) => {
  return new Promise((resolve, reject) => {
    let imgFile = new FileReader();
    imgFile.onload = (e) => {
      let image = new Image();
      image.src = e.target.result; // base64 數據
      image.onload = () => {
        resolve(image);
      };
      image.onerror = (err) => {
        console.error('Image loading error:', err);
        reject(new Error('Failed to create image from file'));
      };
    };
    imgFile.onerror = (err) => {
      console.error('FileReader error:', err);
      reject(new Error('Failed to create image from file'));
    };
    imgFile.readAsDataURL(file);

  });
}

const downloadImageFromBlob = (blob, fileName) => {
  saveAs(blob, fileName);
};

// 將canvas轉成image
// const canvasToImg = (canvas) => {
//   let formats = ["image/jpeg", "image/webp", "image/png"];
//   const type = unifiedFormat.value.value - 1;
//   let src = canvas.toDataURL(formats[type]);
//   // console.log(unifiedFormat.value.value - 1);
//   return src;
// }

watch(imageFiles, (val) => {
  if (val.length === 0) {
    steps.value = 1;
  }
});

//清除單張圖片
const removeItem = (index) => {
  imageFiles.splice(index, 1);
};

//清除所有圖片
const clear = () => {
  imageFiles.length = 0;
  steps.value = 1;
}

// step=1

//生成預覽圖
const compressImage = (file, action) => {
  return new Promise((resolve, reject) => {
    let tempVal = {
      q: 1,
      mW: 376,
      mH: 282
    }
    if (action !== 'preview') {
      tempVal = {
        q: file.quality,
        mW: file.width,
        mH: file.height
      }
    }
    console.log(tempVal);
    new Compressor(file, {
      quality: tempVal.q, // 設置圖像質量（1 表示 100% 的質量）
      maxWidth: tempVal.mW, // 最大寬度
      maxHeight: tempVal.mH, // 最大高度
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

//載入後立即處理檔案
const processFiles = (files) => {
  NProgress.start();
  files.forEach(async (rawfile) => {
    try {
      if (rawfile && rawfile.type.startsWith('image/')) {

        //事先製作預覽圖
        const file = await compressImage(rawfile, 'preview');

        //儲存原始file轉成的canvas
        const image = await fileToImg(rawfile);

        //組成可更動內容的file
        imageFiles.push({
          compressedPath: URL.createObjectURL(file),
          name: rawfile.name.replace(/\.[^/.]+$/, ''),
          // path: URL.createObjectURL(rawfile),
          size: rawfile.size,
          type: rawfile.type,
          lastModified: rawfile.lastModified,
          width: image.width,
          height: image.height,
          quality: 1,
          imageType: image,
          originalFile: rawfile,
        });
      }
    } catch (error) {
      // ***有錯誤內容的浮動提醒視窗
      console.error('處理圖片出錯:', error);
    } finally {
      if (imageFiles) {
        steps.value = 2;
      }
    }
  });
  NProgress.done();
};

//處理拖拉過來的檔案
const handleDrop = (e) => {
  isDragging.value = false;
  const files = Array.from(e.dataTransfer.files);
  processFiles(files);
  // let can = imgToCanvas(files[0]);
  // imgShow.value.src = canvasToImg(can);
}

//處理點選進來的檔案
const handleFileSelect = (e) => {
  const files = Array.from(e.target.files);
  processFiles(files);
};

//處理拖拉樣式
const handleDragOver = (e) => {
  e.preventDefault();
  isDragging.value = true;
}

</script>

<style scoped>
.isDragging {
  @apply border-primary border-dotted bg-tint150;
}
</style>