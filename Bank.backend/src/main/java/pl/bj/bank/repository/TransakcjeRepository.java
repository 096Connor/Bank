package pl.bj.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.bj.bank.model.Transakcje;

import java.time.LocalDateTime;
import java.util.List;


public interface TransakcjeRepository extends JpaRepository<Transakcje, Integer> {

    long countByDataTransakcjiBetween(LocalDateTime start, LocalDateTime end);

    List<Transakcje> findByKontoNrKontaOrderByDataTransakcjiDesc(Long nrKonta);
}
