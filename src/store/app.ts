import { defineStore } from 'pinia';
import { safeStorage } from './safe-storage';

export const useAppStore = defineStore('main', {
    state: () => ({
    }),
    persist: {
        // 存储方式
        storage: safeStorage,
    },
});
