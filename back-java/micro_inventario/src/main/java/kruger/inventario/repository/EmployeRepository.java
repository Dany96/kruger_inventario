package kruger.inventario.repository;

import kruger.inventario.domain.Employe;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository("EmployeRepository")
@Transactional
public interface EmployeRepository extends CrudRepository<Employe, Long> {
    List<Employe> findAll();
    Optional<Employe> findById(Long id);
}