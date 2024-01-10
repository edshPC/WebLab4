package edsh.weblab4.bean;

import edsh.weblab4.jpa.ResultEntity;
import edsh.weblab4.jpa.UserEntity;
import jakarta.ejb.Singleton;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Singleton
public class ResultsBean {

    private final HashMap<String, List<CheckHitBean>> results = new HashMap<>();

    @PersistenceContext
    private EntityManager entityManager;

    public void newResult(CheckHitBean checkHitBean, String login) {
        loadResults(login);
        ResultEntity result = checkHitBean.asResultEntity();

        UserEntity userEntity = new UserEntity(login);
        result.setOwner(userEntity);

        results.get(login).add(checkHitBean);
        entityManager.persist(result);
    }

    public void clearResults(String login) {
        loadResults(login);
        results.get(login).clear();

        UserEntity userEntity = entityManager.find(UserEntity.class, login);
        //userEntity.getResults().forEach(entityManager::remove);
        userEntity.getResults().clear();
        entityManager.persist(userEntity);
    }

    public List<CheckHitBean> getResults(String login) {
        loadResults(login);
        return results.get(login);
    }

    private void loadResults(String login) {
        if(results.containsKey(login)) return;

        UserEntity userEntity = entityManager.find(UserEntity.class, login);
        if(userEntity != null) {
            results.put(login,
                    userEntity.getResults().stream().map(ResultEntity::asCheckHitBean)
                            .collect(Collectors.toCollection(LinkedList::new)));
        }
        else results.put(login, new LinkedList<>());
    }
}
