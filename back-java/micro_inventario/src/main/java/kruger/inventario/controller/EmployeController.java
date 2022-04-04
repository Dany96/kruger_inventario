package kruger.inventario.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import kruger.inventario.domain.Employe;
import kruger.inventario.services.EmployeService;
import kruger.inventario.util.ResponseController;
import kruger.inventario.util.Util;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.source.InvalidConfigurationPropertyValueException;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/employe")
@Api(value = "Rest Api employe", tags = "EMPLOYE")
@ApiResponses(value = { @ApiResponse(code = 200, message = "Objeto recuperado"),
        @ApiResponse(code = 200, message = "SUCESS"), @ApiResponse(code = 404, message = "RESOURCE NOT FOUND"),
        @ApiResponse(code = 400, message = "BAD REQUEST"), @ApiResponse(code = 201, message = "CREATED"),
        @ApiResponse(code = 401, message = "UNAUTHORIZED"),
        @ApiResponse(code = 415, message = "UNSUPPORTED TYPE - Representation not supported for the resource"),
        @ApiResponse(code = 500, message = "SERVER ERROR") })
public class EmployeController implements ErrorController {
    private static final String PATH = "/error";
    public static final Logger LOGGER = LoggerFactory.getLogger(EmployeController.class);

    @Autowired
    @Qualifier("employeService")
    private EmployeService employeService;

    @Autowired
    @Qualifier("responseController")
    private ResponseController responseController;

    @Autowired
    @Qualifier("util")
    private Util util;

    public EmployeController() {
    }

    /**
     * Busca todos los registros de la entidad
     */
    @GetMapping(value = "/findAll")
    @ApiOperation(value = "Obtiene todos los registros activos", response = EmployeController.class)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> findAll(@RequestHeader(name = "Authorization") String token) {
        List<Employe> officer = employeService.findAll();
        LOGGER.info("employe/findAll: " + officer.toString() + " usuario: " + util.filterUsuId(token));
        return ResponseEntity.ok(officer);
    }

    /**
     * Busca los registros por Id de la entidad
     *
     * @param id: Identificador de la entidad
     * @return parametrosCarga: Retorna el registro encontrado
     */
    @GetMapping(value = "/findById/{id}")
    @ApiOperation(value = "Get employe by id", response = Employe.class)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Optional<?>> findById(@Validated @PathVariable Long id,
                                                @RequestHeader(name = "Authorization") String token) {
        Optional<Employe> officer = employeService.findById(id);
        LOGGER.info("employe/findById: " + officer.toString() + " usuario: " + util.filterUsuId(token));
        return ResponseEntity.ok(officer);
    }

    /**
     * Inserta un nuevo registro en la entidad
     *
     * @param "entidad": entidad a insertar
     * @return ResponseController: Retorna el id creado
     */
    @PostMapping(value = "/create")
    @ApiOperation(value = "Crear nuevo registro", response = ResponseController.class)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<ResponseController> postEntity(@Validated @RequestBody Employe employe,
                                                         @RequestHeader(name = "Authorization") String token) {
        Employe off = employeService.save(employe);
        LOGGER.info("Creado: " + employe);
        return ResponseEntity.ok(new ResponseController(off.getId(), "Creado"));
    }

    /**
     * Actualiza un registro
     *
     * @param "entidad": entidad a actualizar
     * @return ResponseController: Retorna el id actualizado
     */
    @PostMapping(value = "/update")
    @ApiOperation(value = "Actualizar los registros", response = ResponseController.class)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<ResponseController> update(@Validated @RequestBody Employe update,
                                                     @RequestHeader(name = "Authorization") String token) {
        Employe off = employeService.update(update);
        LOGGER.info("Actualizado: " + off.toString());
        return ResponseEntity.ok(new ResponseController(off.getId(), "Actualizado"));
    }

    /**
     * Realiza un eliminado logico del registro
     *
     * @param id:    Identificador del registro
     * @return ResponseController: Retorna el id eliminado
     */
    @GetMapping(value = "/delete/{id}")
    @ApiOperation(value = "eliminado logico por id")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ResponseController> deleteEmploye(@PathVariable Long id,
                                                            @RequestHeader(name = "Authorization") String token) {
        Employe deleteEmploye= employeService.findById(id)
                .orElseThrow(() -> new InvalidConfigurationPropertyValueException("employe", "Id", id.toString()));
        deleteEmploye.setEstado(0);
        Employe officerDel = employeService.save(deleteEmploye);
        LOGGER.info("Eliminado: " + id);
        return ResponseEntity.ok(new ResponseController(officerDel.getId(), "eliminado"));
    }

    @Override
    public String getErrorPath() {
        return PATH;
    }

}