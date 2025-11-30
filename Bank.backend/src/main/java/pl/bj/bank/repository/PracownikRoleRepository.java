package pl.bj.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.bj.bank.model.PracownikRole;
import pl.bj.bank.model.PracownikRoleId;

public interface PracownikRoleRepository extends JpaRepository<PracownikRole, PracownikRoleId> {
}
