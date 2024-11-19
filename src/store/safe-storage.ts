import type { StorageLike } from 'pinia-plugin-persistedstate';
import LS from 'secure-ls';

const ls = new LS({
    //不压缩
    isCompression: false,
    //楚天千里清秋，水随天去秋无际。
    encryptionSecret: 'ctqlqqss',
});

export const safeStorage: StorageLike = {
    setItem(key: string, value: string) {
        ls.set(key, value);
    },
    getItem(key: string): string | null {
        return ls.get(key);
    },
};
