package pl.bj.bank.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateKredytRequest{

    private Integer idKredytu;
    private Integer klient;
    private Double kwotaPoczatkowa;
    private Double kwotaPozostala;
    private Double oprocentowanie;
    private Double rataMiesieczna;
    private LocalDate dataZawarcia;
    private LocalDate dataZakonczenia;
    private String status;
}