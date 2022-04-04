package kruger.inventario.repository;

import kruger.inventario.domain.Catalog;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository("CatalogRepository")
@Transactional
public interface CatalogRepository extends CrudRepository<Catalog, Long> {
    List<Catalog> findAll();
}
