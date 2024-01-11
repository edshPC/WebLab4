import UserInput from "./UserInput";
import ResultTable from "./ResultTable";
import Graph from "./Graph";

function MainApp({fetcher, mode}) {
    let blocksPerRow = [3, 2];
    if (mode.isTablet) blocksPerRow = [2, 1, 2]
    if (mode.isMobile) blocksPerRow = [1, 1, 1, 1, 1];

    const blocks = [
        <div className="container">
            <UserInput fetcher={fetcher}/>
        </div>,

        <div className="container rounded" id="graph-container">
            <Graph fetcher={fetcher}/>
        </div>,

        <div className="container">
            <ResultTable results={fetcher.results}/>
        </div>,

        <div className="container">
            <p>Logged as:</p>
            <p>{fetcher.login}</p>
        </div>,

        <button className="box rounded redirect" onClick={fetcher.handleLogout}>Выйти</button>
    ];

    let sorted = [];
    let blockIndex = 0;
    for (let raw of blocksPerRow) {
        let adder = [];
        for (let j = 0; j < raw; j++) {
            adder.push(blocks[blockIndex++]);
        }
        sorted.push(adder);
    }

    return (
        <div id="main-table">
            {sorted.map((row, i) =>
                <div key={i}  className="row-like">
                    {row.map((elem, j) =>
                        <div key={j} colSpan={j === row.length-1? 5 : 1}  className="cell-like">
                            {elem}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default MainApp;
