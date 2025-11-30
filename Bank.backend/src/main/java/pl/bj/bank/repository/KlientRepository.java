package pl.bj.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.bj.bank.model.Klient;

public interface KlientRepository extends JpaRepository<Klient, Integer> {
}
