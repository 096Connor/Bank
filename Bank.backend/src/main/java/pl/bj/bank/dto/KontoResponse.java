package pl.bj.bank.dto;

import lombok.Data;

@Data
public class KontoResponse {
    private Long nrKonta;
    private Double saldo;
    private String waluta;
    private String typKonta;
    private String status;
}
