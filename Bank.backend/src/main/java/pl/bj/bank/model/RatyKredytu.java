package pl.bj.bank.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "raty_kredytu")
public class RatyKredytu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_raty")
    private Integer idRaty;

    @ManyToOne
    @JoinColumn(name = "id_kredytu")
    private Kredyt kredyt;

    @Column(name = "data_raty")
    private LocalDate dataRaty;

    @Column(name = "kwota_raty")
    private Double kwotaRaty;

    @Column(name = "kwota_pozostala")
    private Double kwotaPozostala;

    @Column(name = "status")
    private String status;

    @Column(name = "data_zaplaty")
    private LocalDate dataZaplaty;

    // getters + setters
}
