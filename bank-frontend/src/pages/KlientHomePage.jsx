import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
  Divider
} from "@mui/material";
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
    if (!klient) return;

    try {
      const headers = {};
      const token = localStorage.getItem("token");
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await axiosClient.get(`/konta/me`, { headers });
      setAccounts(res.data || []);

      if (!selectedAccount && res.data && res.data.length > 0) {
        setSelectedAccount(res.data[0]);
      }
    } catch (err) {
      console.warn("Błąd pobierania kont z backend, użycie mock:", err);
      try {
        const mockAccounts = await mockApi.fetchKontaByKlientId(klient?.id);
        setAccounts(mockAccounts || []);
        if (!selectedAccount && mockAccounts && mockAccounts.length > 0) {
          setSelectedAccount(mockAccounts[0]);
        }
      } catch (mockErr) {
        console.error("Nie udało się pobrać kont (mock)", mockErr);
      }
    }
  };

  const fetchTransactions = async (kontoNr) => {
    if (!kontoNr) return;
    try {
      const headers = {};
      const token = localStorage.getItem("token");
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await axiosClient.get(`/transakcje/konto/${kontoNr}`, { headers });
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

  const handleAccountChange = (event) => {
    const accountNr = event.target.value;
    const account = accounts.find((acc) => acc.nrKonta === accountNr);
    setSelectedAccount(account);
  };

  const cardBg = theme.palette.mode === "dark" ? "#1e1e2f" : "#fff";
  const cardBorder = theme.palette.mode === "dark" ? "1px solid #333" : "1px solid #e5e7eb";
  const labelColor = theme.palette.mode === "dark" ? "#f0f0f0" : "#1a1a1a";

  return (
    <Box sx={{ minHeight: "100vh", background: theme.palette.background.default }}>
      <KlientHeader handleLogout={handleLogout} />

      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/* Nagłówek */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              backgroundClip: "text",
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

        {/* Selektor konta */}
        {accounts.length > 0 && (
          <Paper
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 2,
              border: cardBorder,
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, #667eea15 0%, #764ba215 100%)"
                  : "linear-gradient(135deg, #667eea05 0%, #764ba205 100%)"
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: labelColor }}>
              Wybierz konto
            </Typography>
            <FormControl fullWidth>
              <Select
                value={selectedAccount?.nrKonta || ""}
                onChange={handleAccountChange}
                displayEmpty
                sx={{
                  bgcolor: theme.palette.mode === "dark" ? "#2a2a3b" : "#fff",
                  color: labelColor,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.divider
                  }
                }}
              >
                {accounts.map((acc) => (
                  <MenuItem key={acc.nrKonta} value={acc.nrKonta}>
                    <Box sx={{ width: "100%" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}
                      >
                        <Typography sx={{ color: labelColor }}>
                          Konto {acc.nrKonta}
                          {acc.nazwaKonta && ` - ${acc.nazwaKonta}`}
                        </Typography>
                        <Typography sx={{ fontWeight: 700, color: "#667eea", ml: 2 }}>
                          {acc.saldo?.toLocaleString("pl-PL", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}{" "}
                          {acc.waluta}
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
        )}

        {/* Szczegóły konta */}
        {selectedAccount && (
          <Card
            sx={{
              mb: 4,
              borderRadius: 2,
              border: `2px solid ${theme.palette.primary.main}`,
              boxShadow: "0 4px 12px rgba(102, 126, 234, 0.15)",
              background: cardBg
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                📊 Szczegóły konta
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ color: "#666", mb: 0.5 }}>
                      Numer konta
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: labelColor }}>
                      {selectedAccount.nrKonta}
                    </Typography>
                  </Box>

                  {selectedAccount.nazwaKonta && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ color: "#666", mb: 0.5 }}>
                        Nazwa konta
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: labelColor }}>
                        {selectedAccount.nazwaKonta}
                      </Typography>
                    </Box>
                  )}

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ color: "#666", mb: 0.5 }}>
                      Status
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color:
                          selectedAccount.status === "AKTYWNE"
                            ? "success.main"
                            : selectedAccount.status === "ZABLOKOWANE"
                            ? "warning.main"
                            : "error.main"
                      }}
                    >
                      {selectedAccount.status}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ color: "#666", mb: 0.5 }}>
                      Saldo
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 800,
                        color: "#667eea"
                      }}
                    >
                      {selectedAccount.saldo?.toLocaleString("pl-PL", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}{" "}
                      {selectedAccount.waluta}
                    </Typography>
                  </Box>

                  {selectedAccount.oprocentowanie != null && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ color: "#666", mb: 0.5 }}>
                        Oprocentowanie
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: labelColor }}>
                        {selectedAccount.oprocentowanie}%
                      </Typography>
                    </Box>
                  )}

                  {selectedAccount.dataOtwarcia && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ color: "#666", mb: 0.5 }}>
                        Data otwarcia
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: labelColor }}>
                        {selectedAccount.dataOtwarcia}
                      </Typography>
                    </Box>
                  )}
                </Grid>

                {selectedAccount.opis && (
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                    <Box>
                      <Typography variant="body2" sx={{ color: "#666", mb: 0.5 }}>
                        Opis
                      </Typography>
                      <Typography variant="body1" sx={{ color: labelColor }}>
                        {selectedAccount.opis}
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        )}

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
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
