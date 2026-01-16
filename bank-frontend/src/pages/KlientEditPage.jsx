import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  Box,
  Button,
  Stack,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useTheme
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axiosClient from "../api/axiosClient";
import { wplataNaKonto } from "../api/kontoApi";
import { changeKlientStatus, executeKlientAction } from "../api/klientApi";
import ColorModeContext from "../theme/ColorModeContext";

export default function KlientEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const [klient, setKlient] = useState(null);
  const [konta, setKonta] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openWplataDialog, setOpenWplataDialog] = useState(false);
  const [selectedKonto, setSelectedKonto] = useState(null);
  const [kwota, setKwota] = useState("");

  const [openKlientDialog, setOpenKlientDialog] = useState(false);
  const [nowyStatusKlienta, setNowyStatusKlienta] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosClient.get(`/klienci/${id}`);
        setKlient(res.data);

        const kontaRes = await axiosClient.get(`/konta/klient/${id}`);
        setKonta(kontaRes.data);
      } catch (err) {
        console.error("Błąd pobierania danych:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const changeKontoStatus = async (kontoNr, newStatus) => {
    try {
      await axiosClient.put(`/konta/${kontoNr}/status`, { status: newStatus });
      setKonta((prev) =>
        prev.map((k) => (k.nrKonta === kontoNr ? { ...k, status: newStatus } : k))
      );
    } catch (err) {
      console.error("Błąd zmiany statusu konta:", err);
      alert("Nie udało się zmienić statusu konta");
    }
  };

  const handleChangeKlientStatus = async () => {
    try {
      if (nowyStatusKlienta === "ODBLOKUJ") await executeKlientAction(id, "ODBLOKUJ");
      else if (nowyStatusKlienta === "ZABLOKOWANY") await executeKlientAction(id, "ZABLOKUJ");
      else if (nowyStatusKlienta === "ZAMKNIĘTY") await executeKlientAction(id, "ZAMKNIJ");

      const res = await axiosClient.get(`/klienci/${id}`);
      setKlient(res.data);

      const kontaRes = await axiosClient.get(`/konta/klient/${id}`);
      setKonta(kontaRes.data);

      setOpenKlientDialog(false);
    } catch (err) {
      console.error("Błąd zmiany statusu klienta:", err);
      alert("Nie udało się zmienić statusu klienta");
    }
  };

  const handleOpenWplata = (konto) => {
    setSelectedKonto(konto);
    setKwota("");
    setOpenWplataDialog(true);
  };

  const handleWplataSubmit = async () => {
    if (!kwota || isNaN(kwota) || Number(kwota) <= 0) {
      alert("Podaj poprawną kwotę");
      return;
    }

    try {
      await wplataNaKonto(selectedKonto.nrKonta, Number(kwota));

      setKonta((prev) =>
        prev.map((k) =>
          k.nrKonta === selectedKonto.nrKonta ? { ...k, saldo: k.saldo + Number(kwota) } : k
        )
      );

      setOpenWplataDialog(false);
    } catch (err) {
      console.error("Błąd wpłaty:", err);
      alert("Nie udało się wykonać wpłaty");
    }
  };

  if (loading) return <Typography sx={{ textAlign: "center", mt: 4 }}>Ładowanie...</Typography>;
  if (!klient)
    return <Typography sx={{ textAlign: "center", mt: 4 }}>Nie znaleziono klienta</Typography>;

  const statusColorMap = {
    AKTYWNE: "success",
    ZABLOKOWANY: "warning",
    ZAMKNIĘTE: "error"
  };

  const labelColor = theme.palette.mode === "dark" ? "#f0f0f0" : "#1a1a1a";
  const cardBg = theme.palette.mode === "dark" ? "#1e1e2f" : "#fff";
  const cardBorder = theme.palette.mode === "dark" ? "1px solid #333" : "1px solid #e5e7eb";

  const kontoColumns = [
    { field: "nrKonta", headerName: "Nr konta", width: 150 },
    { field: "dataOtwarcia", headerName: "Data otwarcia", width: 150 },
    { field: "dataZamkniecia", headerName: "Data zamknięcia", width: 150 },
    { field: "oprocentowanie", headerName: "Oprocentowanie", width: 120 },
    { field: "saldo", headerName: "Saldo", width: 120 },
    { field: "waluta", headerName: "Waluta", width: 80 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Chip label={params.value} color={statusColorMap[params.value] || "default"} />
      )
    },
    {
      field: "actions",
      headerName: "Akcje",
      width: 420,
      renderCell: (params) => {
        if (params.row.status === "ZAMKNIĘTY")
          return <Typography color="error">Konto zamknięte</Typography>;
        return (
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              size="small"
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                "&:hover": { opacity: 0.9 }
              }}
              onClick={() => handleOpenWplata(params.row)}
            >
              Wpłać
            </Button>

            {params.row.status !== "AKTYWNE" && (
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={() => changeKontoStatus(params.row.nrKonta, "AKTYWNE")}
              >
                Aktywuj
              </Button>
            )}
            {params.row.status !== "ZABLOKOWANY" && (
              <Button
                variant="contained"
                color="warning"
                size="small"
                onClick={() => changeKontoStatus(params.row.nrKonta, "ZABLOKOWANY")}
              >
                Zablokuj
              </Button>
            )}
            {params.row.status !== "ZAMKNIĘTY" && (
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => changeKontoStatus(params.row.nrKonta, "ZAMKNIĘTY")}
              >
                Zamknij
              </Button>
            )}
          </Stack>
        );
      }
    }
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 2
        }}
      >
        Edycja klienta
      </Typography>

      <Paper sx={{ p: 3, mb: 3, border: cardBorder, background: cardBg }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: labelColor }}>
            Dane klienta
          </Typography>
          <Button variant="outlined" onClick={() => navigate("/klienci")} sx={{ borderRadius: 2 }}>
            ← Wróć
          </Button>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={1}>
          <Typography>Imię: {klient.imie}</Typography>
          <Typography>Nazwisko: {klient.nazwisko}</Typography>
          <Typography>PESEL: {klient.pesel}</Typography>
          <Typography>Typ: {klient.typKlienta}</Typography>
          <Typography>Status klienta: {klient.statusKonta}</Typography>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="warning"
            disabled={klient.statusKonta === "ZABLOKOWANY"}
            onClick={() => {
              setNowyStatusKlienta("ZABLOKOWANY");
              setOpenKlientDialog(true);
            }}
          >
            Zablokuj klienta
          </Button>

          <Button
            variant="contained"
            color="error"
            disabled={klient.statusKonta === "ZAMKNIĘTY"}
            onClick={() => {
              setNowyStatusKlienta("ZAMKNIĘTY");
              setOpenKlientDialog(true);
            }}
          >
            Zamknij klienta
          </Button>

          <Button
            variant="contained"
            color="success"
            disabled={klient.statusKonta !== "ZABLOKOWANY"}
            onClick={() => {
              setNowyStatusKlienta("ODBLOKUJ");
              setOpenKlientDialog(true);
            }}
          >
            Odblokuj klienta
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: 3, mb: 3, border: cardBorder, background: cardBg }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: labelColor }}>
          Konta klienta
        </Typography>
        <Box sx={{ height: 400 }}>
          <DataGrid
            rows={konta}
            columns={kontoColumns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            getRowId={(row) => row.nrKonta}
            disableSelectionOnClick
          />
        </Box>
      </Paper>

      {/* Dialog wpłaty */}
      <Dialog open={openWplataDialog} onClose={() => setOpenWplataDialog(false)}>
        <DialogTitle>Wpłata środków</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>Konto: {selectedKonto?.nrKonta}</Typography>
          <TextField
            label="Kwota"
            type="number"
            fullWidth
            value={kwota}
            onChange={(e) => setKwota(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenWplataDialog(false)}>Anuluj</Button>
          <Button
            variant="contained"
            sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
            onClick={handleWplataSubmit}
          >
            Wpłać
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog statusu klienta */}
      <Dialog open={openKlientDialog} onClose={() => setOpenKlientDialog(false)}>
        <DialogTitle>
          {nowyStatusKlienta === "ZABLOKOWANY"
            ? "Zablokować klienta?"
            : nowyStatusKlienta === "ZAMKNIĘTY"
            ? "Zamknąć klienta?"
            : "Odblokować klienta?"}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {nowyStatusKlienta === "ZABLOKOWANY"
              ? "Zostaną zablokowane wszystkie konta klienta."
              : nowyStatusKlienta === "ZAMKNIĘTY"
              ? "Klient oraz wszystkie jego konta zostaną trwale zamknięte."
              : "Klient oraz jego konta zostaną odblokowane."}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenKlientDialog(false)}>Anuluj</Button>
          <Button
            variant="contained"
            color={
              nowyStatusKlienta === "ZABLOKOWANY"
                ? "warning"
                : nowyStatusKlienta === "ZAMKNIĘTY"
                ? "error"
                : "success"
            }
            onClick={handleChangeKlientStatus}
          >
            Potwierdź
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
