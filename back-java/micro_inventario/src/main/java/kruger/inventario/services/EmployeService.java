package kruger.inventario.services;

import kruger.inventario.domain.Employe;
import kruger.inventario.exception.MyNotFoundException;
import kruger.inventario.repository.EmployeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("employeService")
public class EmployeService {
    @Autowired
    @Qualifier("EmployeRepository")
    private EmployeRepository employeRepository;

    @Autowired
    private MessageSource messageSource;

    /**
     * Metodo para encontrar todos los registros
     *
     * @return Todos los registros de la tabla
     */
    public List<Employe> findAll() {
        List<Employe> employes = employeRepository.findAll();
        if (employes.isEmpty())
            throw new MyNotFoundException(String.format(
                    messageSource.getMessage("error.entity_cero_exist.message", null, LocaleContextHolder.getLocale()),
                    this.getClass().getName()));
        return employes;
    }

    /**
     * Busca un registro por Id
     *
     * @param id: Identificador del registro
     * @return entidad: Retorna todos los registros filtrados por el parámetros de
     *         entrada
     */
    public Optional<Employe> findById(Long id) {
        Optional<Employe> employes = employeRepository.findById(id);
        if (!employes.isPresent())
            throw new MyNotFoundException(String.format(
                    messageSource.getMessage("error.entity_cero_exist.message", null, LocaleContextHolder.getLocale()),
                    id));
        return employes;
    }

    public Employe update(Employe employe) {
        Optional<Employe> off = findById(employe.getId());
        if (!off.isPresent())
            throw new MyNotFoundException(String.format(
                    messageSource.getMessage("error.entity_cero_exist.message", null, LocaleContextHolder.getLocale()),
                    off.get().getId()));
        return employeRepository.save(employe);
    }

    /**
     * Guarda un registro
     *
     * @param "entidad": Contiene todos campos de la entidad para guardar
     * @return catalogo: La entidad Guardada
     */
    public Employe save(Employe employe) {
        return employeRepository.save(employe);
    }

}
