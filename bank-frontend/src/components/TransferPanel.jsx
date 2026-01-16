import React, { useState, useMemo, useEffect } from "react";
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
import { useSnackbar } from "notistack";
import { useTheme } from "@mui/material/styles";

export default function TransferPanel({ accounts = [], onSuccess = () => {}, defaultFromAccount }) {
  const theme = useTheme();
  const defaultFrom = defaultFromAccount || accounts[0]?.nrKonta || "";
  const [fromKonto, setFromKonto] = useState(String(defaultFrom));
  const [toNrKonta, setToNrKonta] = useState("");
  const [kwota, setKwota] = useState("");
  const [waluta] = useState("PLN");
  const [opis, setOpis] = useState("");
  const [toAccountStatus, setToAccountStatus] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const selectedAccount = useMemo(
    () => accounts.find((a) => String(a.nrKonta) === String(fromKonto)),
    [accounts, fromKonto]
  );

  const isBlocked = selectedAccount && selectedAccount.status !== "AKTYWNE";
  const isToBlocked = toAccountStatus && toAccountStatus !== "AKTYWNE";

  useEffect(() => {
    async function fetchToAccount() {
      if (!toNrKonta) {
        setToAccountStatus(null);
        return;
      }
      try {
        const res = await axiosClient.get(`/konta/konto/${toNrKonta}`);
        setToAccountStatus(res.data.status);
      } catch (err) {
        setToAccountStatus(null);
        console.error("Nie można pobrać statusu konta odbiorcy", err);
      }
    }
    fetchToAccount();
  }, [toNrKonta]);

  async function handleTransfer(e) {
    e.preventDefault();
    if (isBlocked) {
      enqueueSnackbar(
        `Nie można wykonywać przelewów z konta o statusie: ${selectedAccount.status}`,
        { variant: "error" }
      );
      return;
    }
    if (isToBlocked) {
      enqueueSnackbar(`Nie można wykonywać przelewów na konto o statusie: ${toAccountStatus}`, {
        variant: "error"
      });
      return;
    }
    if (!fromKonto || !toNrKonta || !kwota) {
      enqueueSnackbar("Wypełnij wszystkie pola przelewu", { variant: "warning" });
      return;
    }
    if (Number(kwota) <= 0) {
      enqueueSnackbar("Kwota musi być większa od 0", { variant: "warning" });
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
      setToAccountStatus(null);
      try {
        await onSuccess();
      } catch (err) {
        console.error("Błąd odświeżania po przelewie", err);
      }
    } catch (err) {
      console.error("Błąd przelewu", err);
      const msg = err?.response?.data || "Błąd wykonania przelewu";
      enqueueSnackbar(msg, { variant: "error" });
    }
  }

  return (
    <Paper
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        background:
          theme.palette.mode === "light"
            ? theme.palette.background.paper
            : "rgba(255,255,255,0.05)",
        boxShadow: theme.shadows[1],
        transition: "all 0.3s ease"
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: theme.palette.text.primary }}>
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
              {accounts
                .filter((acc) => acc.status === "AKTYWNE")
                .map((acc) => (
                  <MenuItem key={acc.nrKonta} value={acc.nrKonta}>
                    {acc.nrKonta} — {acc.saldo?.toFixed(2) || "0.00"} {acc.waluta}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          {isBlocked && (
            <Typography color="error">
              Nie można wykonywać przelewów z konta o statusie: {selectedAccount.status}
            </Typography>
          )}

          <TextField
            label="Na nr konta (nr_konta)"
            value={toNrKonta}
            onChange={(e) => setToNrKonta(e.target.value)}
            fullWidth
          />
          {toNrKonta && isToBlocked && (
            <Typography color="error">
              Nie można wykonywać przelewów na konto o statusie: {toAccountStatus}
            </Typography>
          )}

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Kwota"
              value={kwota}
              onChange={(e) => setKwota(e.target.value)}
              type="number"
              inputProps={{ step: "0.01", min: 0 }}
              sx={{ flex: 1 }}
            />
            <TextField label="Waluta" value={waluta} disabled sx={{ flex: 1, minWidth: 120 }} />
          </Stack>

          <TextField
            label="Tytuł / opis"
            value={opis}
            onChange={(e) => setOpis(e.target.value)}
            fullWidth
            multiline
            rows={2}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={isBlocked || isToBlocked}
            sx={{
              fontWeight: 600,
              textTransform: "none",
              "&:hover": { boxShadow: theme.shadows[4] }
            }}
          >
            Wyślij przelew
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
