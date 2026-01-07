--
-- PostgreSQL database dump
--

\restrict iuUOK6oKVL0Qgn72ARxQxoAAHfZkPGCuNi3RdJz1SIKtthfnNt0mezmiSPneEpR

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

-- Started on 2025-12-29 15:45:04

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 17556)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 5308 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 17558)
-- Name: adres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.adres (
    id_adres integer NOT NULL,
    ulica character varying(100),
    nr_domu character varying(10),
    nr_mieszkania character varying(10),
    miasto character varying(50),
    kod_pocztowy character varying(10),
    wojewodztwo character varying(50),
    kraj character varying(50)
);


ALTER TABLE public.adres OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 17557)
-- Name: adres_id_adres_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.adres_id_adres_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.adres_id_adres_seq OWNER TO postgres;

--
-- TOC entry 5310 (class 0 OID 0)
-- Dependencies: 219
-- Name: adres_id_adres_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.adres_id_adres_seq OWNED BY public.adres.id_adres;


--
-- TOC entry 273 (class 1259 OID 17927)
-- Name: alerty_systemowe; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alerty_systemowe (
    id_alertu integer NOT NULL,
    typ_alertu character varying(50),
    tresc text,
    data_wygenerowania timestamp without time zone,
    status character varying(20),
    powiazany_obiekt character varying(50),
    id_powiazania integer
);


ALTER TABLE public.alerty_systemowe OWNER TO postgres;

--
-- TOC entry 272 (class 1259 OID 17926)
-- Name: alerty_systemowe_id_alertu_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.alerty_systemowe_id_alertu_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.alerty_systemowe_id_alertu_seq OWNER TO postgres;

--
-- TOC entry 5311 (class 0 OID 0)
-- Dependencies: 272
-- Name: alerty_systemowe_id_alertu_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.alerty_systemowe_id_alertu_seq OWNED BY public.alerty_systemowe.id_alertu;


--
-- TOC entry 271 (class 1259 OID 17907)
-- Name: audyt_dostepu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.audyt_dostepu (
    id_audytu integer NOT NULL,
    id_pracownika integer,
    id_klienta integer,
    tabela_dotyczaca character varying(50),
    operacja character varying(10),
    data_operacji timestamp without time zone,
    adres_ip character varying(50),
    urzadzenie character varying(100),
    opis text
);


ALTER TABLE public.audyt_dostepu OWNER TO postgres;

--
-- TOC entry 270 (class 1259 OID 17906)
-- Name: audyt_dostepu_id_audytu_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.audyt_dostepu_id_audytu_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.audyt_dostepu_id_audytu_seq OWNER TO postgres;

--
-- TOC entry 5312 (class 0 OID 0)
-- Dependencies: 270
-- Name: audyt_dostepu_id_audytu_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.audyt_dostepu_id_audytu_seq OWNED BY public.audyt_dostepu.id_audytu;


--
-- TOC entry 250 (class 1259 OID 17749)
-- Name: blokady_klienta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.blokady_klienta (
    id_blokady integer NOT NULL,
    id_klienta integer,
    data_blokady timestamp without time zone,
    powod character varying(200),
    id_pracownika integer,
    status character varying(20)
);


ALTER TABLE public.blokady_klienta OWNER TO postgres;

--
-- TOC entry 249 (class 1259 OID 17748)
-- Name: blokady_klienta_id_blokady_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.blokady_klienta_id_blokady_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.blokady_klienta_id_blokady_seq OWNER TO postgres;

--
-- TOC entry 5313 (class 0 OID 0)
-- Dependencies: 249
-- Name: blokady_klienta_id_blokady_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.blokady_klienta_id_blokady_seq OWNED BY public.blokady_klienta.id_blokady;


--
-- TOC entry 260 (class 1259 OID 17823)
-- Name: historia_hasla; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.historia_hasla (
    id_historia integer NOT NULL,
    id_klienta integer,
    data_zmiany timestamp without time zone,
    haslo_hash character varying(255)
);


ALTER TABLE public.historia_hasla OWNER TO postgres;

--
-- TOC entry 259 (class 1259 OID 17822)
-- Name: historia_hasla_id_historia_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.historia_hasla_id_historia_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.historia_hasla_id_historia_seq OWNER TO postgres;

--
-- TOC entry 5314 (class 0 OID 0)
-- Dependencies: 259
-- Name: historia_hasla_id_historia_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.historia_hasla_id_historia_seq OWNED BY public.historia_hasla.id_historia;


--
-- TOC entry 236 (class 1259 OID 17648)
-- Name: historia_salda; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.historia_salda (
    id_zmiany integer NOT NULL,
    nr_konta bigint,
    data_zmiany timestamp without time zone,
    saldo_przed numeric(15,2),
    saldo_po numeric(15,2),
    powod character varying(100)
);


ALTER TABLE public.historia_salda OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 17647)
-- Name: historia_salda_id_zmiany_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.historia_salda_id_zmiany_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.historia_salda_id_zmiany_seq OWNER TO postgres;

--
-- TOC entry 5315 (class 0 OID 0)
-- Dependencies: 235
-- Name: historia_salda_id_zmiany_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.historia_salda_id_zmiany_seq OWNED BY public.historia_salda.id_zmiany;


--
-- TOC entry 254 (class 1259 OID 17777)
-- Name: historia_zmian_danych; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.historia_zmian_danych (
    id_zmiany integer NOT NULL,
    id_klienta integer,
    pole_zmienione character varying(50),
    wartosc_stara character varying(255),
    wartosc_nowa character varying(255),
    data_zmiany timestamp without time zone,
    id_pracownika integer
);


ALTER TABLE public.historia_zmian_danych OWNER TO postgres;

--
-- TOC entry 253 (class 1259 OID 17776)
-- Name: historia_zmian_danych_id_zmiany_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.historia_zmian_danych_id_zmiany_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.historia_zmian_danych_id_zmiany_seq OWNER TO postgres;

--
-- TOC entry 5316 (class 0 OID 0)
-- Dependencies: 253
-- Name: historia_zmian_danych_id_zmiany_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.historia_zmian_danych_id_zmiany_seq OWNED BY public.historia_zmian_danych.id_zmiany;


--
-- TOC entry 246 (class 1259 OID 17713)
-- Name: karta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.karta (
    nr_karty bigint NOT NULL,
    id_klienta integer,
    id_konta bigint,
    id_typu_karty integer,
    pin character(4),
    kod_cvc character(3),
    data_waznosci date,
    data_wydania date,
    status_karty character varying(20),
    limit_transakcji numeric(10,2),
    limit_dzienny numeric(10,2)
);


ALTER TABLE public.karta OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 17712)
-- Name: karta_nr_karty_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.karta_nr_karty_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.karta_nr_karty_seq OWNER TO postgres;

--
-- TOC entry 5317 (class 0 OID 0)
-- Dependencies: 245
-- Name: karta_nr_karty_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.karta_nr_karty_seq OWNED BY public.karta.nr_karty;


--
-- TOC entry 230 (class 1259 OID 17604)
-- Name: klient; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.klient (
    nr_ewidencyjny integer NOT NULL,
    imie character varying(50),
    nazwisko character varying(50),
    data_urodzenia date,
    pesel character(11),
    typ_klienta character varying(20),
    data_rejestracji date,
    status_konta character varying(20),
    adres_id integer,
    nr_tel character varying(20),
    mail character varying(100),
    narodowosc character varying(50),
    pin_hash character varying(255)
);


ALTER TABLE public.klient OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 17603)
-- Name: klient_nr_ewidencyjny_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.klient_nr_ewidencyjny_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.klient_nr_ewidencyjny_seq OWNER TO postgres;

--
-- TOC entry 5318 (class 0 OID 0)
-- Dependencies: 229
-- Name: klient_nr_ewidencyjny_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.klient_nr_ewidencyjny_seq OWNED BY public.klient.nr_ewidencyjny;


--
-- TOC entry 264 (class 1259 OID 17849)
-- Name: kontakty_przelewowe; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kontakty_przelewowe (
    id_kontaktu integer NOT NULL,
    id_klienta integer,
    nazwa character varying(50),
    nr_konta bigint,
    opis character varying(100)
);


ALTER TABLE public.kontakty_przelewowe OWNER TO postgres;

--
-- TOC entry 263 (class 1259 OID 17848)
-- Name: kontakty_przelewowe_id_kontaktu_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.kontakty_przelewowe_id_kontaktu_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.kontakty_przelewowe_id_kontaktu_seq OWNER TO postgres;

--
-- TOC entry 5319 (class 0 OID 0)
-- Dependencies: 263
-- Name: kontakty_przelewowe_id_kontaktu_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.kontakty_przelewowe_id_kontaktu_seq OWNED BY public.kontakty_przelewowe.id_kontaktu;


--
-- TOC entry 232 (class 1259 OID 17617)
-- Name: konto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.konto (
    nr_konta bigint NOT NULL,
    id_klienta integer,
    id_typu_konta integer,
    saldo numeric(15,2),
    waluta character(3),
    data_otwarcia date,
    data_zamkniecia date,
    oprocentowanie numeric(5,2),
    status character varying(20)
);


ALTER TABLE public.konto OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 17616)
-- Name: konto_nr_konta_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.konto_nr_konta_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.konto_nr_konta_seq OWNER TO postgres;

--
-- TOC entry 5320 (class 0 OID 0)
-- Dependencies: 231
-- Name: konto_nr_konta_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.konto_nr_konta_seq OWNED BY public.konto.nr_konta;


--
-- TOC entry 240 (class 1259 OID 17674)
-- Name: kredyt; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kredyt (
    id_kredytu integer NOT NULL,
    id_klienta integer,
    kwota_poczatkowa numeric(15,2),
    kwota_pozostala numeric(15,2),
    oprocentowanie numeric(5,2),
    rata_miesieczna numeric(10,2),
    data_zawarcia date,
    data_zakonczenia date,
    status character varying(20)
);


ALTER TABLE public.kredyt OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 17673)
-- Name: kredyt_id_kredytu_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.kredyt_id_kredytu_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.kredyt_id_kredytu_seq OWNER TO postgres;

--
-- TOC entry 5321 (class 0 OID 0)
-- Dependencies: 239
-- Name: kredyt_id_kredytu_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.kredyt_id_kredytu_seq OWNED BY public.kredyt.id_kredytu;


--
-- TOC entry 244 (class 1259 OID 17700)
-- Name: lokata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lokata (
    id_lokaty integer NOT NULL,
    id_klienta integer,
    kwota numeric(15,2),
    oprocentowanie numeric(5,2),
    data_otwarcia date,
    data_zakonczenia date,
    status character varying(20)
);


ALTER TABLE public.lokata OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 17699)
-- Name: lokata_id_lokaty_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lokata_id_lokaty_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.lokata_id_lokaty_seq OWNER TO postgres;

--
-- TOC entry 5322 (class 0 OID 0)
-- Dependencies: 243
-- Name: lokata_id_lokaty_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lokata_id_lokaty_seq OWNED BY public.lokata.id_lokaty;


--
-- TOC entry 222 (class 1259 OID 17566)
-- Name: oddzial; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.oddzial (
    id_oddzialu integer NOT NULL,
    nazwa_oddzialu character varying(100),
    adres character varying(150),
    miasto character varying(50),
    telefon character varying(20)
);


ALTER TABLE public.oddzial OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 17565)
-- Name: oddzial_id_oddzialu_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.oddzial_id_oddzialu_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.oddzial_id_oddzialu_seq OWNER TO postgres;

--
-- TOC entry 5323 (class 0 OID 0)
-- Dependencies: 221
-- Name: oddzial_id_oddzialu_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.oddzial_id_oddzialu_seq OWNED BY public.oddzial.id_oddzialu;


--
-- TOC entry 256 (class 1259 OID 17792)
-- Name: pełnomocnictwa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."pełnomocnictwa" (
    id_pelnomocnictwa integer CONSTRAINT "peŁnomocnictwa_id_pelnomocnictwa_not_null" NOT NULL,
    id_klienta integer,
    id_pelnomocnika integer,
    zakres_uprawnien character varying(100),
    data_od date,
    data_do date,
    status character varying(20)
);


ALTER TABLE public."pełnomocnictwa" OWNER TO postgres;

--
-- TOC entry 255 (class 1259 OID 17791)
-- Name: peŁnomocnictwa_id_pelnomocnictwa_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."peŁnomocnictwa_id_pelnomocnictwa_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."peŁnomocnictwa_id_pelnomocnictwa_seq" OWNER TO postgres;

--
-- TOC entry 5324 (class 0 OID 0)
-- Dependencies: 255
-- Name: peŁnomocnictwa_id_pelnomocnictwa_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."peŁnomocnictwa_id_pelnomocnictwa_seq" OWNED BY public."pełnomocnictwa".id_pelnomocnictwa;


--
-- TOC entry 266 (class 1259 OID 17862)
-- Name: powiadomienia_klienta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.powiadomienia_klienta (
    id_powiadomienia integer NOT NULL,
    id_klienta integer,
    typ character varying(50),
    tresc text,
    data_wyslania timestamp without time zone,
    status character varying(20)
);


ALTER TABLE public.powiadomienia_klienta OWNER TO postgres;

--
-- TOC entry 265 (class 1259 OID 17861)
-- Name: powiadomienia_klienta_id_powiadomienia_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.powiadomienia_klienta_id_powiadomienia_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.powiadomienia_klienta_id_powiadomienia_seq OWNER TO postgres;

--
-- TOC entry 5325 (class 0 OID 0)
-- Dependencies: 265
-- Name: powiadomienia_klienta_id_powiadomienia_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.powiadomienia_klienta_id_powiadomienia_seq OWNED BY public.powiadomienia_klienta.id_powiadomienia;


--
-- TOC entry 268 (class 1259 OID 17877)
-- Name: pracownik; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pracownik (
    id_pracownika integer NOT NULL,
    imie character varying(50),
    nazwisko character varying(50),
    stanowisko character varying(50),
    login character varying(50),
    haslo_hash character varying(255),
    oddzial_id integer,
    data_zatrudnienia date,
    aktywny boolean
);


ALTER TABLE public.pracownik OWNER TO postgres;

--
-- TOC entry 267 (class 1259 OID 17876)
-- Name: pracownik_id_pracownika_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pracownik_id_pracownika_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pracownik_id_pracownika_seq OWNER TO postgres;

--
-- TOC entry 5326 (class 0 OID 0)
-- Dependencies: 267
-- Name: pracownik_id_pracownika_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pracownik_id_pracownika_seq OWNED BY public.pracownik.id_pracownika;


--
-- TOC entry 269 (class 1259 OID 17889)
-- Name: pracownik_role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pracownik_role (
    id_pracownika integer NOT NULL,
    id_roli integer NOT NULL
);


ALTER TABLE public.pracownik_role OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 17687)
-- Name: raty_kredytu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.raty_kredytu (
    id_raty integer NOT NULL,
    id_kredytu integer,
    data_raty date,
    kwota_raty numeric(10,2),
    kwota_pozostala numeric(10,2),
    status character varying(20),
    data_zaplaty date
);


ALTER TABLE public.raty_kredytu OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 17686)
-- Name: raty_kredytu_id_raty_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.raty_kredytu_id_raty_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.raty_kredytu_id_raty_seq OWNER TO postgres;

--
-- TOC entry 5327 (class 0 OID 0)
-- Dependencies: 241
-- Name: raty_kredytu_id_raty_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.raty_kredytu_id_raty_seq OWNED BY public.raty_kredytu.id_raty;


--
-- TOC entry 224 (class 1259 OID 17574)
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    id_roli integer NOT NULL,
    nazwa_roli character varying(50),
    opis text
);


ALTER TABLE public.role OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 17573)
-- Name: role_id_roli_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_id_roli_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.role_id_roli_seq OWNER TO postgres;

--
-- TOC entry 5328 (class 0 OID 0)
-- Dependencies: 223
-- Name: role_id_roli_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.role_id_roli_seq OWNED BY public.role.id_roli;


--
-- TOC entry 258 (class 1259 OID 17810)
-- Name: sesje_klienta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sesje_klienta (
    id_sesji integer NOT NULL,
    id_klienta integer,
    token_sesji character varying(255),
    data_logowania timestamp without time zone,
    data_wylogowania timestamp without time zone,
    adres_ip character varying(50),
    urzadzenie character varying(100)
);


ALTER TABLE public.sesje_klienta OWNER TO postgres;

--
-- TOC entry 257 (class 1259 OID 17809)
-- Name: sesje_klienta_id_sesji_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sesje_klienta_id_sesji_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sesje_klienta_id_sesji_seq OWNER TO postgres;

--
-- TOC entry 5329 (class 0 OID 0)
-- Dependencies: 257
-- Name: sesje_klienta_id_sesji_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sesje_klienta_id_sesji_seq OWNED BY public.sesje_klienta.id_sesji;


--
-- TOC entry 238 (class 1259 OID 17661)
-- Name: transakcje; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transakcje (
    id_transakcji integer NOT NULL,
    id_konta bigint,
    data_transakcji timestamp without time zone,
    typ_transakcji character varying(30),
    kwota numeric(15,2),
    waluta character(3),
    opis character varying(200),
    saldo_po numeric(15,2),
    status character varying(20)
);


ALTER TABLE public.transakcje OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 17660)
-- Name: transakcje_id_transakcji_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transakcje_id_transakcji_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transakcje_id_transakcji_seq OWNER TO postgres;

--
-- TOC entry 5330 (class 0 OID 0)
-- Dependencies: 237
-- Name: transakcje_id_transakcji_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transakcje_id_transakcji_seq OWNED BY public.transakcje.id_transakcji;


--
-- TOC entry 228 (class 1259 OID 17594)
-- Name: typy_kart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.typy_kart (
    id_typu_karty integer NOT NULL,
    nazwa character varying(50),
    opis text,
    limit_dzienny_std numeric(10,2)
);


ALTER TABLE public.typy_kart OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 17593)
-- Name: typy_kart_id_typu_karty_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.typy_kart_id_typu_karty_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.typy_kart_id_typu_karty_seq OWNER TO postgres;

--
-- TOC entry 5331 (class 0 OID 0)
-- Dependencies: 227
-- Name: typy_kart_id_typu_karty_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.typy_kart_id_typu_karty_seq OWNED BY public.typy_kart.id_typu_karty;


--
-- TOC entry 226 (class 1259 OID 17584)
-- Name: typy_kont; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.typy_kont (
    id_typu integer NOT NULL,
    nazwa_typu character varying(50),
    opis text,
    oprocentowanie_std numeric(5,2)
);


ALTER TABLE public.typy_kont OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 17583)
-- Name: typy_kont_id_typu_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.typy_kont_id_typu_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.typy_kont_id_typu_seq OWNER TO postgres;

--
-- TOC entry 5332 (class 0 OID 0)
-- Dependencies: 225
-- Name: typy_kont_id_typu_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.typy_kont_id_typu_seq OWNED BY public.typy_kont.id_typu;


--
-- TOC entry 262 (class 1259 OID 17836)
-- Name: ustawienia_2fa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ustawienia_2fa (
    id_ustawienia integer NOT NULL,
    id_klienta integer,
    metoda character varying(20),
    aktywny boolean
);


ALTER TABLE public.ustawienia_2fa OWNER TO postgres;

--
-- TOC entry 261 (class 1259 OID 17835)
-- Name: ustawienia_2fa_id_ustawienia_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ustawienia_2fa_id_ustawienia_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ustawienia_2fa_id_ustawienia_seq OWNER TO postgres;

--
-- TOC entry 5333 (class 0 OID 0)
-- Dependencies: 261
-- Name: ustawienia_2fa_id_ustawienia_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ustawienia_2fa_id_ustawienia_seq OWNED BY public.ustawienia_2fa.id_ustawienia;


--
-- TOC entry 234 (class 1259 OID 17635)
-- Name: ustawienia_konta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ustawienia_konta (
    id_ustawienia integer NOT NULL,
    id_konta bigint,
    limit_dzienny numeric(10,2),
    limit_jednorazowy numeric(10,2),
    powiadomienia_sms boolean,
    powiadomienia_mail boolean
);


ALTER TABLE public.ustawienia_konta OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 17634)
-- Name: ustawienia_konta_id_ustawienia_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ustawienia_konta_id_ustawienia_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ustawienia_konta_id_ustawienia_seq OWNER TO postgres;

--
-- TOC entry 5334 (class 0 OID 0)
-- Dependencies: 233
-- Name: ustawienia_konta_id_ustawienia_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ustawienia_konta_id_ustawienia_seq OWNED BY public.ustawienia_konta.id_ustawienia;


--
-- TOC entry 252 (class 1259 OID 17762)
-- Name: zgloszenia_klientow; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.zgloszenia_klientow (
    id_zgloszenia integer NOT NULL,
    id_klienta integer,
    temat character varying(100),
    opis text,
    status character varying(20),
    data_zgloszenia timestamp without time zone,
    id_pracownika_opiekuna integer
);


ALTER TABLE public.zgloszenia_klientow OWNER TO postgres;

--
-- TOC entry 251 (class 1259 OID 17761)
-- Name: zgloszenia_klientow_id_zgloszenia_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.zgloszenia_klientow_id_zgloszenia_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.zgloszenia_klientow_id_zgloszenia_seq OWNER TO postgres;

--
-- TOC entry 5335 (class 0 OID 0)
-- Dependencies: 251
-- Name: zgloszenia_klientow_id_zgloszenia_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.zgloszenia_klientow_id_zgloszenia_seq OWNED BY public.zgloszenia_klientow.id_zgloszenia;


--
-- TOC entry 248 (class 1259 OID 17736)
-- Name: zgody_klienta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.zgody_klienta (
    id_zgody integer NOT NULL,
    id_klienta integer,
    typ_zgody character varying(50),
    data_wyrazenia date,
    data_wycofania date,
    aktywny boolean
);


ALTER TABLE public.zgody_klienta OWNER TO postgres;

--
-- TOC entry 247 (class 1259 OID 17735)
-- Name: zgody_klienta_id_zgody_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.zgody_klienta_id_zgody_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.zgody_klienta_id_zgody_seq OWNER TO postgres;

--
-- TOC entry 5336 (class 0 OID 0)
-- Dependencies: 247
-- Name: zgody_klienta_id_zgody_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.zgody_klienta_id_zgody_seq OWNED BY public.zgody_klienta.id_zgody;


--
-- TOC entry 4990 (class 2604 OID 17561)
-- Name: adres id_adres; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adres ALTER COLUMN id_adres SET DEFAULT nextval('public.adres_id_adres_seq'::regclass);


--
-- TOC entry 5016 (class 2604 OID 17930)
-- Name: alerty_systemowe id_alertu; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alerty_systemowe ALTER COLUMN id_alertu SET DEFAULT nextval('public.alerty_systemowe_id_alertu_seq'::regclass);


--
-- TOC entry 5015 (class 2604 OID 17910)
-- Name: audyt_dostepu id_audytu; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audyt_dostepu ALTER COLUMN id_audytu SET DEFAULT nextval('public.audyt_dostepu_id_audytu_seq'::regclass);


--
-- TOC entry 5005 (class 2604 OID 17752)
-- Name: blokady_klienta id_blokady; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blokady_klienta ALTER COLUMN id_blokady SET DEFAULT nextval('public.blokady_klienta_id_blokady_seq'::regclass);


--
-- TOC entry 5010 (class 2604 OID 17826)
-- Name: historia_hasla id_historia; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historia_hasla ALTER COLUMN id_historia SET DEFAULT nextval('public.historia_hasla_id_historia_seq'::regclass);


--
-- TOC entry 4998 (class 2604 OID 17651)
-- Name: historia_salda id_zmiany; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historia_salda ALTER COLUMN id_zmiany SET DEFAULT nextval('public.historia_salda_id_zmiany_seq'::regclass);


--
-- TOC entry 5007 (class 2604 OID 17780)
-- Name: historia_zmian_danych id_zmiany; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historia_zmian_danych ALTER COLUMN id_zmiany SET DEFAULT nextval('public.historia_zmian_danych_id_zmiany_seq'::regclass);


--
-- TOC entry 5003 (class 2604 OID 17716)
-- Name: karta nr_karty; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.karta ALTER COLUMN nr_karty SET DEFAULT nextval('public.karta_nr_karty_seq'::regclass);


--
-- TOC entry 4995 (class 2604 OID 17607)
-- Name: klient nr_ewidencyjny; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.klient ALTER COLUMN nr_ewidencyjny SET DEFAULT nextval('public.klient_nr_ewidencyjny_seq'::regclass);


--
-- TOC entry 5012 (class 2604 OID 17852)
-- Name: kontakty_przelewowe id_kontaktu; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kontakty_przelewowe ALTER COLUMN id_kontaktu SET DEFAULT nextval('public.kontakty_przelewowe_id_kontaktu_seq'::regclass);


--
-- TOC entry 4996 (class 2604 OID 17620)
-- Name: konto nr_konta; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.konto ALTER COLUMN nr_konta SET DEFAULT nextval('public.konto_nr_konta_seq'::regclass);


--
-- TOC entry 5000 (class 2604 OID 17677)
-- Name: kredyt id_kredytu; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kredyt ALTER COLUMN id_kredytu SET DEFAULT nextval('public.kredyt_id_kredytu_seq'::regclass);


--
-- TOC entry 5002 (class 2604 OID 17703)
-- Name: lokata id_lokaty; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lokata ALTER COLUMN id_lokaty SET DEFAULT nextval('public.lokata_id_lokaty_seq'::regclass);


--
-- TOC entry 4991 (class 2604 OID 17569)
-- Name: oddzial id_oddzialu; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.oddzial ALTER COLUMN id_oddzialu SET DEFAULT nextval('public.oddzial_id_oddzialu_seq'::regclass);


--
-- TOC entry 5008 (class 2604 OID 17795)
-- Name: pełnomocnictwa id_pelnomocnictwa; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pełnomocnictwa" ALTER COLUMN id_pelnomocnictwa SET DEFAULT nextval('public."peŁnomocnictwa_id_pelnomocnictwa_seq"'::regclass);


--
-- TOC entry 5013 (class 2604 OID 17865)
-- Name: powiadomienia_klienta id_powiadomienia; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.powiadomienia_klienta ALTER COLUMN id_powiadomienia SET DEFAULT nextval('public.powiadomienia_klienta_id_powiadomienia_seq'::regclass);


--
-- TOC entry 5014 (class 2604 OID 17880)
-- Name: pracownik id_pracownika; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pracownik ALTER COLUMN id_pracownika SET DEFAULT nextval('public.pracownik_id_pracownika_seq'::regclass);


--
-- TOC entry 5001 (class 2604 OID 17690)
-- Name: raty_kredytu id_raty; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.raty_kredytu ALTER COLUMN id_raty SET DEFAULT nextval('public.raty_kredytu_id_raty_seq'::regclass);


--
-- TOC entry 4992 (class 2604 OID 17577)
-- Name: role id_roli; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role ALTER COLUMN id_roli SET DEFAULT nextval('public.role_id_roli_seq'::regclass);


--
-- TOC entry 5009 (class 2604 OID 17813)
-- Name: sesje_klienta id_sesji; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sesje_klienta ALTER COLUMN id_sesji SET DEFAULT nextval('public.sesje_klienta_id_sesji_seq'::regclass);


--
-- TOC entry 4999 (class 2604 OID 17664)
-- Name: transakcje id_transakcji; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transakcje ALTER COLUMN id_transakcji SET DEFAULT nextval('public.transakcje_id_transakcji_seq'::regclass);


--
-- TOC entry 4994 (class 2604 OID 17597)
-- Name: typy_kart id_typu_karty; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.typy_kart ALTER COLUMN id_typu_karty SET DEFAULT nextval('public.typy_kart_id_typu_karty_seq'::regclass);


--
-- TOC entry 4993 (class 2604 OID 17587)
-- Name: typy_kont id_typu; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.typy_kont ALTER COLUMN id_typu SET DEFAULT nextval('public.typy_kont_id_typu_seq'::regclass);


--
-- TOC entry 5011 (class 2604 OID 17839)
-- Name: ustawienia_2fa id_ustawienia; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ustawienia_2fa ALTER COLUMN id_ustawienia SET DEFAULT nextval('public.ustawienia_2fa_id_ustawienia_seq'::regclass);


--
-- TOC entry 4997 (class 2604 OID 17638)
-- Name: ustawienia_konta id_ustawienia; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ustawienia_konta ALTER COLUMN id_ustawienia SET DEFAULT nextval('public.ustawienia_konta_id_ustawienia_seq'::regclass);


--
-- TOC entry 5006 (class 2604 OID 17765)
-- Name: zgloszenia_klientow id_zgloszenia; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zgloszenia_klientow ALTER COLUMN id_zgloszenia SET DEFAULT nextval('public.zgloszenia_klientow_id_zgloszenia_seq'::regclass);


--
-- TOC entry 5004 (class 2604 OID 17739)
-- Name: zgody_klienta id_zgody; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zgody_klienta ALTER COLUMN id_zgody SET DEFAULT nextval('public.zgody_klienta_id_zgody_seq'::regclass);


--
-- TOC entry 5249 (class 0 OID 17558)
-- Dependencies: 220
-- Data for Name: adres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.adres (id_adres, ulica, nr_domu, nr_mieszkania, miasto, kod_pocztowy, wojewodztwo, kraj) FROM stdin;
1	Testowa	10	\N	Warszawa	00-001	\N	Polska
2	KK	17	\N	K	09-79	Malo	PL
3	k	a	a	a	a	a	a
\.


--
-- TOC entry 5302 (class 0 OID 17927)
-- Dependencies: 273
-- Data for Name: alerty_systemowe; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alerty_systemowe (id_alertu, typ_alertu, tresc, data_wygenerowania, status, powiazany_obiekt, id_powiazania) FROM stdin;
\.


--
-- TOC entry 5300 (class 0 OID 17907)
-- Dependencies: 271
-- Data for Name: audyt_dostepu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.audyt_dostepu (id_audytu, id_pracownika, id_klienta, tabela_dotyczaca, operacja, data_operacji, adres_ip, urzadzenie, opis) FROM stdin;
\.


--
-- TOC entry 5279 (class 0 OID 17749)
-- Dependencies: 250
-- Data for Name: blokady_klienta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.blokady_klienta (id_blokady, id_klienta, data_blokady, powod, id_pracownika, status) FROM stdin;
\.


--
-- TOC entry 5289 (class 0 OID 17823)
-- Dependencies: 260
-- Data for Name: historia_hasla; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.historia_hasla (id_historia, id_klienta, data_zmiany, haslo_hash) FROM stdin;
\.


--
-- TOC entry 5265 (class 0 OID 17648)
-- Dependencies: 236
-- Data for Name: historia_salda; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.historia_salda (id_zmiany, nr_konta, data_zmiany, saldo_przed, saldo_po, powod) FROM stdin;
\.


--
-- TOC entry 5283 (class 0 OID 17777)
-- Dependencies: 254
-- Data for Name: historia_zmian_danych; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.historia_zmian_danych (id_zmiany, id_klienta, pole_zmienione, wartosc_stara, wartosc_nowa, data_zmiany, id_pracownika) FROM stdin;
\.


--
-- TOC entry 5275 (class 0 OID 17713)
-- Dependencies: 246
-- Data for Name: karta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.karta (nr_karty, id_klienta, id_konta, id_typu_karty, pin, kod_cvc, data_waznosci, data_wydania, status_karty, limit_transakcji, limit_dzienny) FROM stdin;
\.


--
-- TOC entry 5259 (class 0 OID 17604)
-- Dependencies: 230
-- Data for Name: klient; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.klient (nr_ewidencyjny, imie, nazwisko, data_urodzenia, pesel, typ_klienta, data_rejestracji, status_konta, adres_id, nr_tel, mail, narodowosc, pin_hash) FROM stdin;
3	Jan	Kowalski	1990-05-10	90051012345	STANDARD	2025-11-28	AKTYWNY	1	123456789	jan.kowalski@example.com	Polska	\N
5	Jan	Kowalski	1990-05-10	90051012345	STANDARD	2025-12-10	AKTYWNY	1	123456789	jan.kowalski@example.com	Polska	\N
6	Jan	Kowalski	1990-05-10	90051012345	STANDARD	2025-12-10	AKTYWNY	1	123456789	jan.kowalski@example.com	Polska	\N
7	ein	ein	2025-12-03	90051012345	STANDARD	2025-12-10	AKTYWNY	1	123456789	jan.kowalski@example.com	Polska	\N
10	Jan	Kowalski	1980-01-01	90010112345	STANDARD	2025-12-27	AKTYWNY	1	+48600111222	jan.kowalski@example.com	Polska	1234
11	CON	NOR	2018-02-28	90051012345	PREMIUM	2025-12-29	AKTYWNY	2	+45 489 489 48	bb@gmail.co	Polska	\N
12	TEST	OWY	2014-01-04	90051012345	VIP	2025-12-29	AKTYWNY	3	+45 489 489 48	bb@g.c	Polska	$argon2id$v=19$m=16384,t=2,p=1$0SRIU9SAx8WqYq3Ye6aq5w$e9JqFC6+E8WYCvJ0C0iC7VtSszAhSRCKfBawRdmoTxI
\.


--
-- TOC entry 5293 (class 0 OID 17849)
-- Dependencies: 264
-- Data for Name: kontakty_przelewowe; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.kontakty_przelewowe (id_kontaktu, id_klienta, nazwa, nr_konta, opis) FROM stdin;
\.


--
-- TOC entry 5261 (class 0 OID 17617)
-- Dependencies: 232
-- Data for Name: konto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.konto (nr_konta, id_klienta, id_typu_konta, saldo, waluta, data_otwarcia, data_zamkniecia, oprocentowanie, status) FROM stdin;
\.


--
-- TOC entry 5269 (class 0 OID 17674)
-- Dependencies: 240
-- Data for Name: kredyt; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.kredyt (id_kredytu, id_klienta, kwota_poczatkowa, kwota_pozostala, oprocentowanie, rata_miesieczna, data_zawarcia, data_zakonczenia, status) FROM stdin;
\.


--
-- TOC entry 5273 (class 0 OID 17700)
-- Dependencies: 244
-- Data for Name: lokata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lokata (id_lokaty, id_klienta, kwota, oprocentowanie, data_otwarcia, data_zakonczenia, status) FROM stdin;
\.


--
-- TOC entry 5251 (class 0 OID 17566)
-- Dependencies: 222
-- Data for Name: oddzial; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.oddzial (id_oddzialu, nazwa_oddzialu, adres, miasto, telefon) FROM stdin;
1	main	ostatni	kr	+48 212 756 488
\.


--
-- TOC entry 5285 (class 0 OID 17792)
-- Dependencies: 256
-- Data for Name: pełnomocnictwa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."pełnomocnictwa" (id_pelnomocnictwa, id_klienta, id_pelnomocnika, zakres_uprawnien, data_od, data_do, status) FROM stdin;
\.


--
-- TOC entry 5295 (class 0 OID 17862)
-- Dependencies: 266
-- Data for Name: powiadomienia_klienta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.powiadomienia_klienta (id_powiadomienia, id_klienta, typ, tresc, data_wyslania, status) FROM stdin;
\.


--
-- TOC entry 5297 (class 0 OID 17877)
-- Dependencies: 268
-- Data for Name: pracownik; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pracownik (id_pracownika, imie, nazwisko, stanowisko, login, haslo_hash, oddzial_id, data_zatrudnienia, aktywny) FROM stdin;
1	\N	\N	\N	admin	$2a$10$7qHc8FjU2F3z8R8w9JjU2uF7K0ZtJj9wz8lZk0QkGQq8fWJZQJ8e6	\N	\N	t
2	Jan	Kowalski	Księgowy	jan.k	$argon2id$v=19$m=16384,t=2,p=1$uQQzcb5SmH8VlqF+/WjYyw$zrt/nV7+0KBPFCoyqa8P7rvsIbDiIH9cz6eJyjymIxc	1	2025-12-21	t
3	Jan	Kowalski	Księgowy	jan.k	$argon2id$v=19$m=65536,t=2,p=1$L3VtY2xKb0t1b0tXZnF0Zw$yLwRys8p/8/YP7RkP2k5wQ	1	2025-12-21	t
4	Admin	Adminowski	Administrator	admin	$argon2id$v=19$m=65536,t=2,p=1$Z2F0b3JUbkJhc2U$3kjv6iEo7+6Zw8m9axqXUw	1	2025-12-21	t
5	Jan	Kowalski	Księgowy	ry	$argon2id$v=19$m=16384,t=2,p=1$gGcewu4jE8ivJxbx2S27bw$fqXnfkagkBUKtXKkIQb14CR8enhOVCjYP0IA9FcXKLQ	1	2025-12-21	t
6	Jan	Kowalski	Pracownik	inzynierowie	$argon2id$v=19$m=16384,t=2,p=1$Nl7X684HBL9QrGUlvg6DkA$atLXsk9mFnJeyFnt3DWIOqVKp4pWDHRlGHN8H/9k+o0	1	2025-12-22	t
\.


--
-- TOC entry 5298 (class 0 OID 17889)
-- Dependencies: 269
-- Data for Name: pracownik_role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pracownik_role (id_pracownika, id_roli) FROM stdin;
\.


--
-- TOC entry 5271 (class 0 OID 17687)
-- Dependencies: 242
-- Data for Name: raty_kredytu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.raty_kredytu (id_raty, id_kredytu, data_raty, kwota_raty, kwota_pozostala, status, data_zaplaty) FROM stdin;
\.


--
-- TOC entry 5253 (class 0 OID 17574)
-- Dependencies: 224
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role (id_roli, nazwa_roli, opis) FROM stdin;
\.


--
-- TOC entry 5287 (class 0 OID 17810)
-- Dependencies: 258
-- Data for Name: sesje_klienta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sesje_klienta (id_sesji, id_klienta, token_sesji, data_logowania, data_wylogowania, adres_ip, urzadzenie) FROM stdin;
\.


--
-- TOC entry 5267 (class 0 OID 17661)
-- Dependencies: 238
-- Data for Name: transakcje; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transakcje (id_transakcji, id_konta, data_transakcji, typ_transakcji, kwota, waluta, opis, saldo_po, status) FROM stdin;
\.


--
-- TOC entry 5257 (class 0 OID 17594)
-- Dependencies: 228
-- Data for Name: typy_kart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.typy_kart (id_typu_karty, nazwa, opis, limit_dzienny_std) FROM stdin;
\.


--
-- TOC entry 5255 (class 0 OID 17584)
-- Dependencies: 226
-- Data for Name: typy_kont; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.typy_kont (id_typu, nazwa_typu, opis, oprocentowanie_std) FROM stdin;
\.


--
-- TOC entry 5291 (class 0 OID 17836)
-- Dependencies: 262
-- Data for Name: ustawienia_2fa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ustawienia_2fa (id_ustawienia, id_klienta, metoda, aktywny) FROM stdin;
\.


--
-- TOC entry 5263 (class 0 OID 17635)
-- Dependencies: 234
-- Data for Name: ustawienia_konta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ustawienia_konta (id_ustawienia, id_konta, limit_dzienny, limit_jednorazowy, powiadomienia_sms, powiadomienia_mail) FROM stdin;
\.


--
-- TOC entry 5281 (class 0 OID 17762)
-- Dependencies: 252
-- Data for Name: zgloszenia_klientow; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.zgloszenia_klientow (id_zgloszenia, id_klienta, temat, opis, status, data_zgloszenia, id_pracownika_opiekuna) FROM stdin;
\.


--
-- TOC entry 5277 (class 0 OID 17736)
-- Dependencies: 248
-- Data for Name: zgody_klienta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.zgody_klienta (id_zgody, id_klienta, typ_zgody, data_wyrazenia, data_wycofania, aktywny) FROM stdin;
\.


--
-- TOC entry 5337 (class 0 OID 0)
-- Dependencies: 219
-- Name: adres_id_adres_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.adres_id_adres_seq', 3, true);


--
-- TOC entry 5338 (class 0 OID 0)
-- Dependencies: 272
-- Name: alerty_systemowe_id_alertu_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.alerty_systemowe_id_alertu_seq', 1, false);


--
-- TOC entry 5339 (class 0 OID 0)
-- Dependencies: 270
-- Name: audyt_dostepu_id_audytu_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.audyt_dostepu_id_audytu_seq', 1, false);


--
-- TOC entry 5340 (class 0 OID 0)
-- Dependencies: 249
-- Name: blokady_klienta_id_blokady_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.blokady_klienta_id_blokady_seq', 1, false);


--
-- TOC entry 5341 (class 0 OID 0)
-- Dependencies: 259
-- Name: historia_hasla_id_historia_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.historia_hasla_id_historia_seq', 1, false);


--
-- TOC entry 5342 (class 0 OID 0)
-- Dependencies: 235
-- Name: historia_salda_id_zmiany_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.historia_salda_id_zmiany_seq', 1, false);


--
-- TOC entry 5343 (class 0 OID 0)
-- Dependencies: 253
-- Name: historia_zmian_danych_id_zmiany_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.historia_zmian_danych_id_zmiany_seq', 1, false);


--
-- TOC entry 5344 (class 0 OID 0)
-- Dependencies: 245
-- Name: karta_nr_karty_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.karta_nr_karty_seq', 1, false);


--
-- TOC entry 5345 (class 0 OID 0)
-- Dependencies: 229
-- Name: klient_nr_ewidencyjny_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.klient_nr_ewidencyjny_seq', 12, true);


--
-- TOC entry 5346 (class 0 OID 0)
-- Dependencies: 263
-- Name: kontakty_przelewowe_id_kontaktu_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.kontakty_przelewowe_id_kontaktu_seq', 1, false);


--
-- TOC entry 5347 (class 0 OID 0)
-- Dependencies: 231
-- Name: konto_nr_konta_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.konto_nr_konta_seq', 1, false);


--
-- TOC entry 5348 (class 0 OID 0)
-- Dependencies: 239
-- Name: kredyt_id_kredytu_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.kredyt_id_kredytu_seq', 1, false);


--
-- TOC entry 5349 (class 0 OID 0)
-- Dependencies: 243
-- Name: lokata_id_lokaty_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lokata_id_lokaty_seq', 1, false);


--
-- TOC entry 5350 (class 0 OID 0)
-- Dependencies: 221
-- Name: oddzial_id_oddzialu_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.oddzial_id_oddzialu_seq', 1, true);


--
-- TOC entry 5351 (class 0 OID 0)
-- Dependencies: 255
-- Name: peŁnomocnictwa_id_pelnomocnictwa_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."peŁnomocnictwa_id_pelnomocnictwa_seq"', 1, false);


--
-- TOC entry 5352 (class 0 OID 0)
-- Dependencies: 265
-- Name: powiadomienia_klienta_id_powiadomienia_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.powiadomienia_klienta_id_powiadomienia_seq', 1, false);


--
-- TOC entry 5353 (class 0 OID 0)
-- Dependencies: 267
-- Name: pracownik_id_pracownika_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pracownik_id_pracownika_seq', 6, true);


--
-- TOC entry 5354 (class 0 OID 0)
-- Dependencies: 241
-- Name: raty_kredytu_id_raty_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.raty_kredytu_id_raty_seq', 1, false);


--
-- TOC entry 5355 (class 0 OID 0)
-- Dependencies: 223
-- Name: role_id_roli_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.role_id_roli_seq', 1, false);


--
-- TOC entry 5356 (class 0 OID 0)
-- Dependencies: 257
-- Name: sesje_klienta_id_sesji_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sesje_klienta_id_sesji_seq', 1, false);


--
-- TOC entry 5357 (class 0 OID 0)
-- Dependencies: 237
-- Name: transakcje_id_transakcji_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transakcje_id_transakcji_seq', 1, false);


--
-- TOC entry 5358 (class 0 OID 0)
-- Dependencies: 227
-- Name: typy_kart_id_typu_karty_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.typy_kart_id_typu_karty_seq', 1, false);


--
-- TOC entry 5359 (class 0 OID 0)
-- Dependencies: 225
-- Name: typy_kont_id_typu_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.typy_kont_id_typu_seq', 1, false);


--
-- TOC entry 5360 (class 0 OID 0)
-- Dependencies: 261
-- Name: ustawienia_2fa_id_ustawienia_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ustawienia_2fa_id_ustawienia_seq', 1, false);


--
-- TOC entry 5361 (class 0 OID 0)
-- Dependencies: 233
-- Name: ustawienia_konta_id_ustawienia_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ustawienia_konta_id_ustawienia_seq', 1, false);


--
-- TOC entry 5362 (class 0 OID 0)
-- Dependencies: 251
-- Name: zgloszenia_klientow_id_zgloszenia_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.zgloszenia_klientow_id_zgloszenia_seq', 1, false);


--
-- TOC entry 5363 (class 0 OID 0)
-- Dependencies: 247
-- Name: zgody_klienta_id_zgody_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.zgody_klienta_id_zgody_seq', 1, false);


--
-- TOC entry 5018 (class 2606 OID 17564)
-- Name: adres adres_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adres
    ADD CONSTRAINT adres_pkey PRIMARY KEY (id_adres);


--
-- TOC entry 5072 (class 2606 OID 17935)
-- Name: alerty_systemowe alerty_systemowe_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alerty_systemowe
    ADD CONSTRAINT alerty_systemowe_pkey PRIMARY KEY (id_alertu);


--
-- TOC entry 5070 (class 2606 OID 17915)
-- Name: audyt_dostepu audyt_dostepu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audyt_dostepu
    ADD CONSTRAINT audyt_dostepu_pkey PRIMARY KEY (id_audytu);


--
-- TOC entry 5048 (class 2606 OID 17755)
-- Name: blokady_klienta blokady_klienta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blokady_klienta
    ADD CONSTRAINT blokady_klienta_pkey PRIMARY KEY (id_blokady);


--
-- TOC entry 5058 (class 2606 OID 17829)
-- Name: historia_hasla historia_hasla_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historia_hasla
    ADD CONSTRAINT historia_hasla_pkey PRIMARY KEY (id_historia);


--
-- TOC entry 5034 (class 2606 OID 17654)
-- Name: historia_salda historia_salda_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historia_salda
    ADD CONSTRAINT historia_salda_pkey PRIMARY KEY (id_zmiany);


--
-- TOC entry 5052 (class 2606 OID 17785)
-- Name: historia_zmian_danych historia_zmian_danych_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historia_zmian_danych
    ADD CONSTRAINT historia_zmian_danych_pkey PRIMARY KEY (id_zmiany);


--
-- TOC entry 5044 (class 2606 OID 17719)
-- Name: karta karta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.karta
    ADD CONSTRAINT karta_pkey PRIMARY KEY (nr_karty);


--
-- TOC entry 5028 (class 2606 OID 17610)
-- Name: klient klient_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.klient
    ADD CONSTRAINT klient_pkey PRIMARY KEY (nr_ewidencyjny);


--
-- TOC entry 5062 (class 2606 OID 17855)
-- Name: kontakty_przelewowe kontakty_przelewowe_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kontakty_przelewowe
    ADD CONSTRAINT kontakty_przelewowe_pkey PRIMARY KEY (id_kontaktu);


--
-- TOC entry 5030 (class 2606 OID 17623)
-- Name: konto konto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.konto
    ADD CONSTRAINT konto_pkey PRIMARY KEY (nr_konta);


--
-- TOC entry 5038 (class 2606 OID 17680)
-- Name: kredyt kredyt_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kredyt
    ADD CONSTRAINT kredyt_pkey PRIMARY KEY (id_kredytu);


--
-- TOC entry 5042 (class 2606 OID 17706)
-- Name: lokata lokata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lokata
    ADD CONSTRAINT lokata_pkey PRIMARY KEY (id_lokaty);


--
-- TOC entry 5020 (class 2606 OID 17572)
-- Name: oddzial oddzial_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.oddzial
    ADD CONSTRAINT oddzial_pkey PRIMARY KEY (id_oddzialu);


--
-- TOC entry 5054 (class 2606 OID 17798)
-- Name: pełnomocnictwa peŁnomocnictwa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pełnomocnictwa"
    ADD CONSTRAINT "peŁnomocnictwa_pkey" PRIMARY KEY (id_pelnomocnictwa);


--
-- TOC entry 5064 (class 2606 OID 17870)
-- Name: powiadomienia_klienta powiadomienia_klienta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.powiadomienia_klienta
    ADD CONSTRAINT powiadomienia_klienta_pkey PRIMARY KEY (id_powiadomienia);


--
-- TOC entry 5066 (class 2606 OID 17883)
-- Name: pracownik pracownik_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pracownik
    ADD CONSTRAINT pracownik_pkey PRIMARY KEY (id_pracownika);


--
-- TOC entry 5068 (class 2606 OID 17895)
-- Name: pracownik_role pracownik_role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pracownik_role
    ADD CONSTRAINT pracownik_role_pkey PRIMARY KEY (id_pracownika, id_roli);


--
-- TOC entry 5040 (class 2606 OID 17693)
-- Name: raty_kredytu raty_kredytu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.raty_kredytu
    ADD CONSTRAINT raty_kredytu_pkey PRIMARY KEY (id_raty);


--
-- TOC entry 5022 (class 2606 OID 17582)
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id_roli);


--
-- TOC entry 5056 (class 2606 OID 17816)
-- Name: sesje_klienta sesje_klienta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sesje_klienta
    ADD CONSTRAINT sesje_klienta_pkey PRIMARY KEY (id_sesji);


--
-- TOC entry 5036 (class 2606 OID 17667)
-- Name: transakcje transakcje_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transakcje
    ADD CONSTRAINT transakcje_pkey PRIMARY KEY (id_transakcji);


--
-- TOC entry 5026 (class 2606 OID 17602)
-- Name: typy_kart typy_kart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.typy_kart
    ADD CONSTRAINT typy_kart_pkey PRIMARY KEY (id_typu_karty);


--
-- TOC entry 5024 (class 2606 OID 17592)
-- Name: typy_kont typy_kont_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.typy_kont
    ADD CONSTRAINT typy_kont_pkey PRIMARY KEY (id_typu);


--
-- TOC entry 5060 (class 2606 OID 17842)
-- Name: ustawienia_2fa ustawienia_2fa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ustawienia_2fa
    ADD CONSTRAINT ustawienia_2fa_pkey PRIMARY KEY (id_ustawienia);


--
-- TOC entry 5032 (class 2606 OID 17641)
-- Name: ustawienia_konta ustawienia_konta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ustawienia_konta
    ADD CONSTRAINT ustawienia_konta_pkey PRIMARY KEY (id_ustawienia);


--
-- TOC entry 5050 (class 2606 OID 17770)
-- Name: zgloszenia_klientow zgloszenia_klientow_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zgloszenia_klientow
    ADD CONSTRAINT zgloszenia_klientow_pkey PRIMARY KEY (id_zgloszenia);


--
-- TOC entry 5046 (class 2606 OID 17742)
-- Name: zgody_klienta zgody_klienta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zgody_klienta
    ADD CONSTRAINT zgody_klienta_pkey PRIMARY KEY (id_zgody);


--
-- TOC entry 5099 (class 2606 OID 17921)
-- Name: audyt_dostepu audyt_dostepu_id_klienta_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audyt_dostepu
    ADD CONSTRAINT audyt_dostepu_id_klienta_fkey FOREIGN KEY (id_klienta) REFERENCES public.klient(nr_ewidencyjny);


--
-- TOC entry 5100 (class 2606 OID 17916)
-- Name: audyt_dostepu audyt_dostepu_id_pracownika_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audyt_dostepu
    ADD CONSTRAINT audyt_dostepu_id_pracownika_fkey FOREIGN KEY (id_pracownika) REFERENCES public.pracownik(id_pracownika);


--
-- TOC entry 5086 (class 2606 OID 17756)
-- Name: blokady_klienta blokady_klienta_id_klienta_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blokady_klienta
    ADD CONSTRAINT blokady_klienta_id_klienta_fkey FOREIGN KEY (id_klienta) REFERENCES public.klient(nr_ewidencyjny);


--
-- TOC entry 5092 (class 2606 OID 17830)
-- Name: historia_hasla historia_hasla_id_klienta_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historia_hasla
    ADD CONSTRAINT historia_hasla_id_klienta_fkey FOREIGN KEY (id_klienta) REFERENCES public.klient(nr_ewidencyjny);


--
-- TOC entry 5077 (class 2606 OID 17655)
-- Name: historia_salda historia_salda_nr_konta_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historia_salda
    ADD CONSTRAINT historia_salda_nr_konta_fkey FOREIGN KEY (nr_konta) REFERENCES public.konto(nr_konta);


--
-- TOC entry 5088 (class 2606 OID 17786)
-- Name: historia_zmian_danych historia_zmian_danych_id_klienta_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historia_zmian_danych
    ADD CONSTRAINT historia_zmian_danych_id_klienta_fkey FOREIGN KEY (id_klienta) REFERENCES public.klient(nr_ewidencyjny);


--
-- TOC entry 5082 (class 2606 OID 17720)
-- Name: karta karta_id_klienta_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.karta
    ADD CONSTRAINT karta_id_klienta_fkey FOREIGN KEY (id_klienta) REFERENCES public.klient(nr_ewidencyjny);


--
-- TOC entry 5083 (class 2606 OID 17725)
-- Name: karta karta_id_konta_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.karta
    ADD CONSTRAINT karta_id_konta_fkey FOREIGN KEY (id_konta) REFERENCES public.konto(nr_konta);


--
-- TOC entry 5084 (class 2606 OID 17730)
-- Name: karta karta_id_typu_karty_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.karta
    ADD CONSTRAINT karta_id_typu_karty_fkey FOREIGN KEY (id_typu_karty) REFERENCES public.typy_kart(id_typu_karty);


--
-- TOC entry 5073 (class 2606 OID 17611)
-- Name: klient klient_adres_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.klient
    ADD CONSTRAINT klient_adres_id_fkey FOREIGN KEY (adres_id) REFERENCES public.adres(id_adres);


--
-- TOC entry 5094 (class 2606 OID 17856)
-- Name: kontakty_przelewowe kontakty_przelewowe_id_klienta_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kontakty_przelewowe
    ADD CONSTRAINT kontakty_przelewowe_id_klienta_fkey FOREIGN KEY (id_klienta) REFERENCES public.klient(nr_ewidencyjny);


--
-- TOC entry 5074 (class 2606 OID 17624)
-- Name: konto konto_id_klienta_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.konto
    ADD CONSTRAINT konto_id_klienta_fkey FOREIGN KEY (id_klienta) REFERENCES public.klient(nr_ewidencyjny);


--
-- TOC entry 5075 (class 2606 OID 17629)
-- Name: konto konto_id_typu_konta_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.konto
    ADD CONSTRAINT konto_id_typu_konta_fkey FOREIGN KEY (id_typu_konta) REFERENCES public.typy_kont(id_typu);


--
-- TOC entry 5079 (class 2606 OID 17681)
-- Name: kredyt kredyt_id_klienta_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kredyt
    ADD CONSTRAINT kredyt_id_klienta_fkey FOREIGN KEY (id_klienta) REFERENCES public.klient(nr_ewidencyjny);


--
-- TOC entry 5081 (class 2606 OID 17707)
-- Name: lokata lokata_id_klienta_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lokata
    ADD CONSTRAINT lokata_id_klienta_fkey FOREIGN KEY (id_klienta) REFERENCES public.klient(nr_ewidencyjny);


--
-- TOC entry 5089 (class 2606 OID 17799)
-- Name: pełnomocnictwa peŁnomocnictwa_id_klienta_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pełnomocnictwa"
    ADD CONSTRAINT "peŁnomocnictwa_id_klienta_fkey" FOREIGN KEY (id_klienta) REFERENCES public.klient(nr_ewidencyjny);


--
-- TOC entry 5090 (class 2606 OID 17804)
-- Name: pełnomocnictwa peŁnomocnictwa_id_pelnomocnika_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pełnomocnictwa"
    ADD CONSTRAINT "peŁnomocnictwa_id_pelnomocnika_fkey" FOREIGN KEY (id_pelnomocnika) REFERENCES public.klient(nr_ewidencyjny);


--
-- TOC entry 5095 (class 2606 OID 17871)
-- Name: powiadomienia_klienta powiadomienia_klienta_id_klienta_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.powiadomienia_klienta
    ADD CONSTRAINT powiadomienia_klienta_id_klienta_fkey FOREIGN KEY (id_klienta) REFERENCES public.klient(nr_ewidencyjny);


--
-- TOC entry 5096 (class 2606 OID 17884)
-- Name: pracownik pracownik_oddzial_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pracownik
    ADD CONSTRAINT pracownik_oddzial_id_fkey FOREIGN KEY (oddzial_id) REFERENCES public.oddzial(id_oddzialu);


--
-- TOC entry 5097 (class 2606 OID 17896)
-- Name: pracownik_role pracownik_role_id_pracownika_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pracownik_role
    ADD CONSTRAINT pracownik_role_id_pracownika_fkey FOREIGN KEY (id_pracownika) REFERENCES public.pracownik(id_pracownika);


--
-- TOC entry 5098 (class 2606 OID 17901)
-- Name: pracownik_role pracownik_role_id_roli_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pracownik_role
    ADD CONSTRAINT pracownik_role_id_roli_fkey FOREIGN KEY (id_roli) REFERENCES public.role(id_roli);


--
-- TOC entry 5080 (class 2606 OID 17694)
-- Name: raty_kredytu raty_kredytu_id_kredytu_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.raty_kredytu
    ADD CONSTRAINT raty_kredytu_id_kredytu_fkey FOREIGN KEY (id_kredytu) REFERENCES public.kredyt(id_kredytu);


--
-- TOC entry 5091 (class 2606 OID 17817)
-- Name: sesje_klienta sesje_klienta_id_klienta_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sesje_klienta
    ADD CONSTRAINT sesje_klienta_id_klienta_fkey FOREIGN KEY (id_klienta) REFERENCES public.klient(nr_ewidencyjny);


--
-- TOC entry 5078 (class 2606 OID 17668)
-- Name: transakcje transakcje_id_konta_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transakcje
    ADD CONSTRAINT transakcje_id_konta_fkey FOREIGN KEY (id_konta) REFERENCES public.konto(nr_konta);


--
-- TOC entry 5093 (class 2606 OID 17843)
-- Name: ustawienia_2fa ustawienia_2fa_id_klienta_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ustawienia_2fa
    ADD CONSTRAINT ustawienia_2fa_id_klienta_fkey FOREIGN KEY (id_klienta) REFERENCES public.klient(nr_ewidencyjny);


--
-- TOC entry 5076 (class 2606 OID 17642)
-- Name: ustawienia_konta ustawienia_konta_id_konta_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ustawienia_konta
    ADD CONSTRAINT ustawienia_konta_id_konta_fkey FOREIGN KEY (id_konta) REFERENCES public.konto(nr_konta);


--
-- TOC entry 5087 (class 2606 OID 17771)
-- Name: zgloszenia_klientow zgloszenia_klientow_id_klienta_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zgloszenia_klientow
    ADD CONSTRAINT zgloszenia_klientow_id_klienta_fkey FOREIGN KEY (id_klienta) REFERENCES public.klient(nr_ewidencyjny);


--
-- TOC entry 5085 (class 2606 OID 17743)
-- Name: zgody_klienta zgody_klienta_id_klienta_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zgody_klienta
    ADD CONSTRAINT zgody_klienta_id_klienta_fkey FOREIGN KEY (id_klienta) REFERENCES public.klient(nr_ewidencyjny);


--
-- TOC entry 5309 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2025-12-29 15:45:04

--
-- PostgreSQL database dump complete
--

\unrestrict iuUOK6oKVL0Qgn72ARxQxoAAHfZkPGCuNi3RdJz1SIKtthfnNt0mezmiSPneEpR

