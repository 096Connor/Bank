package pl.bj.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.bj.bank.model.AudytDostepu;

public interface AudytDostepuRepository extends JpaRepository<AudytDostepu, Integer> {
}
