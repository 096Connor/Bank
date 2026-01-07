import React from "react";
import { Box, TextField, Button } from "@mui/material";

export default function TransferForm({
  amount,
  setAmount,
  toAccount,
  setToAccount,
  description,
  setDescription,
  onSubmit
}) {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ display: "flex", gap: 2, alignItems: "center" }}
    >
      <TextField
        label="Kwota"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        size="small"
      />
      <TextField
        label="Na konto (nr)"
        value={toAccount}
        onChange={(e) => setToAccount(e.target.value)}
        size="small"
      />
      <TextField
        label="Opis"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        size="small"
        sx={{ flex: 1 }}
      />
      <Button type="submit" variant="contained" sx={{ whiteSpace: "nowrap" }}>
        Wyślij
      </Button>
    </Box>
  );
}
