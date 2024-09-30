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
        meta: { layout: 'MainLayout', title: 'Bearune' },
        // component: ConvertImageView
        component: HomeView
    },
    {
        path: '/convert-image',
        meta: { layout: 'MainLayout', title: '在線轉換圖像 - WebP, JPG, PNG' },
        component: ConvertImageView
    },
    {
        path: '/convert-image-to-webp',
        meta: { layout: 'MainLayout', title: '一鍵轉WebP' },
        component: ConvertImageToWebpView
    },
    {
        path: '/qrcode-generator',
        meta: { layout: 'MainLayout', title: 'QR碼產生器' },
        component: QRCodeGeneratorView
    },
    {
        path: '/emoji',
        meta: { layout: 'MainLayout', title: 'Emoji大全' },
        component: CopyEmojiView
    },
    {
        path: '/privacy-policy-statement',
        meta: { layout: 'MainLayout', title: '隱私權宣告' },
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

    if (isNavigationFailure(await next(), NavigationFailureType.aborted)) {
        console.log('vue router error');
    }

    window.scrollTo({ top: 0 });
});

router.afterEach(() => {
    NProgress.done();
});

export default router;