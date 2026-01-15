package pl.bj.bank.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import pl.bj.bank.model.*;
import pl.bj.bank.repository.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class FullDataInitializer implements CommandLineRunner {

    private final AdresRepository adresRepository;
    private final OddzialRepository oddzialRepository;
    private final RolaRepository rolaRepository;
    private final TypyKontRepository typyKontRepository;
    private final TypyKartRepository typyKartRepository;
    private final KlientRepository klientRepository;
    private final PracownikRepository pracownikRepository;
    private final PracownikRoleRepository pracownikRoleRepository;
    private final KontoRepository kontoRepository;
    private final KartaRepository kartaRepository;
    private final TransakcjeRepository transakcjeRepository;
    private final KredytRepository kredytRepository;
    private final RatyKredytuRepository ratyKredytuRepository;
    private final LokataRepository lokataRepository;
    private final PelnomocnictwaRepository pelnomocnictwaRepository;
    private final PowiadomieniaKlientaRepository powiadomieniaKlientaRepository;
    private final SesjeKlientaRepository sesjeKlientaRepository;
    private final ZgodyKlientaRepository zgodyKlientaRepository;
    private final Ustawienia2FARepository ustawienia2FARepository;
    private final ZgloszeniaKlientowRepository zgloszeniaKlientowRepository;
    private final BlokadyKlientaRepository blokadyKlientaRepository;
    private final HistoriaHaslaRepository historiaHaslaRepository;
    private final HistoriaZmianDanychRepository historiaZmianDanychRepository;
    private final KontaktyPrzelewoweRepository kontaktyPrzelewoweRepository;
    private final UstawieniaKontaRepository ustawieniaKontaRepository;
    private final HistoriaSaldaRepository historiaSaldaRepository;
    private final AudytDostepuRepository audytDostepuRepository;
    private final AlertSystemowyRepository alertSystemowyRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("FullDataInitializer: Starting data initialization...");

        // Check if data already exists
        long klientCount = klientRepository.count();
        System.out.println("FullDataInitializer: Current klient count: " + klientCount);
        if (klientCount > 0) {
            System.out.println("FullDataInitializer: Data already exists, skipping initialization.");
            return;
        }

        // 1. Adres
        Adres adres1 = new Adres();
        adres1.setUlica("ul. Główna");
        adres1.setNrDomu("10");
        adres1.setNrMieszkania("5");
        adres1.setMiasto("Warszawa");
        adres1.setKodPocztowy("00-001");
        adres1.setWojewodztwo("Mazowieckie");
        adres1.setKraj("Polska");
        adresRepository.save(adres1);

        Adres adres2 = new Adres();
        adres2.setUlica("ul. Krakowska");
        adres2.setNrDomu("20");
        adres2.setMiasto("Kraków");
        adres2.setKodPocztowy("30-001");
        adres2.setWojewodztwo("Małopolskie");
        adres2.setKraj("Polska");
        adresRepository.save(adres2);

        Adres adres3 = new Adres();
        adres3.setUlica("ul. Wrocławska");
        adres3.setNrDomu("30");
        adres3.setNrMieszkania("2");
        adres3.setMiasto("Wrocław");
        adres3.setKodPocztowy("50-001");
        adres3.setWojewodztwo("Dolnośląskie");
        adres3.setKraj("Polska");
        adresRepository.save(adres3);

        // 2. Oddzial
        Oddzial oddzial1 = new Oddzial();
        oddzial1.setNazwaOddzialu("Oddział Centralny");
        oddzial1.setAdres("ul. Bankowa 1");
        oddzial1.setMiasto("Warszawa");
        oddzial1.setTelefon("22-123-45-67");
        oddzialRepository.save(oddzial1);

        Oddzial oddzial2 = new Oddzial();
        oddzial2.setNazwaOddzialu("Oddział Południowy");
        oddzial2.setAdres("ul. Południowa 2");
        oddzial2.setMiasto("Kraków");
        oddzial2.setTelefon("12-345-67-89");
        oddzialRepository.save(oddzial2);

        // 4. TypyKont
        TypyKont typyKont1 = new TypyKont();
        typyKont1.setNazwaTypu("Konto Osobiste");
        typyKont1.setOpis("Standardowe konto osobiste");
        typyKont1.setOprocentowanieStd(0.01);
        typyKontRepository.save(typyKont1);

        TypyKont typyKont2 = new TypyKont();
        typyKont2.setNazwaTypu("Konto Oszczędnościowe");
        typyKont2.setOpis("Konto z wyższym oprocentowaniem");
        typyKont2.setOprocentowanieStd(0.03);
        typyKontRepository.save(typyKont2);

        TypyKont typyKont3 = new TypyKont();
        typyKont3.setNazwaTypu("Konto Firmowe");
        typyKont3.setOpis("Konto dla firm");
        typyKont3.setOprocentowanieStd(0.005);
        typyKontRepository.save(typyKont3);

        // 5. TypyKart
        TypyKart typyKart1 = new TypyKart();
        typyKart1.setNazwa("Visa Classic");
        typyKart1.setOpis("Standardowa karta Visa");
        typyKart1.setLimitDziennyStd(1000.00);
        typyKartRepository.save(typyKart1);

        TypyKart typyKart2 = new TypyKart();
        typyKart2.setNazwa("MasterCard Gold");
        typyKart2.setOpis("Premium karta MasterCard");
        typyKart2.setLimitDziennyStd(5000.00);
        typyKartRepository.save(typyKart2);

        // 3. Rola
        Rola rola1 = new Rola();
        rola1.setNazwaRoli("Administrator");
        rola1.setOpis("Pełne uprawnienia");
        rolaRepository.save(rola1);

        Rola rola2 = new Rola();
        rola2.setNazwaRoli("Pracownik");
        rola2.setOpis("Standardowe uprawnienia");
        rolaRepository.save(rola2);

        Rola rola3 = new Rola();
        rola3.setNazwaRoli("Manager");
        rola3.setOpis("Zarządzanie oddziałem");
        rolaRepository.save(rola3);

        // 6. Klient
        Klient klient1 = new Klient();
        klient1.setImie("Jan");
        klient1.setNazwisko("Kowalski");
        klient1.setDataUrodzenia(LocalDate.of(1980, 1, 15));
        klient1.setPesel("80011512345");
        klient1.setTypKlienta("STANDARD");
        klient1.setDataRejestracji(LocalDate.of(2023, 1, 1));
        klient1.setStatusKonta("AKTYWNY");
        klient1.setAdres(adres1);
        klient1.setNrTel("123456789");
        klient1.setMail("jan.kowalski@example.com");
        klient1.setNarodowosc("Polska");
        klient1.setPinHash(passwordEncoder.encode("examplehash1"));
        klientRepository.save(klient1);

        Klient klient2 = new Klient();
        klient2.setImie("Anna");
        klient2.setNazwisko("Nowak");
        klient2.setDataUrodzenia(LocalDate.of(1990, 5, 20));
        klient2.setPesel("90052054321");
        klient2.setTypKlienta("PREMIUM");
        klient2.setDataRejestracji(LocalDate.of(2023, 2, 1));
        klient2.setStatusKonta("AKTYWNY");
        klient2.setAdres(adres2);
        klient2.setNrTel("987654321");
        klient2.setMail("anna.nowak@example.com");
        klient2.setNarodowosc("Polska");
        klient2.setPinHash(passwordEncoder.encode("examplehash2"));
        klientRepository.save(klient2);

        Klient klient3 = new Klient();
        klient3.setImie("Piotr");
        klient3.setNazwisko("Zielinski");
        klient3.setDataUrodzenia(LocalDate.of(1975, 10, 10));
        klient3.setPesel("75101098765");
        klient3.setTypKlienta("STANDARD");
        klient3.setDataRejestracji(LocalDate.of(2023, 3, 1));
        klient3.setStatusKonta("AKTYWNY");
        klient3.setAdres(adres3);
        klient3.setNrTel("555666777");
        klient3.setMail("piotr.zielinski@example.com");
        klient3.setNarodowosc("Polska");
        klient3.setPinHash(passwordEncoder.encode("examplehash3"));
        klientRepository.save(klient3);

        // 7. Pracownik
        Pracownik pracownik1 = new Pracownik();
        pracownik1.setImie("Adam");
        pracownik1.setNazwisko("Admin");
        pracownik1.setStanowisko("Administrator");
        pracownik1.setLogin("admin");
        pracownik1.setHasloHash(passwordEncoder.encode("adminpass"));
        pracownik1.setOddzial(oddzial1);
        pracownik1.setDataZatrudnienia(LocalDate.of(2020, 1, 1));
        pracownik1.setAktywny(true);
        pracownikRepository.save(pracownik1);

        Pracownik pracownik2 = new Pracownik();
        pracownik2.setImie("Maria");
        pracownik2.setNazwisko("Manager");
        pracownik2.setStanowisko("Manager");
        pracownik2.setLogin("manager");
        pracownik2.setHasloHash(passwordEncoder.encode("managerpass"));
        pracownik2.setOddzial(oddzial2);
        pracownik2.setDataZatrudnienia(LocalDate.of(2021, 6, 1));
        pracownik2.setAktywny(true);
        pracownikRepository.save(pracownik2);

        Pracownik pracownik3 = new Pracownik();
        pracownik3.setImie("Tomasz");
        pracownik3.setNazwisko("Pracownik");
        pracownik3.setStanowisko("Pracownik");
        pracownik3.setLogin("pracownik");
        pracownik3.setHasloHash(passwordEncoder.encode("pracownikpass"));
        pracownik3.setOddzial(oddzial1);
        pracownik3.setDataZatrudnienia(LocalDate.of(2022, 3, 1));
        pracownik3.setAktywny(true);
        pracownikRepository.save(pracownik3);

        // 8. PracownikRole
        PracownikRole pracownikRole1 = new PracownikRole();
        pracownikRole1.setPracownik(pracownik1);
        pracownikRole1.setRola(rola1);
        pracownikRoleRepository.save(pracownikRole1);

        PracownikRole pracownikRole2 = new PracownikRole();
        pracownikRole2.setPracownik(pracownik2);
        pracownikRole2.setRola(rola3);
        pracownikRoleRepository.save(pracownikRole2);

        PracownikRole pracownikRole3 = new PracownikRole();
        pracownikRole3.setPracownik(pracownik3);
        pracownikRole3.setRola(rola2);
        pracownikRoleRepository.save(pracownikRole3);

        // 9. Konto
        Konto konto1 = new Konto();
        konto1.setKlient(klient1);
        konto1.setTypKonta(typyKont1);
        konto1.setSaldo(5000.00);
        konto1.setWaluta("PLN");
        konto1.setDataOtwarcia(LocalDate.of(2023, 1, 1));
        konto1.setOprocentowanie(0.01);
        konto1.setStatus("AKTYWNE");
        kontoRepository.save(konto1);

        Konto konto2 = new Konto();
        konto2.setKlient(klient2);
        konto2.setTypKonta(typyKont2);
        konto2.setSaldo(15000.00);
        konto2.setWaluta("PLN");
        konto2.setDataOtwarcia(LocalDate.of(2023, 2, 1));
        konto2.setOprocentowanie(0.03);
        konto2.setStatus("AKTYWNE");
        kontoRepository.save(konto2);

        Konto konto3 = new Konto();
        konto3.setKlient(klient3);
        konto3.setTypKonta(typyKont1);
        konto3.setSaldo(2000.00);
        konto3.setWaluta("PLN");
        konto3.setDataOtwarcia(LocalDate.of(2023, 3, 1));
        konto3.setOprocentowanie(0.01);
        konto3.setStatus("AKTYWNE");
        kontoRepository.save(konto3);

        // 10. Karta
        Karta karta1 = new Karta();
        karta1.setKlient(klient1);
        karta1.setKonto(konto1);
        karta1.setTypKarty(typyKart1);
        karta1.setPin("1234");
        karta1.setKodCvc("123");
        karta1.setDataWaznosci(LocalDate.of(2027, 12, 31));
        karta1.setDataWydania(LocalDate.of(2023, 1, 1));
        karta1.setStatusKarty("AKTYWNA");
        karta1.setLimitTransakcji(1000.00);
        karta1.setLimitDzienny(1000.00);
        kartaRepository.save(karta1);

        Karta karta2 = new Karta();
        karta2.setKlient(klient2);
        karta2.setKonto(konto2);
        karta2.setTypKarty(typyKart2);
        karta2.setPin("5678");
        karta2.setKodCvc("456");
        karta2.setDataWaznosci(LocalDate.of(2028, 6, 30));
        karta2.setDataWydania(LocalDate.of(2023, 2, 1));
        karta2.setStatusKarty("AKTYWNA");
        karta2.setLimitTransakcji(5000.00);
        karta2.setLimitDzienny(5000.00);
        kartaRepository.save(karta2);

        // 11. Transakcje
        Transakcje transakcja1 = new Transakcje();
        transakcja1.setKonto(konto1);
        transakcja1.setDataTransakcji(LocalDateTime.of(2023, 1, 15, 10, 30));
        transakcja1.setTypTransakcji("Wpłata");
        transakcja1.setKwota(1000.00);
        transakcja1.setWaluta("PLN");
        transakcja1.setOpis("Wpłata gotówki");
        transakcja1.setSaldoPo(6000.00);
        transakcja1.setStatus("ZAKONCZONA");
        transakcjeRepository.save(transakcja1);

        Transakcje transakcja2 = new Transakcje();
        transakcja2.setKonto(konto2);
        transakcja2.setDataTransakcji(LocalDateTime.of(2023, 2, 10, 14, 20));
        transakcja2.setTypTransakcji("Przelew");
        transakcja2.setKwota(-500.00);
        transakcja2.setWaluta("PLN");
        transakcja2.setOpis("Przelew wychodzący");
        transakcja2.setSaldoPo(14500.00);
        transakcja2.setStatus("ZAKONCZONA");
        transakcjeRepository.save(transakcja2);

        Transakcje transakcja3 = new Transakcje();
        transakcja3.setKonto(konto3);
        transakcja3.setDataTransakcji(LocalDateTime.of(2023, 3, 5, 9, 15));
        transakcja3.setTypTransakcji("Wpłata");
        transakcja3.setKwota(500.00);
        transakcja3.setWaluta("PLN");
        transakcja3.setOpis("Wpłata z przelewu");
        transakcja3.setSaldoPo(2500.00);
        transakcja3.setStatus("ZAKONCZONA");
        transakcjeRepository.save(transakcja3);



        System.out.println("FullDataInitializer: Data initialization completed.");
    }
}
