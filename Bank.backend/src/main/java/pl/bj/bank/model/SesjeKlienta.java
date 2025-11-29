package pl.bj.bank.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "sesje_klienta")
public class SesjeKlienta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_sesji")
    private Integer idSesji;

    @ManyToOne
    @JoinColumn(name = "id_klienta")
    private Klient klient;

    @Column(name = "token_sesji")
    private String tokenSesji;

    @Column(name = "data_logowania")
    private LocalDateTime dataLogowania;

    @Column(name = "data_wylogowania")
    private LocalDateTime dataWylogowania;

    @Column(name = "adres_ip")
    private String adresIp;

    @Column(name = "urzadzenie")
    private String urzadzenie;

    // gettery + settery
}
