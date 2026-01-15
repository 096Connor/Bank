import { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Container, TextField, Button, Typography, Paper, Link } from "@mui/material";
import useAuth from "../auth/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
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
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      }}
    >
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" align="center" gutterBottom>
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
            />
            <Button fullWidth type="submit" variant="contained" sx={{ mt: 3 }} disabled={loading}>
              {loading ? "Logowanie..." : "Zaloguj się"}
            </Button>
          </form>
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="body2">Jesteś klientem?</Typography>
            <Link href="/klient-login">Zaloguj się tutaj</Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
