package pl.bj.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.bj.bank.model.Konto;
import java.util.List;

public interface KontoRepository extends JpaRepository<Konto, Long> {
	List<Konto> findByKlientId(Long klientId);
}
