package pl.bj.bank.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "konto")
@Data
public class Konto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nr_konta")
    private Long nrKonta;

    @ManyToOne
    @JoinColumn(name = "id_klienta")
    private Klient klient;

    @ManyToOne
    @JoinColumn(name = "id_typu_konta")
    private TypyKont typKonta;

    @Column(name = "saldo")
    private Double saldo = 0.0;

    @Column(name = "waluta")
    private String waluta = "PLN";

    @Column(name = "data_otwarcia")
    private LocalDate dataOtwarcia;

    @Column(name = "data_zamkniecia")
    private LocalDate dataZamkniecia;

    @Column(name = "oprocentowanie")
    private Double oprocentowanie = 0.0;

    @Column(name = "status")
    private String status = "AKTYWNE";

    // 🔹 Ustawia konto jako aktywne
    public void activate() {
        this.status = "AKTYWNE";
        this.dataZamkniecia = null;
    }

    // 🔹 Zablokuj konto
    public void block() {
        this.status = "ZABLOKOWANE";
    }

    // 🔹 Zamknij konto
    public void close() {
        this.status = "ZAMKNIĘTE";
        this.dataZamkniecia = LocalDate.now();
    }

    // 🔹 Pomocnicza metoda ustawiająca datę otwarcia
    public void openNow() {
        this.dataOtwarcia = LocalDate.now();
    }

    // 🔹 Metoda ustawiająca saldo początkowe (domyślnie 0.0)
    public void setInitialSaldo(Double saldo) {
        this.saldo = saldo != null ? saldo : 0.0;
    }

    // 🔹 Metoda ustawiająca oprocentowanie
    public void setOprocentowanie(Double oprocentowanie) {
        this.oprocentowanie = oprocentowanie != null ? oprocentowanie : 0.0;
    }

}
