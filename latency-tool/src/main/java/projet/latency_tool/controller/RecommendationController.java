package projet.latency_tool.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import projet.latency_tool.service.RecommendationService;

import java.util.List;

@RestController
@RequestMapping("/Recommendations")
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @GetMapping
    public List<String> getRecommendations(@RequestParam long latency) {
        System.out.println("Received latency: " + latency); // Vérifie que la valeur de latency est bien reçue
        List<String> recommendations = recommendationService.generateRecommendations(latency);
        System.out.println("Generated recommendations: " + recommendations); // Vérifie les recommandations générées
        return recommendations;
    }


}
