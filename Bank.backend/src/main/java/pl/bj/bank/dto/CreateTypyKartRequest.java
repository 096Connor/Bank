package pl.bj.bank.dto;

import lombok.Data;

@Data
public class CreateTypyKartRequest{

    private Integer idTypuKarty;
    private String nazwa;
    private String opis;
    private Double limitDziennyStd;
}