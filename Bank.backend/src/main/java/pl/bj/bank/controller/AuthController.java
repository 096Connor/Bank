package pl.bj.bank.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.bj.bank.dto.LoginRequest;
import pl.bj.bank.dto.PracownikResponse;
import pl.bj.bank.dto.CreatePracownikRequest;
import pl.bj.bank.model.Pracownik;
import pl.bj.bank.service.PracownikService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final PracownikService pracownikService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        return pracownikService.login(req.getLogin(), req.getHaslo())
                .map(p -> {
                    PracownikResponse r = new PracownikResponse();
                    r.setIdPracownika(p.getIdPracownika());
                    r.setImie(p.getImie());
                    r.setNazwisko(p.getNazwisko());
                    r.setStanowisko(p.getStanowisko());
                    r.setLogin(p.getLogin());
                    r.setAktywny(p.getAktywny());
                    return ResponseEntity.ok(r);
                })
                .orElseGet(() -> ResponseEntity.status(401).build());
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody CreatePracownikRequest req) {
        try {
            Pracownik p = pracownikService.register(req);
            PracownikResponse r = new PracownikResponse();
            r.setIdPracownika(p.getIdPracownika());
            r.setImie(p.getImie());
            r.setNazwisko(p.getNazwisko());
            r.setStanowisko(p.getStanowisko());
            r.setLogin(p.getLogin());
            r.setAktywny(p.getAktywny());
            return ResponseEntity.status(201).body(r);
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
}
