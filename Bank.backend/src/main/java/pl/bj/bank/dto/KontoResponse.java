package pl.bj.bank.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class KontoResponse {
    private Long nrKonta;
    private String nazwaKonta;           // ← DODANE
    private String opis;                 // ← DODANE
    private Double saldo;
    private String waluta;
    private String typKonta;
    private String status;
    private LocalDate dataOtwarcia;
    private LocalDate dataZamkniecia;    // ← DODANE
    private Double oprocentowanie;
}