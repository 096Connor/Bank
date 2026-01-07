package pl.bj.bank.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "klient")
public class Klient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nr_ewidencyjny")
    private Long id;

    private String imie;
    private String nazwisko;

    @Column(name = "data_urodzenia")
    private LocalDate dataUrodzenia;

    private String pesel;
    @Column(name = "typ_klienta")
    private String typKlienta;
    @Column(name = "data_rejestracji")
    private LocalDate dataRejestracji;
    @Column(name = "status_konta")
    private String statusKonta;

    // Relacja ManyToOne
    @ManyToOne
    @JoinColumn(name = "adres_id")
    private Adres adres;

    @Column(name = "nr_tel")
    private String nrTel;
    private String mail;
    private String narodowosc;

    @Column(name = "pin_hash")
    private String pinHash;
}
