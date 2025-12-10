package pl.bj.bank.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateKontoRequest{

    private Long nrKonta;
    private Integer klient;
    private Long typKonta;
    private Double saldo;
    private String waluta;
    private LocalDate dataOtwarcia;
    private LocalDate dataZamkniecia;
    private Double oprocentowanie;
    private String status;
}