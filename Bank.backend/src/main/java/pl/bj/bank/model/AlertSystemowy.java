package pl.bj.bank.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "alerty_systemowe")
public class AlertSystemowy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_alertu")
    private Integer idAlertu;

    @Column(name = "typ_alertu")
    private String typAlertu;

    @Column(name = "tresc")
    private String tresc;

    @Column(name = "data_wygenerowania")
    private LocalDateTime dataWygenerowania;

    @Column(name = "status")
    private String status;

    @Column(name = "powiazany_obiekt")
    private String powiazanyObiekt;

    @Column(name = "id_powiazania")
    private Integer idPowiazania;

    // getters and setters
}
