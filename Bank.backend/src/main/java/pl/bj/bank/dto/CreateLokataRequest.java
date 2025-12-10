package pl.bj.bank.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateLokataRequest{

    private Integer idLokaty;
    private Integer klient;
    private Double kwota;
    private Double oprocentowanie;
    private LocalDate dataOtwarcia;
    private LocalDate dataZakonczenia;
    private String status;
}
