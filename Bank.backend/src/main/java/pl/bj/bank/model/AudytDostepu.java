package pl.bj.bank.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "audyt_dostepu")
public class AudytDostepu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_audytu")
    private Integer idAudytu;

    @ManyToOne
    @JoinColumn(name = "id_pracownika")
    private Pracownik pracownik;

    @ManyToOne
    @JoinColumn(name = "id_klienta")
    private Klient klient;

    @Column(name = "tabela_dotyczaca")
    private String tabelaDotyczaca;

    @Column(name = "operacja")
    private String operacja;

    @Column(name = "data_operacji")
    private LocalDateTime dataOperacji;

    @Column(name = "adres_ip")
    private String adresIp;

    @Column(name = "urzadzenie")
    private String urzadzenie;

    @Column(name = "opis")
    private String opis;

    // getters + setters
}
