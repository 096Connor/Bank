package pl.bj.bank.model;

import jakarta.persistence.*;

@Entity
@Table(name = "pracownik_role")
@IdClass(PracownikRoleId.class)
public class PracownikRole {

    @Id
    @ManyToOne
    @JoinColumn(name = "id_pracownika")
    private Pracownik pracownik;

    @Id
    @ManyToOne
    @JoinColumn(name = "id_roli")
    private Rola rola;

    // getters & setters
}
