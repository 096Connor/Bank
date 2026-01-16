import React from "react";
import { Box, TextField, Button, useTheme } from "@mui/material";

export default function TransferForm({
  amount,
  setAmount,
  toAccount,
  setToAccount,
  description,
  setDescription,
  onSubmit
}) {
  const theme = useTheme();

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        alignItems: "center",
        p: 2,
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        background:
          theme.palette.mode === "light"
            ? theme.palette.background.paper
            : "rgba(255,255,255,0.05)",
        boxShadow: theme.shadows[1]
      }}
    >
      <TextField
        label="Kwota"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        size="small"
        type="number"
        sx={{ flex: 1 }}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Na konto (nr)"
        value={toAccount}
        onChange={(e) => setToAccount(e.target.value)}
        size="small"
        sx={{ flex: 1 }}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Opis"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        size="small"
        sx={{ flex: 2 }}
        InputLabelProps={{ shrink: true }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          whiteSpace: "nowrap",
          px: 3,
          py: 1.5,
          fontWeight: 600,
          flexShrink: 0
        }}
      >
        Wyślij
      </Button>
    </Box>
  );
}
