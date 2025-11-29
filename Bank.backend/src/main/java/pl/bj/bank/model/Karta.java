package pl.bj.bank.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "karta")
public class Karta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nr_karty")
    private Long nrKarty;

    @ManyToOne
    @JoinColumn(name = "id_klienta")
    private Klient klient;

    @ManyToOne
    @JoinColumn(name = "id_konta")
    private Konto konto;

    @ManyToOne
    @JoinColumn(name = "id_typu_karty")
    private TypyKart typKarty;

    @Column(name = "PIN")
    private String pin;

    @Column(name = "kod_CVC")
    private String kodCvc;

    @Column(name = "data_waznosci")
    private LocalDate dataWaznosci;

    @Column(name = "data_wydania")
    private LocalDate dataWydania;

    @Column(name = "status_karty")
    private String statusKarty;

    @Column(name = "limit_transakcji")
    private Double limitTransakcji;

    @Column(name = "limit_dzienny")
    private Double limitDzienny;

    // getters + setters
}
