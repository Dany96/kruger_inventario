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
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
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
@Table(name = "employe", schema = "public")

public class Employe implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @ApiModelProperty(value = "Este campo es la clave primaria de la tabla", required = true, readOnly = true)
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Long id;

    @ApiModelProperty(value = "cedula del empleado", example = "Cualquier string")
    @Size(min = 1, max = 10, message = "_error.validation_range.message-[0, 10]")
    @Column(name = "cedula")
    @NotEmpty(message = "_error.validation_blank.message")
    @JsonProperty("cedula")
    @JsonInclude(Include.NON_NULL)
    private String cedula;

    @ApiModelProperty(value = "nombres del empleado", example = "Cualquier string")
    @Size(min = 1, max = 100, message = "_error.validation_range.message-[0, 100]")
    @Column(name = "nombre")
    @NotEmpty(message = "_error.validation_blank.message")
    @JsonProperty("nombre")
    @JsonInclude(Include.NON_NULL)
    private String nombre;

    @ApiModelProperty(value = "apellidos del empleado", example = "Cualquier string")
    @Size(min = 1, max = 100, message = "_error.validation_range.message-[0, 100]")
    @Column(name = "apellido")
    @NotEmpty(message = "_error.validation_blank.message")
    @JsonProperty("apellido")
    @JsonInclude(Include.NON_NULL)
    private String apellido;

    @ApiModelProperty(notes = "correo del empleado", required = true)
    @Email(message = "_error.validation_valid_mail.message")
    @Column(name = "correo")
    @NotBlank(message = "_error.validation_blank.message")
    @JsonProperty("correo")
    private String correo;

    @ApiModelProperty(value = "Fecha de nacimiento empleado", example = "")
    @Column(name = "fecha_nac")
    @JsonProperty("fechaNac")
    @JsonInclude(Include.NON_NULL)
    private Date fechaNac;

    @ApiModelProperty(value = "dirección del empleado", example = "Cualquier string")
    @Column(name = "direccion")
    @JsonProperty("direccion")
    @JsonInclude(Include.NON_NULL)
    private String direccion;

    @ApiModelProperty(value = "telefono del empleado", example = "Cualquier string")
    @Column(name = "telefono")
    @JsonProperty("telefono")
    @JsonInclude(Include.NON_NULL)
    private String telefono;

    @ApiModelProperty(value = "1=vacunado  0=no vacunado",  example = "1")
    @Column(name = "estado_vac", columnDefinition = "Integer default 0")
    @JsonProperty("estadoVac")
    @JsonInclude(Include.NON_NULL)
    private Integer estadoVac;

    @ApiModelProperty(value = "estado vacunacion del empleado", example = "Cualquier string")
    @Column(name = "tipo_vac")
    @JsonProperty("tipoVac")
    @JsonInclude(Include.NON_NULL)
    private Integer tipoVac;

    @ApiModelProperty(value = "Fecha de vacunacion del empleado", example = "")
    @Column(name = "fecha_vac")
    @JsonProperty("fechaVac")
    @JsonInclude(Include.NON_NULL)
    private Date fechaVac;

    @ApiModelProperty(value = "numero de dosis vacunacion",  example = "1")
    @Column(name = "num_dosis", columnDefinition = "Integer default 0")
    @JsonProperty("numDosis")
    @JsonInclude(Include.NON_NULL)
    private Integer numDosis;

    @ApiModelProperty(value = "campo para eliminado logico del registro",  example = "1")
    @Column(name = "estado", columnDefinition = "Integer default 1")
    @JsonProperty("estado")
    @JsonInclude(Include.NON_NULL)
    private Integer estado;

    @PrePersist
    void prePersist() {
        this.estado = 1;
    }

    @PreUpdate
    void preUpdate() {
    }
}