package pl.bj.bank.model;

import jakarta.persistence.*;

@Entity
@Table(name = "typy_kont")
public class TypyKont {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_typu")
    private Integer idTypu;

    @Column(name = "nazwa_typu")
    private String nazwaTypu;

    @Column(name = "opis")
    private String opis;

    @Column(name = "oprocentowanie_std")
    private Double oprocentowanieStd;

    // getters + setters
}
