package pl.bj.bank.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ustawienia_2fa")
public class Ustawienia2FA {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ustawienia")
    private Integer idUstawienia;

    @ManyToOne
    @JoinColumn(name = "id_klienta")
    private Klient klient;

    @Column(name = "metoda")
    private String metoda;

    @Column(name = "aktywny")
    private Boolean aktywny;

    // gettery + settery
}
