package pl.bj.bank.dto;

import lombok.Data;

@Data
public class CreateAdresRequest {

    private Integer idAdres;
    private String ulica;
    private String nrDomu;
    private String nrMieszkania;
    private String miasto;
    private String kodPocztowy;
    private String wojewodztwo;
    private String kraj;
}