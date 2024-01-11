export async function autoFetch(url, method, body) {
    let res = {success: false};
    try {
        let raw = await fetch(url, {
            method: method ? method : 'GET',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            credentials: 'include',
            body: body ? JSON.stringify(body) : undefined
        });
        res = await raw.json();
    } catch (e) {
        res.error = e;
    }

    if (!res.success) {
        alert('Error: ' + res.error);
    }
    console.log(res);
    return res;
}