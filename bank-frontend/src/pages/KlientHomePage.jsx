import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Grid, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import QuickStats from "../components/QuickStats";
import TransferPanel from "../components/TransferPanel";
import axiosClient from "../api/axiosClient";
import mockApi from "../api/mockApi";
import { useTheme } from "@mui/material/styles";
import KlientHeader from "../components/KlientHeader";
import TransactionsList from "../components/TransactionsList";

export default function KlientHomePage() {
  const navigate = useNavigate();
  const klient = JSON.parse(localStorage.getItem("klient") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("klient");
    navigate("/klient-login");
  };

  const theme = useTheme();

  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // fetch accounts for logged-in klient
  useEffect(() => {
    (async () => {
      try {
        if (klient && klient.id) {
          const res = await axiosClient.get(`/klienci/${klient.id}/konta`);
          setAccounts(res.data || []);
        }
      } catch {
        try {
          if (klient && klient.id) {
            const accs = await mockApi.fetchKontaByKlientId(klient.id);
            setAccounts(accs || []);
          }
        } catch (err) {
          console.error("Nie udało się pobrać kont klienta (mock)", err);
        }
      }
    })();
  }, [klient]);

  // fetch transactions for primary account
  useEffect(() => {
    (async () => {
      try {
        if (accounts && accounts[0]) {
          const res = await axiosClient.get(`/transakcje/konto/${accounts[0].nrKonta}`);
          setTransactions(res.data || []);
        }
      } catch {
        try {
          if (accounts && accounts[0]) {
            const mockT = await mockApi.fetchTransakcjeByKonto(accounts[0].nrKonta);
            setTransactions(mockT || []);
          }
        } catch (err) {
          console.error("Nie udało się pobrać transakcji (mock)", err);
        }
      }
    })();
  }, [accounts]);

  async function refreshAccounts() {
    try {
      if (klient && klient.id) {
        const acc = await axiosClient.get(`/klienci/${klient.id}/konta`);
        setAccounts(acc.data || []);
      }
    } catch (e) {
      try {
        if (klient && klient.id) {
          const accs = await mockApi.fetchKontaByKlientId(klient.id);
          setAccounts(accs || []);
        }
      } catch (_) {
        // ignore
      }
    }
  }

  // transfer UI removed from home; handled in profile or separate flow
  // accountInfo moved to AccountList component

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
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1
            }}
          >
            Witaj, {klient.imie} {klient.nazwisko}
          </Typography>
          <Typography variant="h6" sx={{ color: "#666", fontWeight: 400 }}>
            Zarządzaj swoim kontem bankowym
          </Typography>
        </Box>

        <QuickStats accounts={accounts} theme={theme} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <TransactionsList transactions={transactions} />
          </Grid>

          <Grid item xs={12} md={4}>
            <TransferPanel accounts={accounts} onSuccess={refreshAccounts} klient={klient} />
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
