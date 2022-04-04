package kruger.inventario.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@ToString(of = "id")
@EqualsAndHashCode(of = "id")
@Builder

@Data
@Entity
@Table(name = "user", schema = "public")
public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @ApiModelProperty(value = "Este campo es la clave primaria de la tabla", required = true, readOnly = true)
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Long id;

    @ApiModelProperty(value = "id del empleado table employe",  example = "1")
    @Column(name = "id_employe", columnDefinition = "Integer default 0")
    @JsonProperty("idEmploye")
    @JsonInclude(Include.NON_NULL)
    private Integer idEmploye;

    @ApiModelProperty(value = "id del rol que se le esta asignando al usuario",  example = "1")
    @Column(name = "id_rol", columnDefinition = "Integer default 0")
    @JsonProperty("idRol")
    @JsonInclude(Include.NON_NULL)
    private Integer idRol;

    @ApiModelProperty(value = "nombre de usuario", example = "Cualquier string")
    @Size(min = 1, max = 100, message = "_error.validation_range.message-[0, 100]")
    @Column(name = "usuario")
    @NotEmpty(message = "_error.validation_blank.message")
    @JsonProperty("usuario")
    @JsonInclude(Include.NON_NULL)
    private String usuario;

    @ApiModelProperty(value = "contraseña del usuario", example = "Cualquier string")
    @Size(min = 1, max = 100, message = "_error.validation_range.message-[0, 100]")
    @Column(name = "password")
    @NotEmpty(message = "_error.validation_blank.message")
    @JsonProperty("password")
    @JsonInclude(Include.NON_NULL)
    private String password;

    @ApiModelProperty(value = "Fecha del registro", example = "")
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "fecha_creacion", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @JsonProperty("fechaCreacion")
    @JsonInclude(Include.NON_NULL)
    private Date fechaCreacion;

    @PrePersist
    void prePersist() {
        this.fechaCreacion = new Date();
    }

    @PreUpdate
    void preUpdate() {
    }
}