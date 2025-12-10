package pl.bj.bank.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateZgodyKlientaRequest{

    private Integer idZgody;
    private Integer klient;
    private String typZgody;
    private LocalDate dataWyrazenia;
    private LocalDate dataWycofania;
    private Boolean aktywny;

}