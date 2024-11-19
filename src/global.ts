/** 配置文件 */
export const useConfig = (): Record<string, string> => {
    const config_str: string = window.sessionStorage.getItem('config') as string;
    return JSON.parse(config_str);
};
