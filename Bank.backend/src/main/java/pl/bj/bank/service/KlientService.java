package pl.bj.bank.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import pl.bj.bank.dto.CreateKlientRequest;
import pl.bj.bank.dto.CreateTransakcjaRequest;
import pl.bj.bank.dto.KontoResponse;
import pl.bj.bank.mapper.KlientMapper;
import pl.bj.bank.model.Klient;
import pl.bj.bank.model.Konto;
import pl.bj.bank.model.SesjeKlienta;
import pl.bj.bank.model.Transakcje;
import pl.bj.bank.model.TypyKont;
import pl.bj.bank.repository.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
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
    private final TypyKontRepository typyKontRepository;
    private final TransakcjeRepository transakcjeRepository;
    @PersistenceContext
private EntityManager em;


    // 🔹 Tworzenie konta – bez zmian
    public Konto createKonto(Long klientId, double oprocentowanie, Long idTypuKonta) {
        Klient k = klientRepository.findById(klientId)
                .orElseThrow(() -> new RuntimeException("Klient nie istnieje"));

        Konto konto = new Konto();
        konto.setKlient(k);
        konto.setOprocentowanie(oprocentowanie);
        konto.setSaldo(0.0);
        konto.setStatus("AKTYWNE");
        konto.setWaluta("PLN");
        konto.setDataOtwarcia(LocalDate.now());

        if (idTypuKonta != null) {
            TypyKont typKonta = typyKontRepository.findById(idTypuKonta)
                    .orElseThrow(() -> new RuntimeException("Typ konta nie istnieje"));
            konto.setTypKonta(typKonta);
        }

        return kontoRepository.save(konto);
    }

    // 🔹 Zmiana statusu konta – poprawione literówki
    public Konto changeKontoStatus(Long kontoId, String newStatus) {
        Konto konto = kontoRepository.findById(kontoId)
                .orElseThrow(() -> new RuntimeException("Konto nie istnieje"));

        String current = konto.getStatus();

        if ("ZAMKNIĘTY".equals(current)) {
            throw new IllegalStateException("Nie można zmienić statusu konta zamkniętego");
        }

        if (current.equals(newStatus)) return konto;

        boolean allowed = switch (current) {
            case "AKTYWNE" -> newStatus.equals("ZABLOKOWANY") || newStatus.equals("ZAMKNIĘTY");
            case "ZABLOKOWANY" -> newStatus.equals("AKTYWNE") || newStatus.equals("ZAMKNIĘTY");
            default -> false;
        };

        if (!allowed) throw new IllegalArgumentException("Niedozwolona zmiana statusu: " + current + " -> " + newStatus);

        konto.setStatus(newStatus);
        if ("ZAMKNIĘTY".equals(newStatus)) {
            konto.setDataZamkniecia(LocalDate.now());
        }

        return kontoRepository.save(konto);
    }

    // 🔹 Tworzenie klienta
    public Klient create(CreateKlientRequest dto) {
        if (dto.getPesel() != null && !dto.getPesel().isBlank()) {
            if (klientRepository.findByPesel(dto.getPesel()).isPresent()) {
                throw new IllegalArgumentException("Klient z podanym PESEL już istnieje");
            }
        }

        Klient klient = klientMapper.toEntity(dto);
        Objects.requireNonNull(klient, "klient");
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
            sesja.setTokenSesji("no-token");
            sesja.setDataLogowania(LocalDateTime.now());
            sesja.setAdresIp("unknown");
            sesja.setUrzadzenie("unknown");

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

    public List<Konto> getKontaForKlient(Long klientId) {
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

    // 🔹 Zmiana statusu klienta – poprawione literówki
    public Klient changeStatus(Long id, String newStatus) {
        Klient klient = klientRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Klient nie istnieje"));

        String current = klient.getStatusKonta();

        if ("ZAMKNIĘTY".equals(current)) {
            throw new IllegalStateException("Nie można zmienić statusu klienta zamkniętego");
        }

        if (current.equals(newStatus)) return klient;

        boolean allowed = switch (current) {
            case "AKTYWNY" -> newStatus.equals("ZABLOKOWANY") || newStatus.equals("ZAMKNIĘTY");
            case "ZABLOKOWANY" -> newStatus.equals("AKTYWNY") || newStatus.equals("ZAMKNIĘTY");
            default -> false;
        };

        if (!allowed) throw new IllegalArgumentException("Niedozwolona zmiana statusu: " + current + " -> " + newStatus);

        klient.setStatusKonta(newStatus);
        return klientRepository.save(klient);
    }

    public List<KontoResponse> mapToKontoResponse(List<Konto> konta) {
        return konta.stream().map(k -> {
            KontoResponse kr = new KontoResponse();
            kr.setNrKonta(k.getNrKonta());
            kr.setSaldo(k.getSaldo());
            kr.setWaluta(k.getWaluta());
            kr.setStatus(k.getStatus());
            kr.setOprocentowanie(k.getOprocentowanie());
            kr.setDataOtwarcia(k.getDataOtwarcia());
            kr.setDataZamkniecia(k.getDataZamkniecia());
            if (k.getTypKonta() != null) {
                kr.setTypKonta(k.getTypKonta().getNazwaTypu());
                kr.setNazwaKonta(k.getTypKonta().getNazwaTypu());
                kr.setOpis(k.getTypKonta().getOpis());
            }
            return kr;
        }).toList();
    }

    public Konto wplacNaKonto(Long kontoId, Double kwota) {
        if (kwota == null || kwota <= 0) {
            throw new IllegalArgumentException("Kwota musi być większa od zera");
        }

        Konto konto = kontoRepository.findById(kontoId)
                .orElseThrow(() -> new RuntimeException("Konto nie istnieje"));

        if (!"AKTYWNE".equals(konto.getStatus())) {
            throw new IllegalArgumentException(
                    "Nie można wpłacić środków na konto o statusie: " + konto.getStatus()
            );
        }

        if (konto.getSaldo() == null) {
            konto.setSaldo(0.0);
        }

        konto.setSaldo(konto.getSaldo() + kwota);
        kontoRepository.save(konto);

        Transakcje t = new Transakcje();
        t.setKonto(konto);
        t.setDataTransakcji(LocalDateTime.now());
        t.setTypTransakcji("DEPOSIT");
        t.setKwota(kwota);
        t.setWaluta("PLN");
        t.setOpis("Wpłata środków");
        t.setSaldoPo(konto.getSaldo());
        t.setStatus("ZREALIZOWANA");

        transakcjeRepository.save(t);

        return konto;
    }

@Transactional
public Transakcje createTransfer(CreateTransakcjaRequest req) {
    if (req.getKwota() == null || req.getKwota() <= 0) {
        throw new IllegalArgumentException("Kwota musi być większa od zera");
    }

    Objects.requireNonNull(req.getFromKontoId(), "fromKontoId");
    Objects.requireNonNull(req.getToKontoId(), "toKontoId");

    if (req.getFromKontoId().equals(req.getToKontoId())) {
        throw new IllegalArgumentException("Nie można wykonać przelewu na to samo konto");
    }

    // 🔹 Pobierz konta na świeżo z bazy
    Konto from = kontoRepository.findById(req.getFromKontoId())
            .orElseThrow(() -> new IllegalArgumentException("Konto nadawcy nie istnieje"));
    Konto to = kontoRepository.findById(req.getToKontoId())
            .orElseThrow(() -> new IllegalArgumentException("Konto odbiorcy nie istnieje"));

    // 🔹 Pobierz klienta odbiorcy i sprawdź jego status
    Klient toKlient = to.getKlient();
    if ("ZABLOKOWANY".equals(toKlient.getStatusKonta()) || "ZAMKNIĘTY".equals(toKlient.getStatusKonta())) {
        throw new IllegalArgumentException(
                "Nie można wykonać przelewu na konto klienta o statusie: " + toKlient.getStatusKonta()
        );
    }

    // 🔹 Sprawdź status kont
    if (!"AKTYWNE".equals(from.getStatus())) {
        throw new IllegalArgumentException(
                "Nie można wykonać przelewu z konta o statusie: " + from.getStatus()
        );
    }

    if (!"AKTYWNE".equals(to.getStatus())) {
        throw new IllegalArgumentException(
                "Nie można wykonać przelewu na konto o statusie: " + to.getStatus()
        );
    }

    double amount = req.getKwota();
    if (from.getSaldo() == null) from.setSaldo(0.0);
    if (to.getSaldo() == null) to.setSaldo(0.0);

    if (from.getSaldo() < amount) {
        throw new IllegalArgumentException("Niewystarczające środki na koncie nadawcy");
    }

    from.setSaldo(from.getSaldo() - amount);
    to.setSaldo(to.getSaldo() + amount);

    kontoRepository.save(from);
    kontoRepository.save(to);

    LocalDateTime now = LocalDateTime.now();

    Transakcje out = new Transakcje();
    out.setKonto(from);
    out.setDataTransakcji(now);
    out.setTypTransakcji("TRANSFER_OUT");
    out.setKwota(-amount);
    out.setWaluta(req.getWaluta());
    out.setOpis(req.getOpis());
    out.setSaldoPo(from.getSaldo());
    out.setStatus("ZREALIZOWANA");
    transakcjeRepository.save(out);

    Transakcje in = new Transakcje();
    in.setKonto(to);
    in.setDataTransakcji(now);
    in.setTypTransakcji("TRANSFER_IN");
    in.setKwota(amount);
    in.setWaluta(req.getWaluta());
    in.setOpis(req.getOpis());
    in.setSaldoPo(to.getSaldo());
    in.setStatus("ZREALIZOWANA");
    transakcjeRepository.save(in);

    return out;
}




    // 🔹 Akcje klienta – poprawione literówki i dodano ODBLOKUJ
    @Transactional
    public Klient executeAction(Long klientId, String action) {

        Klient klient = klientRepository.findById(klientId)
                .orElseThrow(() -> new IllegalArgumentException("Klient nie istnieje"));

        if ("ZAMKNIĘTY".equals(klient.getStatusKonta())) {
            throw new IllegalStateException("Klient jest już zamknięty");
        }

        List<Konto> konta = kontoRepository.findByKlientId(klientId);

        switch (action) {
            case "ZABLOKUJ" -> {
                klient.setStatusKonta("ZABLOKOWANY");
                for (Konto konto : konta) {
                    if (!"ZAMKNIĘTY".equals(konto.getStatus())) {
                        konto.setStatus("ZABLOKOWANY");
                    }
                }
            }

            case "ZAMKNIJ" -> {
                klient.setStatusKonta("ZAMKNIĘTY");
                for (Konto konto : konta) {
                    if (!"ZAMKNIĘTY".equals(konto.getStatus())) {
                        konto.setStatus("ZAMKNIĘTY");
                        konto.setDataZamkniecia(LocalDate.now());
                    }
                }
            }

            case "ODBLOKUJ" -> {
                klient.setStatusKonta("AKTYWNY");
                for (Konto konto : konta) {
                    if ("ZABLOKOWANY".equals(konto.getStatus())) {
                        konto.setStatus("AKTYWNE");
                    }
                }
            }

            default -> throw new IllegalArgumentException("Nieznana akcja: " + action);
        }

        kontoRepository.saveAll(konta);
        return klientRepository.save(klient);
    }
}
