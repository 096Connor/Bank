## Wymagania wstępne

Aby uruchomić aplikację, potrzebujesz następujących narzędzi zainstalowanych na swoim systemie:

- **Java 21** - Wymagana wersja JDK.
- **Maven** - Do zarządzania zależnościami i budowania backendu (lub użyj Maven Wrapper - mvnw).
- **PostgreSQL** - Baza danych. Upewnij się, że masz zainstalowany i uruchomiony serwer PostgreSQL.
- **Node.js** (wersja 16 lub nowsza) - Do uruchamiania frontendu.
- **npm** - Menedżer pakietów dla Node.js (zazwyczaj instalowany wraz z Node.js).

### 2. Konfiguracja bazy danych

- Utwórz użytkownika `postgres` z hasłem `admin` (lub dostosuj ustawienia w pliku `Bank.backend/src/main/resources/application.properties`).

### 3. Uruchomienie backendu

Backend działa na porcie 8080 (domyślnie).

```bash
cd Bank.backend
./mvnw spring-boot:run
```

Lub, jeśli masz zainstalowanego Mavena globalnie:

```bash
mvn spring-boot:run
```

### 4. Uruchomienie frontendu

Frontend działa na porcie 5173 (domyślnie dla Vite).

```bash
cd bank-frontend
npm install
npm run dev
```

## Jak korzystać z aplikacji

Po uruchomieniu obu części aplikacji:

- Otwórz przeglądarkę i przejdź do `http://localhost:5173` dla frontendu.
- Backend będzie dostępny pod `http://localhost:8080`.

Aplikacja umożliwia logowanie się jako klient lub pracownik banku, zarządzanie kontami, wykonywanie transakcji itp.

## Struktura projektu

- `Bank.backend/` - Kod backendu w Spring Boot.
- `bank-frontend/` - Kod frontendu w React.

## Dodatkowe informacje

- Backend używa Spring Security do autoryzacji.
- Baza danych jest automatycznie aktualizowana przy starcie aplikacji (hibernate.ddl-auto=update).
- Dla rozwoju, backend ma włączone logowanie SQL dla debugowania.

logowanie pracownik login: admin hasło: admin
logowanie klient Pesel: 80011512345 hasło: 1234
