package kruger.inventario.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.Immutable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Immutable
@Table(name = "usr_role")
public class Login implements Serializable {
    @Id
    @Column(name = "id")
    @JsonProperty("id")
    private Long id;

    @Column(name = "id_employe")
    @JsonProperty("idEmploye")
    private int idEmploye;

    @Column(name = "usuario")
    @JsonProperty("usuario")
    private String usuario;

    @Column(name = "rol")
    @JsonProperty("rol")
    private String rol;

    @Column(name = "password")
    @JsonProperty("password")
    private String password;
}