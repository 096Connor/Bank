package pl.bj.bank.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CreateHistoriaZmianDanychRequest{

    private Integer idZmiany;
    private Integer klient;
    private String poleZmienione;
    private String wartoscStara;
    private String wartoscNowa;
    private LocalDateTime dataZmiany;
    private Integer idPracownika;
}