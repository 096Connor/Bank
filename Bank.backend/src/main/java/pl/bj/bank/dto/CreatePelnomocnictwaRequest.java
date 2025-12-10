package pl.bj.bank.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CreatePelnomocnictwaRequest{

    private Integer idPelnomocnictwa;
    private Integer klient;
    private Integer pelnomocnik;
    private String zakresUprawnien;
    private LocalDate dataOd;
    private LocalDate dataDo;
    private String status;
}