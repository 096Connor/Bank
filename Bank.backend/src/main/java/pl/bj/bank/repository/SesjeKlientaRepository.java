package pl.bj.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.bj.bank.model.SesjeKlienta;

import java.util.Optional;

public interface SesjeKlientaRepository extends JpaRepository<SesjeKlienta, Integer> {
    Optional<SesjeKlienta> findByTokenSesji(String tokenSesji);
}
