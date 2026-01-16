package pl.bj.bank.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.bj.bank.model.TypyKont;
import pl.bj.bank.service.TypyKontService;

import java.util.List;

@RestController
@RequestMapping("/api/typy-kont")
@RequiredArgsConstructor
public class TypyKontController {

    private final TypyKontService typyKontService;

    @GetMapping
    public ResponseEntity<List<TypyKont>> getAllTypyKont() {
        List<TypyKont> typy = typyKontService.getAll();
        return ResponseEntity.ok(typy);
    }
}