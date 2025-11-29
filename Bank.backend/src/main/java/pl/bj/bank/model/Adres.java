package pl.bj.bank.model;

import jakarta.persistence.*;

@Entity
@Table(name = "adres")
public class Adres {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_adres")
    private Integer idAdres;

    @Column(name = "ulica")
    private String ulica;

    @Column(name = "nr_domu")
    private String nrDomu;

    @Column(name = "nr_mieszkania")
    private String nrMieszkania;

    @Column(name = "miasto")
    private String miasto;

    @Column(name = "kod_pocztowy")
    private String kodPocztowy;

    @Column(name = "wojewodztwo")
    private String wojewodztwo;

    @Column(name = "kraj")
    private String kraj;

    // GETTERY + SETTERY

    public Integer getIdAdres() {
        return idAdres;
    }

    public String getUlica() {
        return ulica;
    }

    public String getNrDomu() {
        return nrDomu;
    }

    public String getNrMieszkania() {
        return nrMieszkania;
    }

    public String getMiasto() {
        return miasto;
    }

    public String getKodPocztowy() {
        return kodPocztowy;
    }

    public String getWojewodztwo() {
        return wojewodztwo;
    }

    public String getKraj() {
        return kraj;
    }

    public void setIdAdres(Integer idAdres) {
        this.idAdres = idAdres;
    }

    public void setUlica(String ulica) {
        this.ulica = ulica;
    }

    public void setNrDomu(String nrDomu) {
        this.nrDomu = nrDomu;
    }

    public void setNrMieszkania(String nrMieszkania) {
        this.nrMieszkania = nrMieszkania;
    }

    public void setMiasto(String miasto) {
        this.miasto = miasto;
    }

    public void setKodPocztowy(String kodPocztowy) {
        this.kodPocztowy = kodPocztowy;
    }

    public void setWojewodztwo(String wojewodztwo) {
        this.wojewodztwo = wojewodztwo;
    }

    public void setKraj(String kraj) {
        this.kraj = kraj;
    }
}
