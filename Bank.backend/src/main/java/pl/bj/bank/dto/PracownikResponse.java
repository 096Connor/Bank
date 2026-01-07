package pl.bj.bank.dto;

import lombok.Data;

@Data
public class PracownikResponse {
    private Integer idPracownika;
    private String imie;
    private String nazwisko;
    private String stanowisko;
    private String login;
    private Boolean aktywny;
}
