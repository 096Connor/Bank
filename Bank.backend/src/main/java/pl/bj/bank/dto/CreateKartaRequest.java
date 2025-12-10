package pl.bj.bank.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateKartaRequest{

    private Long nrKarty;
    private Integer klient;
    private Long konto;
    private Integer typKarty;
    private String pin;
    private String kodCvc;
    private LocalDate dataWaznosci;
    private LocalDate dataWydania;
    private String statusKarty;
    private Double limitTransakcji;
    private Double limitDzienny;
}