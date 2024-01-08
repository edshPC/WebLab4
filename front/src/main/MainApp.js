import UserInput from "./UserInput";
import ResultTable from "./ResultTable";
import Graph from "./Graph";
import {Link} from "react-router-dom";

function MainApp(props) {
    const fetcher = props.fetcher;

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
                    <Link to="/" className="box rounded redirect">Выйти</Link>
                </td>
            </tr>
            </tbody>
        </table>
    );
}

export default MainApp;
