package edsh.weblab4.bean;

import edsh.weblab4.jpa.ResultEntity;
import jakarta.ejb.EJB;
import jakarta.ejb.Stateful;
import jakarta.json.bind.annotation.JsonbTransient;

import java.time.ZoneId;
import java.time.ZonedDateTime;

@Stateful
public class CheckHitBean {

    private double x;
    private double y;
    private double r;
    private boolean result;
    private ZonedDateTime dateTime;
    private double execTime;

    @EJB
    @JsonbTransient
    private ResultsBean resultsBean;

    public void makeCheckHit(InputBean input) {
        long startTime = System.nanoTime();
        x = input.getX();
        y = input.getY();
        r = input.getR();
        result = checkHit(x, y, r);
        dateTime = ZonedDateTime.now(ZoneId.of("+00:00"));
        execTime = (double) (System.nanoTime() - startTime) / 1000;

        resultsBean.newResult(this, input.getLogin());
    }

    private static boolean checkHit(double x, double y, double r) {
        if (r < 0) {
            x = -x;
            y = -y;
            r = -r;
        }

        if (x > 0) {
            if (y > 0) return false; // up right
            else return x - r <= y; // down right
        } else {
            if (y >= 0) return -x <= r && y <= r; // up left
            else return x * x + y * y <= r * r; // down left
        }
    }

    public ResultEntity asResultEntity() {
        ResultEntity resultEntity = new ResultEntity();
        resultEntity.setX(x);
        resultEntity.setY(y);
        resultEntity.setR(r);
        resultEntity.setResult(result);
        resultEntity.setDateTime(dateTime);
        resultEntity.setExecTime(execTime);
        return resultEntity;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public ZonedDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(ZonedDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public double getExecTime() {
        return execTime;
    }

    public void setExecTime(double execTime) {
        this.execTime = execTime;
    }
}
