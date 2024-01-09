import {useState} from "react";
import MainApp from "./MainApp";
import {useLoaderData} from "react-router-dom";

function MainAppFetcher() {

    const [x, setX] = useState();
    const [y, setY] = useState();
    const [r, setR] = useState();
    const [results, setResults] = useState(useLoaderData());

    function handleX(ev) {
        setX(+ev.target.value);
    }

    function handleY(ev) {
        setY(+ev.target.value);
    }

    function handleR(ev) {
        setR(+ev.target.value);
    }

    function handleSubmit(ev) {
        checkHit(x, y);
    }

    function handleGraphClick(ev) {
        checkHit(+ev.x, +ev.y);
    }

    function handleClear(ev) {
        fetch('http://localhost:24770/WebLab4/api/clear')
            .then(r => r.json())
            .then(r => {
                if(r) setResults([]);
            }).catch(console.error);
    }

    async function checkHit(x, y) {
        if (x === undefined) return alert("X value is undefined");
        if (y === undefined || Number.isNaN(y)) return alert("Y value is undefined or incorrect");
        if (r === undefined) return alert("R value is undefined");

        let res = {};
        try {
            let raw = await fetch('http://localhost:24770/WebLab4/api/check', {
                method: 'POST',
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify({x, y, r})
            });
            res = await raw.json();
        } catch (e) {
            res.error = e;
        }

        if ('error' in res) return console.error(`Error in getting result: ${res.error}`);
        setResults([...results, res]);
    }

    return (<MainApp fetcher={{r, results, handleX, handleY, handleR, handleSubmit, handleClear, handleGraphClick}}/>);

}

export async function LoadResults() {
    let res = [];

    try {
        let raw = await fetch('http://localhost:24770/WebLab4/api/results');
        res = await raw.json();
    } catch (e) {console.error(e)}

    return res;
}

export default MainAppFetcher;