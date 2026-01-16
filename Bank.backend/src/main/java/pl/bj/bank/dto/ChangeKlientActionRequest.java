package pl.bj.bank.dto;

import lombok.Data;

@Data
public class ChangeKlientActionRequest {
    private String action; // ZABLOKUJ | ZAMKNIJ
}
