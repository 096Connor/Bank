import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  MenuItem,
  Card,
  CardContent,
  Divider,
  useTheme
} from "@mui/material";
import { useSnackbar } from "notistack";
import { createKlient } from "../api/klientApi";
import { createAdres } from "../api/adresApi";
import ColorModeContext from "../theme/ColorModeContext";

export default function KlientAddPage() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      imie: "",
      nazwisko: "",
      dataUrodzenia: "",
      pesel: "",
      pin: "",
      typKlienta: "STANDARD",
      nrTel: "",
      mail: "",
      narodowosc: ""
    }
  });
  const { enqueueSnackbar } = useSnackbar();

  const [newAdres, setNewAdres] = useState({
    ulica: "",
    nrDomu: "",
    nrMieszkania: "",
    miasto: "",
    kodPocztowy: "",
    wojewodztwo: "",
    kraj: ""
  });

  const handleNewAdresChange = (field) => (e) => {
    setNewAdres((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const onSubmit = async (form) => {
    try {
      const adresPayload = {
        ulica: newAdres.ulica || null,
        nrDomu: newAdres.nrDomu || null,
        nrMieszkania: newAdres.nrMieszkania || null,
        miasto: newAdres.miasto || null,
        kodPocztowy: newAdres.kodPocztowy || null,
        wojewodztwo: newAdres.wojewodztwo || null,
        kraj: newAdres.kraj || null
      };
      const savedAdres = await createAdres(adresPayload);
      const adresId = savedAdres.id;

      const payload = {
        imie: form.imie,
        nazwisko: form.nazwisko,
        dataUrodzenia: form.dataUrodzenia || null,
        pesel: form.pesel || null,
        pin: form.pin || null,
        typKlienta: form.typKlienta,
        adresId: adresId,
        nrTel: form.nrTel || null,
        mail: form.mail || null,
        narodowosc: form.narodowosc || null
      };

      await createKlient(payload);
      enqueueSnackbar("Klient został dodany pomyślnie!", { variant: "success" });
      reset();
      setNewAdres({
        ulica: "",
        nrDomu: "",
        nrMieszkania: "",
        miasto: "",
        kodPocztowy: "",
        wojewodztwo: "",
        kraj: ""
      });
    } catch (err) {
      const serverData = err?.response?.data;
      let message = "Błąd podczas zapisu klienta";
      if (serverData) {
        if (typeof serverData === "string") message = serverData;
        else if (serverData.message) message = serverData.message;
      } else if (err?.message) {
        message = err.message;
      }

      enqueueSnackbar(message, { variant: "error" });
      console.error(err);
    }
  };

  // Kolor dla inputów w zależności od trybu
  const inputFocusStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 1.5,
      "&.Mui-focused fieldset": {
        borderColor: "#667eea",
        borderWidth: 2
      }
    }
  };

  const labelColor = theme.palette.mode === "dark" ? "#f0f0f0" : "#1a1a1a";
  const cardBg = theme.palette.mode === "dark" ? "#1e1e2f" : "#fff";
  const cardBorder = theme.palette.mode === "dark" ? "1px solid #333" : "1px solid #e5e7eb";

  return (
    <Box>
      {/* Nagłówek */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1
          }}
        >
          ➕ Dodaj nowego klienta
        </Typography>
        <Typography variant="body1" sx={{ color: "#666" }}>
          Zarejestruj nowego klienta w systemie
        </Typography>
      </Box>

      {/* Formularz */}
      <Card
        sx={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)", border: cardBorder, background: cardBg }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {/* Dane osobowe */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: labelColor, mb: 2 }}>
                  👤 Dane osobowe
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Imię"
                  fullWidth
                  variant="outlined"
                  {...register("imie", { required: "Imię jest wymagane" })}
                  error={!!errors.imie}
                  helperText={errors.imie?.message}
                  sx={inputFocusStyle}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nazwisko"
                  fullWidth
                  variant="outlined"
                  {...register("nazwisko", { required: "Nazwisko jest wymagane" })}
                  error={!!errors.nazwisko}
                  helperText={errors.nazwisko?.message}
                  sx={inputFocusStyle}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Data urodzenia"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  variant="outlined"
                  {...register("dataUrodzenia", { required: "Data urodzenia jest wymagana" })}
                  error={!!errors.dataUrodzenia}
                  helperText={errors.dataUrodzenia?.message}
                  sx={inputFocusStyle}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Narodowość"
                  fullWidth
                  variant="outlined"
                  {...register("narodowosc")}
                  sx={inputFocusStyle}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>

              {/* Dane bezpieczeństwa */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: labelColor, mb: 2 }}>
                  🔐 Dane bezpieczeństwa
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="PESEL"
                  fullWidth
                  variant="outlined"
                  {...register("pesel", {
                    required: "PESEL jest wymagany",
                    pattern: { value: /^\d{11}$/, message: "PESEL musi mieć 11 cyfr" }
                  })}
                  error={!!errors.pesel}
                  helperText={errors.pesel?.message}
                  sx={inputFocusStyle}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="PIN"
                  type="password"
                  fullWidth
                  variant="outlined"
                  {...register("pin", {
                    required: "PIN jest wymagany",
                    minLength: { value: 4, message: "PIN musi mieć co najmniej 4 znaki" }
                  })}
                  error={!!errors.pin}
                  helperText={errors.pin?.message}
                  sx={inputFocusStyle}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>

              {/* Ustawienia konta */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: labelColor, mb: 2 }}>
                  ⚙️ Ustawienia konta
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Typ klienta"
                  select
                  fullWidth
                  variant="outlined"
                  {...register("typKlienta", { required: true })}
                  sx={inputFocusStyle}
                >
                  <MenuItem value="STANDARD">STANDARD</MenuItem>
                  <MenuItem value="VIP">VIP</MenuItem>
                  <MenuItem value="PREMIUM">PREMIUM</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>

              {/* Dane kontaktowe */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: labelColor, mb: 2 }}>
                  📞 Dane kontaktowe
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Telefon"
                  fullWidth
                  variant="outlined"
                  {...register("nrTel")}
                  sx={inputFocusStyle}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  {...register("mail", {
                    pattern: { value: /.+@.+\..+/, message: "Nieprawidłowy email" }
                  })}
                  error={!!errors.mail}
                  helperText={errors.mail?.message}
                  sx={inputFocusStyle}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>

              {/* Adres */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: labelColor, mb: 2 }}>
                  📍 Adres
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Ulica"
                  fullWidth
                  variant="outlined"
                  value={newAdres.ulica}
                  onChange={handleNewAdresChange("ulica")}
                  sx={inputFocusStyle}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  label="Nr domu"
                  fullWidth
                  variant="outlined"
                  value={newAdres.nrDomu}
                  onChange={handleNewAdresChange("nrDomu")}
                  sx={inputFocusStyle}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  label="Nr mieszkania"
                  fullWidth
                  variant="outlined"
                  value={newAdres.nrMieszkania}
                  onChange={handleNewAdresChange("nrMieszkania")}
                  sx={inputFocusStyle}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Miasto"
                  fullWidth
                  variant="outlined"
                  value={newAdres.miasto}
                  onChange={handleNewAdresChange("miasto")}
                  sx={inputFocusStyle}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Kod pocztowy"
                  fullWidth
                  variant="outlined"
                  value={newAdres.kodPocztowy}
                  onChange={handleNewAdresChange("kodPocztowy")}
                  sx={inputFocusStyle}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Województwo"
                  fullWidth
                  variant="outlined"
                  value={newAdres.wojewodztwo}
                  onChange={handleNewAdresChange("wojewodztwo")}
                  sx={inputFocusStyle}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Kraj"
                  fullWidth
                  variant="outlined"
                  value={newAdres.kraj}
                  onChange={handleNewAdresChange("kraj")}
                  sx={inputFocusStyle}
                />
              </Grid>

              {/* Submit */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 2,
                    py: 1.5,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    fontWeight: 700,
                    fontSize: "1rem",
                    textTransform: "none",
                    borderRadius: 2,
                    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)"
                    }
                  }}
                >
                  💾 Zapisz klienta
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
