package pl.bj.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.bj.bank.model.ZgodyKlienta;

public interface ZgodyKlientaRepository extends JpaRepository<ZgodyKlienta, Integer> {
}
