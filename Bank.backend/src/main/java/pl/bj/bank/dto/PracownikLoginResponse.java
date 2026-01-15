package pl.bj.bank.dto;

import lombok.Data;

@Data
public class PracownikLoginResponse {
    private Integer id;  // Zmienione z Long na Integer
    private String login;
    private String imie;
    private String nazwisko;
}
