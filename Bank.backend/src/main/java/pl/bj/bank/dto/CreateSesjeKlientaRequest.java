package pl.bj.bank.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CreateSesjeKlientaRequest{

    private Integer idSesji;
    private Integer klient;
    private String tokenSesji;
    private LocalDateTime dataLogowania;
    private LocalDateTime dataWylogowania;
    private String adresIp;
    private String urzadzenie;
}