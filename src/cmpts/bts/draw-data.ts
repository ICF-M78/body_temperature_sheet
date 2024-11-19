import type { ZRenderType } from 'zrender';
import { cross, circle, line, polygon, text } from './draw-tools';

// config
let c = {} as BtsConf;
const font_size = 14;

/** @description 画数据 */
export const drawData = (cvs: ZRenderType, conf: BtsConf) => {
    let date_ls = [
        '2024-01-02',
        '2024-01-03',
        '2024-01-04',
        '2024-01-05',
        '2024-01-06',
        '2024-01-07',
        '2024-01-08',
    ];
    let in_hosp_day_ls = [1, 2, 3, 4, 5, 6, 7];
    // 体温
    let bt_ls = [
        36.6, 37.0, 37.5, 36.8, 38.1, 39.0, 37.2, 37.3, 36.9, 38.5, 37.8, 36.7, 39.5, 37.1, 36.8,
        38.0, 40.0, 36.5, 37.4, 0, 36.6, 38.2, 37.0, 0, 39.2, 36.7, 38.3, 0, 37.6, 36.9, 37.7, 38.4,
        0, 36.8, 39.1, 37.5, 38.6, 0, 37.3, 0, 0, 36.6, 0,
    ];
    // 物理降温
    let down_bt_ls = [
        0, 0, 0, 0, 0, 36.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 36.5, 0, 0, 0, 0, 0, 0, 0, 0, 36, 0, 0, 0,
        36.5, 0, 0, 0, 0, 0, 36.5, 0, 0, 0, 0, 0,
    ];
    // 脉搏
    let p_ls = [
        72, 0, 85, 90, 0, 95, 67, 78, 0, 88, 72, 80, 0, 92, 0, 74, 88, 82, 0, 65, 78, 0, 0, 70, 0,
        0, 90, 0, 86, 0, 77, 0, 84, 0, 91, 79, 0, 87, 0, 82, 0, 0,
    ];
    // 心率
    let hr_ls = [
        72, 0, 85, 90, 0, 95, 67, 78, 0, 88, 72, 80, 0, 92, 0, 74, 88, 82, 0, 65, 78, 0, 0, 70, 0,
        0, 90, 0, 86, 0, 77, 0, 84, 0, 91, 79, 0, 87, 0, 82, 0, 0,
    ];
    // 疼痛评分
    let pain_ls = [
        0, 0, 7, 0, 0, 3, 8, 0, 6, 0, 2, 0, 0, 5, 1, 0, 0, 4, 0, 9, 10, 0, 0, 0, 8, 0, 6, 0, 3, 0,
        0, 7, 0, 2, 0, 0, 4, 1, 0, 5,
    ];

    c = conf;
    // 换算成坐标
    bt_ls = bt_ls.map(val => {
        if (val) {
            return 51 * c.unit - ((val - 34) / 0.2) * c.unit;
        } else {
            return 0;
        }
    });
    drawDataLine(
        cvs,
        bt_ls,
        (p: Point) => {
            // 体温：画蓝色的叉
            // const cross_line_arr = cross(
            //     {
            //         x: p.x,
            //         y: p.y,
            //     },
            //     {
            //         stroke: 'blue',
            //         lineWidth: 2,
            //     },
            //     3
            // );
            // for (const line of cross_line_arr) {
            //     cvs.add(line);
            // }
            // 体温：画蓝色的圆
            cvs.add(
                circle(
                    {
                        x: p.x,
                        y: p.y,
                    },
                    4,
                    {
                        stroke: 'blue',
                        lineWidth: 1,
                        fill: 'blue',
                    }
                )
            );
        },
        'blue'
    );

    down_bt_ls = down_bt_ls.map(val => {
        if (val) {
            return 51 * c.unit - ((val - 34) / 0.2) * c.unit;
        } else {
            return 0;
        }
    });
    drawDownBt(cvs, down_bt_ls, bt_ls);
    drawPoint(cvs, down_bt_ls, (p: Point) => {
        cvs.add(
            circle(
                {
                    x: p.x,
                    y: p.y,
                },
                4,
                {
                    stroke: 'red',
                    lineWidth: 1,
                    fill: 'white',
                }
            )
        );
    });

    hr_ls = hr_ls.map(val => {
        if (val) {
            return 51 * c.unit - ((val - 20) / 5) * c.unit;
        } else {
            return 0;
        }
    });
    drawDataLine(
        cvs,
        hr_ls,
        (p: Point) => {
            cvs.add(
                circle(
                    {
                        x: p.x,
                        y: p.y,
                    },
                    4,
                    {
                        stroke: 'red',
                        lineWidth: 1,
                        fill: 'white',
                    }
                )
            );
        },
        'red'
    );

    p_ls = p_ls.map(val => {
        if (val) {
            return 51 * c.unit - ((val - 20) / 5) * c.unit;
        } else {
            return 0;
        }
    });
    drawDataLine(
        cvs,
        p_ls,
        (p: Point) => {
            cvs.add(
                circle(
                    {
                        x: p.x,
                        y: p.y,
                    },
                    3,
                    {
                        stroke: 'red',
                        lineWidth: 1,
                        fill: 'red',
                    }
                )
            );
        },
        'red'
    );
    // 疼痛评分
    pain_ls = pain_ls.map(val => {
        if (val) {
            return 11 * c.unit - (val / 2) * c.unit;
        } else {
            return 0;
        }
    });
    drawDataLine(
        cvs,
        pain_ls,
        (p: Point) => {
            cvs.add(
                circle(
                    {
                        x: p.x,
                        y: p.y,
                    },
                    4,
                    {
                        stroke: 'black',
                        lineWidth: 1,
                        fill: 'black',
                    }
                )
            );
        },
        'black'
    );
    // 画日期
    date_ls.forEach((date, index) => {
        const x = 6 * c.unit + index * (6 * c.unit) + c.unit;
        const y = (c.unit - font_size) / 2;
        cvs.add(text({ x: x, y: y }, date, { textFill: 'black', fontSize: font_size }));
    });
    // 画住院天数
    in_hosp_day_ls.forEach((day, index) => {
        const x = 6 * c.unit + index * (6 * c.unit) + c.unit * 2 + (2 * c.unit - font_size) / 2;
        const y = c.unit + (c.unit - font_size) / 2;
        cvs.add(text({ x: x, y: y }, day.toString(), { textFill: 'black', fontSize: font_size }));
    });
};

/** @description 脉搏和心率之间的阴影 */
const drawPHrShadow = (cvs: ZRenderType, p_ls: number[], hr_ls: number[]) => {
    var point_ls = [] as Point[];
    for (let index = 0; index < p_ls.length; index++) {
        const y_p = p_ls[index];
        const y_hr = hr_ls[index];
        const x = index * c.unit + 6 * c.unit + c.unit / 2;
        if (y_p !== 0 && y_hr !== 0) {
            point_ls.push({
                x: x,
                y: y_hr,
            });
            point_ls.push({
                x: x,
                y: y_p,
            });
        }
    }
    const _polygon = polygon(point_ls, {
        fill: 'rgba(235, 76, 153, 0.4)',
        stroke: 'red',
    });
    // _polygon.animate('shape', false).when(1000, { points: point_ls }).start();
    cvs.add(_polygon);
};

/** @description 物理降温 */
const drawDownBt = (cvs: ZRenderType, down_ls: number[], ls: number[]) => {
    for (let index = 0; index < down_ls.length; index++) {
        const val = down_ls[index];
        if (!val) {
            continue;
        }
        const x = index * c.unit + 6 * c.unit + c.unit / 2;
        const y = val;
        const p = {
            x: x,
            y: y,
        } as Point;
        const _line = line(
            {
                x: p.x,
                y: p.y,
            },
            {
                x: p.x,
                y: p.y,
            },
            {
                stroke: 'red',
                lineWidth: 1.5,
                lineDash: [4, 2],
            }
        );
        // 动画
        _line
            .animate('shape', false)
            .delay(index * 50)
            .when(50, {
                x2: p.x,
                y2: ls[index],
            })
            .start();
        cvs.add(_line);
    }
};

// 只是画点
const drawPoint = (cvs: ZRenderType, _ls: number[], drawFunc: Function) => {
    const point_ls = [] as Point[];
    _ls.forEach((val, index) => {
        if (!val) {
            return;
        }
        const x = 6 * c.unit + index * c.unit + c.unit / 2;
        const y = val;
        const p = {
            x: x,
            y: y,
        } as Point;
        drawFunc(p);
        point_ls.push(p);
    });
    return point_ls;
};

// 画数据折线
const drawDataLine = (cvs: ZRenderType, _ls: number[], drawFunc: Function, line_color: string) => {
    // 画点
    const point_ls = drawPoint(cvs, _ls, drawFunc);

    // 画线
    for (let index = 0; index < point_ls.length - 1; index++) {
        const p1 = point_ls[index];
        const p2 = point_ls[index + 1];
        const _line = line(
            {
                x: p1.x,
                y: p1.y,
            },
            {
                x: p1.x,
                y: p1.y,
            },
            {
                stroke: line_color,
                lineWidth: 1.5,
            }
        );
        // 动画
        _line
            .animate('shape', false)
            .delay(index * 50)
            .when(50, {
                x2: p2.x,
                y2: p2.y,
            })
            .start();
        cvs.add(_line);
    }
};
