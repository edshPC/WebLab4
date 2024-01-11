import {useState} from "react";
import MainApp from "./MainApp";
import {Navigate, useLoaderData} from "react-router-dom";
import {autoFetch} from "../Util";

function MainAppFetcher() {
    let [redirect, redirectTo] = useState();

    const loaded = useLoaderData();
    if(!loaded.success && !loaded.login) redirect = '/';
    const login = loaded.login;

    const [x, setX] = useState();
    const [y, setY] = useState();
    const [r, setR] = useState();
    const [results, setResults] = useState(loaded.data);

    function handleX(ev) {
        setX(+ev.target.value);
    }

    function handleY(ev) {
        setY(+ev.target.value);
    }

    function handleR(ev) {
        setR(+ev.target.value);
    }

    function handleSubmit() {
        checkHit(x, y);
    }

    function handleGraphClick(ev) {
        checkHit(+ev.x, +ev.y);
    }

    function handleClear() {
        autoFetch('http://localhost:24770/WebLab4/api/clear')
            .then(res => {
                if (res.success) setResults([]);
                else if (!res.login) redirectTo('/');
            });
    }

    function handleLogout() {
        autoFetch('http://localhost:24770/WebLab4/api/auth/logout', 'POST')
            .then(res => {
                if (!res.login) redirectTo('/');
            });
    }

    async function checkHit(x, y) {
        if (x === undefined) return alert("X value is undefined");
        if (y === undefined || Number.isNaN(y)) return alert("Y value is undefined or incorrect");
        if (r === undefined) return alert("R value is undefined");

        let res = await autoFetch('http://localhost:24770/WebLab4/api/check',
            'POST', {x, y, r});

        if (res.success) setResults([...results, res.data]);
        else if (!res.login) redirectTo('/');
    }

    if (redirect) return (<Navigate to={`..${redirect}`} relative/>)

    return (<MainApp fetcher={{r, results, handleX, handleY, handleR, handleSubmit, handleClear, handleGraphClick, handleLogout, login}}/>);

}

export async function LoadResults() {
    return await autoFetch('http://localhost:24770/WebLab4/api/results');
}

export default MainAppFetcher;