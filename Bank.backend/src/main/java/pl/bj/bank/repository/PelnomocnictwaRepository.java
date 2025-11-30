package pl.bj.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.bj.bank.model.Pelnomocnictwa;

public interface PelnomocnictwaRepository extends JpaRepository<Pelnomocnictwa, Integer> {
}
