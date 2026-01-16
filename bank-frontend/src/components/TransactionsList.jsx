import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function TransactionsList({ transactions = [] }) {
  const theme = useTheme();

  // Maksymalna wysokość listy przed scrollowaniem
  const maxHeight = 400;

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: theme.shadows[2],
        border: `1px solid ${theme.palette.divider}`,
        background:
          theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : theme.palette.background.paper
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: theme.palette.text.primary }}>
          Historia transakcji
        </Typography>

        {transactions.length === 0 ? (
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            Brak transakcji.
          </Typography>
        ) : (
          <Box
            sx={{
              maxHeight: `${maxHeight}px`,
              overflowY: "auto",
              pr: 1 // dla scrolla
            }}
          >
            {transactions.map((t) => (
              <Box
                key={t.idTransakcji}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  mb: 1,
                  borderRadius: 1,
                  background: theme.palette.mode === "light" ? "#f9f9f9" : "rgba(255,255,255,0.05)",
                  "&:hover": {
                    background: theme.palette.mode === "light" ? "#f0f0f0" : "rgba(255,255,255,0.1)"
                  },
                  transition: "all 0.2s ease"
                }}
              >
                <div>
                  <Typography sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                    {new Date(t.dataTransakcji).toLocaleString()}
                  </Typography>
                  <Typography sx={{ color: theme.palette.text.secondary }}>
                    {t.opis || t.typTransakcji}
                  </Typography>
                </div>

                <div style={{ textAlign: "right" }}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: t.kwota < 0 ? theme.palette.error.main : theme.palette.success.main
                    }}
                  >
                    {t.kwota.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}{" "}
                    {t.waluta}
                  </Typography>
                  {t.typTransakcji?.startsWith("TRANSFER") && (
                    <Typography sx={{ fontSize: "0.85rem", color: theme.palette.text.secondary }}>
                      Saldo po: {t.saldoPo}
                    </Typography>
                  )}
                </div>
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
