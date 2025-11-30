package pl.bj.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.bj.bank.model.HistoriaZmianDanych;

public interface HistoriaZmianDanychRepository extends JpaRepository<HistoriaZmianDanych, Integer> {
}
