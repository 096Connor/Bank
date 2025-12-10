import { useForm } from "react-hook-form";
import { TextField, Button, Paper, Box, Typography, Grid, MenuItem } from "@mui/material";
import { useSnackbar } from "notistack";
import { createKlient } from "../api/klientApi";

export default function KlientAddPage() {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      imie: "",
      nazwisko: "",
      dataUrodzenia: "",
      pesel: "",
      typKlienta: "STANDARD", // <-- default
      dataRejestracji: "",
      statusKonta: "AKTYWNY",
      adresId: "",
      nrTel: "",
      mail: "",
      narodowosc: ""
    }
  });
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (form) => {
    try {
      await createKlient(form);
      enqueueSnackbar("Klient został dodany!", { variant: "success" });
      reset();
    } catch (err) {
      enqueueSnackbar("Błąd podczas zapisu klienta", { variant: "error" });
      console.error(err);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Dodaj nowego klienta
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Imię */}
          <Grid item xs={12} sm={6}>
            <TextField label="Imię" fullWidth {...register("imie")} />
          </Grid>

          {/* Nazwisko */}
          <Grid item xs={12} sm={6}>
            <TextField label="Nazwisko" fullWidth {...register("nazwisko")} />
          </Grid>

          {/* Data urodzenia */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Data urodzenia"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              {...register("dataUrodzenia")}
            />
          </Grid>

          {/* PESEL */}
          <Grid item xs={12} sm={6}>
            <TextField label="PESEL" fullWidth {...register("pesel")} />
          </Grid>

          {/* Typ klienta */}
          <Grid item xs={12} sm={6}>
            <TextField label="Typ klienta" select fullWidth {...register("typKlienta")}>
              <MenuItem value="STANDARD">STANDARD</MenuItem>
              <MenuItem value="VIP">VIP</MenuItem>
              <MenuItem value="PREMIUM">PREMIUM</MenuItem>
            </TextField>
          </Grid>

          {/* Data rejestracji */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Data rejestracji"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              {...register("dataRejestracji")}
            />
          </Grid>

          {/* Status konta */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Status konta"
              select
              fullWidth
              {...register("statusKonta")}
              defaultValue="AKTYWNY"
            >
              <MenuItem value="AKTYWNY">AKTYWNY</MenuItem>
              <MenuItem value="ZAWIESZONY">ZAWIESZONY</MenuItem>
              <MenuItem value="ZAMKNIĘTY">ZAMKNIĘTY</MenuItem>
            </TextField>
          </Grid>

          {/* ID adresu */}
          <Grid item xs={12} sm={6}>
            <TextField label="ID adresu" fullWidth {...register("adresId")} />
          </Grid>

          {/* Telefon */}
          <Grid item xs={12} sm={6}>
            <TextField label="Telefon" fullWidth {...register("nrTel")} />
          </Grid>

          {/* Email */}
          <Grid item xs={12} sm={6}>
            <TextField label="Email" fullWidth {...register("mail")} />
          </Grid>

          {/* Narodowość */}
          <Grid item xs={12} sm={6}>
            <TextField label="Narodowość" fullWidth {...register("narodowosc")} />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Zapisz klienta
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
