package projet.latency_tool.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RecommendationService {

    // Méthode qui génère des recommandations personnalisées en fonction de la latence
    public List<String> generateRecommendations(long latency) {
        List<String> recommendations = new ArrayList<>();

        // Si la latence est supérieure à 1000ms (très élevée)
        if (latency > 1000) {
            recommendations.add("La latence est trop élevée. Voici quelques recommandations :");
            recommendations.add("1. Vérifiez la charge du serveur cible.");
            recommendations.add("2. Réduisez la charge réseau en optimisant les processus.");
            recommendations.add("3. Vérifiez la qualité de la connexion réseau et le matériel réseau.");
            recommendations.add("4. Augmentez la bande passante ou utilisez une connexion plus rapide.");
            recommendations.add("5. Optimisez les configurations de routage pour réduire la latence.");
        }
        // Si la latence est modérée (entre 500ms et 1000ms)
        else if (latency > 500) {
            recommendations.add("La latence est modérée. Voici quelques suggestions :");
            recommendations.add("1. Vérifiez la configuration des équipements réseau.");
            recommendations.add("2. Optimisez la gestion du trafic réseau pour éviter la congestion.");
            recommendations.add("3. Réduisez le trafic dans les zones critiques.");
        }
        // Si la latence est inférieure à 500ms (bonne performance)
        else {
            recommendations.add("La latence est faible, ce qui indique une bonne performance réseau.");
            recommendations.add("1. Aucun changement nécessaire pour le moment.");
            recommendations.add("2. Continuez à surveiller les performances pour maintenir cette latence optimale.");
        }

        return recommendations;
    }
}