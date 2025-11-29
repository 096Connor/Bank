package pl.bj.bank.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "klient")
public class Klient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nr_ewidencyjny")
    private Integer nrEwidencyjny;

    @Column(name = "imie")
    private String imie;

    @Column(name = "nazwisko")
    private String nazwisko;

    @Column(name = "data_urodzenia")
    private LocalDate dataUrodzenia;

    @Column(name = "pesel")
    private String pesel;

    @Column(name = "typ_klienta")
    private String typKlienta;

    @Column(name = "data_rejestracji")
    private LocalDate dataRejestracji;

    @Column(name = "status_konta")
    private String statusKonta;

    // 🔵 RELACJA DO ADRES
    @ManyToOne
    @JoinColumn(name = "adres_id")  // kolumna z bazy
    private Adres adres;

    @Column(name = "nr_tel")
    private String nrTel;

    @Column(name = "mail")
    private String mail;

    @Column(name = "narodowosc")
    private String narodowosc;

    // GETTERY + SETTERY

    public Integer getNrEwidencyjny() {
        return nrEwidencyjny;
    }

    public String getImie() {
        return imie;
    }

    public String getNazwisko() {
        return nazwisko;
    }

    public LocalDate getDataUrodzenia() {
        return dataUrodzenia;
    }

    public String getPesel() {
        return pesel;
    }

    public String getTypKlienta() {
        return typKlienta;
    }

    public LocalDate getDataRejestracji() {
        return dataRejestracji;
    }

    public String getStatusKonta() {
        return statusKonta;
    }

    public Adres getAdres() {
        return adres;
    }

    public String getNrTel() {
        return nrTel;
    }

    public String getMail() {
        return mail;
    }

    public String getNarodowosc() {
        return narodowosc;
    }

    public void setNrEwidencyjny(Integer nrEwidencyjny) {
        this.nrEwidencyjny = nrEwidencyjny;
    }

    public void setImie(String imie) {
        this.imie = imie;
    }

    public void setNazwisko(String nazwisko) {
        this.nazwisko = nazwisko;
    }

    public void setDataUrodzenia(LocalDate dataUrodzenia) {
        this.dataUrodzenia = dataUrodzenia;
    }

    public void setPesel(String pesel) {
        this.pesel = pesel;
    }

    public void setTypKlienta(String typKlienta) {
        this.typKlienta = typKlienta;
    }

    public void setDataRejestracji(LocalDate dataRejestracji) {
        this.dataRejestracji = dataRejestracji;
    }

    public void setStatusKonta(String statusKonta) {
        this.statusKonta = statusKonta;
    }

    public void setAdres(Adres adres) {
        this.adres = adres;
    }

    public void setNrTel(String nrTel) {
        this.nrTel = nrTel;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public void setNarodowosc(String narodowosc) {
        this.narodowosc = narodowosc;
    }
}
