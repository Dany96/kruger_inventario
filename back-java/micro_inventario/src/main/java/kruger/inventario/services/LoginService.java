package kruger.inventario.services;

import kruger.inventario.domain.Login;
import kruger.inventario.exception.MyNotFoundException;
import kruger.inventario.repository.LoginRepository;
import kruger.inventario.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("loginService")
public class LoginService {
    @Autowired
    @Qualifier("LoginRepository")
    private LoginRepository loginRepository;

    @Autowired
    private MessageSource messageSource;

    /**
     * Busca un registro por 3 parametros
     *
     * @param usuario: Identificador del registro
     * @return entidad: Retorna todos los registros filtrados por el parámetros de
     *         entrada
     */
    public Optional<Login> login(String usuario, String rol, String password) {
        Optional<Login> login = loginRepository.login(usuario, rol, password);
        if (!login.isPresent())
            throw new MyNotFoundException(String.format(
                    messageSource.getMessage("error.entity_cero_exist.message", null, LocaleContextHolder.getLocale()),
                    usuario));
        return login;
    }
}