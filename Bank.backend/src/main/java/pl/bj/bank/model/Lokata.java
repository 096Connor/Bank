package pl.bj.bank.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "lokata")
public class Lokata {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_lokaty")
    private Integer idLokaty;

    @ManyToOne
    @JoinColumn(name = "id_klienta")
    private Klient klient;

    @Column(name = "kwota")
    private Double kwota;

    @Column(name = "oprocentowanie")
    private Double oprocentowanie;

    @Column(name = "data_otwarcia")
    private LocalDate dataOtwarcia;

    @Column(name = "data_zakonczenia")
    private LocalDate dataZakonczenia;

    @Column(name = "status")
    private String status;

    // getters and setters
}
