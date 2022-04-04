package kruger.inventario.repository;

import java.util.List;
import java.util.Optional;

import kruger.inventario.domain.Template;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository("templateRepository")
@Transactional
public interface TemplateRepository extends CrudRepository<Template, Long> {

	List<Template> findByTmpEliminadoAndTmpEstadoEquals(boolean tmpEliminado, Integer tmpEstado);

	Optional<Template> findByIdAndTmpEliminadoAndTmpEstadoEquals(Long id, boolean tmpEliminado, Integer tmpEstado);

}
