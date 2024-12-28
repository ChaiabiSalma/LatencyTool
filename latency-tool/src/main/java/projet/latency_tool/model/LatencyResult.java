package projet.latency_tool.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Entity
@Setter
@AllArgsConstructor
@NoArgsConstructor

//Après avoir mesuré la latence pour une cible, vous enregistrez le résultat dans cette entité.
public class LatencyResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //hadi hiya la latence mesurée(kat3tina le temps en milliseconde).
    @Column(nullable = false)
    private long latency;

    //la machine qui ya mesurer la latence.
    @ManyToOne
    @JoinColumn(name = "target_id", nullable = false)
    private Target target;

    //la date et l'heure à laquelle la mesure a été effectuée.
    @Column(nullable = false)
    private LocalDateTime timestamp;

    @Transient // Cette annotation empêche la persistance de cette propriété dans la base de données
    private List<String> recommendations;

    @Transient
    private Double latitude;

    @Transient
    private Double longitude;
}
