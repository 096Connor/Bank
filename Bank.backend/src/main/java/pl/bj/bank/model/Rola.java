package pl.bj.bank.model;

import jakarta.persistence.*;

@Entity
@Table(name = "role")
public class Rola {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_roli")
    private Integer idRoli;

    @Column(name = "nazwa_roli")
    private String nazwaRoli;

    @Column(name = "opis")
    private String opis;

    // getters and setters
}
