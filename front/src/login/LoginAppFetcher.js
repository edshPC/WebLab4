import LoginApp from "./LoginApp";
import {useEffect, useState} from "react";
import {Navigate} from 'react-router-dom';
import {autoFetch} from "../Util";

function LoginAppFetcher(props) {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, redirectTo] = useState();

    function loginChangeHandle(ev) {setLogin(ev.target.value)}
    function passwordChangeHandle(ev) {setPassword(ev.target.value)}

    function loginHandle() {
        if(!login || !password) return;
        autoFetch('http://localhost:24770/WebLab4/api/auth/login', 'POST', {login, password})
            .then(res => {
                if(res.login) redirectTo('/main');
            });
    }

    function registerHandle() {
        if(!login || !password) return;
        autoFetch('http://localhost:24770/WebLab4/api/auth/register', 'POST', {login, password})
            .then(res => {
                if(res.login) redirectTo('/main');
            });
    }

    if(redirect) return (<Navigate to={redirect} replace/>);

    return (<LoginApp fetcher={{loginChangeHandle, passwordChangeHandle, loginHandle, registerHandle}}/>);
}

export default LoginAppFetcher;