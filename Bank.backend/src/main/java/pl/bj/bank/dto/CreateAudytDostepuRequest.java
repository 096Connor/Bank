package pl.bj.bank.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CreateAudytDostepuRequest{

    private Integer idAudytu;
    private Integer pracownik;
    private Integer klient;
    private String tabelaDotyczaca;
    private String operacja;
    private LocalDateTime dataOperacji;
    private String adresIp;
    private String urzadzenie;
    private String opis;
}