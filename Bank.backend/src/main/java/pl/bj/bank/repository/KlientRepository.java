package pl.bj.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.bj.bank.model.Klient;
import java.util.Optional;

public interface KlientRepository extends JpaRepository<Klient, Long> {
    Optional<Klient> findByPesel(String pesel);

    // Count clients by account status (e.g. "AKTYWNY")
    long countByStatusKonta(String statusKonta);
}
