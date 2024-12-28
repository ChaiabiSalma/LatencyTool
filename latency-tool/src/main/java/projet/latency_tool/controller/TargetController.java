package projet.latency_tool.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import projet.latency_tool.model.Target;
import projet.latency_tool.repository.TargetRepository;

import java.util.List;

@RestController
@RequestMapping("/api/targets")
public class TargetController {

    @Autowired
    private TargetRepository targetRepository;

    @GetMapping
    public List<Target> getAllTargets() {
        return targetRepository.findAll();
    }

    @PostMapping
    public Target createTarget(@RequestBody Target target) {
        return targetRepository.save(target);
    }

    @GetMapping("/{id}")
    public Target getTargetById(@PathVariable Long id) {
        return targetRepository.findById(id).orElseThrow(() -> new RuntimeException("Target not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteTarget(@PathVariable Long id) {
        targetRepository.deleteById(id);
    }
}


