package pl.bj.bank.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.bj.bank.dto.CreateKlientRequest;
import pl.bj.bank.model.Klient;
import pl.bj.bank.service.KlientService;

@RestController
@RequestMapping("/api/klienci")
@RequiredArgsConstructor
public class KlientController {

    private final KlientService klientService;

    @PostMapping
    public Klient create(@RequestBody CreateKlientRequest request) {
        return klientService.create(request);
    }
}
