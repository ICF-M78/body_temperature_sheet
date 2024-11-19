import * as zr from 'zrender';

// 初始化画布
export const initCvs = (dom: HTMLElement): zr.ZRenderType => {
    let opt = {
        renderer: 'svg',
    };
    return zr.init(dom, opt);
};

// 画线
export function line(beg: Point, end: Point, style: Record<string, any>) {
    return new zr.Line({
        shape: {
            x1: beg.x,
            y1: beg.y,
            x2: end.x,
            y2: end.y,
        },
        style: style,
    });
}

// 画圆
export function circle(center: Point, r: number, style: Record<string, any>, z_lv: number = 2) {
    return new zr.Circle({
        shape: {
            cx: center.x,
            cy: center.y,
            r: r,
        },
        style: style,
        zlevel: z_lv,
    });
}

// 写字
export function text(pos: Point, content: string, style: Record<string, any>, z_lv: number = 2) {
    return new zr.Text({
        style: {
            text: content,
            x: pos.x,
            y: pos.y,
            ...style,
        },
        zlevel: z_lv,
    });
}

// 画叉
export function cross(
    center: Point,
    style: Record<string, any>,
    lineLength: number = 5,
    z_lv: number = 2
) {
    return [
        new zr.Line({
            shape: {
                x1: center.x - lineLength,
                y1: center.y - lineLength,
                x2: center.x + lineLength,
                y2: center.y + lineLength,
            },
            style: style,
            zlevel: z_lv,
        }),
        new zr.Line({
            shape: {
                x1: center.x - lineLength,
                y1: center.y + lineLength,
                x2: center.x + lineLength,
                y2: center.y - lineLength,
            },
            style: style,
            zlevel: z_lv,
        }),
    ];
}

// 画区域
export function polygon(point_ls: Point[], style: Record<string, any>, z_lv: number = 2) {
    const points = [] as number[][];
    point_ls.forEach(p => {
        points.push([p.x, p.y]);
    });
    return new zr.Polygon({
        shape: {
            points: points,
        },
        style: style,
        zlevel: z_lv,
    });
}
