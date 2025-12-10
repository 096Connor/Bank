package pl.bj.bank.mapper;

import org.springframework.stereotype.Component;
import pl.bj.bank.dto.CreateKlientRequest;
import pl.bj.bank.model.Adres;
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
        k.setNrTel(dto.getNrTel());
        k.setMail(dto.getMail());
        k.setNarodowosc(dto.getNarodowosc());
        k.setDataRejestracji(LocalDate.now());
        k.setStatusKonta("AKTYWNY");

        // Ustawienie obiektu Adres
        Adres adres = new Adres();
        adres.setId(dto.getAdresId());
        k.setAdres(adres);

        return k;
    }
}
