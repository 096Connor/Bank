package pl.bj.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.bj.bank.model.Pracownik;

public interface PracownikRepository extends JpaRepository<Pracownik, Integer> {
}
