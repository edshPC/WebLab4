import {Link} from "react-router-dom";

function LoginApp(props) {
    return(
        <div className="container">
            <Link to="main" className="box rounded redirect">Войти</Link>
        </div>
    );
}

export default LoginApp;