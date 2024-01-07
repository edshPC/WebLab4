import UserInput from "./UserInput";
import ResultTable from "./ResultTable";
import Graph from "./Graph";

function MainApp(props) {
    const fetcher = props.fetcher;

    return (
        <table id="main-table">
            <tbody>
            <tr>
                <td colSpan="3" id="header">
                    <div className="container">
                        <p>Лабораторная работа #4</p>
                        <p>Выполнил Щербинин Эдуард P3214</p>
                        <p>Вариант 2464</p>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div className="container">
                        <UserInput fetcher={fetcher}/>
                    </div>
                </td>
                <td>
                    <div className="container rounded" id="graph-container">
                        <Graph fetcher={fetcher}/>
                    </div>
                </td>
                <td>
                    <div className="container">
                        <ResultTable results={fetcher.results}/>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    );
}

export default MainApp;
