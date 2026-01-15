package pl.bj.bank.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "transakcje")
public class Transakcje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_transakcji")
    private Integer idTransakcji;

    @ManyToOne
    @JoinColumn(name = "id_konta")
    private Konto konto;

    @Column(name = "data_transakcji")
    private LocalDateTime dataTransakcji;

    @Column(name = "typ_transakcji")
    private String typTransakcji;

    @Column(name = "kwota")
    private Double kwota;

    @Column(name = "waluta")
    private String waluta;

    @Column(name = "opis")
    private String opis;

    @Column(name = "saldo_po")
    private Double saldoPo;

    @Column(name = "status")
    private String status;

    @Column(name = "related_account")
    private Long relatedAccount;

    // getters + setters

    public Integer getIdTransakcji() {
        return idTransakcji;
    }

    public void setIdTransakcji(Integer idTransakcji) {
        this.idTransakcji = idTransakcji;
    }

    public Konto getKonto() {
        return konto;
    }

    public void setKonto(Konto konto) {
        this.konto = konto;
    }

    public LocalDateTime getDataTransakcji() {
        return dataTransakcji;
    }

    public void setDataTransakcji(LocalDateTime dataTransakcji) {
        this.dataTransakcji = dataTransakcji;
    }

    public String getTypTransakcji() {
        return typTransakcji;
    }

    public void setTypTransakcji(String typTransakcji) {
        this.typTransakcji = typTransakcji;
    }

    public Double getKwota() {
        return kwota;
    }

    public void setKwota(Double kwota) {
        this.kwota = kwota;
    }

    public String getWaluta() {
        return waluta;
    }

    public void setWaluta(String waluta) {
        this.waluta = waluta;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public Double getSaldoPo() {
        return saldoPo;
    }

    public void setSaldoPo(Double saldoPo) {
        this.saldoPo = saldoPo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getRelatedAccount() {
        return relatedAccount;
    }

    public void setRelatedAccount(Long relatedAccount) {
        this.relatedAccount = relatedAccount;
    }
}
