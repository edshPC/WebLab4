import {Link} from "react-router-dom";

function LoginForm(props) {
    return(
        <div>
            <table id="input-table">
                <tbody>
                <tr>
                    <td colSpan="3" className="input-cell-l">Войди или зарегистрируйся:</td>
                </tr>

                <tr>
                    <td className="input-cell-l">Логин:</td>
                    <td>
                        <input className="input-select rounded box" name="login" placeholder="Enter login"
                               required type="text"/>
                    </td>
                </tr>
                <tr>
                    <td className="input-cell-l">Пароль:</td>
                    <td>
                        <input className="input-select rounded box" name="password" placeholder="Enter password"
                               required type="password"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Link to="main" className="box rounded redirect">Войти</Link>
                    </td>
                    <td>
                        <Link to="main" className="box rounded redirect">Зарегистрироваться</Link>
                    </td>
                </tr>
                </tbody>
            </table>

        </div>
    );
}

export default LoginForm;