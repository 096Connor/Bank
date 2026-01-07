package pl.bj.bank.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pl.bj.bank.dto.CreateKlientRequest;
import pl.bj.bank.dto.KlientLoginRequest;
import pl.bj.bank.dto.KlientResponse;
import pl.bj.bank.model.Klient;
import pl.bj.bank.service.KlientService;

import java.util.List;

@RestController
@RequestMapping("/api/klienci")
@RequiredArgsConstructor
public class KlientController {

    private final KlientService klientService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody CreateKlientRequest request) {
        try {
            Klient saved = klientService.create(request);
            return ResponseEntity.ok(saved);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(500).body("Błąd serwera");
        }
    }

    @GetMapping
    public List<Klient> getAll() {
        return klientService.getAll();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody KlientLoginRequest req) {
        return klientService.loginKlient(req.getPesel(), req.getPin())
                .map(k -> {
                    KlientResponse r = new KlientResponse();
                    r.setId(k.getId());
                    r.setImie(k.getImie());
                    r.setNazwisko(k.getNazwisko());
                    r.setPesel(k.getPesel());
                    r.setTypKlienta(k.getTypKlienta());
                    r.setStatusKonta(k.getStatusKonta());
                    r.setNrTel(k.getNrTel());
                    r.setMail(k.getMail());
                    return ResponseEntity.ok(r);
                })
                .orElseGet(() -> ResponseEntity.status(401).build());
    }

    @GetMapping("/hash/{pin}")
    public ResponseEntity<String> getHash(@PathVariable String pin) {
        String hash = passwordEncoder.encode(pin);
        return ResponseEntity.ok(hash);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return klientService.getById(id)
                .map(k -> {
                    KlientResponse r = new KlientResponse();
                    r.setId(k.getId());
                    r.setImie(k.getImie());
                    r.setNazwisko(k.getNazwisko());
                    r.setPesel(k.getPesel());
                    r.setTypKlienta(k.getTypKlienta());
                    r.setStatusKonta(k.getStatusKonta());
                    r.setNrTel(k.getNrTel());
                    r.setMail(k.getMail());
                    return ResponseEntity.ok(r);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/konta")
    public ResponseEntity<?> getKonta(@PathVariable Long id) {
        try {
            List<pl.bj.bank.model.Konto> konta = klientService.getKontaForKlient(id);
            List<pl.bj.bank.dto.KontoResponse> resp = konta.stream().map(k -> {
                pl.bj.bank.dto.KontoResponse kr = new pl.bj.bank.dto.KontoResponse();
                kr.setNrKonta(k.getNrKonta());
                kr.setSaldo(k.getSaldo());
                kr.setWaluta(k.getWaluta());
                kr.setStatus(k.getStatus());
                kr.setTypKonta(k.getTypKonta() != null ? k.getTypKonta().toString() : null);
                return kr;
            }).toList();
            return ResponseEntity.ok(resp);
        } catch (Exception ex) {
            return ResponseEntity.status(500).body("Błąd serwera");
        }
    }
}

