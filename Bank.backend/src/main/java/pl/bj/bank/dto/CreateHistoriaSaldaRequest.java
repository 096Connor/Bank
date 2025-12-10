package pl.bj.bank.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CreateHistoriaSaldaRequest{

    private Integer idZmiany;
    private Integer klient;
    private LocalDateTime dataZmiany;
    private Double saldoPrzed;
    private Double saldoPo;
    private String powod;
}