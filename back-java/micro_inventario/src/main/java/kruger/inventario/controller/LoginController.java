package kruger.inventario.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import kruger.inventario.domain.Login;
import kruger.inventario.services.LoginService;
import kruger.inventario.util.ResponseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@Api(value = "Rest Api login", tags = "LOGIN")
@ApiResponses(value = { @ApiResponse(code = 200, message = "Objeto recuperado"),
        @ApiResponse(code = 200, message = "SUCESS"), @ApiResponse(code = 404, message = "RESOURCE NOT FOUND"),
        @ApiResponse(code = 400, message = "BAD REQUEST"), @ApiResponse(code = 201, message = "CREATED"),
        @ApiResponse(code = 401, message = "UNAUTHORIZED"),
        @ApiResponse(code = 415, message = "UNSUPPORTED TYPE - Representation not supported for the resource"),
        @ApiResponse(code = 500, message = "SERVER ERROR") })
public class LoginController implements ErrorController {
    private static final String PATH = "/error";
    public static final Logger LOGGER = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    @Qualifier("loginService")
    private LoginService loginService;

    @Autowired
    @Qualifier("responseController")
    private ResponseController responseController;

    public LoginController() {
    }

    @GetMapping(value = "/login/{usuario}/{rol}/{password}")
    @ApiOperation(value = "Obtiene el usuario por las credenciales", response = LoginController.class)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Optional<Login>> login(@Validated @PathVariable String usuario,
                                       @Validated @PathVariable String rol,
                                       @Validated @PathVariable String password) {
        Optional<Login> officer = loginService.login(usuario, rol, password);
        LOGGER.info("auth/login: " + officer.toString());
        return ResponseEntity.ok(officer);
    }

    @Override
    public String getErrorPath() {
        return PATH;
    }
}