package edsh.weblab4.bean;

import jakarta.ejb.Stateless;

import java.util.LinkedList;

@Stateless
public class ResultsBean {

    private final LinkedList<CheckHitBean> results = new LinkedList<>();


    public void newResult(CheckHitBean checkHitBean) {
        results.add(checkHitBean);
    }

    public void clearResults() {
        results.clear();
    }

    public LinkedList<CheckHitBean> getResults() {
        return results;
    }
}
