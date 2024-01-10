package edsh.weblab4.jpa;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table
public class UserEntity {
    @Id
    private String login;
    private String password;

    @OneToMany(mappedBy = "owner", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<ResultEntity> results;

    public UserEntity() {}

    public UserEntity(String login) {
        this.login = login;
    }

    public UserEntity(String login, String password) {
        this.login = login;
        this.password = password;
    }


    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<ResultEntity> getResults() {
        return results;
    }

    public void setResults(List<ResultEntity> results) {
        this.results = results;
    }
}
