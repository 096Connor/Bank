package pl.bj.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.bj.bank.model.Pracownik;

import java.util.Optional;

public interface PracownikRepository extends JpaRepository<Pracownik, Integer> {

    Optional<Pracownik> findFirstByLogin(String login);

    boolean existsByLogin(String login);
}
