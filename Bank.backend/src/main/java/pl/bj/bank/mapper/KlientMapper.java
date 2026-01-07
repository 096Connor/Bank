package pl.bj.bank.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pl.bj.bank.dto.CreateKlientRequest;
import pl.bj.bank.model.Adres;
import pl.bj.bank.model.Klient;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class KlientMapper {

    private final PasswordEncoder passwordEncoder;

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

        // Hash PIN if provided
        if (dto.getPin() != null && !dto.getPin().isEmpty()) {
            k.setPinHash(passwordEncoder.encode(dto.getPin()));
        }

        // Ustawienie obiektu Adres
        Adres adres = new Adres();
        adres.setId(dto.getAdresId());
        k.setAdres(adres);

        return k;
    }
}
