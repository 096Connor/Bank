import { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Container, TextField, Button, Typography, Paper, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useAuth from "../auth/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: { login: "", password: "" }
  });

  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);
    try {
      await login({
        type: "PRACOWNIK",
        credentials: { login: data.login.trim(), password: data.password.trim() }
      });
    } catch (err) {
      console.error("Błąd logowania pracownika:", err);
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
            ? "linear-gradient(135deg, #1f1f2e 0%, #2c2c3e 100%)"
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Paper
          sx={{
            p: 5,
            borderRadius: 3,
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 12px 32px rgba(0,0,0,0.5)"
                : "0 12px 32px rgba(102,126,234,0.15)",
            backgroundColor: theme.palette.background.paper
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
              mb: 4
            }}
          >
            💼 PANEL PRACOWNIKA
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Login"
              margin="normal"
              {...register("login", { required: "Login jest wymagany" })}
              error={!!errors.login}
              helperText={errors.login?.message}
              sx={{
                bgcolor: theme.palette.mode === "dark" ? "#1f1f2e" : "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.divider
                }
              }}
            />

            <TextField
              fullWidth
              label="Hasło"
              type="password"
              margin="normal"
              {...register("password", {
                required: "Hasło jest wymagane",
                minLength: { value: 4, message: "Hasło musi mieć minimum 4 znaki" }
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{
                bgcolor: theme.palette.mode === "dark" ? "#1f1f2e" : "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.divider
                }
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                py: 1.5,
                fontWeight: 600,
                fontSize: "1rem",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                "&:hover": { background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)" }
              }}
              disabled={loading}
            >
              {loading ? "Logowanie..." : "Zaloguj się"}
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Jesteś klientem?
            </Typography>
            <Link
              href="/klient-login"
              sx={{
                color: theme.palette.mode === "dark" ? "#667eea" : "#1a1a1a",
                fontWeight: 600,
                textDecoration: "none",
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
