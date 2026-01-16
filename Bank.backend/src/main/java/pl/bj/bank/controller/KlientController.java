package pl.bj.bank.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.bj.bank.dto.*;
import pl.bj.bank.model.Klient;
import pl.bj.bank.model.Konto;
import pl.bj.bank.service.KlientService;
import pl.bj.bank.repository.KontoRepository;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/klienci")
@RequiredArgsConstructor
@Slf4j
public class KlientController {

    private final KlientService klientService;
    private final KontoRepository kontoRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody KlientLoginRequest req, HttpServletRequest request) {
        var klientOpt = klientService.loginKlient(req.getPesel(), req.getPin());
        if (klientOpt.isPresent()) {
            var k = klientOpt.get();

            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(k.getPesel(), null, Collections.emptyList());
            SecurityContextHolder.getContext().setAuthentication(authToken);

            HttpSession session = request.getSession(true);
            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

            KlientLoginResponse r = new KlientLoginResponse();
            r.setId(k.getId());
            r.setImie(k.getImie());
            r.setNazwisko(k.getNazwisko());
            r.setPesel(k.getPesel());
            r.setTypKlienta(k.getTypKlienta());
            r.setStatusKonta(k.getStatusKonta());
            r.setNrTel(k.getNrTel());
            r.setMail(k.getMail());

            return ResponseEntity.ok(r);
        }
        return ResponseEntity.status(401).build();
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        klientService.logout(null);
        return ResponseEntity.ok("Wylogowano");
    }

    @PostMapping
    public ResponseEntity<KlientResponse> create(@RequestBody CreateKlientRequest req) {
        var klient = klientService.create(req);
        KlientResponse r = new KlientResponse();
        r.setId(klient.getId());
        r.setImie(klient.getImie());
        r.setNazwisko(klient.getNazwisko());
        r.setPesel(klient.getPesel());
        r.setTypKlienta(klient.getTypKlienta());
        r.setStatusKonta(klient.getStatusKonta());
        r.setNrTel(klient.getNrTel());
        r.setMail(klient.getMail());
        r.setNarodowosc(klient.getNarodowosc());
        return ResponseEntity.ok(r);
    }

    @GetMapping
    public ResponseEntity<List<KlientResponse>> getAll() {
        var klienci = klientService.getAll();
        var resp = klienci.stream().map(k -> {
            KlientResponse r = new KlientResponse();
            r.setId(k.getId());
            r.setImie(k.getImie());
            r.setNazwisko(k.getNazwisko());
            r.setPesel(k.getPesel());
            r.setTypKlienta(k.getTypKlienta());
            r.setStatusKonta(k.getStatusKonta());
            r.setNrTel(k.getNrTel());
            r.setMail(k.getMail());
            r.setNarodowosc(k.getNarodowosc());
            return r;
        }).toList();
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/me")
    public ResponseEntity<KlientResponse> getMe() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) return ResponseEntity.status(401).build();

        var klientOpt = klientService.getByPesel(auth.getName());
        if (klientOpt.isEmpty()) return ResponseEntity.status(404).build();

        var k = klientOpt.get();
        KlientResponse r = new KlientResponse();
        r.setId(k.getId());
        r.setImie(k.getImie());
        r.setNazwisko(k.getNazwisko());
        r.setPesel(k.getPesel());
        r.setTypKlienta(k.getTypKlienta());
        r.setStatusKonta(k.getStatusKonta());
        r.setNrTel(k.getNrTel());
        r.setMail(k.getMail());
        r.setNarodowosc(k.getNarodowosc());

        return ResponseEntity.ok(r);
    }

    @GetMapping("/{id}")
    public ResponseEntity<KlientResponse> getById(@PathVariable Long id) {
        var klientOpt = klientService.getById(id);
        if (klientOpt.isEmpty()) return ResponseEntity.status(404).build();

        var k = klientOpt.get();
        KlientResponse r = new KlientResponse();
        r.setId(k.getId());
        r.setImie(k.getImie());
        r.setNazwisko(k.getNazwisko());
        r.setPesel(k.getPesel());
        r.setTypKlienta(k.getTypKlienta());
        r.setStatusKonta(k.getStatusKonta());
        r.setNrTel(k.getNrTel());
        r.setMail(k.getMail());
        r.setNarodowosc(k.getNarodowosc());

        return ResponseEntity.ok(r);
    }

    // Ten endpoint działa poprawnie, nic tu nie zmieniamy
    @PutMapping("/{id}/status")
    public ResponseEntity<?> changeStatus(@PathVariable Long id, @RequestBody ChangeKlientStatusRequest req) {
        try {
            Klient klient = klientService.changeStatus(id, req.getStatusKonta());

            KlientResponse r = new KlientResponse();
            r.setId(klient.getId());
            r.setImie(klient.getImie());
            r.setNazwisko(klient.getNazwisko());
            r.setPesel(klient.getPesel());
            r.setTypKlienta(klient.getTypKlienta());
            r.setStatusKonta(klient.getStatusKonta());
            r.setNrTel(klient.getNrTel());
            r.setMail(klient.getMail());
            r.setNarodowosc(klient.getNarodowosc());

            return ResponseEntity.ok(r);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Endpoint akcji klienta
    @PutMapping("/{id}/action")
    public ResponseEntity<?> changeKlientAction(
            @PathVariable Long id,
            @RequestBody ChangeKlientActionRequest req
    ) {
        try {
            Klient klient = klientService.executeAction(id, req.getAction());

            KlientResponse r = new KlientResponse();
            r.setId(klient.getId());
            r.setImie(klient.getImie());
            r.setNazwisko(klient.getNazwisko());
            r.setPesel(klient.getPesel());
            r.setTypKlienta(klient.getTypKlienta());
            r.setStatusKonta(klient.getStatusKonta());
            r.setNrTel(klient.getNrTel());
            r.setMail(klient.getMail());
            r.setNarodowosc(klient.getNarodowosc());

            return ResponseEntity.ok(r);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/klienci/konto/{nrKonta}")
public Konto getKontoByNr(@PathVariable Long nrKonta) {
    return kontoRepository.findByNrKonta(nrKonta)
            .orElseThrow(() -> new IllegalArgumentException("Konto nie istnieje"));
}


}
