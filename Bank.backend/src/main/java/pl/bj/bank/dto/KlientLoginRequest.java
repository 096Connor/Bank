package pl.bj.bank.dto;

import lombok.Data;

@Data
public class KlientLoginRequest {
    private String pesel;
    private String pin;
}
