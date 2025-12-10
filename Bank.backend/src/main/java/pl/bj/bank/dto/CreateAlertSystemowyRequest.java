package pl.bj.bank.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CreateAlertSystemowyRequest {

    private Integer idAlertu;
    private String typAlertu;
    private String tresc;
    private LocalDateTime dataWygenerowania;
    private String status;
    private String powiazanyObiekt;
    private Integer idPowiazania;
}
