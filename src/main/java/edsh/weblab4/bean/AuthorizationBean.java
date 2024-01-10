package edsh.weblab4.bean;

import edsh.weblab4.Util;
import edsh.weblab4.jpa.UserEntity;
import jakarta.ejb.Singleton;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.util.HashMap;
import java.util.UUID;

@Singleton
public class AuthorizationBean {

    //key: token, value: login
    private final HashMap<String, String> authorizatedUsers = new HashMap<>();

    @PersistenceContext
    private EntityManager entityManager;

    public AuthResultBean tryLogin(UserBean user) {
        var result = new AuthResultBean();

        if(authorizatedUsers.containsKey(user.getToken()))
            return result.error("You are already logged in");

        UserEntity userEntity = entityManager.find(UserEntity.class, user.getLogin());
        if(userEntity == null) return result.error("This username aren't registred");

        if(!Util.stringHashEquals(user.getPassword(), userEntity.getPassword()))
            return result.error("Incorrect password");

        String token = UUID.randomUUID().toString();
        result.setToken(token);
        result.setLogin(user.getLogin());
        authorizatedUsers.put(token, user.getLogin());

        return result.success();
    }

    public AuthResultBean tryRegister(UserBean user) {
        var result = new AuthResultBean();

        UserEntity userEntity = entityManager.find(UserEntity.class, user.getLogin());
        if(userEntity != null) return result.error("This username is already registred");

        userEntity = new UserEntity();
        userEntity.setLogin(user.getLogin());
        userEntity.setPassword(Util.encodeString(user.getPassword()));
        entityManager.persist(userEntity);

        String token = UUID.randomUUID().toString();
        result.setToken(token);
        result.setLogin(user.getLogin());
        authorizatedUsers.put(token, user.getLogin());

        return result.success();
    }

    public AuthResultBean logout(UserBean user) {
        var result = new AuthResultBean();
        String token = user.getToken();

        if(authorizatedUsers.remove(token) == null)
            return result.error("You aren't logged in");

        return result.success();
    }

}
