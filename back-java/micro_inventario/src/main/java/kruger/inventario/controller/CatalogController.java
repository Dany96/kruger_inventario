package kruger.inventario.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import kruger.inventario.domain.Catalog;
import kruger.inventario.domain.Employe;
import kruger.inventario.services.CatalogService;
import kruger.inventario.services.EmployeService;
import kruger.inventario.util.ResponseController;
import kruger.inventario.util.Util;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/catalog")
@Api(value = "Rest Api catalog", tags = "CATALOG")
@ApiResponses(value = { @ApiResponse(code = 200, message = "Objeto recuperado"),
        @ApiResponse(code = 200, message = "SUCESS"), @ApiResponse(code = 404, message = "RESOURCE NOT FOUND"),
        @ApiResponse(code = 400, message = "BAD REQUEST"), @ApiResponse(code = 201, message = "CREATED"),
        @ApiResponse(code = 401, message = "UNAUTHORIZED"),
        @ApiResponse(code = 415, message = "UNSUPPORTED TYPE - Representation not supported for the resource"),
        @ApiResponse(code = 500, message = "SERVER ERROR") })
public class CatalogController implements ErrorController {
    private static final String PATH = "/error";
    public static final Logger LOGGER = LoggerFactory.getLogger(EmployeController.class);

    @Autowired
    @Qualifier("catalogService")
    private CatalogService catalogService;

    @Autowired
    @Qualifier("responseController")
    private ResponseController responseController;

    @Autowired
    @Qualifier("util")
    private Util util;

    public CatalogController() {
    }

    /**
     * Busca todos los registros de la entidad
     */
    @GetMapping(value = "/findAll")
    @ApiOperation(value = "Obtiene todos los registros activos", response = EmployeController.class)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> findAll(@RequestHeader(name = "Authorization") String token) {
        List<Catalog> officer = catalogService.findAll();
        LOGGER.info("catalog/findAll: " + officer.toString() + " usuario: " + util.filterUsuId(token));
        return ResponseEntity.ok(officer);
    }

    @Override
    public String getErrorPath() {
        return PATH;
    }
}
