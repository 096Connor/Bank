import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Grid, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import QuickStats from "../components/QuickStats";
import TransferPanel from "../components/TransferPanel";
import TransactionsList from "../components/TransactionsList";
import KlientHeader from "../components/KlientHeader";
import axiosClient from "../api/axiosClient";
import mockApi from "../api/mockApi";
import { useTheme } from "@mui/material/styles";

export default function KlientHomePage() {
  const navigate = useNavigate();
  const theme = useTheme();

  const storedKlient = localStorage.getItem("klient");
  const klient = storedKlient && storedKlient !== "undefined" ? JSON.parse(storedKlient) : null;

  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    if (!klient) navigate("/klient-login");
  }, [klient, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("klient");
    localStorage.removeItem("token");
    navigate("/klient-login");
  };

  const fetchAccounts = async () => {
    if (!klient?.id) return;
    try {
      const res = await axiosClient.get(`/klienci/${klient.id}/konta`);
      setAccounts(res.data || []);
      setSelectedAccount(res.data[0] || null);
    } catch (err) {
      console.warn("Błąd pobierania kont z backend, użycie mock:", err);
      try {
        const mockAccounts = await mockApi.fetchKontaByKlientId(klient.id);
        setAccounts(mockAccounts || []);
        setSelectedAccount(mockAccounts[0] || null);
      } catch (mockErr) {
        console.error("Nie udało się pobrać kont (mock)", mockErr);
      }
    }
  };

  const fetchTransactions = async (kontoNr) => {
    if (!kontoNr) return;
    try {
      const res = await axiosClient.get(`/transakcje/konto/${kontoNr}`);
      setTransactions(res.data || []);
    } catch (err) {
      console.warn("Błąd pobierania transakcji z backend, użycie mock:", err);
      try {
        const mockTrans = await mockApi.fetchTransakcjeByKonto(kontoNr);
        setTransactions(mockTrans || []);
      } catch (mockErr) {
        console.error("Nie udało się pobrać transakcji (mock)", mockErr);
      }
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [klient]);
  useEffect(() => {
    if (selectedAccount?.nrKonta) fetchTransactions(selectedAccount.nrKonta);
  }, [selectedAccount]);

  const refreshAccounts = async () => {
    await fetchAccounts();
  };

  return (
    <Box sx={{ minHeight: "100vh", background: theme.palette.background.default }}>
      <KlientHeader handleLogout={handleLogout} />

      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: theme.palette.text.primary,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1
            }}
          >
            Witaj, {klient?.imie} {klient?.nazwisko}
          </Typography>
          <Typography variant="h6" sx={{ color: "#666", fontWeight: 400 }}>
            Zarządzaj swoim kontem bankowym
          </Typography>
        </Box>

        <QuickStats
          accounts={accounts}
          theme={theme}
          lastTransaction={
            transactions.length > 0
              ? [...transactions].sort(
                  (a, b) => new Date(b.dataTransakcji) - new Date(a.dataTransakcji)
                )[0]
              : null
          }
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <TransactionsList transactions={transactions} />
          </Grid>

          <Grid item xs={12} md={4}>
            <TransferPanel
              accounts={accounts}
              onSuccess={refreshAccounts}
              klient={klient}
              defaultFromAccount={selectedAccount?.nrKonta}
            />

            <Paper sx={{ p: 3, borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#667eea" }}>
                ℹ️ Szybka pomoc
              </Typography>
              <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.8, mb: 2 }}>
                Jeśli masz pytania dotyczące swojego konta, skontaktuj się z naszym zespołem
                wsparcia.
              </Typography>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  fontWeight: 600,
                  textTransform: "none"
                }}
              >
                Kontakt
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
