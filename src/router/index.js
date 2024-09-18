import { createWebHistory, createRouter, NavigationFailureType, isNavigationFailure, } from 'vue-router'
import HomeView from '@/view/HomeView.vue'
import ConvertImageView from '@/view/ConvertImageView.vue'
import ConvertImageToWebpView from '@/view/ConvertImageToWebpView.vue'
import QRCodeGeneratorView from '@/view/QRCodeGeneratorView.vue'
import ConvertImageViewBak from '@/view/ConvertImageViewBak.vue'
import { setupLayouts } from 'virtual:generated-layouts'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const routes = setupLayouts([
    {
        path: '/',
        meta: { layout: 'MainLayout' },
        // component: ConvertImageView
        component: HomeView
    },
    {
        path: '/convert-image',
        meta: { layout: 'MainLayout' },
        component: ConvertImageView
    },
    {
        path: '/convert-image-to-webp',
        meta: { layout: 'MainLayout' },
        component: ConvertImageToWebpView
    },
    {
        path: '/qrcode-generator',
        meta: { layout: 'MainLayout' },
        component: QRCodeGeneratorView
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
        window.document.title = to.meta.title;
    }

    if (isNavigationFailure(await next(), NavigationFailureType.aborted)) {
        console.log('vue router error');
    }
});

router.afterEach(() => {
    NProgress.done();
});

export default router;