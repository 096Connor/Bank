package pl.bj.bank.model;

import jakarta.persistence.*;

@Entity
@Table(name = "oddzial")
public class Oddzial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_oddzialu")
    private Integer idOddzialu;

    @Column(name = "nazwa_oddzialu")
    private String nazwaOddzialu;

    @Column(name = "adres")
    private String adres;

    @Column(name = "miasto")
    private String miasto;

    @Column(name = "telefon")
    private String telefon;

    // getters and setters
}
