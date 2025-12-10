package pl.bj.bank.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CreateZgloszeniaKlientowRequest{

    private Integer idZgloszenia;
    private Integer klient;
    private String temat;
    private String opis;
    private String status;
    private LocalDateTime dataZgloszenia;
    private Integer idPracownikaOpiekuna;

}