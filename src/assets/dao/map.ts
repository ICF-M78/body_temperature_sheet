/** 处方类型 */
export const ops_adv_type_map = new Map<string, string>();
ops_adv_type_map.set('0', '普通处方');
ops_adv_type_map.set('1', '急诊处方');
ops_adv_type_map.set('2', '儿科处方');
ops_adv_type_map.set('3', '第二类精神');
ops_adv_type_map.set('4', '第一类精神');
ops_adv_type_map.set('5', '特殊疾病(门诊大病)');
ops_adv_type_map.set('6', '慢性病门诊');
ops_adv_type_map.set('7', '毒麻');

/** 处方标志 */
export const ops_adv_flag_map = new Map<string, string>();
ops_adv_flag_map.set('1', '西药（成药）处方');
ops_adv_flag_map.set('2', '草药处方');