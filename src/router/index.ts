import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { useConfig } from '../global';
const config = useConfig();

import Main from '@/views/main/Index.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/main',
    },
    {
        path: '/main',
        component: Main,
        meta: {
            title: '首页',
        },
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = config.page_title + ' ' + to.meta.title;
    } else {
        document.title = config.page_title;
    }
    next();
});

export default router;
