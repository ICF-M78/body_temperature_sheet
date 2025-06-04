declare class Point {
    x: number;
    y: number;
}

// 体温单基本配置
interface BtsConf {
    title: string;
    // 线的宽度
    lineWidth: number;
    // 粗线
    lineBold: number;
    // x轴
    x_count: number;
    // y轴
    y_count: number;
    unit: number;
    // zrender实例
    cvs: ZRenderType | undefined;
}

// 数据接口定义
interface VitalSigns {
    // 体温
    temperature: number;
    // 物理降温
    physicalCooling: number;
    // 脉搏
    pulse: number;
    // 心率
    heartRate: number;
    // 疼痛评分
    painScore: number;
}

interface TimeSlot {
    // 时间段（如："02:00"）
    time: string;
    data: VitalSigns;
}

interface DayData {
    // 日期（如："2024-01-02"）
    date: string;
    // 住院天数
    dayInHospital: number;
    // 时间段数据
    timeSlots: TimeSlot[];
}

interface BtsData {
    // 7天的数据
    days: DayData[];
}
