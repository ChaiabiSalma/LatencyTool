package projet.latency_tool.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Entity
@Setter
@AllArgsConstructor
@NoArgsConstructor

//Vous stockez les informations sur les cibles réseau, telles que l'adresse IP et le nom d'hôte.
public class Target {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String hostname;

    @Column(name = "ip_address")
    private String ipAddress;
}

