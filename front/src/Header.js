import {Outlet} from "react-router-dom";

function Header() {
    return (<>
        <div className="container" id="header">
            <p>Лабораторная работа #4</p>
            <p>Выполнил Щербинин Эдуард P3214</p>
            <p>Вариант 2464</p>
        </div>
        <Outlet/>
    </>);
}

export default Header;
