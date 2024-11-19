declare class Point {
    x: number;
    y: number;
}

// 体温单基本配置
interface BtsConf {
    title: string;
    // 线的宽度
    line_w: number;
    // 粗线
    line_bold_w: number;
    // x轴
    x_count: number;
    // y轴
    y_count: number;
    unit: number;
    // zrender实例
    cvs: ZRenderType | undefined;
}
