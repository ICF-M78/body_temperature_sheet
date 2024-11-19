interface Point {
    // 时间 2、6、10、14、18、22
    time: number;
    value: number;
}

interface TmpData {
    // 顺序
    index: number;
    // 日期
    date: string;
    // 住院天数
    days: number;
    // 术后天数
    post_days: number | undefined;
    // 产后天数
    postpartum_days: number | undefined;
    // 疼痛
    painLs: Point[];
    // 脉搏
    pulseLs: Point[];
    // 体温
    temperatureLs: Point[];
    // 呼吸
    breathLs: Point[];
}

import Mock from 'mockjs';
export const tmpData: TmpData[] = Mock.mock({
    'array|10': [
        {
            'index|+1': 1,
            date: '@date("yyyy-MM-dd")',
            days: '@integer(1, 30)',
            post_days: '@integer(1, 30)',
            postpartum_days: '@integer(1, 30)',
            'painLs|6': [
                {
                    time: '@pick([2, 6, 10, 14, 18, 22])',
                    value: '@integer(1, 5)',
                },
            ],
            'pulseLs|6': [
                {
                    time: '@pick([2, 6, 10, 14, 18, 22])',
                    value: '@integer(60, 100)',
                },
            ],
            'temperatureLs|6': [
                {
                    time: '@pick([2, 6, 10, 14, 18, 22])',
                    value: '@float(36, 38, 1, 1)',
                },
            ],
            'breathLs|6': [
                {
                    time: '@pick([2, 6, 10, 14, 18, 22])',
                    value: '@integer(16, 24)',
                },
            ],
        },
    ],
}).array;
