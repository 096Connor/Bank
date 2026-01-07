import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function TransactionsList({ transactions }) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: theme.shadows[2],
        border: `1px solid ${theme.palette.divider}`
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Historia transakcji
        </Typography>
        {transactions.length === 0 ? (
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            Brak transakcji.
          </Typography>
        ) : (
          transactions.map((t) => (
            <Box
              key={t.idTransakcji}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 1,
                borderBottom: `1px solid ${theme.palette.divider}`
              }}
            >
              <div>
                <Typography sx={{ fontWeight: 600 }}>
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
                <Typography sx={{ fontSize: "0.85rem", color: theme.palette.text.secondary }}>
                  {t.klientImie ? `${t.klientImie} ${t.klientNazwisko}` : ""}{" "}
                  {t.typKonta ? `• ${t.typKonta}` : ""}
                </Typography>
              </div>
            </Box>
          ))
        )}
      </CardContent>
    </Card>
  );
}
