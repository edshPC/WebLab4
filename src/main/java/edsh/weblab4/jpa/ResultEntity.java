package edsh.weblab4.jpa;

import jakarta.persistence.*;

@Entity
@Table
public class ResultEntity {
    @Id
    @GeneratedValue
    private long id;

    @ManyToOne
    @JoinColumn
    private UserEntity owner;

}
