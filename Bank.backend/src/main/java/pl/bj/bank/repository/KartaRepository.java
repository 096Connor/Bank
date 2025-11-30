package pl.bj.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.bj.bank.model.Karta;

public interface KartaRepository extends JpaRepository<Karta, Long> {
}
