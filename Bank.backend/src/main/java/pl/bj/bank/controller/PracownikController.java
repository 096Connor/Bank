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
import pl.bj.bank.dto.PracownikLoginRequest;
import pl.bj.bank.dto.PracownikLoginResponse;
import pl.bj.bank.model.Pracownik;
import pl.bj.bank.service.PracownikService;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/pracownicy")
@RequiredArgsConstructor
@Slf4j
public class PracownikController {

    private final PracownikService pracownikService;

 @PostMapping("/login")
public ResponseEntity<?> login(@Valid @RequestBody PracownikLoginRequest req, HttpServletRequest request) {
    log.info("Login attempt for pracownik: {}", req.getLogin());
    var pracownikOpt = pracownikService.loginPracownik(req.getLogin(), req.getPassword());
    if (pracownikOpt.isPresent()) {
        var p = pracownikOpt.get();
        
        // ⭐ Ustaw autentykację
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
            p.getLogin(),
            null,
            Collections.singletonList(new SimpleGrantedAuthority("ROLE_EMPLOYEE"))
        );
        SecurityContextHolder.getContext().setAuthentication(authToken);
        
        // Zapisz sesję
        HttpSession session = request.getSession(true);
        session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());
        
        PracownikLoginResponse r = new PracownikLoginResponse();
        r.setId(p.getIdPracownika());
        r.setLogin(p.getLogin());
        r.setImie(p.getImie());
        r.setNazwisko(p.getNazwisko());
        return ResponseEntity.ok(r);
    }
    return ResponseEntity.status(401).build();
}

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        SecurityContextHolder.getContext().setAuthentication(null);
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        pracownikService.logout(null);
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
    @PostMapping("/api/pracownicy/login")
public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpServletRequest httpRequest) {

    Pracownik p = pracownikService.authenticate(request.getLogin(), request.getPassword());

    UsernamePasswordAuthenticationToken auth =
        new UsernamePasswordAuthenticationToken(p.getLogin(), null, List.of());

    SecurityContext context = SecurityContextHolder.createEmptyContext();
    context.setAuthentication(auth);
    SecurityContextHolder.setContext(context);

    HttpSession session = httpRequest.getSession(true);
    session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, context);

    return ResponseEntity.ok(p);
}

}