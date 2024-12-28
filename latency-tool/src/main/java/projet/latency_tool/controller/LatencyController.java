package projet.latency_tool.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import projet.latency_tool.model.LatencyResult;
import projet.latency_tool.service.LatencyService;
import projet.latency_tool.service.RecommendationService;

import java.util.List;

@RestController
@RequestMapping("/latency")
public class LatencyController {
    @Autowired
    private LatencyService latencyService;

    @Autowired
    private RecommendationService recommendationService;

    //La méthode retourne un objet LatencyResult, qui représente le résultat de la mesure de la latence
    //latency/measure?ipAddress=192.168.1.1
    @PostMapping("/measure")
    public LatencyResult measureLatency(@RequestParam String ipAddress) {
        LatencyResult latencyResult = latencyService.measureLatency(ipAddress);
        List<String> recommendations = recommendationService.generateRecommendations(latencyResult.getLatency());
        latencyResult.setRecommendations(recommendations);  // Ajout des recommandations au résultat
        return latencyResult;
    }
}

