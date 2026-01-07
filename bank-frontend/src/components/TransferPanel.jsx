import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button
} from "@mui/material";
import axiosClient from "../api/axiosClient";
import mockApi from "../api/mockApi";
import { useSnackbar } from "notistack";

export default function TransferPanel({ accounts = [], onSuccess = () => {}, klient }) {
  const [fromKonto, setFromKonto] = useState(() => accounts[0]?.nrKonta || "");
  const [toNrKonta, setToNrKonta] = useState("");
  const [kwota, setKwota] = useState("");
  const [waluta] = useState("PLN");
  const [opis, setOpis] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  async function handleTransfer(e) {
    e.preventDefault();
    if (!fromKonto || !toNrKonta || !kwota) {
      enqueueSnackbar("Wypełnij wszystkie pola przelewu", { variant: "warning" });
      return;
    }

    const payload = {
      fromKontoId: Number(fromKonto),
      toKontoId: Number(toNrKonta),
      kwota: Number(kwota),
      waluta: waluta,
      opis: opis
    };

    try {
      await axiosClient.post("/transakcje/transfer", payload);
      enqueueSnackbar("Przelew wykonany pomyślnie", { variant: "success" });
      setKwota("");
      setToNrKonta("");
      setOpis("");
      // refresh via parent
      try {
        await onSuccess();
      } catch (err) {
        console.error("Błąd odświeżania po przelewie", err);
      }
    } catch (err) {
      console.error("Błąd przelewu", err);
      enqueueSnackbar("Błąd wykonania przelewu", { variant: "error" });
    }
  }

  return (
    <Paper sx={{ p: 3, mb: 2, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Nowy przelew
      </Typography>
      <Box component="form" onSubmit={handleTransfer} sx={{ mt: 1 }}>
        <Stack spacing={2}>
          <FormControl fullWidth>
            <InputLabel id="from-konto-label">Z konta</InputLabel>
            <Select
              labelId="from-konto-label"
              value={fromKonto}
              label="Z konta"
              onChange={(e) => setFromKonto(e.target.value)}
            >
              {accounts.map((acc) => (
                <MenuItem key={acc.nrKonta} value={acc.nrKonta}>
                  {acc.nrKonta} — {acc.saldo?.toFixed(2) || "0.00"} {acc.waluta}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Na nr konta (nr_konta)"
            value={toNrKonta}
            onChange={(e) => setToNrKonta(e.target.value)}
            fullWidth
          />

          <Stack direction="row" spacing={2}>
            <TextField
              label="Kwota"
              value={kwota}
              onChange={(e) => setKwota(e.target.value)}
              type="number"
              inputProps={{ step: "0.01" }}
            />
            <TextField label="Waluta" value={waluta} disabled sx={{ minWidth: 120 }} />
          </Stack>

          <TextField
            label="Tytuł / opis"
            value={opis}
            onChange={(e) => setOpis(e.target.value)}
            fullWidth
            multiline
            rows={2}
          />

          <Button type="submit" variant="contained">
            Wyślij przelew
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
