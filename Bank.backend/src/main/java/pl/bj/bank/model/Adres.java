package pl.bj.bank.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "adres")
public class Adres {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_adres")
    private Long id;

    private String ulica;
    private String nrDomu;
    private String nrMieszkania;
    private String miasto;
    private String kodPocztowy;
    private String wojewodztwo;
    private String kraj;
}
