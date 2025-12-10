package pl.bj.bank.dto;

import lombok.Data;

@Data
public class CreateUstawienia2FARequest{

    private Integer idUstawienia;
    private Integer klient;
    private String metoda;
    private Boolean aktywny;
}