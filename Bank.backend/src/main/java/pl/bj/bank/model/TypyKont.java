package pl.bj.bank.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "typ_konta")
@Data
public class TypyKont {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_typu")
    private Long id;
    
    @Column(name = "nazwa_typu", length = 50)
    private String nazwaTypu;
    
    @Column(name = "opis", length = 100)
    private String opis;
    
    @Column(name = "oprocentowanie_std")
    private Double oprocentowanieStd;
}