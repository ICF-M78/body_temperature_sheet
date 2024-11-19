<!--  -->
<template>
    <button @click="refBts">刷新</button>
    <BTSheet v-if="showBts"></BTSheet>
</template>

<script lang="ts" setup>
// MARK: import
import { nextTick, onMounted, ref } from 'vue';
import BTSheet from '@/cmpts/bts/Index.vue';

// MARK: emits
const emits = defineEmits([]);

// MARK: props

// MARK: params
const showBts = ref(true);
const loading = ref(false);

// MARK: computed

// MARK: watch

// MARK: func
/** @description 刷新 */
const refBts = () => {
    showBts.value = false;
    nextTick(() => {
        showBts.value = true;
    });
};

/** @description 更新 */
const rfsPage = () => {};

// MARK: expose

// MARK: hooks
onMounted(() => {
    rfsPage();
});
</script>

<style lang="scss" scoped></style>
