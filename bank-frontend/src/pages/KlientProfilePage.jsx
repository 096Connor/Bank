import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Grid, Paper, Card, CardContent } from "@mui/material";
import axiosClient from "../api/axiosClient";
import mockApi from "../api/mockApi";
import { useSnackbar } from "notistack";

export default function KlientProfilePage() {
  const klient = JSON.parse(localStorage.getItem("klient") || "{}");
  const [details, setDetails] = useState(null);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        if (klient?.id) {
          const res = await axiosClient.get(`/klienci/${klient.id}`);
          setDetails(res.data || null);
          const acc = await axiosClient.get(`/klienci/${klient.id}/konta`);
          setAccounts(acc.data || []);
        }
      } catch (e) {
        // fallback to mock data when backend not available
        try {
          const d = await mockApi.fetchKlientById(klient.id);
          setDetails(d);
          const accs = await mockApi.fetchKontaByKlientId(klient.id);
          setAccounts(accs || []);
        } catch (err) {
          console.error("Błąd pobierania profilu (mock)", err);
        }
      }
    })();
  }, [klient?.id]);

  async function refreshAccounts() {
    try {
      const acc = await axiosClient.get(`/klienci/${klient.id}/konta`);
      setAccounts(acc.data || []);
    } catch (e) {
      try {
        const accs = await mockApi.fetchKontaByKlientId(klient.id);
        setAccounts(accs || []);
      } catch (_) {
        // ignore
      }
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
    <Box sx={{ minHeight: "100vh", background: "transparent" }}>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 800 }}>
          Profil klienta
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
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

          <Grid item xs={12} md={6}>
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

          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                Konta ({accounts.length})
              </Typography>
              {accounts.map((acc) => (
                <Box key={acc.nrKonta} sx={{ p: 2, borderBottom: "1px solid #eee" }}>
                  <Typography sx={{ fontWeight: 700 }}>{acc.nrKonta}</Typography>
                  <Typography>Typ: {acc.typKonta}</Typography>
                  <Typography>
                    Saldo:{" "}
                    {acc.saldo?.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}{" "}
                    {acc.waluta}
                  </Typography>
                  <Typography>Data otwarcia: {acc.dataOtwarcia}</Typography>
                  <Typography>Status: {acc.status}</Typography>
                </Box>
              ))}
              {accounts.length === 0 && <Typography>Brak kont.</Typography>}
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Nowy przelew
                </Typography>
                <Box component="form" onSubmit={handleTransfer} sx={{ mt: 1 }}>
                  <Stack spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel id="from-konto-label">Z konta</InputLabel>
                      <Select
                        labelId="from-konto-label"
                        value={fromKonto}
                        label="Z konta"
                        onChange={(e) => setFromKonto(e.target.value)}
                      >
                        {accounts.map((acc) => (
                          <MenuItem key={acc.nrKonta} value={acc.nrKonta}>
                            {acc.nrKonta} — {acc.saldo?.toFixed(2) || "0.00"} {acc.waluta}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <TextField
                      label="Na nr konta (nr_konta)"
                      value={toNrKonta}
                      onChange={(e) => setToNrKonta(e.target.value)}
                      fullWidth
                    />

                    <Stack direction="row" spacing={2}>
                      <TextField
                        label="Kwota"
                        value={kwota}
                        onChange={(e) => setKwota(e.target.value)}
                        type="number"
                        inputProps={{ step: "0.01" }}
                      />
                      <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel id="waluta-label">Waluta</InputLabel>
                        <Select
                          labelId="waluta-label"
                          value={waluta}
                          label="Waluta"
                          onChange={(e) => setWaluta(e.target.value)}
                        >
                          <MenuItem value="PLN">PLN</MenuItem>
                          <MenuItem value="EUR">EUR</MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>

                    <TextField
                      label="Tytuł / opis"
                      value={opis}
                      onChange={(e) => setOpis(e.target.value)}
                      fullWidth
                      multiline
                      rows={2}
                    />

                    <Button type="submit" variant="contained">
                      Wyślij przelew
                    </Button>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
