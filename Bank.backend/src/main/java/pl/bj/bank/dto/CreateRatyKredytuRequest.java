package pl.bj.bank.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class  CreateRatyKredytuRequest{

    private Integer idRaty;
    private Integer kredyt;
    private LocalDate dataRaty;
    private Double kwotaRaty;
    private Double kwotaPozostala;
    private String status;
    private LocalDate dataZaplaty;
}