package pl.bj.bank.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "pełnomocnictwa")
public class Pelnomocnictwa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pelnomocnictwa")
    private Integer idPelnomocnictwa;

    @ManyToOne
    @JoinColumn(name = "id_klienta")
    private Klient klient;

    @ManyToOne
    @JoinColumn(name = "id_pelnomocnika")
    private Klient pelnomocnik;

    @Column(name = "zakres_uprawnien")
    private String zakresUprawnien;

    @Column(name = "data_od")
    private LocalDate dataOd;

    @Column(name = "data_do")
    private LocalDate dataDo;

    @Column(name = "status")
    private String status;

    // gettery + settery
}
