package projet.latency_tool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projet.latency_tool.model.LatencyResult;

public interface LatencyResultRepository extends JpaRepository<LatencyResult, Long> {

}
