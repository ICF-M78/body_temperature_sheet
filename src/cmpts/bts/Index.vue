<!-- 体温单 -->
<template>
    <div id="paper">
        <p class="bts-title">{{ bts_conf.title }}</p>
        <div ref="cvs_ref" id="cvs"></div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, nextTick } from 'vue';
import { drawBase as initBts } from './draw-base';
import { drawData } from './draw-data';
import type { ZRenderType } from 'zrender';
import { tmpData } from '@/assets/mock/index.js';

const bts_conf = ref({
    title: 'XXXX医院体温单',
    line_w: 1,
    line_bold_w: 2,
    x_count: 48,
    y_count: 64,
    cvs: undefined,
    unit: 20,
} as BtsConf);
//
const cvs_ref = ref(null as null | HTMLCanvasElement);
//

const rfsPage = async () => {
    // 初始化体温单
    bts_conf.value.cvs = initBts(cvs_ref.value as HTMLCanvasElement, bts_conf.value);
    // 请求数据
    // 画数据
    drawData(bts_conf.value.cvs as ZRenderType, bts_conf.value);
};

onMounted(async () => {
    await nextTick();
    console.log(tmpData);
    rfsPage();
});
</script>

<style lang="scss" scoped>
// 定义单位宽度
$unit: 20px;
// x轴数量
$x: 48;
// y轴数量
$y: 64;

#paper {
    width: calc($x * $unit + 4 * $unit);
    height: calc($y * $unit + 4 * $unit);
    border: 1px dashed #3f1bd0;
    margin: 0 auto;
    background-color: #ffffff;
    //
    position: relative;
    #cvs {
        width: calc($x * $unit);
        height: calc($y * $unit);
        background-color: white;
        //
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
}

.bts-title {
    text-align: center;
    font-size: 26px;
    font-weight: bold;
    margin: 10px 0;
    animation: borderFadeIn 3s ease-in-out forwards;
}
</style>
