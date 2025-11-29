package pl.bj.bank.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "historia_zmian_danych")
public class HistoriaZmianDanych {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_zmiany")
    private Integer idZmiany;

    @ManyToOne
    @JoinColumn(name = "id_klienta")
    private Klient klient;

    @Column(name = "pole_zmienione")
    private String poleZmienione;

    @Column(name = "wartosc_stara")
    private String wartoscStara;

    @Column(name = "wartosc_nowa")
    private String wartoscNowa;

    @Column(name = "data_zmiany")
    private LocalDateTime dataZmiany;

    @Column(name = "id_pracownika")
    private Integer idPracownika;

    // gettery + settery
}
