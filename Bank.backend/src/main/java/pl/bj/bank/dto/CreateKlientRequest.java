package pl.bj.bank.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class CreateKlientRequest {

    private String imie;
    private String nazwisko;
    private LocalDate dataUrodzenia;
    private String pesel;
    private String typKlienta;
    private Long adres;
    private String nrTel;
    private String mail;
    private String narodowosc;
}
