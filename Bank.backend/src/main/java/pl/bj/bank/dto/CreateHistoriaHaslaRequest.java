package pl.bj.bank.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CreateHistoriaHaslaRequest{

    private Integer idHistoria;
    private Integer klient;
    private LocalDateTime dataZmiany;
    private String hasloHash;
}