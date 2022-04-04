package kruger.inventario.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;
import java.util.Map;

@NoArgsConstructor
@AllArgsConstructor
@ToString(of = "id")
@EqualsAndHashCode(of = "id")
@Builder

@Data
@Entity
@Table(name = "catalog", schema = "public")
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class Catalog implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @ApiModelProperty(value = "Este campo es la clave primaria de la tabla", required = true, readOnly = true)
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Long id;

    @ApiModelProperty(value = "nombre del catalogo", example = "Cualquier string")
    @Column(name = "nombre")
    @NotEmpty(message = "_error.validation_blank.message")
    @JsonProperty("nombre")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String nombre;

    @ApiModelProperty(value = "campo con el detalle del catalogo en un campo jsonb")
    @Type(type = "jsonb")
    @Column(name = "descripcion", columnDefinition = "jsonb")
    @JsonProperty("descripcion")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Map<String,Object> descripcion;

    @PrePersist
    void prePersist() {}

    @PreUpdate
    void preUpdate() {}
}
