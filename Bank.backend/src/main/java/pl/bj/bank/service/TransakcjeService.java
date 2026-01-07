package pl.bj.bank.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.bj.bank.dto.CreateTransakcjaRequest;
import pl.bj.bank.model.Konto;
import pl.bj.bank.model.Transakcje;
import pl.bj.bank.repository.KontoRepository;
import pl.bj.bank.repository.TransakcjeRepository;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransakcjeService {

    private final KontoRepository kontoRepository;
    private final TransakcjeRepository transakcjeRepository;

    @Transactional
    @SuppressWarnings("null")
    public Transakcje createTransfer(CreateTransakcjaRequest req) {
        if (req.getKwota() == null || req.getKwota() <= 0) {
            throw new IllegalArgumentException("Nieprawidłowa kwota");
        }

        Objects.requireNonNull(req.getFromKontoId(), "fromKontoId");
        Objects.requireNonNull(req.getToKontoId(), "toKontoId");

        Konto from = kontoRepository.findById(req.getFromKontoId())
                .orElseThrow(() -> new IllegalArgumentException("Konto nadawcy nie istnieje"));
        Konto to = kontoRepository.findById(req.getToKontoId())
                .orElseThrow(() -> new IllegalArgumentException("Konto odbiorcy nie istnieje"));

        double amount = req.getKwota();
        if (from.getSaldo() == null) from.setSaldo(0.0);
        if (to.getSaldo() == null) to.setSaldo(0.0);

        if (from.getSaldo() < amount) {
            throw new IllegalArgumentException("Niewystarczające środki na koncie nadawcy");
        }

        // debit and credit
        from.setSaldo(from.getSaldo() - amount);
        to.setSaldo(to.getSaldo() + amount);

        kontoRepository.save(from);
        kontoRepository.save(to);

        // create transaction record for sender
        Transakcje out = new Transakcje();
        out.setKonto(from);
        out.setDataTransakcji(LocalDateTime.now());
        out.setTypTransakcji("TRANSFER_OUT");
        out.setKwota(-amount);
        out.setWaluta(req.getWaluta());
        out.setOpis(req.getOpis());
        out.setSaldoPo(from.getSaldo());
        out.setStatus("ZREALIZOWANA");
        transakcjeRepository.save(out);

        // create transaction record for receiver
        Transakcje in = new Transakcje();
        in.setKonto(to);
        in.setDataTransakcji(LocalDateTime.now());
        in.setTypTransakcji("TRANSFER_IN");
        in.setKwota(amount);
        in.setWaluta(req.getWaluta());
        in.setOpis(req.getOpis());
        in.setSaldoPo(to.getSaldo());
        in.setStatus("ZREALIZOWANA");
        transakcjeRepository.save(in);

        // try to set relatedAccount for each record by saving reference in opis (simple approach)
        // NOTE: for a robust solution, add a relation column linking paired transactions

        return out;
    }

    public List<Transakcje> getForKonto(Long nrKonta) {
        return transakcjeRepository.findByKontoNrKontaOrderByDataTransakcjiDesc(nrKonta);
    }
}
