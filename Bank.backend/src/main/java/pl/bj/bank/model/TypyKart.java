package pl.bj.bank.model;

import jakarta.persistence.*;

@Entity
@Table(name = "typy_kart")
public class TypyKart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_typu_karty")
    private Integer idTypuKarty;

    @Column(name = "nazwa")
    private String nazwa;

    @Column(name = "opis")
    private String opis;

    @Column(name = "limit_dzienny_std")
    private Double limitDziennyStd;

    // getters + setters
}
