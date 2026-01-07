package pl.bj.bank.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.bj.bank.model.Adres;
import pl.bj.bank.repository.AdresRepository;

import java.util.List;

@RestController
@RequestMapping("/api/adresy")
@RequiredArgsConstructor
public class AdresController {

    private final AdresRepository adresRepository;

    @GetMapping
    public ResponseEntity<List<Adres>> getAll() {
        return ResponseEntity.ok(adresRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Adres> create(@RequestBody Adres adres) {
        java.util.Objects.requireNonNull(adres, "adres");
        Adres saved = adresRepository.save(adres);
        return ResponseEntity.status(201).body(saved);
    }
}
