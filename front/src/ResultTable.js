function ResultTable(props) {
    const results = props.results;
    const rendered = results.map((res, i) =>
        <tr key={i}>
            <td>{res.x}</td>
            <td>{res.y}</td>
            <td>{res.r}</td>
            <td>{res.result ? "Попал!" : "Промазал :("}</td>
            <td>{new Date(res.time).toLocaleTimeString()}</td>
            <td>{`${res.exectime}mks`}</td>
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