package pl.bj.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.bj.bank.model.Konto;

public interface KontoRepository extends JpaRepository<Konto, Long> {
}
