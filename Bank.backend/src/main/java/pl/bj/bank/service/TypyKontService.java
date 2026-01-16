package pl.bj.bank.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.bj.bank.model.TypyKont;
import pl.bj.bank.repository.TypyKontRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TypyKontService {
    
    private final TypyKontRepository typyKontRepository;
    
    public List<TypyKont> getAll() {
        return typyKontRepository.findAll();
    }
}
