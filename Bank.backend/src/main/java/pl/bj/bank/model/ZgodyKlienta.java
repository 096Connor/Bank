package pl.bj.bank.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "zgody_klienta")
public class ZgodyKlienta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_zgody")
    private Integer idZgody;

    @ManyToOne
    @JoinColumn(name = "id_klienta")
    private Klient klient;

    @Column(name = "typ_zgody")
    private String typZgody;

    @Column(name = "data_wyrazenia")
    private LocalDate dataWyrazenia;

    @Column(name = "data_wycofania")
    private LocalDate dataWycofania;

    @Column(name = "aktywny")
    private Boolean aktywny;

    // gettery + settery
}
