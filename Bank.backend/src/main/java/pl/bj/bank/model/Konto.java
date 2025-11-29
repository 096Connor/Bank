package pl.bj.bank.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "konto")
public class Konto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nr_konta")
    private Long nrKonta;

    @ManyToOne
    @JoinColumn(name = "id_klienta")
    private Klient klient;

    @ManyToOne
    @JoinColumn(name = "id_typu_konta")
    private TypyKont typKonta;

    @Column(name = "saldo")
    private Double saldo;

    @Column(name = "waluta")
    private String waluta;

    @Column(name = "data_otwarcia")
    private LocalDate dataOtwarcia;

    @Column(name = "data_zamkniecia")
    private LocalDate dataZamkniecia;

    @Column(name = "oprocentowanie")
    private Double oprocentowanie;

    @Column(name = "status")
    private String status;

    // getters + setters
}
