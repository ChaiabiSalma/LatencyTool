package projet.latency_tool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projet.latency_tool.model.Target;

public interface TargetRepository extends JpaRepository<Target, Long> {
    Target findByIpAddress(String ipAddress);
}
