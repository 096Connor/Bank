package pl.bj.bank.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "powiadomienia_klienta")
public class PowiadomieniaKlienta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_powiadomienia")
    private Integer idPowiadomienia;

    @ManyToOne
    @JoinColumn(name = "id_klienta")
    private Klient klient;

    @Column(name = "typ")
    private String typ;

    @Column(name = "tresc")
    private String tresc;

    @Column(name = "data_wyslania")
    private LocalDateTime dataWyslania;

    @Column(name = "status")
    private String status;

    // gettery + settery
}
