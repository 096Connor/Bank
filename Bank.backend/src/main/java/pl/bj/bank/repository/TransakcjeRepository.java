package pl.bj.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.bj.bank.model.Transakcje;
import java.time.LocalDateTime;

public interface TransakcjeRepository extends JpaRepository<Transakcje, Integer> {
	long countByDataTransakcjiBetween(LocalDateTime start, LocalDateTime end);

	java.util.List<pl.bj.bank.model.Transakcje> findByKontoNrKontaOrderByDataTransakcjiDesc(Long nrKonta);
}
