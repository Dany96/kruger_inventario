package kruger.inventario.services;

import kruger.inventario.domain.User;
import kruger.inventario.exception.MyNotFoundException;
import kruger.inventario.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("userService")
public class UserService {
    @Autowired
    @Qualifier("UserRepository")
    private UserRepository userRepository;

    @Autowired
    private MessageSource messageSource;

    /**
     * Metodo para encontrar todos los registros
     *
     * @return Todos los registros de la tabla
     */
    public List<User> findAll() {
        List<User> users = userRepository.findAll();
        if (users.isEmpty())
            throw new MyNotFoundException(String.format(
                    messageSource.getMessage("error.entity_cero_exist.message", null, LocaleContextHolder.getLocale()),
                    this.getClass().getName()));
        return users;
    }

    /**
     * Busca un registro por Id
     *
     * @param id: Identificador del registro
     * @return entidad: Retorna todos los registros filtrados por el parámetros de
     *         entrada
     */
    public Optional<User> findById(Long id) {
        Optional<User> users = userRepository.findById(id);
        if (!users.isPresent())
            throw new MyNotFoundException(String.format(
                    messageSource.getMessage("error.entity_cero_exist.message", null, LocaleContextHolder.getLocale()),
                    id));
        return users;
    }

    public User update(User user) {
        Optional<User> off = findById(user.getId());
        if (!off.isPresent())
            throw new MyNotFoundException(String.format(
                    messageSource.getMessage("error.entity_cero_exist.message", null, LocaleContextHolder.getLocale()),
                    off.get().getId()));
        return userRepository.save(user);
    }

    /**
     * Guarda un registro
     *
     * @param "entidad": Contiene todos campos de la entidad para guardar
     * @return catalogo: La entidad Guardada
     */
    public User save(User user) {
        return userRepository.save(user);
    }
}
