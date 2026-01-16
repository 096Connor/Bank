import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Paper,
  Typography,
  Box,
  TextField,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Container,
  Card,
  CardContent
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { getKlienci } from "../api/klientApi";
import { useTheme } from "@mui/material/styles";

export default function KlientListPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [klienci, setKlienci] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchPesel, setSearchPesel] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedKlientId, setSelectedKlientId] = useState(null);
  const [typyKont, setTypyKont] = useState([]);
  const [selectedTypKonta, setSelectedTypKonta] = useState("");

  useEffect(() => {
    fetchKlienci();
    fetchTypyKont();
  }, []);

  const fetchKlienci = async () => {
    setLoading(true);
    try {
      const data = await getKlienci();
      setKlienci(data);
    } catch (err) {
      console.error("Błąd przy pobieraniu klientów:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTypyKont = async () => {
    try {
      const res = await axiosClient.get("/typy-kont");
      setTypyKont(res.data || []);
    } catch (err) {
      console.error("Błąd pobierania typów kont:", err);
      setTypyKont([
        {
          id: 1,
          nazwaTypu: "Konto Osobiste",
          opis: "Standardowe konto osobiste",
          oprocentowanieStd: 0.01
        },
        {
          id: 2,
          nazwaTypu: "Konto Oszczędnościowe",
          opis: "Konto z wyższym oprocentowaniem",
          oprocentowanieStd: 0.03
        },
        { id: 3, nazwaTypu: "Konto Firmowe", opis: "Konto dla firm", oprocentowanieStd: 0.005 }
      ]);
    }
  };

  const filtered = klienci.filter((k) => k.pesel.includes(searchPesel));

  const handleAddAccountClick = (klientId) => {
    setSelectedKlientId(klientId);
    setSelectedTypKonta("");
    setOpenDialog(true);
  };

  const handleAddAccountSubmit = async () => {
    if (!selectedTypKonta) return;

    const selectedType = typyKont.find((t) => (t.idTypu || t.id) === selectedTypKonta);

    const payload = {
      id_typu_konta: selectedTypKonta,
      oprocentowanie: selectedType?.oprocentowanieStd || 0.01
    };

    try {
      await axiosClient.post(`/konta/klient/${selectedKlientId}`, payload);
      setOpenDialog(false);
      alert("Konto zostało utworzone pomyślnie");
      fetchKlienci();
    } catch (err) {
      console.error("Błąd tworzenia konta:", err);
      alert("Nie udało się utworzyć konta");
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "imie", headerName: "Imię", width: 120 },
    { field: "nazwisko", headerName: "Nazwisko", width: 150 },
    { field: "pesel", headerName: "PESEL", width: 130 },
    { field: "typKlienta", headerName: "Typ klienta", width: 120 },
    { field: "statusKonta", headerName: "Status konta", width: 120 },
    { field: "nrTel", headerName: "Telefon", width: 120 },
    { field: "mail", headerName: "Email", width: 200 },
    { field: "narodowosc", headerName: "Narodowość", width: 120 },
    {
      field: "actions",
      headerName: "Akcje",
      width: 220,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            size="small"
            onClick={() => navigate(`/klienci/${params.row.id}`)}
          >
            Edytuj
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="success"
            onClick={() => handleAddAccountClick(params.row.id)}
          >
            Dodaj konto
          </Button>
        </Stack>
      )
    }
  ];

  const rows = filtered.map((k) => ({
    id: k.id,
    imie: k.imie,
    nazwisko: k.nazwisko,
    pesel: k.pesel,
    typKlienta: k.typKlienta,
    statusKonta: k.statusKonta,
    nrTel: k.nrTel,
    mail: k.mail,
    narodowosc: k.narodowosc
  }));

  const selectedTypeDetails = typyKont.find((t) => (t.idTypu || t.id) === selectedTypKonta);

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {/* Nagłówek */}
      <Box sx={{ mb: 5 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1
          }}
        >
          Lista klientów
        </Typography>
        <Typography variant="h6" sx={{ color: "#666", fontWeight: 400 }}>
          Przeglądaj i zarządzaj klientami
        </Typography>
      </Box>

      {/* Szukaj */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          label="Szukaj po PESEL"
          variant="outlined"
          size="small"
          value={searchPesel}
          onChange={(e) => setSearchPesel(e.target.value)}
        />
      </Stack>

      {/* DataGrid */}
      <Paper
        sx={{
          p: 2,
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
          background: theme.palette.mode === "dark" ? "#1e1e2f" : "#fff",
          height: 500
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          loading={loading}
          disableSelectionOnClick
        />
      </Paper>

      {/* Dialog dodawania konta */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Dodaj konto dla klienta</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="typ-konta-label">Typ konta</InputLabel>
              <Select
                labelId="typ-konta-label"
                value={selectedTypKonta}
                onChange={(e) => setSelectedTypKonta(e.target.value)}
                label="Typ konta"
              >
                {typyKont.map((typ) => (
                  <MenuItem key={typ.idTypu || typ.id} value={typ.idTypu || typ.id}>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {typ.nazwaTypu}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {typ.opis} • Oprocentowanie: {typ.oprocentowanieStd}%
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Wybierz typ konta do utworzenia</FormHelperText>
            </FormControl>

            {selectedTypeDetails && (
              <Card
                sx={{
                  p: 2,
                  mb: 2,
                  borderRadius: 2,
                  background:
                    theme.palette.mode === "dark"
                      ? "#2a2a3b"
                      : "linear-gradient(135deg, #667eea05 0%, #764ba205 100%)",
                  color: theme.palette.text.primary
                }}
              >
                <CardContent>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                    Szczegóły wybranego typu:
                  </Typography>
                  <Typography variant="body2">
                    <strong>Nazwa:</strong> {selectedTypeDetails.nazwaTypu}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Opis:</strong> {selectedTypeDetails.opis}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Oprocentowanie:</strong> {selectedTypeDetails.oprocentowanieStd}%
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Anuluj</Button>
          <Button
            onClick={handleAddAccountSubmit}
            variant="contained"
            color="primary"
            disabled={!selectedTypKonta}
          >
            Utwórz konto
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
