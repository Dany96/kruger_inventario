package kruger.inventario.repository;

import kruger.inventario.domain.Login;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository("LoginRepository")
@Transactional
public interface LoginRepository extends CrudRepository<Login, Long> {

    @Query(value = "SELECT ur.* FROM public.usr_role ur WHERE ur.usuario = ?1 AND ur.rol = ?2 AND ur.\"password\" = ?3",
    nativeQuery = true)
    Optional<Login> login(String usuario, String rol, String password);

    //Optional<Login> login(String usuario, String rol, String password);
}
