import React from "react";
import { Grid, Paper, Typography } from "@mui/material";

export default function QuickStats({ accounts, theme, lastTransaction }) {
  const totalSaldo = accounts.reduce((s, a) => s + (a.saldo || 0), 0);

  const lastTransactionValue = lastTransaction
    ? `${lastTransaction.kwota.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })} ${lastTransaction.waluta}`
    : "—";

  const quickStats = [
    {
      label: "Stan konta",
      value: `${totalSaldo.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })} ${accounts[0]?.waluta || "PLN"}`,
      icon: "💰"
    },
    { label: "Ostatnia transakcja", value: lastTransactionValue, icon: "📊" }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 5 }}>
      {quickStats.map((stat, idx) => (
        <Grid item xs={12} sm={6} key={idx}>
          <Paper
            sx={{
              p: 3,
              backgroundColor: theme?.palette?.background?.paper,
              border: `1px solid ${theme?.palette?.divider || "#eee"}`,
              borderRadius: 2,
              transition: "all 0.3s ease",
              "&:hover": { transform: "translateY(-4px)", boxShadow: theme?.shadows?.[4] }
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: theme?.palette?.primary?.main, fontWeight: 600, mb: 1 }}
            >
              {stat.icon} {stat.label}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: theme?.palette?.primary?.main }}>
              {stat.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
