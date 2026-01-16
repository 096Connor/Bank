package pl.bj.bank.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.bj.bank.dto.KontoResponse;
import pl.bj.bank.model.Klient;
import pl.bj.bank.model.Konto;
import pl.bj.bank.repository.KontoRepository;
import pl.bj.bank.service.KlientService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/konta")
@RequiredArgsConstructor
public class KontoController {

    private final KlientService klientService;
        private final KontoRepository kontoRepository;

    // 🔹 Konta dowolnego klienta (pracownik)
    @GetMapping("/klient/{id}")
    public ResponseEntity<?> getKontaForKlient(@PathVariable Long id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) return ResponseEntity.status(401).build();

        boolean isEmployee = auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_EMPLOYEE"));

        if (!isEmployee) return ResponseEntity.status(403).body("Brak uprawnień");

        List<Konto> konta = klientService.getKontaForKlient(id);
        List<KontoResponse> resp = klientService.mapToKontoResponse(konta);
        return ResponseEntity.ok(resp);
    }

    // 🔹 Konta zalogowanego klienta
    @GetMapping("/me")
    public ResponseEntity<?> getMyKonta() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) return ResponseEntity.status(401).build();

        Klient klient = klientService.getByPesel(auth.getName()).orElse(null);
        if (klient == null) return ResponseEntity.status(404).body("Nie znaleziono klienta");

        List<Konto> konta = klientService.getKontaForKlient(klient.getId());
        List<KontoResponse> resp = klientService.mapToKontoResponse(konta);
        return ResponseEntity.ok(resp);
    }

    // 🔹 Tworzenie konta
    @PostMapping("/klient/{id}")
    public ResponseEntity<?> createKonto(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        System.out.println("🔍 DEBUG - Received body: " + body);
        
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) return ResponseEntity.status(401).build();

        boolean isEmployee = auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_EMPLOYEE"));

        if (!isEmployee) {
            Klient current = klientService.getByPesel(auth.getName()).orElse(null);
            if (current == null || !current.getId().equals(id)) {
                return ResponseEntity.status(403).body("Brak uprawnień");
            }
        }

        // Pobierz oprocentowanie z body
        double oprocentowanie = body.get("oprocentowanie") != null
                ? ((Number) body.get("oprocentowanie")).doubleValue()
                : 0.01;

        // Pobierz id_typu_konta z body
        Long idTypuKonta = null;
        if (body.get("id_typu_konta") != null) {
            idTypuKonta = ((Number) body.get("id_typu_konta")).longValue();
        }
        
        System.out.println("🔍 DEBUG - idTypuKonta: " + idTypuKonta);
        System.out.println("🔍 DEBUG - oprocentowanie: " + oprocentowanie);

        // Przekaż oba parametry do serwisu
        Konto konto = klientService.createKonto(id, oprocentowanie, idTypuKonta);
        return ResponseEntity.status(201).body(konto);
    }

    // 🔹 Zmiana statusu konta (pracownik)
    @PutMapping("/{kontoId}/status")
    public ResponseEntity<?> changeStatus(@PathVariable Long kontoId, @RequestBody Map<String, String> body) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) return ResponseEntity.status(401).build();

        boolean isEmployee = auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_EMPLOYEE"));

        if (!isEmployee) return ResponseEntity.status(403).body("Brak uprawnień");

        String newStatus = body.get("status");
        Konto k = klientService.changeKontoStatus(kontoId, newStatus);
        return ResponseEntity.ok(k);
    }
   // 🔹 Wpłata środków na konto
@PutMapping("/{kontoId}/wplata")
public ResponseEntity<?> wplata(@PathVariable Long kontoId, @RequestBody Map<String, Double> body) {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    if (auth == null || !auth.isAuthenticated()) return ResponseEntity.status(401).build();

    Double kwota = body.get("kwota");
    if (kwota == null || kwota <= 0) {
        return ResponseEntity.badRequest().body("Kwota musi być większa od 0");
    }

    Konto konto = klientService.wplacNaKonto(kontoId, kwota);
    return ResponseEntity.ok(konto);
}
    @GetMapping("/konto/{nrKonta}")
    public Konto getKontoByNr(@PathVariable Long nrKonta) {
        return kontoRepository.findByNrKonta(nrKonta)
                .orElseThrow(() -> new IllegalArgumentException("Konto nie istnieje"));
    }


}