package pl.bj.bank.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.bj.bank.dto.CreateKlientRequest;
import pl.bj.bank.dto.KlientLoginRequest;
import pl.bj.bank.dto.KlientLoginResponse;
import pl.bj.bank.dto.KlientResponse;
import pl.bj.bank.dto.KontoResponse;
import pl.bj.bank.model.Klient;
import pl.bj.bank.service.KlientService;
import jakarta.validation.Valid;
import pl.bj.bank.dto.ChangeKlientStatusRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.util.Collections;


import java.util.List;

@RestController
@RequestMapping("/api/klienci")
@RequiredArgsConstructor
@Slf4j
public class KlientController {

    private final KlientService klientService;

    @PostMapping("/login")
public ResponseEntity<?> login(@Valid @RequestBody KlientLoginRequest req, HttpServletRequest request) {
    log.info("Login attempt for PESEL: {}", req.getPesel());
    var klientOpt = klientService.loginKlient(req.getPesel(), req.getPin());
    if (klientOpt.isPresent()) {
        var k = klientOpt.get();
        
        // ⭐ WAŻNE: Ustaw autentykację w Spring Security
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
            k.getPesel(), 
            null, 
            Collections.emptyList() // Możesz dodać role tutaj jeśli potrzebne
        );
        SecurityContextHolder.getContext().setAuthentication(authToken);
        
        // Zapisz sesję
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
        r.setNarodowosc(klient.getNarodowosc()); // ← DODANE
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
            r.setNarodowosc(k.getNarodowosc()); // ← DODANE
            return r;
        }).toList();
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/me")
    public ResponseEntity<KlientResponse> getMe() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }

        String pesel = auth.getName();
        var klientOpt = klientService.getByPesel(pesel);

        if (klientOpt.isEmpty()) {
            return ResponseEntity.status(404).build();
        }

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
        r.setNarodowosc(k.getNarodowosc()); // ← DODANE

        return ResponseEntity.ok(r);
    }

    @GetMapping("/me/konta")
    public ResponseEntity<?> getMyKonta() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(401).body("Brak autoryzacji");
        }

        String pesel = auth.getName();
        var klientOpt = klientService.getByPesel(pesel);

        if (klientOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Nie znaleziono klienta");
        }

        Long klientId = klientOpt.get().getId();
        List<pl.bj.bank.model.Konto> konta = klientService.getKontaForKlient(klientId);

        List<KontoResponse> resp = konta.stream().map(k -> {
            KontoResponse kr = new KontoResponse();
            kr.setNrKonta(k.getNrKonta());
            kr.setSaldo(k.getSaldo());
            kr.setWaluta(k.getWaluta());
            kr.setStatus(k.getStatus());
            kr.setDataOtwarcia(k.getDataOtwarcia());
            kr.setDataZamkniecia(k.getDataZamkniecia());
            kr.setOprocentowanie(k.getOprocentowanie());
            
            if (k.getTypKonta() != null) {
                kr.setTypKonta(k.getTypKonta().getNazwaTypu());
                kr.setNazwaKonta(k.getTypKonta().getNazwaTypu());
                kr.setOpis(k.getTypKonta().getOpis());
            }
            
            return kr;
        }).toList();

        return ResponseEntity.ok(resp);
    }

    @GetMapping("/{id}/konta")
public ResponseEntity<?> getKontaForKlient(@PathVariable Long id) {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    if (auth == null || !auth.isAuthenticated()) {
        return ResponseEntity.status(401).body("Brak autoryzacji");
    }

        var klientOpt = klientService.getById(id);
        if (klientOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Nie znaleziono klienta");
        }

        String pesel = auth.getName();
        var currentKlientOpt = klientService.getByPesel(pesel);
        if (currentKlientOpt.isEmpty() || !currentKlientOpt.get().getId().equals(id)) {
            return ResponseEntity.status(403).body("Brak uprawnień");
        }

        List<pl.bj.bank.model.Konto> konta = klientService.getKontaForKlient(id);

        List<KontoResponse> resp = konta.stream().map(k -> {
            KontoResponse kr = new KontoResponse();
            kr.setNrKonta(k.getNrKonta());
            kr.setSaldo(k.getSaldo());
            kr.setWaluta(k.getWaluta());
            kr.setStatus(k.getStatus());
            kr.setTypKonta(k.getTypKonta() != null ? k.getTypKonta().toString() : null);
            kr.setDataOtwarcia(k.getDataOtwarcia());
            kr.setOprocentowanie(k.getOprocentowanie());
            return kr;
        }).toList();

        return ResponseEntity.ok(resp);
    }

    @GetMapping("/{id}")
    public ResponseEntity<KlientResponse> getById(@PathVariable Long id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }

        boolean isEmployee = auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_EMPLOYEE"));
        if (!isEmployee) {
            String pesel = auth.getName();
            var currentKlientOpt = klientService.getByPesel(pesel);

            if (currentKlientOpt.isEmpty() || !currentKlientOpt.get().getId().equals(id)) {
                return ResponseEntity.status(403).build();
            }
        }

        var klientOpt = klientService.getById(id);
        if (klientOpt.isEmpty()) {
            return ResponseEntity.status(404).build();
        }

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
        r.setNarodowosc(k.getNarodowosc()); // ← DODANE

        return ResponseEntity.ok(r);
    }
    @PutMapping("/{id}/status")
    public ResponseEntity<?> changeStatus(
            @PathVariable Long id,
            @RequestBody ChangeKlientStatusRequest req
    ) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }

        boolean isEmployee = auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_EMPLOYEE"));
        if (!isEmployee) {
            return ResponseEntity.status(403).body("Brak uprawnień");
        }

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

        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    

}