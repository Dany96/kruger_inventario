package kruger.inventario.services;

import kruger.inventario.domain.Catalog;
import kruger.inventario.exception.MyNotFoundException;
import kruger.inventario.repository.CatalogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("catalogService")
public class CatalogService {
    @Autowired
    @Qualifier("CatalogRepository")
    private CatalogRepository CatalogRepository;

    @Autowired
    private MessageSource messageSource;

    /**
     * Metodo para encontrar todos los registros
     *
     * @return Todos los registros de la tabla
     */
    public List<Catalog> findAll() {
        List<Catalog> catalogs = CatalogRepository.findAll();
        if (catalogs.isEmpty())
            throw new MyNotFoundException(String.format(
                    messageSource.getMessage("error.entity_cero_exist.message", null, LocaleContextHolder.getLocale()),
                    this.getClass().getName()));
        return catalogs;
    }
}
