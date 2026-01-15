import { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Container, TextField, Button, Typography, Paper, Link } from "@mui/material";
import useAuth from "../auth/useAuth";

export default function KlientLoginPage() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: { pesel: "", pin: "" }
  });

  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);
    try {
      await login({
        type: "KLIENT",
        credentials: { pesel: data.pesel.trim(), pin: data.pin.trim() }
      });
    } catch (err) {
      console.error("Błąd logowania klienta:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      }}
    >
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" align="center" gutterBottom>
            💳 PANEL KLIENTA
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="PESEL"
              margin="normal"
              {...register("pesel", {
                required: "PESEL jest wymagany",
                pattern: { value: /^\d{11}$/, message: "PESEL musi mieć 11 cyfr" }
              })}
              error={!!errors.pesel}
              helperText={errors.pesel?.message}
            />
            <TextField
              fullWidth
              label="PIN"
              type="password"
              margin="normal"
              {...register("pin", {
                required: "PIN jest wymagany",
                minLength: { value: 4, message: "PIN musi mieć minimum 4 znaki" }
              })}
              error={!!errors.pin}
              helperText={errors.pin?.message}
            />
            <Button fullWidth type="submit" variant="contained" sx={{ mt: 3 }} disabled={loading}>
              {loading ? "Logowanie..." : "Zaloguj się"}
            </Button>
          </form>
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="body2">Jesteś pracownikiem?</Typography>
            <Link href="/login">Zaloguj się tutaj</Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
