package pl.bj.bank.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import pl.bj.bank.model.Pracownik;
import pl.bj.bank.repository.PracownikRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

// @Component  // Disabled - causes hang on startup
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final PracownikRepository pracownikRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        String adminLogin = "admin";
        if (pracownikRepository.existsByLogin(adminLogin)) {
            return;
        }

        Pracownik p = new Pracownik();
        p.setImie("Admin");
        p.setNazwisko("Admin");
        p.setStanowisko("Administrator");
        p.setLogin(adminLogin);
        p.setHasloHash(passwordEncoder.encode("CON"));
        p.setDataZatrudnienia(LocalDate.now());
        p.setAktywny(true);

        pracownikRepository.save(p);
    }
}
