package pl.bj.bank.dto;

import lombok.Data;

@Data
public class CreateOddzialRequest{

    private Integer idOddzialu;
    private String nazwaOddzialu;
    private String adres;
    private String miasto;
    private String telefon;
}