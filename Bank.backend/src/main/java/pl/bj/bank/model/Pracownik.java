package pl.bj.bank.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "pracownik")
public class Pracownik {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pracownika")
    private Integer idPracownika;

    @Column(name = "imie")
    private String imie;

    @Column(name = "nazwisko")
    private String nazwisko;

    @Column(name = "stanowisko")
    private String stanowisko;

    @Column(name = "login")
    private String login;

    @Column(name = "haslo_hash")
    private String hasloHash;

    @ManyToOne
    @JoinColumn(name = "oddzial_id")
    private Oddzial oddzial;

    @Column(name = "data_zatrudnienia")
    private LocalDate dataZatrudnienia;

    @Column(name = "aktywny")
    private Boolean aktywny;

    // getters & setters
}
