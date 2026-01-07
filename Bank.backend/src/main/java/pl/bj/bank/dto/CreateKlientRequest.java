package pl.bj.bank.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateKlientRequest {
    private String imie;
    private String nazwisko;
    private LocalDate dataUrodzenia;
    private String pesel;
    private String pin;
    private String typKlienta;
    private Long adresId;
    private String nrTel;
    private String mail;
    private String narodowosc;
}
