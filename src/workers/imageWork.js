
self.onmessage = async (event) => {
  const { file, index } = event.data;

  try {
    const compressedFile = await compressImage(file);
    self.postMessage({ index, compressedFile });
  } catch (error) {
    console.error('Image compression error:', error);
  }
};

const compressImage = (file) => {
  // return new Promise((resolve, reject) => {
  //   new Compressor(file, {
  //     quality: 1,
  //     maxWidth: 200,
  //     maxHeight: 200,
  //     success(result) {
  //       resolve(result);
  //     },
  //     error(err) {
  //       console.error('圖像壓縮錯誤：', err.message);
  //       reject(err);
  //     },
  //   });
  // });
};