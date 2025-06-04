import type { ZRenderType } from 'zrender';
import { circle, cross, line, polygon, text } from '../draw-tools/index';
import { parseBtsData } from './parse-bts-data';

// config
let c = {} as BtsConf;
const font_size = 14;

// 绘制体温单数据图表
// @param cvs - zrender画布实例
// @param conf - 配置参数，包含单位长度等信息
// @param data - 体温单数据，包含7天的数据，每天6个时间段
export const drawData = (cvs: ZRenderType, conf: BtsConf, data: BtsData) => {
    c = conf;

    // 解析数据
    const {
        dateList,
        daysInHospital,
        temperatureList,
        physicalCoolingList,
        pulseList,
        heartRateList,
        painScoreList,
    } = parseBtsData(data);

    // 换算成坐标
    const temperatureXList = temperatureList.map(val => {
        if (val) {
            return 51 * c.unit - ((val - 34) / 0.2) * c.unit;
        } else {
            return 0;
        }
    });
    drawDataLine(
        cvs,
        temperatureXList,
        temperatureList,
        (p: Point, value: number) => {
            const cross_line_arr = cross(
                {
                    x: p.x,
                    y: p.y,
                },
                {
                    stroke: 'blue',
                    lineWidth: 3,
                },
                5,
                2,
                `体温：${value}℃`
            );
            for (const line of cross_line_arr) {
                cvs.add(line);
            }
        },
        'blue'
    );

    const physicalCoolingXList = physicalCoolingList.map(val => {
        if (val) {
            return 51 * c.unit - ((val - 34) / 0.2) * c.unit;
        } else {
            return 0;
        }
    });
    drawDownBt(cvs, physicalCoolingXList, temperatureXList);
    drawCenterFlag(cvs, physicalCoolingXList, physicalCoolingList, (p: Point) => {
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

    const hrXList = heartRateList.map(val => {
        if (val) {
            return 51 * c.unit - ((val - 20) / 5) * c.unit;
        } else {
            return 0;
        }
    });
    drawDataLine(
        cvs,
        hrXList,
        heartRateList,
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

    const pulseXList = pulseList.map(val => {
        if (val) {
            return 51 * c.unit - ((val - 20) / 5) * c.unit;
        } else {
            return 0;
        }
    });
    drawDataLine(
        cvs,
        pulseXList,
        pulseList,
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
    const painScoreXList = painScoreList.map(val => {
        if (val) {
            return 11 * c.unit - (val / 2) * c.unit;
        } else {
            return 0;
        }
    });
    drawDataLine(
        cvs,
        painScoreXList,
        painScoreList,
        (p: Point, value: number) => {
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
                    },
                    2,
                    `评分：${value}`
                )
            );
        },
        'black'
    );
    // 画日期
    dateList.forEach((date, index) => {
        const x = 6 * c.unit + index * (6 * c.unit) + c.unit;
        const y = (c.unit - font_size) / 2;
        cvs.add(text({ x: x, y: y }, date, { textFill: 'black', fontSize: font_size }));
    });
    // 画住院天数
    daysInHospital.forEach((day, index) => {
        const x = 6 * c.unit + index * (6 * c.unit) + c.unit * 2 + (2 * c.unit - font_size) / 2;
        const y = c.unit + (c.unit - font_size) / 2;
        cvs.add(text({ x: x, y: y }, day.toString(), { textFill: 'black', fontSize: font_size }));
    });
};

// 绘制脉搏和心率之间的阴影区域
// @param cvs - zrender画布实例
// @param p_ls - 脉搏数据数组（已转换为坐标值）
// @param hr_ls - 心率数据数组（已转换为坐标值）
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
    cvs.add(_polygon);
};

// 绘制物理降温连接线
// @param cvs - zrender画布实例
// @param down_ls - 物理降温数据数组（已转换为坐标值）
// @param ls - 体温数据数组（已转换为坐标值）
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

// 绘制数据点标志
// @param cvs - zrender画布实例
// @param _ls - 数据数组（已转换为坐标值）
// @param drawFunc - 绘制函数，用于自定义点的样式
// @returns 数据点坐标数组
const drawCenterFlag = (
    cvs: ZRenderType,
    xList: number[],
    valueList: number[],
    drawFunc: Function
) => {
    const point_ls = [] as Point[];
    xList.forEach((val, index) => {
        if (!val) {
            return;
        }
        const x = 6 * c.unit + index * c.unit + c.unit / 2;
        const y = val;
        const p = {
            x: x,
            y: y,
        } as Point;
        drawFunc(p, valueList[index]);
        point_ls.push(p);
    });
    return point_ls;
};

// 绘制数据折线
// @param cvs - zrender画布实例
// @param _ls - 数据数组（已转换为坐标值）
// @param drawFunc - 绘制函数，用于自定义点的样式
// @param line_color - 线条颜色
const drawDataLine = (
    cvs: ZRenderType,
    xList: number[],
    valueList: number[],
    drawFunc: Function,
    line_color: string
) => {
    // 画点
    const point_ls = drawCenterFlag(cvs, xList, valueList, drawFunc);

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
