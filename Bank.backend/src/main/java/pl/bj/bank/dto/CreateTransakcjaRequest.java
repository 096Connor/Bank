package pl.bj.bank.dto;

import lombok.Data;

@Data
public class CreateTransakcjaRequest {
    private Long fromKontoId;
    private Long toKontoId;
    private Double kwota;
    private String waluta;
    private String opis;
}
