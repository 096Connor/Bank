package pl.bj.bank.mapper;

import org.springframework.stereotype.Component;
import pl.bj.bank.dto.CreateKlientRequest;
import pl.bj.bank.model.Klient;

import java.time.LocalDate;

@Component
public class KlientMapper {

    public Klient toEntity(CreateKlientRequest dto) {

        Klient k = new Klient();

        k.setImie(dto.getImie());
        k.setNazwisko(dto.getNazwisko());
        k.setDataUrodzenia(dto.getDataUrodzenia());
        k.setPesel(dto.getPesel());
        k.setTypKlienta(dto.getTypKlienta());
        k.setAdres(dto.getAdres());
        k.setNrTel(dto.getNrTel());
        k.setMail(dto.getMail());
        k.setNarodowosc(dto.getNarodowosc());

        // pola automatyczne
        k.setDataRejestracji(LocalDate.now());
        k.setStatusKonta("AKTYWNY");

        return k;
    }
}
