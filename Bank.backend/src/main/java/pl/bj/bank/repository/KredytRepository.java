package pl.bj.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.bj.bank.model.Kredyt;

public interface KredytRepository extends JpaRepository<Kredyt, Integer> {
}
