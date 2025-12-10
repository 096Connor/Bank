package pl.bj.bank.dto;

import lombok.Data;

@Data
public class CreateTypyKontRequest{

    private Integer idTypu;
    private String nazwaTypu;
    private String opis;
    private Double oprocentowanieStd;
}