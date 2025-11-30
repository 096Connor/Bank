package pl.bj.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.bj.bank.model.SesjeKlienta;

public interface SesjeKlientaRepository extends JpaRepository<SesjeKlienta, Integer> {
}
