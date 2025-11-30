package pl.bj.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.bj.bank.model.Lokata;

public interface LokataRepository extends JpaRepository<Lokata, Integer> {
}
