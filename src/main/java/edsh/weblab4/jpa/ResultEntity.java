package edsh.weblab4.jpa;

import edsh.weblab4.bean.CheckHitBean;
import jakarta.ejb.EJB;
import jakarta.json.bind.annotation.JsonbTransient;
import jakarta.persistence.*;

import java.time.ZonedDateTime;

@Entity
@Table
public class ResultEntity {
    @Id
    @GeneratedValue
    @JsonbTransient
    private Long id;

    private double x;
    private double y;
    private double r;
    private boolean result;
    private ZonedDateTime dateTime;
    private double execTime;

    @ManyToOne
    @JoinColumn
    @JsonbTransient
    private UserEntity owner;

    public CheckHitBean asCheckHitBean() {
        CheckHitBean res = new CheckHitBean();
        res.setX(x);
        res.setY(y);
        res.setR(r);
        res.setResult(result);
        res.setDateTime(dateTime);
        res.setExecTime(execTime);
        return res;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public UserEntity getOwner() {
        return owner;
    }

    public void setOwner(UserEntity owner) {
        this.owner = owner;
    }
}
