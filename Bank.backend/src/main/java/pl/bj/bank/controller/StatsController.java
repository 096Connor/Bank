package pl.bj.bank.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.bj.bank.repository.KlientRepository;
import pl.bj.bank.repository.TransakcjeRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class StatsController {

    private final KlientRepository klientRepository;
    private final TransakcjeRepository transakcjeRepository;

    @GetMapping("/stats")
    public ResponseEntity<?> stats() {
        Map<String, Object> result = new HashMap<>();
        long totalClients = klientRepository.count();
        long activeClients = klientRepository.countByStatusKonta("AKTYWNY");

        LocalDate today = LocalDate.now();
        LocalDateTime start = today.atStartOfDay();
        LocalDateTime end = today.atTime(LocalTime.MAX);

        long transactionsToday = transakcjeRepository.countByDataTransakcjiBetween(start, end);

        result.put("totalClients", totalClients);
        result.put("activeClients", activeClients);
        result.put("transactionsToday", transactionsToday);
        return ResponseEntity.ok(result);
    }
}
