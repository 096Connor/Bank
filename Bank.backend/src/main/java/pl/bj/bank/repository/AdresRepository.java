package pl.bj.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.bj.bank.model.Adres;

public interface AdresRepository extends JpaRepository<Adres, Integer> {
}
