package pl.bj.bank.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CreateBlokadyKlientaRequest{

    private Integer idBlokady;
    private Integer klient;
    private LocalDateTime dataBlokady;
    private String powod;
    private Integer idPracownika;
    private String status;
}