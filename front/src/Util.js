export async function autoFetch(url, method, body, disableAlert) {
    let res = {success: false};
    try {
        let raw = await fetch('/WebLab4/api/' + url, {
            method: method ? method : 'GET',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            credentials: 'include',
            body: body ? JSON.stringify(body) : undefined
        });
        res = await raw.json();
    } catch (e) {
        res.error = e;
    }

    if (!res.success && !disableAlert) {
        alert('Error: ' + res.error);
    }
    console.log(res);
    return res;
}