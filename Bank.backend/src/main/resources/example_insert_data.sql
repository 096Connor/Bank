-- Example INSERT data for the entire bank database
-- All tables are connected via foreign keys

-- 1. Adres (no dependencies)
INSERT INTO adres (id_adres, ulica, nr_domu, nr_mieszkania, miasto, kod_pocztowy, wojewodztwo, kraj) VALUES
(1, 'ul. Główna', '10', '5', 'Warszawa', '00-001', 'Mazowieckie', 'Polska'),
(2, 'ul. Krakowska', '20', NULL, 'Kraków', '30-001', 'Małopolskie', 'Polska'),
(3, 'ul. Wrocławska', '30', '2', 'Wrocław', '50-001', 'Dolnośląskie', 'Polska');

-- 2. Oddzial (no dependencies)
INSERT INTO oddzial (id_oddzialu, nazwa_oddzialu, adres, miasto, telefon) VALUES
(1, 'Oddział Centralny', 'ul. Bankowa 1', 'Warszawa', '22-123-45-67'),
(2, 'Oddział Południowy', 'ul. Południowa 2', 'Kraków', '12-345-67-89');

-- 3. Rola (no dependencies)
INSERT INTO role (id_roli, nazwa_roli, opis) VALUES
(1, 'Administrator', 'Pełne uprawnienia'),
(2, 'Pracownik', 'Standardowe uprawnienia'),
(3, 'Manager', 'Zarządzanie oddziałem');

-- 4. TypyKont (no dependencies)
INSERT INTO typy_kont (id_typu, nazwa_typu, opis, oprocentowanie_std) VALUES
(1, 'Konto Osobiste', 'Standardowe konto osobiste', 0.01),
(2, 'Konto Oszczędnościowe', 'Konto z wyższym oprocentowaniem', 0.03),
(3, 'Konto Firmowe', 'Konto dla firm', 0.005);

-- 5. TypyKart (no dependencies)
INSERT INTO typy_kart (id_typu_karty, nazwa, opis, limit_dzienny_std) VALUES
(1, 'Visa Classic', 'Standardowa karta Visa', 1000.00),
(2, 'MasterCard Gold', 'Premium karta MasterCard', 5000.00);

-- 6. Klient (depends on Adres)
INSERT INTO klient (nr_ewidencyjny, imie, nazwisko, data_urodzenia, pesel, typ_klienta, data_rejestracji, status_konta, adres_id, nr_tel, mail, narodowosc, pin_hash) VALUES
(1, 'Jan', 'Kowalski', '1980-01-15', '80011512345', 'STANDARD', '2023-01-01', 'AKTYWNY', 1, '123456789', 'jan.kowalski@example.com', 'Polska', '$2a$10$examplehash1'),
(2, 'Anna', 'Nowak', '1990-05-20', '90052054321', 'PREMIUM', '2023-02-01', 'AKTYWNY', 2, '987654321', 'anna.nowak@example.com', 'Polska', '$2a$10$examplehash2'),
(3, 'Piotr', 'Zielinski', '1975-10-10', '75101098765', 'STANDARD', '2023-03-01', 'AKTYWNY', 3, '555666777', 'piotr.zielinski@example.com', 'Polska', '$2a$10$examplehash3');

-- 7. Pracownik (depends on Oddzial)
INSERT INTO pracownik (id_pracownika, imie, nazwisko, stanowisko, login, haslo_hash, oddzial_id, data_zatrudnienia, aktywny) VALUES
(1, 'Marek', 'Manager', 'Manager', 'marek.manager', '$2a$10$examplehash4', 1, '2020-01-01', true),
(2, 'Ewa', 'Pracownik', 'Kasjer', 'ewa.pracownik', '$2a$10$examplehash5', 1, '2021-01-01', true),
(3, 'Tomasz', 'Specjalista', 'Specjalista ds. kredytów', 'tomasz.spec', '$2a$10$examplehash6', 2, '2019-01-01', true);

-- 8. PracownikRole (depends on Pracownik and Rola)
INSERT INTO pracownik_role (id_pracownika, id_roli) VALUES
(1, 3), -- Marek is Manager
(2, 2), -- Ewa is Pracownik
(3, 2); -- Tomasz is Pracownik

-- 9. Konto (depends on Klient and TypyKont)
INSERT INTO konto (nr_konta, id_klienta, id_typu_konta, saldo, waluta, data_otwarcia, oprocentowanie, status) VALUES
(1001, 1, 1, 5000.00, 'PLN', '2023-01-01', 0.01, 'AKTYWNE'),
(1002, 1, 2, 10000.00, 'PLN', '2023-01-15', 0.03, 'AKTYWNE'),
(1003, 2, 1, 7500.00, 'PLN', '2023-02-01', 0.01, 'AKTYWNE'),
(1004, 3, 3, 20000.00, 'PLN', '2023-03-01', 0.005, 'AKTYWNE');

-- 10. Karta (depends on Klient, Konto, TypyKart)
INSERT INTO karta (nr_karty, id_klienta, id_konta, id_typu_karty, PIN, kod_CVC, data_waznosci, data_wydania, status_karty, limit_transakcji, limit_dzienny) VALUES
(4000111122223333, 1, 1001, 1, '1234', '123', '2027-01-01', '2023-01-01', 'AKTYWNA', 1000.00, 500.00),
(5000222233334444, 2, 1003, 2, '5678', '456', '2027-02-01', '2023-02-01', 'AKTYWNA', 5000.00, 2000.00);

-- 11. Transakcje (depends on Konto)
INSERT INTO transakcje (id_transakcji, id_konta, data_transakcji, typ_transakcji, kwota, waluta, opis, saldo_po, status) VALUES
(1, 1001, '2023-06-01 10:00:00', 'WPŁATA', 1000.00, 'PLN', 'Wpłata gotówki', 6000.00, 'ZREALIZOWANA'),
(2, 1001, '2023-06-02 14:00:00', 'WYPŁATA', -500.00, 'PLN', 'Wypłata z bankomatu', 5500.00, 'ZREALIZOWANA'),
(3, 1003, '2023-06-03 09:00:00', 'PRZELEW', -200.00, 'PLN', 'Przelew do innego konta', 7300.00, 'ZREALIZOWANA');

-- 12. Kredyt (depends on Klient)
INSERT INTO kredyt (id_kredytu, id_klienta, kwota_poczatkowa, kwota_pozostala, oprocentowanie, rata_miesieczna, data_zawarcia, data_zakonczenia, status) VALUES
(1, 1, 50000.00, 45000.00, 0.05, 1500.00, '2023-01-01', '2028-01-01', 'AKTYWNY'),
(2, 2, 30000.00, 25000.00, 0.04, 1000.00, '2023-02-01', '2027-02-01', 'AKTYWNY');

-- 13. RatyKredytu (depends on Kredyt)
INSERT INTO raty_kredytu (id_raty, id_kredytu, data_raty, kwota_raty, kwota_pozostala, status, data_zaplaty) VALUES
(1, 1, '2023-02-01', 1500.00, 45000.00, 'ZAPŁACONA', '2023-02-01'),
(2, 1, '2023-03-01', 1500.00, 43500.00, 'ZAPŁACONA', '2023-03-01'),
(3, 2, '2023-03-01', 1000.00, 25000.00, 'ZAPŁACONA', '2023-03-01');

-- 14. Lokata (depends on Klient)
INSERT INTO lokata (id_lokaty, id_klienta, kwota, oprocentowanie, data_otwarcia, data_zakonczenia, status) VALUES
(1, 1, 20000.00, 0.04, '2023-01-01', '2024-01-01', 'AKTYWNA'),
(2, 3, 15000.00, 0.035, '2023-03-01', '2024-03-01', 'AKTYWNA');

-- 15. Pelnomocnictwa (depends on Klient)
INSERT INTO pełnomocnictwa (id_pelnomocnictwa, id_klienta, id_pelnomocnika, zakres_uprawnien, data_od, data_do, status) VALUES
(1, 1, 2, 'Pełne uprawnienia do konta', '2023-01-01', '2024-01-01', 'AKTYWNE');

-- 16. PowiadomieniaKlienta (depends on Klient)
INSERT INTO powiadomienia_klienta (id_powiadomienia, id_klienta, typ, tresc, data_wyslania, status) VALUES
(1, 1, 'EMAIL', 'Potwierdzenie transakcji', '2023-06-01 10:05:00', 'WYSŁANE'),
(2, 2, 'SMS', 'Przypomnienie o płatności raty', '2023-06-01 08:00:00', 'WYSŁANE');

-- 17. SesjeKlienta (depends on Klient)
INSERT INTO sesje_klienta (id_sesji, id_klienta, token_sesji, data_logowania, data_wylogowania, adres_ip, urzadzenie) VALUES
(1, 1, 'token123', '2023-06-01 09:00:00', '2023-06-01 11:00:00', '192.168.1.1', 'Chrome/Windows'),
(2, 2, 'token456', '2023-06-01 10:00:00', NULL, '192.168.1.2', 'Safari/iOS');

-- 18. ZgodyKlienta (depends on Klient)
INSERT INTO zgody_klienta (id_zgody, id_klienta, typ_zgody, data_wyrazenia, data_wycofania, aktywny) VALUES
(1, 1, 'MARKETING_EMAIL', '2023-01-01', NULL, true),
(2, 2, 'MARKETING_SMS', '2023-02-01', NULL, true);

-- 19. Ustawienia2FA (depends on Klient)
INSERT INTO ustawienia_2fa (id_ustawienia, id_klienta, metoda, aktywny) VALUES
(1, 1, 'SMS', true),
(2, 2, 'APP', true);

-- 20. ZgloszeniaKlientow (depends on Klient)
INSERT INTO zgloszenia_klientow (id_zgloszenia, id_klienta, temat, opis, status, data_zgloszenia, id_pracownika_opiekuna) VALUES
(1, 1, 'Problem z kartą', 'Karta została zablokowana', 'ROZWIĄZANE', '2023-05-01 10:00:00', 2),
(2, 3, 'Pytanie o kredyt', 'Chcę zapytać o warunki kredytu', 'W_TRAKCIE', '2023-06-01 14:00:00', 3);

-- 21. BlokadyKlienta (depends on Klient)
INSERT INTO blokady_klienta (id_blokady, id_klienta, data_blokady, powod, id_pracownika, status) VALUES
(1, 1, '2023-05-01 10:00:00', 'Podejrzenie oszustwa', 2, 'ZNIESIONA');

-- 22. HistoriaHasla (depends on Klient)
INSERT INTO historia_hasla (id_historia, id_klienta, data_zmiany, haslo_hash) VALUES
(1, 1, '2023-01-01 12:00:00', '$2a$10$oldhash1'),
(2, 2, '2023-02-01 13:00:00', '$2a$10$oldhash2');

-- 23. HistoriaZmianDanych (depends on Klient)
INSERT INTO historia_zmian_danych (id_zmiany, id_klienta, pole_zmienione, wartosc_stara, wartosc_nowa, data_zmiany, id_pracownika) VALUES
(1, 1, 'nr_tel', '123456788', '123456789', '2023-04-01 10:00:00', 2);

-- 24. KontaktyPrzelewowe (depends on Klient)
INSERT INTO kontakty_przelewowe (id_kontaktu, id_klienta, nazwa, nr_konta, opis) VALUES
(1, 1, 'Mama', 2001, 'Konto matki'),
(2, 2, 'Firma ABC', 3001, 'Konto firmowe');

-- 25. UstawieniaKonta (depends on Konto)
INSERT INTO ustawienia_konta (id_ustawienia, id_konta, limit_dzienny, limit_jednorazowy, powiadomienia_sms, powiadomienia_mail) VALUES
(1, 1001, 1000.00, 500.00, true, true),
(2, 1003, 2000.00, 1000.00, false, true);

-- 26. HistoriaSalda (depends on Konto)
INSERT INTO historia_salda (id_zmiany, nr_konta, data_zmiany, saldo_przed, saldo_po, powod) VALUES
(1, 1001, '2023-06-01 10:00:00', 5000.00, 6000.00, 'Wpłata'),
(2, 1001, '2023-06-02 14:00:00', 6000.00, 5500.00, 'Wypłata');

-- 27. AudytDostepu (depends on Pracownik and Klient)
INSERT INTO audyt_dostepu (id_audytu, id_pracownika, id_klienta, tabela_dotyczaca, operacja, data_operacji, adres_ip, urzadzenie, opis) VALUES
(1, 2, 1, 'klient', 'UPDATE', '2023-04-01 10:00:00', '192.168.1.1', 'Chrome/Windows', 'Zmiana danych klienta'),
(2, 3, 2, 'kredyt', 'INSERT', '2023-02-01 09:00:00', '192.168.1.2', 'Firefox/Linux', 'Dodanie nowego kredytu');

-- 28. AlertSystemowy (no strict foreign keys, but can reference)
INSERT INTO alerty_systemowe (id_alertu, typ_alertu, tresc, data_wygenerowania, status, powiazany_obiekt, id_powiazania) VALUES
(1, 'SECURITY', 'Wykryto podejrzaną transakcję', '2023-06-02 14:05:00', 'NOWY', 'transakcje', 2),
(2, 'SYSTEM', 'Aktualizacja systemu zakończona', '2023-06-01 02:00:00', 'ZAMKNIĘTY', NULL, NULL);
