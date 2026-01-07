package pl.bj.bank.dto;

import lombok.Data;

@Data
public class KlientResponse {
    private Long id;
    private String imie;
    private String nazwisko;
    private String pesel;
    private String typKlienta;
    private String statusKonta;
    private String nrTel;
    private String mail;
}
