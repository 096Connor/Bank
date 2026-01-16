package pl.bj.bank.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String login;
    private String password; // Zmienione z "haslo" na "password"
}
