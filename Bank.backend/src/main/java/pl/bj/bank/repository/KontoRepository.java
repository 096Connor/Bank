package pl.bj.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.bj.bank.model.Konto;
import java.util.List;
import java.util.Optional;

public interface KontoRepository extends JpaRepository<Konto, Long> {
    List<Konto> findByKlientId(Long klientId);

    // 🔹 Nowa metoda do pobrania konta po nrKonta
    Optional<Konto> findByNrKonta(Long nrKonta);
}
