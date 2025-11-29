package pl.bj.bank.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "kredyt")
public class Kredyt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_kredytu")
    private Integer idKredytu;

    @ManyToOne
    @JoinColumn(name = "id_klienta")
    private Klient klient;

    @Column(name = "kwota_poczatkowa")
    private Double kwotaPoczatkowa;

    @Column(name = "kwota_pozostala")
    private Double kwotaPozostala;

    @Column(name = "oprocentowanie")
    private Double oprocentowanie;

    @Column(name = "rata_miesieczna")
    private Double rataMiesieczna;

    @Column(name = "data_zawarcia")
    private LocalDate dataZawarcia;

    @Column(name = "data_zakonczenia")
    private LocalDate dataZakonczenia;

    @Column(name = "status")
    private String status;

    @OneToMany(mappedBy = "kredyt")
    private List<RatyKredytu> raty;

    // getters + setters
}
