import { post } from '../http/index';
import { tf } from '../../global';
import { ops_adv_type_map, ops_adv_flag_map } from "./map";

const url = '/run';

/** @description 获取账户信息 */
export const V360_GetAccInfo = (args: Record<string, any> = {}): Promise<AccInfo> => {
    args.api = 'V360_GetAccInfo';
    return post(url, args)
        .then(res => res.data)
        .then(ls => ls[0]);
};

/** @description 获取患者信息 */
export const V360_GetPtInfo = (args: Record<string, any> = {}): Promise<Record<string, any>[]> => {
    args.api = 'V360_GetPtInfo';
    return post(url, args)
        .then(res => res.data)
        .then(ls => ls[0]);
};

/** @description 获取住院信息 */
export const V360_GetIpsInfo = (args: Record<string, any> = {}): Promise<Record<string, any>[]> => {
    args.api = 'V360_GetIpsInfo';
    return post(url, args)
        .then(res => res.data)
        .then(ls => ls[0])
        .then(info => {
            if (info === undefined) {
                throw new Error('未找到住院信息');
            }
            // 入院日期
            info.FP25 = info.FP25 !== null ? tf(info.FP25).format('YYYY-MM-DD') : info.FP25;
            // 入院后确诊日期
            info.FP40 = info.FP40 !== null ? tf(info.FP40).format('YYYY-MM-DD') : info.FP40;
            // 出院日期
            info.FP31 = info.FP31 !== null ? tf(info.FP31).format('YYYY-MM-DD') : info.FP31;
            // 手术一 日期
            info.FP56 = info.FP56 !== null ? tf(info.FP56).format('YYYY-MM-DD') : info.FP56;
            // 手术二 日期
            info.FP63 = info.FP63 !== null ? tf(info.FP63).format('YYYY-MM-DD') : info.FP63;
            return info;
        });
};

/** @description 处理空 */
const isNull = (old_val: string | number | undefined | null, str: string | number) => {
    // 判断old_val为null或undefined
    if (old_val === null || old_val === undefined) {
        return str;
    } else {
        return old_val;
    }
};

/** @description 获取门诊信息 */
export const V360_GetOpsInfo = (args: Record<string, any> = {}): Promise<Record<string, any>[]> => {
    args.api = 'V360_GetOpsInfo';
    return post(url, args)
        .then(res => res.data)
        .then(ls => ls[0])
        .then(info => {
            info.Symptom_BPH = isNull(info.Symptom_BPH, '--');
            info.Symptom_BPL = isNull(info.Symptom_BPL, '--');
            // Symptom_P
            info.Symptom_P = isNull(info.Symptom_P, '--');
            // Symptom_R
            info.Symptom_R = isNull(info.Symptom_R, '--');
            //  Symptom_T
            info.Symptom_T = isNull(info.Symptom_T, '--');

            return info;
        });
};

/** @description 获取门诊治疗列表 */
export const V360_GetOpsTreatLs = (args: Record<string, any> = {}): Promise<TreatItem[]> => {
    args.api = 'V360_GetOpsTreatLs';
    return post(url, args).then(res => res.data);
};

/* @description 获取住院治疗列表 */
export const V360_GetIpsTreatLs = (args: Record<string, any> = {}): Promise<TreatItem[]> => {
    args.api = 'V360_GetIpsTreatLs';
    return post(url, args)
        .then(res => res.data)
        .then(ls => {
            ls.forEach((el: TreatItem) => {
                if (el.ips_id) {
                    // 转化为数字
                    el.ips_id = Number(el.ips_id);
                }
            });
            return ls;
        });
};

/** @description 获取过敏列表 */
export const V360_GetAllergyLs = (
    args: Record<string, any> = {}
): Promise<Record<string, any>[]> => {
    args.api = 'V360_GetAllergyLs';
    return post(url, args).then(res => res.data);
};

/** @description 获取手术列表 */
export const V360_GetOprLs = (args: Record<string, any> = {}): Promise<OprItem[]> => {
    args.api = 'V360_GetOprLs';
    return post(url, args).then(res => res.data);
};

/** @description 获取门诊医嘱 */
export const V360_Advice_Ops = (args: Record<string, any> = {}): Promise<OpsAdv[]> => {
    args.api = 'V360_Advice_Ops';
    return post(url, args)
        .then(res => res.data)
        .then((ls: Old_OpsAdvDrug[]) => {
            ls.forEach(el => {
                if (el.mi_cooperative_flag && el.mi_cooperative_flag === '1') {
                    el.mi_cooperative_flag = '可报';
                }
                el.rx_type = el.rx_type ? el.rx_type.toString() : '0';
                el.rx_flag = el.rx_flag ? el.rx_flag.toString() : '1';
                el.rx_type_name = ops_adv_type_map.get(el.rx_type);
                el.rx_flag_name = ops_adv_flag_map.get(el.rx_flag);
            });
            return ls;
        })
        .then(ls => {
            const _grp = ls.reduce(
                (acc: Record<string, Old_OpsAdvDrug[]>, cur: Old_OpsAdvDrug) => {
                    if (!acc[cur.rx_id as string]) {
                        acc[cur.rx_id] = [];
                    }
                    acc[cur.rx_id].push(cur);
                    return acc;
                },
                {} as Record<string, Old_OpsAdvDrug[]>
            );

            const ops_adv_ls = [] as OpsAdv[];
            for (const key in _grp) {
                const _old = _grp[key][0];
                const _ops_adv = {} as OpsAdv;
                _ops_adv.rx_id = key;
                _ops_adv.inv_id = _old.inv_id;
                _ops_adv.inv_time = _old.inv_time;
                _ops_adv.ph_id = _old.ph_id;
                _ops_adv.ph_name = _old.ph_name;
                _ops_adv.pt_wt = _old.pt_wt;
                _ops_adv.rx_crt_time = _old.rx_crt_time;
                _ops_adv.rx_flag = _old.rx_flag;
                _ops_adv.rx_flag_name = _old.rx_flag_name;
                _ops_adv.rx_ttl_costs = _old.rx_ttl_costs;
                _ops_adv.rx_type = _old.rx_type;
                _ops_adv.rx_type_name = _old.rx_type_name;
                _ops_adv.toll_collector = _old.toll_collector;
                _ops_adv.dept_id = _old.dept_id;
                _ops_adv.dept_name = _old.dept_name;
                _ops_adv.doc_id = _old.doc_id;
                _ops_adv.doc_name = _old.doc_name;
                _ops_adv.drug_ls = _grp[key];
                ops_adv_ls.push(_ops_adv as OpsAdv);
            }
            ops_adv_ls.sort((a, b) => {
                return new Date(b.inv_time).getTime() - new Date(a.inv_time).getTime();
            });
            return ops_adv_ls;
        });
};

/** @description 住院节点 */
export const V360_IpsNodeLs = (args: Record<string, any> = {}): Promise<IpsNode[]> => {
    args.api = 'V360_IpsNodeLs';
    return post(url, args)
        .then(res => res.data)
        .then(ls => {
            let _ls = [];
            if (ls.length > 0) {
                for (let i = 0; i < ls.length - 1; i++) {
                    let n0 = ls[i];
                    let n1 = ls[i + 1];
                    _ls.push({
                        dept_id: n0.dept_id,
                        dept_name: n0.dept_name,
                        time: n0.time.substring(0, 10) + ' 到 ' + n1.time.substring(0, 10),
                        adv_id: n1.adv_id,
                    } as IpsNode);
                }
                if (ls[ls.length - 1].dept_id == null) {
                    _ls[_ls.length - 1].time = _ls[_ls.length - 1].time + ' 未出院';
                } else {
                    _ls[_ls.length - 1].time = _ls[_ls.length - 1].time + ' 已出院';
                }
            }
            // 逆序
            return _ls.reverse();
        });
};

/** @description 获取住院医嘱 */
export const V360_Advice_Ips = (args: Record<string, any> = {}): Promise<IpsAdv[]> => {
    args.api = 'V360_Advice_Ips';
    return post(url, args)
        .then(res => res.data)
        .then(ls => {
            const _ls = ls.map((el: Record<string, any>) => {
                return {
                    beg_time: el.yzbegdate
                        ? tf(el.yzbegdate).format('YYYY-MM-DD HH:mm')
                        : undefined,
                    adv_proj_name: el.xmname,
                    each_dose: el.ypjl,
                    each_dose_unit: el.ypjlunit,
                    each_count: el.xmcount,
                    drug_use_way: el.yzusedmethod,
                    drug_use_path: el.yppath,
                    speed: el.dspermin,
                    price: el.price,
                    count: el.totcount,
                    exp: el.note,
                    is_amr: el.kjsflag,
                    end_time: el.yzstopdate
                        ? tf(el.yzstopdate).format('YYYY-MM-DD HH:mm')
                        : undefined,
                    last_run_time: el.yzlastrundate
                        ? tf(el.yzlastrundate).format('YYYY-MM-DD HH:mm')
                        : undefined,

                    chk_rn_name: el.yzcheckhsname ? el.yzcheckhsname.trim() : undefined,
                    run_rn_name: el.yzrunhsname ? el.yzrunhsname.trim() : undefined,
                    stop_rn_name: el.yzstophsname ? el.yzstophsname.trim() : undefined,

                    crt_doc_name: el.yzysname ? el.yzysname.trim() : undefined,
                    stop_doc_name: el.yzstopysname ? el.yzstopysname.trim() : undefined,
                    is_grp: el.xmname.includes('┗') || el.xmname.includes('┃'),
                };
            });
            return _ls;
        });
};

/** @description 获取树结构 */
export const V360_Mr_GetTreeStruct = (args: Record<string, any> = {}): Promise<TreeItem[]> => {
    args.api = 'V360_Mr_GetTreeStruct';
    return post(url, args).then(res => res.data);
};

/** @description 获取病历列表 */
export const V360_Mr_GetMrLs = (args: Record<string, any> = {}): Promise<Record<string, any>[]> => {
    args.api = 'V360_Mr_GetMrLs';
    return post(url, args).then(res => res.data);
};

/** @description 获取病历 */
export const V360_Mr_GetMr = (args: Record<string, any> = {}): Promise<Mr> => {
    args.api = 'V360_Mr_GetMr';
    return post(url, args)
        .then(res => res.data)
        .then(ls => {
            const _mr = ls[0];
            if (_mr) {
                let is_new = false;
                if (_mr.mr_file_opr_time && _mr.pdf_crt_time) {
                    is_new =
                        new Date(_mr.pdf_crt_time).getTime() >
                        new Date(_mr.mr_file_opr_time).getTime();
                }

                return {
                    id: _mr.id,
                    ips_id: _mr.ips_id,
                    name: _mr.name,
                    is_new: is_new,
                    pdf_path: _mr.pdf_path,
                    state: _mr.state,
                    cont: _mr.content,
                };
            } else {
                throw new Error('未找到病历信息');
            }
        });
};

/** @description 获取病历的PDF */
export const V360_Mr_GetMrPdf = async (args: Record<string, any> = {}): Promise<string> => {
    const base_url = import.meta.env.VITE_APP_BASE_URL;
    const url = base_url + '/V360/GetMrPdf';
    let res;
    try {
        res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(args),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    catch (err: any) {
        throw new Error(`获取PDF失败 ${err.message}`);
    }

    if (res && res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        return url;
    }
    else {
        throw new Error('获取PDF失败 res.ok=false');
    }
};
