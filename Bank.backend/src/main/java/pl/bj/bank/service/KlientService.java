package pl.bj.bank.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import pl.bj.bank.dto.CreateKlientRequest;
import pl.bj.bank.mapper.KlientMapper;
import pl.bj.bank.model.Klient;
import pl.bj.bank.model.SesjeKlienta;
import pl.bj.bank.repository.KlientRepository;
import pl.bj.bank.repository.KontoRepository;
import pl.bj.bank.repository.SesjeKlientaRepository;

import java.time.LocalDateTime;

import java.util.List;
import java.util.Optional;

@Slf4j 
@Service
@RequiredArgsConstructor
public class KlientService {

    private final KlientRepository klientRepository;
    private final KlientMapper klientMapper;
    private final PasswordEncoder passwordEncoder;
    private final KontoRepository kontoRepository;
    private final SesjeKlientaRepository sesjeKlientaRepository;

    public Klient create(CreateKlientRequest dto) {
        // check if PESEL already exists
        if (dto.getPesel() != null && !dto.getPesel().isBlank()) {
            if (klientRepository.findByPesel(dto.getPesel()).isPresent()) {
                throw new IllegalArgumentException("Klient z podanym PESEL już istnieje");
            }
        }

        Klient klient = klientMapper.toEntity(dto);
        java.util.Objects.requireNonNull(klient, "klient");
        return klientRepository.save(klient);
    }
    
    public List<Klient> getAll() {
        return klientRepository.findAll();
    }

    public Optional<Klient> loginKlient(String pesel, String pin) {
        Optional<Klient> klientOpt = klientRepository.findByPesel(pesel)
                .filter(k -> "AKTYWNY".equals(k.getStatusKonta()))
                .filter(k -> k.getPinHash() != null && passwordEncoder.matches(pin, k.getPinHash()));

        if (klientOpt.isPresent()) {
            Klient klient = klientOpt.get();

            SesjeKlienta sesja = new SesjeKlienta();
            sesja.setKlient(klient);
            sesja.setTokenSesji("no-token"); // Placeholder since tokens are removed
            sesja.setDataLogowania(LocalDateTime.now());
            sesja.setAdresIp("unknown"); // Można rozszerzyć o pobieranie IP z requestu
            sesja.setUrzadzenie("unknown"); // Można rozszerzyć o pobieranie user-agent

            try {
                sesjeKlientaRepository.save(sesja);
            } catch (Exception e) {
                log.error("Failed to save session for klient {}: {}", klient.getPesel(), e.getMessage());
            }

            return klientOpt;
        }
        return Optional.empty();
    }

    public Optional<Klient> getById(Long id) {
        if (id == null) return Optional.empty();
        return klientRepository.findById(id);
    }

    public List<pl.bj.bank.model.Konto> getKontaForKlient(Long klientId) {
        return kontoRepository.findByKlientId(klientId);
    }

    public void logout(String token) {
        Optional<SesjeKlienta> sesjaOpt = sesjeKlientaRepository.findByTokenSesji(token);
        if (sesjaOpt.isPresent()) {
            SesjeKlienta sesja = sesjaOpt.get();
            sesja.setDataWylogowania(LocalDateTime.now());
            sesjeKlientaRepository.save(sesja);
        }
    }

    public Optional<Klient> getByPesel(String pesel) {
        return klientRepository.findByPesel(pesel);
    }
    public Klient changeStatus(Long id, String newStatus) {
    Klient klient = klientRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Klient nie istnieje"));

    String current = klient.getStatusKonta();

    if ("ZAMKNIĘTY".equals(current)) {
        throw new IllegalStateException("Nie można zmienić statusu klienta zamkniętego");
    }

    if (current.equals(newStatus)) {
        return klient;
    }

    boolean allowed = switch (current) {
        case "AKTYWNY" -> newStatus.equals("ZABLOKOWANY") || newStatus.equals("ZAMKNIĘTY");
        case "ZABLOKOWANY" -> newStatus.equals("AKTYWNY") || newStatus.equals("ZAMKNIĘTY");
        default -> false;
    };

    if (!allowed) {
        throw new IllegalArgumentException("Niedozwolona zmiana statusu: " + current + " -> " + newStatus);
    }

    klient.setStatusKonta(newStatus);
    return klientRepository.save(klient);
}


}

