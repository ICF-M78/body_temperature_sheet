import Mock from 'mockjs';

// 生成时间段数据
const generateTimeSlot = (): TimeSlot => {
    // 随机决定是否生成数据（80%的概率生成实际数据）
    const shouldGenerateData = Mock.Random.boolean(0.9, 0.1, true);

    return {
        time: Mock.Random.time('HH:mm'),
        // data: {
        //     temperature: shouldGenerateData ? Mock.Random.float(34, 42, 1, 1) : 0,
        //     physicalCooling: shouldGenerateData ? Mock.Random.float(34, 42, 1, 1) : 0,
        //     pulse: shouldGenerateData ? Mock.Random.integer(20, 200) : 0,
        //     heartRate: shouldGenerateData ? Mock.Random.integer(20, 200) : 0,
        //     painScore: shouldGenerateData ? Mock.Random.integer(0, 10) : 0,
        // },
        data: {
            temperature: shouldGenerateData ? Mock.Random.float(34, 42, 1, 1) : 0,
            painScore: shouldGenerateData ? Mock.Random.integer(0, 10) : 0,
            physicalCooling: 0,
            pulse: 0,
            heartRate: 0,
        },
    };
};

// 生成一天的数据
const generateDayData = (date: string, dayInHospital: number): DayData => {
    return {
        date,
        dayInHospital,
        timeSlots: Array(6)
            .fill(null)
            .map(() => generateTimeSlot()),
    };
};

// 生成7天的数据
const generateBtsData = (): BtsData => {
    const days: DayData[] = [];
    const startDate = new Date();

    for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        days.push(generateDayData(date.toISOString().split('T')[0], i + 1));
    }

    return { days };
};

export const btsData: BtsData = generateBtsData();
