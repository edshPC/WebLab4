import {useEffect} from "react";

function ResultTable({results}) {

    useEffect(() => {
        const table = document.getElementById("result-table");
        table.scrollTo(0, table.scrollHeight);
    }, [results]);

    const rendered = results.map((res, i) =>
        <tr key={i} className={i===results.length-1 ? res.result ? 'last-row-hit' : 'last-row-miss' : ''}>
            <td>{res.x}</td>
            <td>{res.y}</td>
            <td>{res.r}</td>
            <td>{res.result ? "Попал!" : "Промазал :("}</td>
            <td>{new Date(res.dateTime).toLocaleTimeString()}</td>
            <td>{`${res.execTime} mks`}</td>
        </tr>
    );

    return (
        <table id="result-table">
            <thead>
            <tr id="first-row" className="last-row-hit">
                <td>X</td>
                <td>Y</td>
                <td>R</td>
                <td>Результат</td>
                <td>Время</td>
                <td>Время вычисления</td>
            </tr>
            </thead>
            <tbody>
            {rendered}
            </tbody>
        </table>
    );
}

export default ResultTable;