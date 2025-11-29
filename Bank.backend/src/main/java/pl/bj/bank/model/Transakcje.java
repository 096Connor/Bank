package pl.bj.bank.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "transakcje")
public class Transakcje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_transakcji")
    private Integer idTransakcji;

    @ManyToOne
    @JoinColumn(name = "id_konta")
    private Konto konto;

    @Column(name = "data_transakcji")
    private LocalDateTime dataTransakcji;

    @Column(name = "typ_transakcji")
    private String typTransakcji;

    @Column(name = "kwota")
    private Double kwota;

    @Column(name = "waluta")
    private String waluta;

    @Column(name = "opis")
    private String opis;

    @Column(name = "saldo_po")
    private Double saldoPo;

    @Column(name = "status")
    private String status;

    // getters + setters
}
