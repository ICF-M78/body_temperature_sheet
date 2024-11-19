export async function post(api_url: string, params: Record<string, any>): Promise<any> {
    const base_url = import.meta.env.VITE_APP_BASE_URL;
    const url = base_url + api_url;
    const headers = {
        'visitor-id': '71065394-71FD-44CF-B90E-1D5B8CBB474C',
        'visitor-name': 'V360',
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('token') as string,
    };
    const options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params),
    };
    try {
        const res = await fetch(url, options);
        if (res.ok) {
            const data: Promise<any> = res.json();
            return data;
        } else {
            const data = await res.text();
            const error = new Error();
            error.message = data;
            if (res.status === 401) {
                error.name = '401';
                window.location.href = '/Error?msg=token 缺失';
            } else {
                error.name = res.status.toString();
            }
            throw error;
        }
    } catch (err: any) {
        console.error('http 异常切片 ', err.message);
        throw err;
    }
}
