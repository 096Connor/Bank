package pl.bj.bank.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class TransakcjeResponse {
    private Integer idTransakcji;
    private Long nrKonta;
    private LocalDateTime dataTransakcji;
    private String typTransakcji;
    private Double kwota;
    private String waluta;
    private String opis;
    private Double saldoPo;
    // additional related info
    private String klientImie;
    private String klientNazwisko;
    private String typKonta;
    private Long relatedAccount; // for transfers, opposite account if known
}
