package pl.bj.bank.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ustawienia_konta")
public class UstawieniaKonta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ustawienia")
    private Integer idUstawienia;

    @ManyToOne
    @JoinColumn(name = "id_konta")
    private Konto konto;

    @Column(name = "limit_dzienny")
    private Double limitDzienny;

    @Column(name = "limit_jednorazowy")
    private Double limitJednorazowy;

    @Column(name = "powiadomienia_sms")
    private Boolean powiadomieniaSms;

    @Column(name = "powiadomienia_mail")
    private Boolean powiadomieniaMail;

    // getters + setters
}
