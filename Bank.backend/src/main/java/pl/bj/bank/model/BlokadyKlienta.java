package pl.bj.bank.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "blokady_klienta")
public class BlokadyKlienta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_blokady")
    private Integer idBlokady;

    @ManyToOne
    @JoinColumn(name = "id_klienta")
    private Klient klient;

    @Column(name = "data_blokady")
    private LocalDateTime dataBlokady;

    @Column(name = "powod")
    private String powod;

    @Column(name = "id_pracownika")
    private Integer idPracownika;

    @Column(name = "status")
    private String status;

    // gettery + settery
}
