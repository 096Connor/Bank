package pl.bj.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.bj.bank.model.UstawieniaKonta;

public interface UstawieniaKontaRepository extends JpaRepository<UstawieniaKonta, Integer> {
}
