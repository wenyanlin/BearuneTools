import { createWebHistory, createRouter, NavigationFailureType, isNavigationFailure, } from 'vue-router'
import HomeView from '@/view/HomeView.vue'
import ConvertImageView from '@/view/ConvertImageView.vue'
import ConvertImageToWebpView from '@/view/ConvertImageToWebpView.vue'
import QRCodeGeneratorView from '@/view/QRCodeGeneratorView.vue'
import CopyEmojiView from '@/view/CopyEmojiView.vue'
import PrivacyPolicyStatement from '@/view/PrivacyPolicyStatement.vue'
import { setupLayouts } from 'virtual:generated-layouts'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';


const routes = setupLayouts([
    {
        path: '/',
        meta: {
            layout: 'MainLayout',
            title: 'Bearune',
            content: {
                keywords: 'bearune, jpg, png, webp, web p, jp g, 在線圖片轉換工具, 圖片轉WebP, 免費QR碼生成器, Emoji大全, 免費在線工具合集',
                description: 'Bearune志在提供各種小工具，包括在線轉換圖像、一鍵轉WebP、極簡QRcode產生器等，未來還會添加並優化更多相關內容。',
            },
            og: {
                title: 'Bearune',
                type: 'website',
                image: 'https://bearune.com/assets/LOGO-BKt5otUs.webp',
                url: 'https://bearune.com/',
                description: 'Bearune志在提供各種小工具，包括在線轉換圖像、一鍵轉WebP、極簡QRcode產生器等，未來還會添加並優化更多相關內容。',
            },
        },
        // component: ConvertImageView
        component: HomeView
    },
    {
        path: '/convert-image',
        meta: {
            layout: 'MainLayout',
            title: '在線轉換圖像 - WebP, JPG, PNG',
            content: {
                keywords: 'jpg png, jpg jpeg, jpg jpeg png, jpg webp, jpg png 比較, jpeg png 比較, png jpg 比較, png 壓縮, jpg 高清, 背景 jpg, 推薦 png, 圖片轉 WebP, convert image to WebP, WebP 線上轉換, online image to WebP converter, 圖片格式轉 WebP, JPEG to WebP, PNG to WebP, 免費圖片轉 WebP, free WebP converter, 壓縮圖片轉 WebP, image compression to WebP, WebP 轉換工具, convert JPEG to WebP, convert PNG to WebP, 圖片壓縮與轉換 WebP, WebP converter online, 高效圖片轉 WebP, image to WebP for free, fast WebP conversion, 圖片格式轉換',
                description: '100%免費圖像轉換器，支持批量轉檔、有損壓縮、調整大小、重新命名。只在本地端執行，圖像不經過伺服器。',
            },
            og: {
                title: '在線轉換圖像 - WebP, JPG, PNG',
                type: 'website',
                image: 'https://bearune.com/assets/convert%20image-CAfblhoO.webp',
                url: 'https://bearune.com/convert-image',
                description: '100%免費圖像轉換器，支持批量轉檔、有損壓縮、調整大小、重新命名。只在本地端執行，圖像不經過伺服器。',
            },
        },
        component: ConvertImageView
    },
    {
        path: '/convert-image-to-webp',
        meta: {
            layout: 'MainLayout',
            title: '一鍵轉WebP-WebP to JPG, PNG',
            content: {
                keywords: '圖片轉 WebP, convert image to WebP, WebP 線上轉換, online image to WebP converter, 圖片格式轉 WebP, JPEG to WebP, PNG to WebP, 免費圖片轉 WebP, free WebP converter, 壓縮圖片轉 WebP, image compression to WebP, WebP 轉換工具, convert JPEG to WebP, convert PNG to WebP, 圖片壓縮與轉換 WebP, WebP converter online, 高效圖片轉 WebP, image to WebP for free, fast WebP conversion, 圖片格式轉換',
                description: '100%免費WebP轉換器，只在本地端執行，圖像不經過伺服器。僅支援JPG、PNG格式。',
            },
            og: {
                title: '一鍵轉WebP-WebP to JPG, PNG',
                type: 'website',
                image: 'https://bearune.com/assets/convert%20image%20to%20webp-B-3-QBB7.webp',
                url: 'https://bearune.com/convert-image-to-webp',
                description: '100%免費WebP轉換器，只在本地端執行，圖像不經過伺服器。僅支援JPG、PNG格式。',
            },
        },
        component: ConvertImageToWebpView
    },
    {
        path: '/qrcode-generator',
        meta: {
            layout: 'MainLayout',
            title: 'QR碼產生器',
            content: {
                keywords: 'qr 代碼, qr code 網站, 免費 QR 碼生成器, QR code generator, 線上生成 QR 碼, create QR code online, 免費 QR code 工具, generate QR code, 自訂 QR 碼, customized QR code, 免費 QR code 生成, QR 碼生成工具, QR code maker, 二維碼生成器, QR code 線上工具, create QR code for free, 線上免費 QR code, QR 碼快速生成, free QR code generator, 高效 QR 碼生成器, QR 碼生成與下載, create QR code instantly',
                description: '目前正在開發中，未來將會增加更多客製內容。',
            },
            og: {
                title: 'QR碼產生器',
                type: 'website',
                image: 'https://bearune.com/assets/qrcode%20generator-DkvVHFOR.webp',
                url: 'https://bearune.com/qrcode-generator',
                description: '簡易的QR碼產生器！',
            },
        },
        component: QRCodeGeneratorView
    },
    {
        path: '/emoji',
        meta: {
            layout: 'MainLayout',
            title: 'Emoji大全-Emoji Copy & Paste',
            content: {
                keywords: 'Emoji Copy & Paste, 免費 Emoji 工具, emoji 線上大全, emoji collection, 免費使用 Emoji, emoji 生成器, Emoji 下載, emoji picker, emoji copy and paste, Emoji 線上工具, emoji 搜尋, search emoji online, 免費 emoji 下載, emoji 類型大全, emoji finder, emoji 符號庫, emoji 線上分享, 最完整的 emoji 工具, emoji 資源, emoji 表情符號, emoji 快速選擇 色 emoji',
                description: '點擊表情符號即可複製。目前共有3655種Emjio可以複製，並提供膚色切換。',
            },
            og: {
                title: 'Emoji大全-Emoji Copy & Paste',
                type: 'website',
                image: 'https://bearune.com/assets/emoji-BbUD5b6L.webp',
                url: 'https://bearune.com/emoji',
                description: '點擊表情符號即可複製。目前共有3655種Emjio可以複製，並提供膚色切換。',
            },
        },
        component: CopyEmojiView
    },
    {
        path: '/privacy-policy-statement',
        meta: {
            layout: 'MainLayout', title: '隱私權宣告',
            content: {
                keywords: '隱私政策, privacy policy, 隱私聲明, privacy policy statement, 資料保護, data protection, 個人資料保護, personal data privacy, 網站隱私政策, website privacy policy, GDPR 規範, GDPR compliance, 隱私權保護, privacy rights, 資料隱私政策, data privacy policy, 隱私條款, privacy terms, 使用者隱私, user privacy, 資料收集政策, data collection policy, 網站隱私聲明, website privacy statement, 個資保護政策',
                description: '感謝您蒞臨「Bearune.com」（以下稱本網站），為了讓您能夠安心的使用本網站的各項服務與資訊，特此向您說明本網站的隱私權保護政策，以保障您的權益。',
            },
            og: {
                title: '隱私權宣告',
                type: 'website',
                image: 'https://bearune.com/assets/LOGO-BKt5otUs.webp',
                url: 'https://bearune.com/privacy-policy-statement',
                description: '感謝您蒞臨「Bearune.com」（以下稱本網站），為了讓您能夠安心的使用本網站的各項服務與資訊，特此向您說明本網站的隱私權保護政策，以保障您的權益。',
            },
        },
        component: PrivacyPolicyStatement
    },
]);

const router = createRouter({
    history: createWebHistory(),
    routes,
});

NProgress.configure({ ease: 'ease', speed: 500 });

router.beforeEach(async (to, from, next) => {
    NProgress.start();
    if (to.meta.title) {
        if (to.meta.title == 'Bearune') { window.document.title = 'Bearune'; }
        window.document.title = `${to.meta.title}|Bearune`;
    }
    if (to.meta.content) {
        let head = document.getElementsByTagName('head');
        let meta = document.createElement('meta');
        document.querySelector('meta[name="keywords"]').setAttribute('content', to.meta.content.keywords)
        document.querySelector('meta[name="description"]').setAttribute('content', to.meta.content.description)
        meta.content = to.meta.content;
        head[0].appendChild(meta)
    }
    // 更新 Open Graph 標籤的通用函數
    const updateMetaTag = (property, content) => {
        const tag = document.querySelector(`meta[property="${property}"]`);
        if (tag) {
            tag.setAttribute('content', content);
        } else {
            const newTag = document.createElement('meta');
            newTag.setAttribute('property', property);
            newTag.setAttribute('content', content);
            document.head.appendChild(newTag);
        }
    };

    // 更新各種 Open Graph 標籤
    if (to.meta.og) {
        const ogData = to.meta.og;
        if (ogData.title) updateMetaTag('og:title', ogData.title);
        if (ogData.type) updateMetaTag('og:type', ogData.type);
        if (ogData.image) updateMetaTag('og:image', ogData.image);
        if (ogData.url) updateMetaTag('og:url', ogData.url);
        if (ogData.description) updateMetaTag('og:description', ogData.description);
    }

    if (isNavigationFailure(await next(), NavigationFailureType.aborted)) {
        console.log('vue router error');
    }

    window.scrollTo({ top: 0 });
});

router.afterEach(() => {
    NProgress.done();
});

export default router;