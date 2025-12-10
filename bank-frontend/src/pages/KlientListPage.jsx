import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Typography, Box } from "@mui/material";
import { getKlienci } from "../api/klientApi";

export default function KlientListPage() {
  const [klienci, setKlienci] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "imie", headerName: "Imię", width: 150 },
    { field: "nazwisko", headerName: "Nazwisko", width: 150 },
    { field: "pesel", headerName: "PESEL", width: 120 },
    { field: "typKlienta", headerName: "Typ klienta", width: 120 },
    { field: "statusKonta", headerName: "Status konta", width: 120 },
    { field: "nrTel", headerName: "Telefon", width: 120 },
    { field: "mail", headerName: "Email", width: 180 },
    { field: "narodowosc", headerName: "Narodowość", width: 120 }
  ];

  const rows = klienci.map((k) => ({
    id: k.id, // DataGrid wymaga pola `id`
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
