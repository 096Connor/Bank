import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Paper, Typography, Box, Button, Stack, Chip, Divider } from "@mui/material";
import axiosClient from "../api/axiosClient";

export default function KlientEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [klient, setKlient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKlient = async () => {
      try {
        const res = await axiosClient.get(`/klienci/${id}`);
        setKlient(res.data);
      } catch (err) {
        console.error("Błąd pobierania klienta:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchKlient();
  }, [id]);

  const changeStatus = async (newStatus) => {
    try {
      // TODO: backend endpoint
      await axiosClient.put(`/klienci/${id}/status`, {
        statusKonta: newStatus
      });

      setKlient((prev) => ({
        ...prev,
        statusKonta: newStatus
      }));
    } catch (err) {
      console.error("Błąd zmiany statusu:", err);
      alert("Nie udało się zmienić statusu");
    }
  };

  if (loading) return <Typography>Ładowanie...</Typography>;
  if (!klient) return <Typography>Nie znaleziono klienta</Typography>;

  const status = klient.statusKonta;

  const isClosed = status === "ZAMKNIĘTY";

  const renderStatusActions = () => {
    if (isClosed) {
      return <Typography color="error">Konto jest zamknięte — brak dostępnych akcji</Typography>;
    }

    return (
      <Stack direction="row" spacing={2}>
        {status !== "AKTYWNY" && (
          <Button variant="contained" color="success" onClick={() => changeStatus("AKTYWNY")}>
            Aktywuj
          </Button>
        )}

        {status !== "ZABLOKOWANY" && (
          <Button variant="contained" color="warning" onClick={() => changeStatus("ZABLOKOWANY")}>
            Zablokuj
          </Button>
        )}

        {status !== "ZAMKNIĘTY" && (
          <Button variant="contained" color="error" onClick={() => changeStatus("ZAMKNIĘTY")}>
            Zamknij
          </Button>
        )}
      </Stack>
    );
  };

  const statusColor = {
    AKTYWNY: "success",
    ZABLOKOWANY: "warning",
    ZAMKNIĘTY: "error"
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Edycja klienta</Typography>
        <Button variant="outlined" onClick={() => navigate("/klienci")}>
          ← Wróć
        </Button>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">Dane klienta</Typography>
        <Typography>Imię: {klient.imie}</Typography>
        <Typography>Nazwisko: {klient.nazwisko}</Typography>
        <Typography>PESEL: {klient.pesel}</Typography>
        <Typography>Typ: {klient.typKlienta}</Typography>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
          <Typography>Status:</Typography>
          <Chip label={klient.statusKonta} color={statusColor[klient.statusKonta] || "default"} />
        </Stack>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Akcje
        </Typography>

        {renderStatusActions()}
      </Box>
    </Paper>
  );
}
