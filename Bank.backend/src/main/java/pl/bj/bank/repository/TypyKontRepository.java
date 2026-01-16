package pl.bj.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.bj.bank.model.TypyKont;

@Repository
public interface TypyKontRepository extends JpaRepository<TypyKont, Long> {
}