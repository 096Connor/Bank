import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Grid, Paper, Card, CardContent, Button } from "@mui/material";
import axiosClient from "../api/axiosClient";
import mockApi from "../api/mockApi";
import KlientHeader from "../components/KlientHeader";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

export default function KlientProfilePage() {
  const navigate = useNavigate();
  const klient = JSON.parse(localStorage.getItem("klient") || "{}");
  const [details, setDetails] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const theme = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("klient");
    localStorage.removeItem("token");
    navigate("/klient-login");
  };

  useEffect(() => {
    (async () => {
      try {
        // Używaj /me zamiast /{id}
        const res = await axiosClient.get("/klienci/me");
        setDetails(res.data || null);

        // Używaj /me/konta zamiast /{id}/konta
        const acc = await axiosClient.get("/klienci/me/konta");
        setAccounts(acc.data || []);
      } catch (error) {
        console.error("Błąd pobierania danych z backendu:", error);
        // fallback to mock data when backend not available
        try {
          const d = await mockApi.fetchKlientById(klient.id);
          setDetails(d);
          const accs = await mockApi.fetchKontaByKlientId(klient.id);
          setAccounts(accs || []);
        } catch (mockError) {
          console.error("Błąd pobierania profilu (mock)", mockError);
        }
      }
    })();
  }, [klient?.id]);

  async function refreshAccounts() {
    try {
      const acc = await axiosClient.get("/klienci/me/konta");
      setAccounts(acc.data || []);
    } catch (_) {
      try {
        const accs = await mockApi.fetchKontaByKlientId(klient.id);
        setAccounts(accs || []);
      } catch (__) {
        // ignore
      }
    }
  }

  async function handleTransfer(e) {
    e.preventDefault();
    if (!fromKonto || !toNrKonta || !kwota) {
      // enqueueSnackbar nie jest zdefiniowany - musisz dodać useSnackbar()
      alert("Wypełnij wszystkie pola przelewu");
      return;
    }

    const payload = {
      fromKontoId: Number(fromKonto),
      toKontoId: Number(toNrKonta),
      kwota: Number(kwota),
      waluta: waluta,
      opis: opis
    };

    try {
      await axiosClient.post("/transakcje/transfer", payload);
      alert("Przelew wykonany pomyślnie");
      setKwota("");
      setToNrKonta("");
      setOpis("");
      // refresh accounts
      await refreshAccounts();
    } catch (err) {
      console.error("Błąd przelewu", err);
      alert("Błąd wykonania przelewu");
    }
  }

  if (!klient || !klient.id) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography variant="h6">Nie jesteś zalogowany.</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", background: theme.palette.background.default }}>
      <KlientHeader handleLogout={handleLogout} />

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 800 }}>
          Profil klienta
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Dane osobowe
                </Typography>
                <Typography>Imię: {details?.imie || klient.imie}</Typography>
                <Typography>Nazwisko: {details?.nazwisko || klient.nazwisko}</Typography>
                <Typography>PESEL: {details?.pesel || klient.pesel}</Typography>
                <Typography>Telefon: {details?.nrTel || klient.nrTel || "—"}</Typography>
                <Typography>Email: {details?.mail || klient.mail || "—"}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Status
                </Typography>
                <Typography>Typ klienta: {details?.typKlienta || klient.typKlienta}</Typography>
                <Typography>Status konta: {details?.statusKonta || klient.statusKonta}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
                Konta ({accounts.length})
              </Typography>

              {accounts.map((acc, index) => (
                <Box
                  key={acc.nrKonta}
                  sx={{
                    p: 2.5,
                    mb: 2,
                    borderRadius: 2,
                    bgcolor: acc.status === "ZAMKNIĘTE" ? "grey.100" : "grey.50",
                    border: "1px solid",
                    borderColor: acc.status === "ZAMKNIĘTE" ? "grey.400" : "grey.300",
                    "&:last-child": { mb: 0 }
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "primary.main" }}>
                    Konto {index + 1}
                  </Typography>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
                    <Typography>
                      <strong>Nr:</strong> {acc.nrKonta}
                    </Typography>

                    {acc.nazwaKonta && (
                      <Typography>
                        <strong>Nazwa konta:</strong> {acc.nazwaKonta}
                      </Typography>
                    )}

                    {acc.opis && (
                      <Typography>
                        <strong>Opis:</strong> {acc.opis}
                      </Typography>
                    )}

                    {acc.dataOtwarcia && (
                      <Typography>
                        <strong>Data otwarcia:</strong> {acc.dataOtwarcia}
                      </Typography>
                    )}

                    {acc.oprocentowanie != null && (
                      <Typography>
                        <strong>Oprocentowanie:</strong> {acc.oprocentowanie}%
                      </Typography>
                    )}

                    <Typography
                      sx={{
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        mt: 1,
                        color: acc.status === "ZAMKNIĘTE" ? "error.main" : "success.main"
                      }}
                    >
                      Saldo:{" "}
                      {acc.saldo?.toLocaleString("pl-PL", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}{" "}
                      {acc.waluta}
                    </Typography>

                    <Typography>
                      <strong>Status:</strong> {acc.status}
                    </Typography>

                    {acc.status === "ZAMKNIĘTE" && acc.dataZamkniecia && (
                      <Typography sx={{ color: "error.main", fontWeight: 600 }}>
                        <strong>Data zamknięcia:</strong> {acc.dataZamkniecia}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))}

              {accounts.length === 0 && (
                <Typography sx={{ textAlign: "center", py: 3, color: "text.secondary" }}>
                  Brak kont.
                </Typography>
              )}
            </Paper>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                variant="contained"
                onClick={() => navigate("/klient-home")}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                  textTransform: "none"
                }}
              >
                Powrót do strony głównej
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
