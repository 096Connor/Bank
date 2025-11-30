package pl.bj.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.bj.bank.model.HistoriaSalda;

public interface HistoriaSaldaRepository extends JpaRepository<HistoriaSalda, Integer> {
}
