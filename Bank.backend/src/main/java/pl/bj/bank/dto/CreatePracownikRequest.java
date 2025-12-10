package pl.bj.bank.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CreatePracownikRequest{

    private Integer idPracownika;
    private String imie;
    private String nazwisko;
    private String stanowisko;
    private String login;
    private String hasloHash;
    private Integer oddzial;
    private LocalDate dataZatrudnienia;
    private Boolean aktywny;

}