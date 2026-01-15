import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Typography, Box, TextField, Stack, Button } from "@mui/material";
import { getKlienci } from "../api/klientApi";
import { useNavigate } from "react-router-dom";

export default function KlientListPage() {
  const [klienci, setKlienci] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchPesel, setSearchPesel] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getKlienci();
        setKlienci(data);
      } catch (err) {
        console.error("Błąd przy pobieraniu klientów:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filtered = klienci.filter((k) => k.pesel.includes(searchPesel));

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
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate(`/klienci/${params.row.id}`)}
        >
          Edytuj
        </Button>
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

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Lista klientów
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <TextField
          label="Szukaj po PESEL"
          variant="outlined"
          size="small"
          value={searchPesel}
          onChange={(e) => setSearchPesel(e.target.value)}
        />
      </Stack>

      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          loading={loading}
        />
      </Box>
    </Paper>
  );
}
