package pl.bj.bank.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "historia_salda")
public class HistoriaSalda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_zmiany")
    private Integer idZmiany;

    @ManyToOne
    @JoinColumn(name = "nr_konta")
    private Konto konto;

    @Column(name = "data_zmiany")
    private LocalDateTime dataZmiany;

    @Column(name = "saldo_przed")
    private Double saldoPrzed;

    @Column(name = "saldo_po")
    private Double saldoPo;

    @Column(name = "powod")
    private String powod;

    // getters + setters
}
