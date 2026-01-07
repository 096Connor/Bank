package pl.bj.bank.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.bj.bank.dto.CreatePracownikRequest;
import pl.bj.bank.model.Pracownik;
import pl.bj.bank.repository.OddzialRepository;
import pl.bj.bank.repository.PracownikRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PracownikService {

    private final PracownikRepository pracownikRepository;
    private final OddzialRepository oddzialRepository;
    private final PasswordEncoder passwordEncoder;

    @SuppressWarnings("null")
    public Pracownik register(CreatePracownikRequest dto) {

        if (pracownikRepository.existsByLogin(dto.getLogin())) {
            throw new RuntimeException("Login już istnieje");
        }

        Pracownik p = new Pracownik();
        p.setImie(dto.getImie());
        p.setNazwisko(dto.getNazwisko());
        p.setStanowisko(dto.getStanowisko());
        p.setLogin(dto.getLogin());

        // 🔐 ARGON2
        p.setHasloHash(passwordEncoder.encode(dto.getHaslo()));

        java.util.Objects.requireNonNull(dto.getOddzial(), "oddzial");
        p.setOddzial(
            oddzialRepository.findById(dto.getOddzial())
                .orElseThrow(() -> new RuntimeException("Oddział nie istnieje"))
        );

        p.setDataZatrudnienia(dto.getDataZatrudnienia());
        p.setAktywny(dto.getAktywny());

        return pracownikRepository.save(p);
    }

    public Optional<Pracownik> login(String login, String haslo) {

        return pracownikRepository.findFirstByLogin(login)
                .filter(p -> passwordEncoder.matches(haslo, p.getHasloHash()));
    }
}

