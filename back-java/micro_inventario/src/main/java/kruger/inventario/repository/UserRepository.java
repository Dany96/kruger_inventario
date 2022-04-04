package kruger.inventario.repository;

import kruger.inventario.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository("UserRepository")
@Transactional
public interface UserRepository extends CrudRepository<User, Long> {
    List<User> findAll();
    Optional<User> findById(Long id);
}