package pl.bj.bank.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CreateTransakcjeRequest{

    private Integer idTransakcji;
    private Long konto;
    private LocalDateTime dataTransakcji;
    private String typTransakcji;
    private Double kwota;
    private String waluta;
    private String opis;
    private Double saldoPo;
    private String status;
}