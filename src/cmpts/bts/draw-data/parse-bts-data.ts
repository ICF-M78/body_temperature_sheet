// 解析体温单数据为绘图所需格式
// @param data - 体温单原始数据，包含7天的数据，每天6个时间段
// @returns 解析后的数据对象，包含：
//   - dates: 日期数组
//   - daysInHospital: 住院天数数组
//   - temperatures: 体温数据数组
//   - physicalCoolings: 物理降温数据数组
//   - pulses: 脉搏数据数组
//   - heartRates: 心率数据数组
//   - painScores: 疼痛评分数据数组
export function parseBtsData(data: BtsData): {
    dateList: string[];
    daysInHospital: number[];
    temperatureList: number[];
    physicalCoolingList: number[];
    pulseList: number[];
    heartRateList: number[];
    painScoreList: number[];
} {
    const result = {
        dateList: [] as string[],
        daysInHospital: [] as number[],
        temperatureList: [] as number[],
        physicalCoolingList: [] as number[],
        pulseList: [] as number[],
        heartRateList: [] as number[],
        painScoreList: [] as number[],
    };

    // 遍历每一天的数据
    data.days.forEach(day => {
        result.daysInHospital.push(day.dayInHospital);
        // 遍历每个时间段的数据
        day.timeSlots.forEach(slot => {
            // 体温 42-34
            if (slot.data.temperature >= 34 && slot.data.temperature <= 42) {
                result.temperatureList.push(slot.data.temperature);
            } else {
                result.temperatureList.push(0);
            }
            // 疼痛评分 0-10

            result.painScoreList.push(slot.data.painScore);

            result.physicalCoolingList.push(slot.data.physicalCooling);
            result.pulseList.push(slot.data.pulse);
            result.heartRateList.push(slot.data.heartRate);
        });
    });

    return result;
}
