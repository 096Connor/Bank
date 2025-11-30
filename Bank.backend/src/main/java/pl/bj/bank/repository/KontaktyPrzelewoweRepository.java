package pl.bj.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.bj.bank.model.KontaktyPrzelewowe;

public interface KontaktyPrzelewoweRepository extends JpaRepository<KontaktyPrzelewowe, Integer> {
}
