package pl.bj.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.bj.bank.model.Ustawienia2FA;

public interface Ustawienia2FARepository extends JpaRepository<Ustawienia2FA, Integer> {
}
