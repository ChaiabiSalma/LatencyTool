package projet.latency_tool.repository;

import org.springframework.data.repository.CrudRepository;
import projet.latency_tool.model.User;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    // Elle renvoie un Optional<User> pour éviter les NullPointerExceptions en cas d'absence d'utilisateur.
    Optional<User> findByUsername(String username);
}