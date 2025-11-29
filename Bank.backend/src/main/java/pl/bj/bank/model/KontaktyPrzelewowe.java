package pl.bj.bank.model;

import jakarta.persistence.*;

@Entity
@Table(name = "kontakty_przelewowe")
public class KontaktyPrzelewowe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_kontaktu")
    private Integer idKontaktu;

    @ManyToOne
    @JoinColumn(name = "id_klienta")
    private Klient klient;

    @Column(name = "nazwa")
    private String nazwa;

    @Column(name = "nr_konta")
    private Long nrKonta;

    @Column(name = "opis")
    private String opis;

    // gettery + settery
}
