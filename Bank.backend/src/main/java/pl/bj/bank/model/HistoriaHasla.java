package pl.bj.bank.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "historia_hasla")
public class HistoriaHasla {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "id_historia")
    private Integer idHistoria;

    @ManyToOne
    @JoinColumn(name = "id_klienta")
    private Klient klient;

    @Column(name = "data_zmiany")
    private LocalDateTime dataZmiany;

    @Column(name = "haslo_hash")
    private String hasloHash;

    // gettery + settery
}
