import * as zr from 'zrender';

let cvs: zr.ZRenderType;

const tagStyle = {
    fill: 'white',
    backgroundColor: 'black',
    padding: [2, 4],
    borderRadius: 3,
    fontSize: 12,
};

// 初始化画布
export const initCvs = (dom: HTMLElement): zr.ZRenderType => {
    let opt = {
        renderer: 'svg',
    };
    cvs = zr.init(dom, opt);
    return cvs;
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
export function circle(
    center: Point,
    r: number,
    style: Record<string, any>,
    zLv: number = 2,
    showText: string = ''
) {
    const c = new zr.Circle({
        shape: {
            cx: center.x,
            cy: center.y,
            r: r,
        },
        style: style,
        zlevel: zLv,
    });
    if (showText !== '') {
        let tooltipText: zr.Text;
        c.on('mouseover', e => {
            tooltipText = new zr.Text({
                style: {
                    text: showText,
                    x: e.offsetX - 12,
                    y: e.offsetY - 20,
                    ...tagStyle,
                },
                zlevel: 100,
            });
            cvs.add(tooltipText);
        });
        c.on('mouseout', e => {
            cvs.remove(tooltipText);
        });
    }
    return c;
}

// 写字
export function text(pos: Point, content: string, style: Record<string, any>, zLv: number = 2) {
    return new zr.Text({
        style: {
            text: content,
            x: pos.x,
            y: pos.y,
            ...style,
        },
        zlevel: zLv,
    });
}

// 画叉
export function cross(
    center: Point,
    style: Record<string, any>,
    lineLength: number = 5,
    zLv: number = 2,
    showText: string
) {
    const lines = [
        new zr.Line({
            shape: {
                x1: center.x - lineLength,
                y1: center.y - lineLength,
                x2: center.x + lineLength,
                y2: center.y + lineLength,
            },
            style: style,
            zlevel: zLv,
        }),
        new zr.Line({
            shape: {
                x1: center.x - lineLength,
                y1: center.y + lineLength,
                x2: center.x + lineLength,
                y2: center.y - lineLength,
            },
            style: style,
            zlevel: zLv,
        }),
    ];
    // 指针悬浮
    lines.forEach(line => {
        let tooltipText: zr.Text;
        line.on('mouseover', e => {
            tooltipText = new zr.Text({
                style: {
                    text: showText,
                    x: e.offsetX - 12,
                    y: e.offsetY - 20,
                    ...tagStyle,
                },
                zlevel: 100,
            });
            cvs.add(tooltipText);
        });
        line.on('mouseout', e => {
            cvs.remove(tooltipText);
        });
    });
    return lines;
}

// 画区域
export function polygon(point_ls: Point[], style: Record<string, any>, zLv: number = 2) {
    const points = [] as number[][];
    point_ls.forEach(p => {
        points.push([p.x, p.y]);
    });
    return new zr.Polygon({
        shape: {
            points: points,
        },
        style: style,
        zlevel: zLv,
    });
}
