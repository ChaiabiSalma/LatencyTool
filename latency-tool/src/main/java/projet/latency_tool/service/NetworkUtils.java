package projet.latency_tool.service;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;

public class NetworkUtils {

    public static long ping(String ipAddress) {
        try {
            // Essayer de récupérer l'adresse IP
            InetAddress address = InetAddress.getByName(ipAddress);
            long startTime = System.nanoTime();

            // Essayer d'atteindre l'adresse IP dans un délai de 3 secondes
            boolean reachable = address.isReachable(3000); // Timeout de 3000 ms (3 secondes)
            long endTime = System.nanoTime();

            // Si l'adresse est joignable, calculer le temps de réponse
            if (reachable) {
                long timeTaken = (endTime - startTime) / 1_000_000; // Convertir en millisecondes
                System.out.println("L'adresse IP " + ipAddress + " est joignable. Temps de réponse: " + timeTaken + " ms");
                return timeTaken;
            } else {
                throw new RuntimeException("Adresse IP non joignable : " + ipAddress);
            }
        } catch (UnknownHostException e) {
            // Exception spécifique pour les erreurs de nom d'hôte
            throw new RuntimeException("Nom d'hôte inconnu : " + ipAddress, e);
        } catch (IOException e) {
            // Exception pour d'autres erreurs réseau
            throw new RuntimeException("Erreur réseau lors du ping de l'adresse IP : " + ipAddress, e);
        } catch (Exception e) {
            // Capture générale pour toutes les autres exceptions
            throw new RuntimeException("Erreur lors du ping de l'adresse IP : " + ipAddress, e);
        }
    }
}

