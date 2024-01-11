import LoginApp from "./LoginApp";
import {useState} from "react";
import {Navigate, useLoaderData} from 'react-router-dom';
import {autoFetch} from "../Util";

function LoginAppFetcher(props) {
    let [redirect, redirectTo] = useState();
    const loaded = useLoaderData();
    if(loaded.success) redirect = '/main';

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    function loginChangeHandle(ev) {setLogin(ev.target.value)}
    function passwordChangeHandle(ev) {setPassword(ev.target.value)}

    function loginHandle() {
        if(!login || !password) return;
        autoFetch('auth/login', 'POST', {login, password})
            .then(res => {
                if(res.success) redirectTo('/main');
            });
    }

    function registerHandle() {
        if(!login || !password) return;
        autoFetch('auth/register', 'POST', {login, password})
            .then(res => {
                if(res.success) redirectTo('/main');
            });
    }

    if(redirect) return (<Navigate to={`.${redirect}`} relative/>);

    return (<LoginApp fetcher={{loginChangeHandle, passwordChangeHandle, loginHandle, registerHandle}}/>);
}

export default LoginAppFetcher;

export async function getLogin() {
    return await autoFetch('auth', 'GET', undefined, true);
}
