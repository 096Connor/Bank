package pl.bj.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.bj.bank.model.Oddzial;

public interface OddzialRepository extends JpaRepository<Oddzial, Integer> {
}
