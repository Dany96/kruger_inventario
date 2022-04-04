package kruger.inventario.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import kruger.inventario.domain.User;
import kruger.inventario.services.UserService;
import kruger.inventario.util.ResponseController;
import kruger.inventario.util.Util;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@Api(value = "Rest Api user", tags = "USER")
@ApiResponses(value = { @ApiResponse(code = 200, message = "Objeto recuperado"),
        @ApiResponse(code = 200, message = "SUCESS"), @ApiResponse(code = 404, message = "RESOURCE NOT FOUND"),
        @ApiResponse(code = 400, message = "BAD REQUEST"), @ApiResponse(code = 201, message = "CREATED"),
        @ApiResponse(code = 401, message = "UNAUTHORIZED"),
        @ApiResponse(code = 415, message = "UNSUPPORTED TYPE - Representation not supported for the resource"),
        @ApiResponse(code = 500, message = "SERVER ERROR") })
public class UserController implements ErrorController {
    private static final String PATH = "/error";
    public static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @Autowired
    @Qualifier("userService")
    private UserService userService;

    @Autowired
    @Qualifier("responseController")
    private ResponseController responseController;

    @Autowired
    @Qualifier("util")
    private Util util;

    public UserController() {
    }

    /**
     * Busca todos los registros de la entidad
     */
    @GetMapping(value = "/findAll")
    @ApiOperation(value = "Obtiene todos los registros", response = UserController.class)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> findAll(@RequestHeader(name = "Authorization") String token) {
        List<User> officer = userService.findAll();
        LOGGER.info("user/findAll: " + officer.toString() + " usuario: " + util.filterUsuId(token));
        return ResponseEntity.ok(officer);
    }

    /**
     * Busca los registros por Id de la entidad
     *
     * @param id: Identificador de la entidad
     * @return parametrosCarga: Retorna el registro encontrado
     */
    @GetMapping(value = "/findById/{id}")
    @ApiOperation(value = "Get employe by id", response = User.class)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Optional<?>> findById(@Validated @PathVariable Long id,
                                                @RequestHeader(name = "Authorization") String token) {
        Optional<User> officer = userService.findById(id);
        LOGGER.info("user/findById: " + officer.toString() + " usuario: " + util.filterUsuId(token));
        return ResponseEntity.ok(officer);
    }

    @PostMapping(value = "/create")
    @ApiOperation(value = "Crear nuevo registro", response = ResponseController.class)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<ResponseController> postEntity(@Validated @RequestBody User user,
                                                         @RequestHeader(name = "Authorization") String token) {
        User off = userService.save(user);
        LOGGER.info("Creado: " + user + " usuario: ");
        return ResponseEntity.ok(new ResponseController(off.getId(), "Creado"));
    }

    @Override
    public String getErrorPath() {
        return PATH;
    }
}