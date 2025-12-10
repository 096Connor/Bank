package pl.bj.bank.dto;

import lombok.Data;


@Data
public class  CreatePracownikRoleRequest{


    private Integer pracownik;
    private Integer rola;
}