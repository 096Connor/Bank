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

    /**
     * Logowanie pracownika - zwraca obiekt pracownika
     */
    public Optional<Pracownik> loginPracownik(String login, String haslo) {
        return pracownikRepository.findFirstByLogin(login)
                .filter(p -> p.getAktywny()) // Sprawdź czy pracownik jest aktywny
                .filter(p -> passwordEncoder.matches(haslo, p.getHasloHash()));
    }

    /**
     * Pobieranie pracownika po loginie
     */
    public Optional<Pracownik> getByLogin(String login) {
        return pracownikRepository.findFirstByLogin(login);
    }

    /**
     * Wylogowanie - unieważnienie tokena
     * (opcjonalnie, jeśli używasz blacklisty tokenów)
     */
    public void logout(String token) {
        // TODO: Dodaj token do blacklisty jeśli implementujesz tę funkcjonalność
        // Na razie pusty - tokeny JWT są bezstanowe
    }

    /**
     * Stara metoda logowania - zachowana dla kompatybilności
     * @deprecated Użyj loginPracownik() która zwraca token JWT
     */
    @Deprecated
    public Optional<Pracownik> login(String login, String haslo) {
        return pracownikRepository.findFirstByLogin(login)
                .filter(p -> passwordEncoder.matches(haslo, p.getHasloHash()));
    }
}