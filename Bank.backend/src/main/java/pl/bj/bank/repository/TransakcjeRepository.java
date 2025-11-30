package pl.bj.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.bj.bank.model.Transakcje;

public interface TransakcjeRepository extends JpaRepository<Transakcje, Integer> {
}
