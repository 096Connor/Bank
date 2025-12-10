package pl.bj.bank.dto;

import lombok.Data;

@Data
public class CreateRolaRequest{

    private Integer idRoli;
    private String nazwaRoli;
    private String opis;
}