package pl.bj.bank.dto;

import lombok.Data;

@Data
public class CreateUstawieniaKontaRequest{

    private Integer idUstawienia;
    private Long konto;
    private Double limitDzienny;
    private Double limitJednorazowy;
    private Boolean powiadomieniaSms;
    private Boolean powiadomieniaMail;

}