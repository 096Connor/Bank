package pl.bj.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.bj.bank.model.PowiadomieniaKlienta;

public interface PowiadomieniaKlientaRepository extends JpaRepository<PowiadomieniaKlienta,Integer> {
}
