import UserInput from "./UserInput";
import ResultTable from "./ResultTable";
import Graph from "./Graph";

function MainApp({fetcher}) {

    return (
        <table id="main-table">
            <tbody>
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
            <tr>
                <td>
                    <div className="container">
                        <p>Logged as:</p>
                        <p>{fetcher.login}</p>
                    </div>
                </td>
                <td>
                    <button className="box rounded redirect" onClick={fetcher.handleLogout}>Выйти</button>
                </td>
            </tr>
            </tbody>
        </table>
    );
}

export default MainApp;
