package pl.bj.bank.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.bj.bank.dto.CreateKlientRequest;
import pl.bj.bank.mapper.KlientMapper;
import pl.bj.bank.model.Klient;
import pl.bj.bank.repository.KlientRepository;

import java.util.List;


@Service
@RequiredArgsConstructor
public class KlientService {

    private final KlientRepository klientRepository;
    private final KlientMapper klientMapper;

    public Klient create(CreateKlientRequest dto) {
        Klient klient = klientMapper.toEntity(dto);
        return klientRepository.save(klient);
    }
    public List<Klient> getAll() {
        return klientRepository.findAll();
    }

}
