package pl.bj.bank.dto;

import lombok.Data;

@Data
public class CreateKontaktyPrzelewoweRequest{

    private Integer idKontaktu;
    private Integer klient;
    private String nazwa;
    private Long nrKonta;
    private String opis;
}