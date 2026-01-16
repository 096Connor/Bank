package pl.bj.bank.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;
import pl.bj.bank.dto.CreatePracownikRequest;
import pl.bj.bank.dto.LoginRequest;
import pl.bj.bank.dto.PracownikLoginResponse;
import pl.bj.bank.model.Pracownik;
import pl.bj.bank.service.PracownikService;

import java.util.Collections;

@RestController
@RequestMapping("/api/pracownicy")
@RequiredArgsConstructor
@Slf4j
public class PracownikController {

    private final PracownikService pracownikService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request, HttpServletRequest httpRequest) {
        try {
            log.info("Login attempt for pracownik: {}", request.getLogin());

            // 🔹 Uwierzytelnienie
            Pracownik p = pracownikService.loginPracownik(request.getLogin(), request.getPassword())
                    .orElseThrow(() -> new RuntimeException("Niepoprawny login lub hasło"));

            // 🔹 Tworzenie tokenu autoryzacyjnego
            UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(
                            p.getLogin(),
                            null,
                            Collections.singletonList(new SimpleGrantedAuthority("ROLE_EMPLOYEE"))
                    );

            // 🔹 Ustawienie SecurityContext
            SecurityContext context = SecurityContextHolder.createEmptyContext();
            context.setAuthentication(auth);
            SecurityContextHolder.setContext(context);

            // 🔹 Zapis sesji
            HttpSession session = httpRequest.getSession(true);
            session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, context);

            // 🔹 Tworzenie odpowiedzi
            PracownikLoginResponse response = new PracownikLoginResponse();
            response.setId(p.getIdPracownika());
            response.setLogin(p.getLogin());
            response.setImie(p.getImie());
            response.setNazwisko(p.getNazwisko());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Błąd logowania pracownika: {}", e.getMessage());
            return ResponseEntity.status(401).body("Niepoprawny login lub hasło");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        SecurityContextHolder.getContext().setAuthentication(null);
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return ResponseEntity.ok("Wylogowano");
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody CreatePracownikRequest dto) {
        try {
            pracownikService.register(dto);
            return ResponseEntity.status(201).build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).build();
        }
    }
}
