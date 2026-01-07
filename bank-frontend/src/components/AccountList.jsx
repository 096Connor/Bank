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
      sx={{ borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", border: "1px solid #e5e7eb" }}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: theme.palette.text.primary }}>
          📋 Informacje o koncie
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ mb: 2 }}>
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

          {accountInfo.map((info, idx) => (
            <Grid item xs={12} key={idx}>
              <Box
                sx={{
                  p: 2,
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? theme.palette.background.default
                      : theme.palette.background.paper,
                  borderRadius: 1,
                  border: `1px solid ${theme.palette.divider}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.3s ease",
                  "&:hover": { backgroundColor: theme.palette.action.hover }
                }}
              >
                <Typography sx={{ color: "#666", fontWeight: 500 }}>{info.label}</Typography>
                <Typography sx={{ fontWeight: 600, color: "#667eea" }}>{info.value}</Typography>
              </Box>
            </Grid>
          ))}

          {accounts.map((acc) => (
            <Grid item xs={12} key={acc.nrKonta}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 1,
                  border: `1px solid ${theme.palette.divider}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div>
                  <Typography sx={{ fontWeight: 600 }}>{acc.nrKonta}</Typography>
                  <Typography sx={{ color: "#666", fontSize: "0.85rem" }}>
                    {acc.typKonta}
                  </Typography>
                </div>
                <Typography sx={{ fontWeight: 700, color: "#10b981" }}>
                  {acc.saldo?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}{" "}
                  {acc.waluta}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
