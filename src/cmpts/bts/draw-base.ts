import type { ZRenderType } from 'zrender';
import { initCvs, line, text } from './draw-tools';

// config
let c = {} as BtsConf;

/** @description 画横线 */
const drawHorizontalLine = (cvs: ZRenderType) => {
    // 画布宽高
    const cvs_w = cvs.dom!.clientWidth;
    for (let index = 0; index < c.y_count; index++) {
        // TODO 辅助文字
        cvs.add(
            text({ x: 0, y: c.unit * index }, index.toString(), {
                textFill: 'green',
                fontSize: 6,
            })
        );
        const y = c.unit * index;
        const x2 = cvs_w;
        if (index < 5) {
            const _line = line(
                { x: 0, y },
                { x: 0, y },
                {
                    stroke: 'black',
                    lineWidth: c.line_w,
                }
            );
            cvs.add(_line);
            _line
                .animate('shape', false)
                .delay(500)
                .when(1000, {
                    x2: x2,
                    y2: y,
                })
                .start();
            continue;
        }
        // 疼痛评分
        if (index === 9) {
            const _line = line(
                { x: c.unit * 6, y },
                { x: c.unit * 6, y },
                {
                    stroke: 'black',
                    lineWidth: c.line_bold_w,
                }
            );
            cvs.add(_line);
            _line
                .animate('shape', false)
                .when(1000, {
                    x2: x2,
                    y2: y,
                })
                .start();
            continue;
        }
        if (index === 6 || index === 11 || index === 53 || index === 55) {
            const _line = line(
                { x: 0, y },
                { x: 0, y },
                {
                    stroke: 'black',
                    lineWidth: c.line_bold_w,
                }
            );
            cvs.add(_line);
            _line
                .animate('shape', false)
                .when(1000, {
                    x2: x2,
                    y2: y,
                })
                .start();
            continue;
        }
        if ((index - 6) % 5 === 0 && index < 55) {
            const _line = line(
                { x: c.unit * 6, y },
                { x: c.unit * 6, y },
                {
                    stroke: 'black',
                    lineWidth: c.line_bold_w,
                }
            );
            cvs.add(_line);
            _line
                .animate('shape', false)
                .when(1000, {
                    x2: cvs_w,
                    y2: y,
                })
                .start();
            continue;
        } else {
            // 呼吸次数 中间的线
            if (index === 54) {
                continue;
            }
            if (index > 55) {
                const _line = line(
                    { x: 0, y },
                    { x: 0, y },
                    {
                        stroke: 'black',
                        lineWidth: c.line_w,
                    }
                );
                cvs.add(_line);
                _line
                    .animate('shape', false)
                    .when(1000, {
                        x2: cvs_w,
                        y2: y,
                    })
                    .start();
            } else {
                const _line = line(
                    { x: c.unit * 6, y },
                    { x: c.unit * 6, y },
                    {
                        stroke: 'black',
                        lineWidth: c.line_w,
                    }
                );
                cvs.add(_line);
                _line
                    .animate('shape', false)
                    .delay(500)
                    .when(1000, {
                        x2: cvs_w,
                        y2: y,
                    })
                    .start();
            }
        }
    }

    // 横线 疼痛阈值
    const pain_line = line(
        { x: c.unit * 6, y: c.unit * 7.5 },
        { x: c.unit * 6, y: c.unit * 7.5 },
        {
            stroke: 'red',
            lineWidth: c.line_bold_w,
        }
    );
    pain_line
        .animate('shape', false)
        .when(1000, {
            x2: cvs_w,
            y2: c.unit * 7.5,
        })
        .start();
    cvs.add(pain_line);

    // 横线 发烧阈值
    const fever_line = line(
        { x: c.unit * 6, y: c.unit * 36 },
        { x: c.unit * 6, y: c.unit * 36 },
        {
            stroke: 'red',
            lineWidth: c.line_bold_w,
        }
    );
    fever_line
        .animate('shape', false)
        .when(1000, {
            x2: cvs_w,
            y2: c.unit * 36,
        })
        .start();
    cvs.add(fever_line);
};

/** @description 画竖线 */
const drawVerticalLine = (cvs: ZRenderType) => {
    // 画布宽高
    const cvs_h = cvs.dom!.clientHeight;
    for (let index = 0; index < c.x_count; index++) {
        // TODO 辅助文字
        cvs.add(
            text({ x: c.unit * index, y: 0 }, index.toString(), {
                textFill: 'green',
                fontSize: 6,
            })
        );

        if (index < 6) {
            continue;
        }
        const x = c.unit * index;
        let y1 = c.unit * 5;
        let y2 = cvs_h;
        let _line_w = c.line_w;
        let color = 'black';
        if (index % 6 === 0) {
            y1 = 0;
            _line_w = c.line_w;
            if (index === 6) {
                color = 'black';
            } else {
                color = 'red';
            }
        } else {
            if (index % 3 === 0) {
                y1 = y1 - c.unit;
            }
            y2 = y2 - c.unit * 9;
        }
        const _line = line(
            { x, y: y1 },
            { x, y: y1 },
            {
                stroke: color,
                lineWidth: _line_w,
            }
        );
        cvs.add(_line);
        if (index % 6 === 0) {
            _line
                .animate('shape', false)
                .when(1000, {
                    x2: x,
                    y2: y2,
                })
                .start();
        } else {
            _line
                .animate('shape', false)
                .delay(500)
                .when(1000, {
                    x2: x,
                    y2: y2,
                })
                .start();
        }
    }
};

/** @description 写基本的字 */
const drawText = (cvs: ZRenderType) => {
    const font_size = 14;
    const top = (c.unit - font_size) / 2;
    const txt_ls = [
        text({ x: c.unit, y: top }, '日期', { textFill: 'black', fontSize: font_size }),
        text({ x: c.unit, y: top + c.unit }, '住院天数', {
            textFill: 'black',
            fontSize: font_size,
        }),
        text({ x: c.unit, y: top + c.unit * 2 }, '术后天数', {
            textFill: 'black',
            fontSize: font_size,
        }),
        text({ x: c.unit, y: top + c.unit * 3 }, '产后天数', {
            textFill: 'black',
            fontSize: font_size,
        }),
        text({ x: c.unit, y: c.unit * 5 - font_size / 2 }, '时间', {
            textFill: 'black',
            fontSize: font_size,
        }),
    ];
    // 上午 下午
    for (let index = 0; index < 7; index++) {
        txt_ls.push(
            text({ x: c.unit * 7 + index * 6 * c.unit, y: top + c.unit * 4 }, '上午', {
                textFill: 'black',
                fontSize: font_size,
            })
        );
        txt_ls.push(
            text({ x: c.unit * 10 + index * 6 * c.unit, y: top + c.unit * 4 }, '下午', {
                textFill: 'black',
                fontSize: font_size,
            })
        );
        // 2、6、10、14、18、22
        const _arr = [2, 6, 10, 14, 18, 22];
        for (let a = 0; a < 6; a++) {
            const time_val = _arr[a];
            let x = c.unit * 6 + index * 6 * c.unit + a * c.unit;
            if (a === 0 || a === 1) {
                x = x + 5;
            } else if (a !== 5) {
                x = x + 3;
            } else {
                x = x + 1.5;
            }
            let font_color = 'black';
            if ([2, 18, 22].includes(time_val)) {
                font_color = 'red';
            }
            txt_ls.push(
                text({ x: x, y: top + c.unit * 5 }, time_val.toString(), {
                    textFill: font_color,
                    fontSize: font_size,
                })
            );
        }
    }

    txt_ls.push(
        text({ x: c.unit, y: top + c.unit * 8 }, '疼痛评分', {
            textFill: 'black',
            fontSize: font_size,
        })
    );

    txt_ls.push(
        text({ x: c.unit * 5, y: top + c.unit * 7 }, '7', {
            textFill: 'black',
            fontSize: font_size,
        })
    );
    txt_ls.push(
        text({ x: c.unit * 5, y: c.unit * 9 - font_size / 2 }, '4', {
            textFill: 'black',
            fontSize: font_size,
        })
    );

    txt_ls.push(
        text({ x: c.unit, y: top + c.unit * 11 }, '180', {
            textFill: 'black',
            fontSize: font_size,
        })
    );
    txt_ls.push(
        text({ x: c.unit * 3, y: top + c.unit * 11 }, '42℃', {
            textFill: 'black',
            fontSize: font_size,
        })
    );
    txt_ls.push(
        text({ x: c.unit, y: top + c.unit * 12 }, '脉搏', {
            textFill: 'black',
            fontSize: font_size,
        })
    );

    txt_ls.push(
        text({ x: c.unit * 3, y: top + c.unit * 12 }, '体温', {
            textFill: 'black',
            fontSize: font_size,
        })
    );
    //

    for (let index = 0; index < 8; index++) {
        const y = 16 * c.unit + index * 5 * c.unit - font_size / 2;
        const p = 160 - index * 20;
        const bt = 41 - index * 1;
        txt_ls.push(
            text({ x: c.unit, y: y }, p.toString(), {
                textFill: 'black',
                fontSize: font_size,
            })
        );
        txt_ls.push(
            text({ x: c.unit * 3, y: y }, bt + '℃', {
                textFill: 'black',
                fontSize: font_size,
            })
        );
    }

    txt_ls.push(
        text({ x: c.unit, y: c.unit * 54 - font_size / 2 }, '呼吸', {
            textFill: 'black',
            fontSize: font_size,
        })
    );
    for (const txt of txt_ls) {
        txt.style.opacity = 0;
        cvs.add(txt);
        txt.animate('style', false)
            .delay(1500)
            .when(500, {
                opacity: 1,
            })
            .start();
    }
};

/** @description 画边框 */
const drawBorder = (cvs: ZRenderType) => {
    const cvs_w = cvs.dom!.clientWidth;
    const cvs_h = cvs.dom!.clientHeight;
    let line1 = line(
        {
            x: 0,
            y: 0,
        },
        {
            x: 0,
            y: 0,
        },
        {
            stroke: 'black',
            lineWidth: c.line_bold_w * 2,
        }
    );
    cvs.add(line1);
    line1
        .animate('shape', false)
        .when(500, {
            x2: cvs_w,
            y2: 0,
        })
        .start();

    let line2 = line(
        {
            x: cvs_w,
            y: 0,
        },
        {
            x: cvs_w,
            y: 0,
        },
        {
            stroke: 'black',
            lineWidth: c.line_bold_w * 2,
        }
    );
    cvs.add(line2);
    line2
        .animate('shape', false)
        .delay(500)
        .when(500, {
            x2: cvs_w,
            y2: cvs_h,
        })
        .start();
    let line3 = line(
        {
            x: cvs_w,
            y: cvs_h,
        },
        {
            x: cvs_w,
            y: cvs_h,
        },
        {
            stroke: 'black',
            lineWidth: c.line_bold_w * 2,
        }
    );
    cvs.add(line3);
    line3
        .animate('shape', false)
        .delay(1000)
        .when(500, {
            x2: 0,
            y2: cvs_h,
        })
        .start();

    let line4 = line(
        {
            x: 0,
            y: cvs_h,
        },
        {
            x: 0,
            y: cvs_h,
        },
        {
            stroke: 'black',
            lineWidth: c.line_bold_w * 2,
        }
    );
    cvs.add(line4);
    line4
        .animate('shape', false)
        .delay(1500)
        .when(500, {
            x2: 0,
            y2: 0,
        })
        .start();
};

/** @description 基础描绘 */
export const drawBase = (cvs_ref: HTMLCanvasElement, conf: BtsConf) => {
    c = conf;
    // 初始画布
    const cvs = initCvs(cvs_ref);
    // 画布宽高
    const cvs_w = cvs.dom!.clientWidth;
    // 单元长度（正方形）
    c.unit = cvs_w / c.x_count;

    // 竖线
    drawVerticalLine(cvs);

    // 横线
    drawHorizontalLine(cvs);

    // 写字
    drawText(cvs);

    // 画边框
    drawBorder(cvs);

    return cvs;
};
