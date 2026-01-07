package pl.bj.bank.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.bj.bank.dto.CreatePracownikRequest;
import pl.bj.bank.service.PracownikService;

@RestController
@RequestMapping("/api/pracownicy")
@RequiredArgsConstructor
public class PracownikController {

    private final PracownikService pracownikService;

    // Rejestracja pracownika
    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody CreatePracownikRequest dto) {
        pracownikService.register(dto);
        return ResponseEntity.status(201).build();
    }

}
