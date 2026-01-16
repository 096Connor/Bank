import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Button,
  IconButton
} from "@mui/material";
import axiosClient from "../api/axiosClient";
import mockApi from "../api/mockApi";
import KlientHeader from "../components/KlientHeader";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function KlientProfilePage() {
  const navigate = useNavigate();
  const klient = JSON.parse(localStorage.getItem("klient") || "{}");
  const [details, setDetails] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const theme = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("klient");
    localStorage.removeItem("token");
    navigate("/klient-login");
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosClient.get("/klienci/me");
        setDetails(res.data || null);
        const acc = await axiosClient.get("/konta/me");
        setAccounts(acc.data || []);
      } catch (error) {
        console.error("Błąd pobierania danych z backendu:", error);
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

  const prevAccount = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : accounts.length - 1));
  };

  const nextAccount = () => {
    setActiveIndex((prev) => (prev < accounts.length - 1 ? prev + 1 : 0));
  };

  if (!klient || !klient.id) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography variant="h6">Nie jesteś zalogowany.</Typography>
      </Container>
    );
  }

  const activeAccount = accounts[activeIndex];

  return (
    <Box sx={{ minHeight: "100vh", background: theme.palette.background.default }}>
      <KlientHeader handleLogout={handleLogout} />

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: 800,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Profil klienta
        </Typography>

        <Grid container spacing={3}>
          {/* Dane osobowe */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                bgcolor: theme.palette.mode === "dark" ? "#2a2a3b" : "#fff",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 8px 24px rgba(0,0,0,0.4)"
                    : "0 8px 24px rgba(102,126,234,0.15)"
              }}
            >
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

          {/* Status klienta */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                bgcolor: theme.palette.mode === "dark" ? "#2a2a3b" : "#fff",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 8px 24px rgba(0,0,0,0.4)"
                    : "0 8px 24px rgba(102,126,234,0.15)"
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Status
                </Typography>
                <Typography>Typ klienta: {details?.typKlienta || klient.typKlienta}</Typography>
                <Typography>Status konta: {details?.statusKonta || klient.statusKonta}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Konta ze sliderem */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 3,
                bgcolor: theme.palette.mode === "dark" ? "#2a2a3b" : "#f9f9f9",
                borderRadius: 2,
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 8px 24px rgba(0,0,0,0.4)"
                    : "0 8px 24px rgba(102,126,234,0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
                Konta ({accounts.length})
              </Typography>

              {accounts.length > 0 && activeAccount ? (
                <Box
                  sx={{
                    width: 500, // stała szerokość slidera
                    minHeight: 320, // stała wysokość slidera
                    p: 2.5,
                    borderRadius: 2,
                    bgcolor:
                      activeAccount.status === "ZAMKNIĘTE"
                        ? theme.palette.mode === "dark"
                          ? "#1e1e2f"
                          : "#f5f5f5"
                        : theme.palette.mode === "dark"
                        ? "#2a2a3b"
                        : "#fff",
                    border: "1px solid",
                    borderColor:
                      activeAccount.status === "ZAMKNIĘTE" ? "error.main" : theme.palette.divider,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    transition: "all 0.3s ease",
                    mx: "auto" // wyśrodkowanie w poziomie
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "primary.main" }}>
                    Konto {activeIndex + 1} z {accounts.length}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.8,
                      overflowY: "auto",
                      flexGrow: 1
                    }}
                  >
                    <Typography>
                      <strong>Nr:</strong> {activeAccount.nrKonta}
                    </Typography>

                    {activeAccount.nazwaKonta && (
                      <Typography>
                        <strong>Nazwa konta:</strong> {activeAccount.nazwaKonta}
                      </Typography>
                    )}

                    {activeAccount.opis && (
                      <Typography>
                        <strong>Opis:</strong> {activeAccount.opis}
                      </Typography>
                    )}

                    {activeAccount.dataOtwarcia && (
                      <Typography>
                        <strong>Data otwarcia:</strong> {activeAccount.dataOtwarcia}
                      </Typography>
                    )}

                    {activeAccount.oprocentowanie != null && (
                      <Typography>
                        <strong>Oprocentowanie:</strong> {activeAccount.oprocentowanie}%
                      </Typography>
                    )}

                    <Typography
                      sx={{
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        mt: 1,
                        color: activeAccount.status === "ZAMKNIĘTE" ? "error.main" : "success.main"
                      }}
                    >
                      Saldo:{" "}
                      {activeAccount.saldo?.toLocaleString("pl-PL", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}{" "}
                      {activeAccount.waluta}
                    </Typography>

                    <Typography>
                      <strong>Status:</strong> {activeAccount.status}
                    </Typography>

                    {activeAccount.status === "ZAMKNIĘTE" && activeAccount.dataZamkniecia && (
                      <Typography sx={{ color: "error.main", fontWeight: 600 }}>
                        <strong>Data zamknięcia:</strong> {activeAccount.dataZamkniecia}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ) : (
                <Typography sx={{ textAlign: "center", py: 3, color: "text.secondary" }}>
                  Brak kont.
                </Typography>
              )}

              {/* Nawigacja slidera */}
              {accounts.length > 1 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: 500, // ta sama szerokość co slider
                    mx: "auto",
                    mt: 1
                  }}
                >
                  <IconButton onClick={prevAccount} color="primary">
                    <ArrowBackIosNewIcon />
                  </IconButton>
                  <IconButton onClick={nextAccount} color="primary">
                    <ArrowForwardIosIcon />
                  </IconButton>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Przycisk powrotu */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                variant="contained"
                onClick={() => navigate("/klient-home")}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                  textTransform: "none",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  "&:hover": { background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)" }
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
