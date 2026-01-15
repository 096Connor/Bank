package pl.bj.bank.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Data
public class KlientLoginRequest {
    @NotBlank(message = "PESEL jest wymagany")
    @Size(min = 11, max = 11, message = "PESEL musi zawierać dokładnie 11 cyfr")
    private String pesel;

    @NotBlank(message = "PIN jest wymagany")
    @Size(min = 4, message = "PIN musi mieć minimum 4 znaki")
    private String pin;
}
