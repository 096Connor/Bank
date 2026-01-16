import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
  useTheme
} from "@mui/material";
import useAuth from "../auth/useAuth";

export default function KlientLoginPage() {
  const theme = useTheme();
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
        background:
          theme.palette.mode === "dark"
            ? "#1e1e2f"
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      }}
    >
      <Container maxWidth="sm">
        <Paper
          sx={{
            p: 5,
            borderRadius: 3,
            backgroundColor: theme.palette.mode === "dark" ? "#2a2a3b" : "#fff",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 8px 24px rgba(0,0,0,0.4)"
                : "0 8px 24px rgba(102,126,234,0.15)"
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 800,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 3
            }}
          >
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
              sx={{
                backgroundColor: theme.palette.mode === "dark" ? "#1e1e2f" : "#f9f9f9",
                borderRadius: 1
              }}
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
              sx={{
                backgroundColor: theme.palette.mode === "dark" ? "#1e1e2f" : "#f9f9f9",
                borderRadius: 1
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                py: 1.5,
                fontWeight: 700,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                "&:hover": {
                  background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)"
                }
              }}
              disabled={loading}
            >
              {loading ? "Logowanie..." : "Zaloguj się"}
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" sx={{ mb: 1, color: theme.palette.text.secondary }}>
              Jesteś pracownikiem?
            </Typography>
            <Link
              href="/login"
              sx={{
                color: theme.palette.mode === "dark" ? "#667eea" : "#764ba2",
                fontWeight: 600,
                "&:hover": { textDecoration: "underline" }
              }}
            >
              Zaloguj się tutaj
            </Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
