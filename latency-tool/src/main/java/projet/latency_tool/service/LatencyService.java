package projet.latency_tool.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projet.latency_tool.model.LatencyResult;
import projet.latency_tool.model.Target;
import projet.latency_tool.repository.LatencyResultRepository;
import projet.latency_tool.repository.TargetRepository;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.LocalDateTime;

@Service
public class LatencyService {

    @Autowired
    private TargetRepository targetRepository;

    @Autowired
    private LatencyResultRepository latencyResultRepository;

    private static final String GEOLOCATION_API_KEY = "your_api_key"; // Remplacez avec votre clé API
    private static final String GEOLOCATION_API_URL = "https://ipinfo.io/%s/json?token=5ef2b938a3f9c7";

    private RestTemplate restTemplate = new RestTemplate();

    public LatencyResult measureLatency(String ipAddress) {
        // Recherche de la cible par IP
        Target target = targetRepository.findByIpAddress(ipAddress);
        if (target == null) {
            throw new IllegalArgumentException("Target not found with IP: " + ipAddress);
        }

        // Mesure de la latence
        long latency = NetworkUtils.ping(ipAddress);

        // Récupération des informations de géolocalisation
        Geolocation geolocation = getGeolocation(ipAddress);

        // Création du résultat de la latence
        LatencyResult latencyResult = new LatencyResult();
        latencyResult.setTarget(target);
        latencyResult.setLatency(latency);
        latencyResult.setTimestamp(LocalDateTime.now());
        latencyResult.setLatitude(geolocation.getLatitude());
        latencyResult.setLongitude(geolocation.getLongitude());

        // Sauvegarde du résultat dans la base de données
        return latencyResultRepository.save(latencyResult);
    }

    public Geolocation getGeolocation(String ipAddress) {
        String url = String.format(GEOLOCATION_API_URL, ipAddress);
        String response = restTemplate.getForObject(url, String.class);

        try {
            if (response != null) {
                // Utilisation de Jackson pour parser la réponse JSON
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode jsonResponse = objectMapper.readTree(response);

                if (jsonResponse.has("loc")) {
                    String loc = jsonResponse.get("loc").asText();
                    String[] locParts = loc.split(",");
                    double latitude = Double.parseDouble(locParts[0]);
                    double longitude = Double.parseDouble(locParts[1]);

                    Geolocation geolocation = new Geolocation();
                    geolocation.setLatitude(latitude);
                    geolocation.setLongitude(longitude);
                    return geolocation;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new Geolocation();  // Retourne une géolocalisation par défaut en cas d'erreur
    }
}

