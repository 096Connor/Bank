package pl.bj.bank.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "zgloszenia_klientow")
public class ZgloszeniaKlientow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_zgloszenia")
    private Integer idZgloszenia;

    @ManyToOne
    @JoinColumn(name = "id_klienta")
    private Klient klient;

    @Column(name = "temat")
    private String temat;

    @Column(name = "opis")
    private String opis;

    @Column(name = "status")
    private String status;

    @Column(name = "data_zgloszenia")
    private LocalDateTime dataZgloszenia;

    @Column(name = "id_pracownika_opiekuna")
    private Integer idPracownikaOpiekuna;

    // gettery + settery
}
