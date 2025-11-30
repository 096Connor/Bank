package pl.bj.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.bj.bank.model.TypyKont;

public interface TypyKontRepository extends JpaRepository<TypyKont, Integer> {
}
