package pl.bj.bank.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.bj.bank.model.Oddzial;
import pl.bj.bank.repository.OddzialRepository;
import java.util.List;

@RestController
@RequestMapping("/api/oddzialy")
@RequiredArgsConstructor
public class OddzialController {

    private final OddzialRepository oddzialRepository;

    @GetMapping
    public ResponseEntity<List<Oddzial>> getAll() {
        return ResponseEntity.ok(oddzialRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Oddzial> getById(@PathVariable Integer id) {
        java.util.Objects.requireNonNull(id);
        return oddzialRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
