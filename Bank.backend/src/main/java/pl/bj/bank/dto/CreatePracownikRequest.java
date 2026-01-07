package pl.bj.bank.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class CreatePracownikRequest {

    private String imie;
    private String nazwisko;
    private String stanowisko;

    private String login;
    private String haslo;          // 👈 PLAIN PASSWORD

    private Integer oddzial;       // id_oddzialu

    private LocalDate dataZatrudnienia;
    private Boolean aktywny;
}
