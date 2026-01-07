package pl.bj.bank.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.bj.bank.dto.CreateKlientRequest;
import pl.bj.bank.mapper.KlientMapper;
import pl.bj.bank.model.Klient;
import pl.bj.bank.repository.KlientRepository;
import pl.bj.bank.repository.KontoRepository;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class KlientService {

    private final KlientRepository klientRepository;
    private final KlientMapper klientMapper;
    private final PasswordEncoder passwordEncoder;
    private final KontoRepository kontoRepository;

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
        return klientRepository.findByPesel(pesel)
                .filter(k -> "AKTYWNY".equals(k.getStatusKonta()))
                .filter(k -> k.getPinHash() != null && passwordEncoder.matches(pin, k.getPinHash()));
    }

    public Optional<Klient> getById(Long id) {
        if (id == null) return Optional.empty();
        return klientRepository.findById(id);
    }

    public List<pl.bj.bank.model.Konto> getKontaForKlient(Long klientId) {
        return kontoRepository.findByKlientId(klientId);
    }

}

