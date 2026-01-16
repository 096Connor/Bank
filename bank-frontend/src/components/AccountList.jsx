import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TransferForm from "./TransferForm";

export default function AccountList({
  accounts,
  klient,
  amount,
  setAmount,
  toAccount,
  setToAccount,
  description,
  setDescription,
  handleTransfer
}) {
  const theme = useTheme();

  const accountInfo = [
    { label: "PESEL", value: klient.pesel },
    { label: "Typ klienta", value: klient.typKlienta },
    { label: "Status konta", value: klient.statusKonta },
    { label: "Telefon", value: klient.nrTel || "—" },
    { label: "Email", value: klient.mail || "—" }
  ];

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 12px 24px rgba(0,0,0,0.5)"
            : "0 8px 16px rgba(102,126,234,0.15)",
        border: "1px solid",
        borderColor: theme.palette.divider,
        backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.paper : "white"
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            mb: 4,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          📋 Informacje o koncie
        </Typography>

        <Grid container spacing={3}>
          {/* 🔹 Formularz przelewu */}
          <Grid item xs={12}>
            <TransferForm
              amount={amount}
              setAmount={setAmount}
              toAccount={toAccount}
              setToAccount={setToAccount}
              description={description}
              setDescription={setDescription}
              onSubmit={handleTransfer}
            />
          </Grid>

          {/* 🔹 Informacje klienta */}
          {accountInfo.map((info, idx) => (
            <Grid item xs={12} key={idx}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  backgroundColor: theme.palette.mode === "dark" ? "#1f1f2e" : "#f9fafb",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === "dark" ? "#2c2c3e" : "#edf2f7"
                  }
                }}
              >
                <Typography sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>
                  {info.label}
                </Typography>
                <Typography sx={{ fontWeight: 600, color: "#667eea" }}>{info.value}</Typography>
              </Box>
            </Grid>
          ))}

          {/* 🔹 Lista kont */}
          {accounts.map((acc) => (
            <Grid item xs={12} key={acc.nrKonta}>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  backgroundColor:
                    acc.status === "ZAMKNIĘTE"
                      ? theme.palette.mode === "dark"
                        ? "#2c2c3e"
                        : "#f3f4f6"
                      : theme.palette.mode === "dark"
                      ? "#1f1f2e"
                      : "#ffffff",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === "dark" ? "#2a2a3a" : "#f0f4ff"
                  }
                }}
              >
                <Box>
                  <Typography sx={{ fontWeight: 700 }}>{acc.nrKonta}</Typography>
                  <Typography sx={{ color: theme.palette.text.secondary, fontSize: "0.85rem" }}>
                    {acc.typKonta || acc.nazwaKonta || "—"}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: acc.status === "ZAMKNIĘTE" ? "error.main" : "success.main",
                      fontSize: "1rem"
                    }}
                  >
                    {acc.saldo?.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}{" "}
                    {acc.waluta}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      color:
                        acc.status === "ZAMKNIĘTE"
                          ? theme.palette.error.main
                          : theme.palette.text.secondary,
                      fontSize: "0.85rem"
                    }}
                  >
                    {acc.status}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
