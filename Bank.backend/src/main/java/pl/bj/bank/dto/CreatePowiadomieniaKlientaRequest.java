package pl.bj.bank.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CreatePowiadomieniaKlientaRequest{

    private Integer idPowiadomienia;
    private Integer klient;
    private String typ;
    private String tresc;
    private LocalDateTime dataWyslania;
    private String status;
}