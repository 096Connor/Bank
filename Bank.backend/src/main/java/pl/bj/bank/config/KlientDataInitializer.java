package pl.bj.bank.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import pl.bj.bank.model.Klient;
import pl.bj.bank.repository.KlientRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class KlientDataInitializer implements CommandLineRunner {

    private final KlientRepository klientRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        String testPesel = "12345678901";
        if (klientRepository.findByPesel(testPesel).isPresent()) {
            return;
        }

        Klient k = new Klient();
        k.setImie("Test");
        k.setNazwisko("Klient");
        k.setDataUrodzenia(LocalDate.of(1990, 1, 1));
        k.setPesel(testPesel);
        k.setTypKlienta("STANDARD");
        k.setDataRejestracji(LocalDate.now());
        k.setStatusKonta("AKTYWNY");
        k.setNrTel("123456789");
        k.setMail("test@example.com");
        k.setNarodowosc("Polska");
        k.setPinHash(passwordEncoder.encode("1234"));

        klientRepository.save(k);
    }
}
