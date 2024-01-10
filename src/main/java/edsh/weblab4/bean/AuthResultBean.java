package edsh.weblab4.bean;

import jakarta.ejb.Stateless;
import jakarta.json.bind.annotation.JsonbTransient;

@Stateless
public class AuthResultBean {
    private boolean success = false;
    private String login;
    private String error;

    @JsonbTransient
    private String token;

    public AuthResultBean success() {
        setSuccess(true);
        return this;
    }

    public AuthResultBean error(String error) {
        setError(error);
        return this;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
