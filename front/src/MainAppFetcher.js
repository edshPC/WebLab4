import {useState} from "react";
import MainApp from "./MainApp";

function MainAppFetcher() {

    const [x, setX] = useState();
    const [y, setY] = useState();
    const [r, setR] = useState();
    const [results, setResults] = useState([]);

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
        setResults([]);
    }

    async function checkHit(x, y) {
        if(x === undefined) return alert("X value is undefined");
        if(y === undefined || Number.isNaN(y)) return alert("Y value is undefined or incorrect");
        if(r === undefined) return alert("R value is undefined");

        let res;
        try {
            res = await fetch("");
            res = await res.json();
        } catch (e) {
            res.error = e;
        }

        res = {
            x, y, r, result: true, time: Date.now(), exectime: 1
        };

        if ('error' in res) return console.error(`Error in getting result: ${res.error}`);
        setResults([...results, res]);
    }

    return(<MainApp fetcher={{r, results, handleX, handleY, handleR, handleSubmit, handleClear, handleGraphClick}} />);

}

export default MainAppFetcher;